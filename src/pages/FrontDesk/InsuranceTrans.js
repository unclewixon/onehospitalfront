/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Popover from 'antd/lib/popover';
import Pagination from 'antd/lib/pagination';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, itemRender } from '../../services/utilities';
import { loadTransaction } from '../../actions/transaction';
import searchingGIF from '../../assets/images/searching.gif';
import ModalServiceDetails from '../../components/Modals/ModalServiceDetails';
import InputCode from '../../components/FrontDesk/InputCode';
import { startBlock, stopBlock } from '../../actions/redux-block';

const { RangePicker } = DatePicker;

const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];

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

export class InsuranceTrans extends Component {
	state = {
		filtering: false,
		loading: false,
		showModal: false,
		details: null,
		id: null,
		hmos: [],
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
		hmo_id: '',
		visible: null,
		meta: null,
	};

	componentDidMount() {
		this.fetchTransaction();
		this.getHmos();
	}

	fetchTransaction = async page => {
		const { patient_id, startDate, endDate, status, hmo_id } = this.state;
		console.log(patient_id, startDate, endDate, status, hmo_id);
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`hmos/transactions?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo_id}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTransaction(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
	};

	updateCode = async data => {
		console.log(data);
	};

	getHmos = async () => {
		const rs = await request(`hmos`, 'GET', true);
		const res = rs
			.filter(t => t.id !== 1)
			.map(hmo => ({
				value: hmo.id,
				label: hmo.name,
			}));
		this.setState({ hmos: res });
	};
	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchTransaction();
	};

	change = e => {
		//console.log(e.target.value)
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

	doHide = () => {
		this.setState({
			visible: { show: false, id: null },
		});
	};

	viewDetails = (transaction_type, data) => {
		document.body.classList.add('modal-open');
		this.setState({ details: { transaction_type, data }, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ details: null, showModal: false });
	};
	handleVisibleChange = (e, id) => {
		this.setState({ visible: { show: e, id } });
	};

	render() {
		const {
			filtering,
			loading,
			hmos,
			showModal,
			details,
			visible,
			meta,
		} = this.state;
		const transactions = this.props.reviewTransaction; //.length > 0 ? this.props.reviewTransaction.filter(t => t.hmo_id !== 1) : [];
		return (
			<>
				<div className="row">
					<div className="col-md-12 p-4">
						<form className="row">
							<div className="form-group col-md-3">
								<label className="" htmlFor="patient_id">
									Patient
								</label>

								<AsyncSelect
									isClearable
									getOptionValue={getOptionValues}
									getOptionLabel={getOptionLabels}
									defaultOptions
									name="patient_id"
									id="patient_id"
									loadOptions={getOptions}
									onChange={e => {
										this.setState({ patient_id: e?.id });
									}}
									placeholder="Search patients"
								/>
							</div>
							<div className="form-group col-md-2">
								<label className="" htmlFor="hmo_id">
									Hmo
								</label>
								<select
									style={{ height: '35px' }}
									id="hmo_id"
									className="form-control"
									name="hmo_id"
									onChange={e => this.change(e)}>
									<option value="">Choose Hmo</option>
									{hmos.map((pat, i) => {
										return (
											<option key={i} value={pat.value}>
												{pat.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-3">
								<label>From - To</label>
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>
							<div className="form-group col-md-2">
								<label className="mr-2 " htmlFor="id">
									Status
								</label>
								<select
									style={{ height: '35px' }}
									id="status"
									className="form-control"
									name="status"
									onChange={e => this.change(e)}>
									<option value="">Choose status</option>
									{paymentStatus.map((status, i) => {
										return (
											<option key={i} value={status.value}>
												{status.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-2 mt-4">
								<div
									className="btn btn-sm btn-primary btn-upper text-white filter-btn"
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

					<div className="col-sm-12">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">DATE</th>
										<th className="text-center">PATIENT NAME</th>
										<th className="text-center">HMO</th>
										<th className="text-center">SERVICE</th>
										<th className="text-center">AMOUNT (&#x20A6;)</th>
										<th className="text-center">PAYMENT TYPE</th>
										<th className="text-center">HMO TRANSACTION CODE</th>
										<th className="text-center">ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="6" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : transactions.length > 0 ? (
										transactions.map((transaction, index) => {
											return (
												<tr key={index}>
													<td className="text-center">
														{moment(transaction.createdAt).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
													<td className="text-center">
														{`${transaction.patient_name}`}
													</td>
													<td className="text-center">
														{transaction.hmo_name
															? transaction.hmo_name
															: 'No Hmo'}
													</td>
													<td className="text-center">
														<span className="text-capitalize">
															{transaction.transaction_type}
														</span>
														<a
															className="item-title text-primary text-underline ml-2"
															onClick={() =>
																this.viewDetails(
																	transaction.transaction_type,
																	transaction.transaction_details
																)
															}>
															details
														</a>
													</td>
													<td className="text-center">
														{transaction.amount ? transaction.amount : 0}
													</td>
													<td className="text-center">
														{transaction.payment_type
															? transaction.payment_type
															: 'Not specified'}
													</td>

													<td className="text-center">
														{transaction.hmo_approval_code}
													</td>
													<td className="text-center row-actions">
														<Popover
															title=""
															overlayClassName="select-bed"
															content={
																<InputCode
																	transaction={transaction}
																	transactions={transactions}
																	loadTransaction={trs =>
																		this.props.loadTransaction(trs)
																	}
																	doHide={this.doHide}
																/>
															}
															trigger="click"
															visible={
																visible &&
																visible.id === transaction.id &&
																visible.show
															}
															onVisibleChange={e =>
																this.handleVisibleChange(e, transaction.id)
															}>
															<a
																className="btn btn-primary btn-sm text-white
															">
																<i className="os-icon os-icon-folder-plus" />{' '}
																Apply Code
															</a>
														</Popover>
													</td>
												</tr>
											);
										})
									) : (
										<tr className="text-center">
											<td colSpan="7">No transaction</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} transactions`}
									itemRender={itemRender}
									onChange={current => this.onNavigatePage(current)}
								/>
							</div>
						)}
					</div>
				</div>
				{showModal && (
					<ModalServiceDetails
						details={details}
						closeModal={() => this.closeModal()}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		reviewTransaction: state.transaction.reviewTransaction,
		//	hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	loadTransaction,
	startBlock,
	stopBlock,
})(InsuranceTrans);
