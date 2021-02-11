/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Tooltip from 'antd/lib/tooltip';
import DatePicker from 'antd/lib/date-picker';
import { createVoucher } from '../../actions/general';
import { searchAPI } from '../../services/constants';
import {
	request,
	confirmAction,
	formatCurrency,
	itemRender,
} from '../../services/utilities';
import { vouchersAPI } from '../../services/constants';
import { loadVoucher } from '../../actions/paypoint';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { compose } from 'redux';
import { notifySuccess, notifyError } from '../../services/notify';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import waiting from '../../assets/images/waiting.gif';

const { RangePicker } = DatePicker;

const getOptionValues = option => option.id;
const getOptionLabels = option => `${option.other_names} ${option.surname}`;

const getOptions = async q => {
	if (!q || q.length < 3) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

export class Voucher extends Component {
	state = {
		loading: false,
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
		filtering: false,
		meta: null,
	};

	componentDidMount() {
		this.fetchVoucher();
		//document.body.classList.add('modal-open');
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.patient_id !== this.state.patient_id) {
			this.fetchVoucher();
		}
	}

	fetchVoucher = async page => {
		const { patient_id, startDate, endDate, status } = this.state;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`${vouchersAPI}/list?page=${p}&limit=10&patient_id=${patient_id ||
					''}&startDate=${startDate}&endDate=${endDate}&status=${status}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadVoucher(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch transactions');
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchVoucher(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchVoucher();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	displayExpiry = voucher => {
		console.log('displayExpiry = voucher => {');
		console.log(voucher);
		let result = new Date(moment(voucher.q_createdAt));
		result.setDate(result.getDate() + parseInt(voucher.duration));
		return moment(result).format('DD-MM-YYYY');
	};

	onDeleteRoom = async data => {
		try {
			this.setState({ loading: true });
			await request(`vouchers/${data.id}`, 'DELETE', true);
			const rs = this.props.voucher.filter(v => v.id !== data.id);
			this.props.loadVoucher(rs);
			this.setState({ loading: false });
			notifySuccess('Voucher  deleted');
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
			notifyError(error.message || 'Error deleting voucher ');
		}
	};

	confirmDelete = data => {
		confirmAction(this.onDeleteRoom, data);
	};

	render() {
		const { loading, meta, filtering } = this.state;
		const { voucher } = this.props;
		return (
			<>
				<div className="element-wrapper">
					<div className="element-actions p-3">
						<button
							className="btn btn-primary"
							onClick={() => this.props.createVoucher(true)}>
							New Voucher
						</button>
					</div>

					<div className="col-md-12 p-4">
						<h6 className="element-header">Filter by:</h6>

						<form className="row">
							<div className="form-group col-md-3">
								<label htmlFor="patient_id">Patient</label>

								<AsyncSelect
									isClearable
									getOptionValue={getOptionValues}
									getOptionLabel={getOptionLabels}
									defaultOptions
									name="patient_id"
									id="patient_id"
									loadOptions={getOptions}
									onChange={e => {
										this.setState({ patient_id: e.id });
									}}
									placeholder="Search patients"
								/>
							</div>
							<div className="form-group col-md-3">
								<label>From - To</label>
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>

							<div className="form-group col-md-3 mt-4">
								<div
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={this.doFilter}>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
										)}
									</span>
								</div>
							</div>
						</form>
					</div>

					<div className="element-box-content">
						<div className="table table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">Patient</th>
										<th className="text-center">Voucher Number</th>
										<th className="text-center">Amount (₦)</th>
										<th className="text-center">Date Created</th>
										<th className="text-center">Start Date</th>
										<th className="text-center">Expiry Date</th>
										<th className="text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="5" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : voucher.length > 0 ? (
										voucher.map((voucher, i) => {
											return (
												<tr key={i}>
													<td className="text-center">
														{voucher.patient_name}
													</td>
													<td className="text-center">{voucher.voucher_no}</td>
													<td className="text-center">
														{formatCurrency(voucher.amount)}
													</td>
													<td className="text-center">
														{moment(voucher.q_createdAt).format('DD-MM-YYYY')}
													</td>

													<td className="text-center">
														{moment(voucher.start_date).format('DD-MM-YYYY')}
													</td>

													<td className="text-center">
														{this.displayExpiry(voucher)}
													</td>

													<td className="text-center row-actions">
														<Tooltip title="Delete Request">
															<a
																className="danger"
																onClick={() => this.confirmDelete(voucher)}>
																<i className="os-icon os-icon-ui-15" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									) : (
										<tr className="text-center">
											<td colSpan="7">No voucher for today yet</td>
										</tr>
									)}
								</tbody>
							</table>

							{/*<VoucherTable data={voucher} />*/}
						</div>
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} services`}
									itemRender={itemRender}
									onChange={current => this.onNavigatePage(current)}
								/>
							</div>
						)}
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		voucher: state.paypoint.voucher,
	};
};
export default compose(
	withRouter,
	connect(mapStateToProps, {
		loadVoucher,
		createVoucher,
		stopBlock,
		startBlock,
	})
)(Voucher);
