/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import isEmpty from 'lodash.isempty';

import waiting from '../../assets/images/waiting.gif';
import { labourAPI } from '../../services/constants';
import {
	request,
	getAge,
	itemRender,
	formatPatientId,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { loadLabour, loadLabourDetails } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import { clearLabourDetails } from '../../actions/patient';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';

const { RangePicker } = DatePicker;

// const paymentStatus = [
// 	{ value: 0, label: 'processing' },
// 	{ value: 1, label: 'done' },
// ];

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

class Dashboard extends Component {
	state = {
		filtering: false,
		id: null,
		startDate: '',
		endDate: '',
		loading: false,
		patient_id: '',
		meta: null,
	};

	componentDidMount() {
		this.props.clearLabourDetails();
		this.fetchAllEnrolment();
	}

	fetchAllEnrolment = async page => {
		const { patient_id, startDate, endDate } = this.state;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`${labourAPI}/?patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&page=${p}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadLabour(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			this.props.stopBlock();
			console.log(error);
			notifyError('Error fetching labour management enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchAllEnrolment();
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});
		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	detail = item => {
		//load data into store
		this.props.loadLabourDetails(item);
		this.props.history.push(`/labour-mgt/detail/${item.id}`);
	};
	render() {
		const { filtering, loading, meta } = this.state;
		const { enrolments } = this.props;
		const reverse = [...enrolments].reverse();
		return (
			<div className="row">
				<div className="col-md-12">
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

						<div className="form-group col-md-3">
							<label>From - To</label>
							<RangePicker onChange={e => this.dateChange(e)} />
						</div>

						<div className="form-group col-md-3 mt-4">
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
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Folder Id</th>
										<th>Name</th>
										<th>Age</th>
										<th>Date Enrolled</th>
										<th>Status</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="8" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : !isEmpty(reverse) ? (
										reverse.map((el, i) => {
											console.log(el);
											return (
												<tr key={i + 1}>
													<td>{formatPatientId(el?.patient_id)}</td>

													<td>{el.patient_name}</td>

													<td>{getAge(el.date_of_birth)}</td>
													<td>{moment(el.createdAt).format('DD-MM-YYYY')}</td>
													<td>
														{' '}
														<span
															className={`badge badge-${
																el.isActive ? 'success' : 'danger'
															}`}>
															{el.isActive ? 'open' : 'closed'}
														</span>
													</td>
													<td className="text-right row-actions">
														<Tooltip title="view detail">
															<a
																onClick={() => this.detail(el)}
																className="secondary">
																<i className="os-icon os-icon-eye" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No Labour Enrolment
											</td>
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		enrolments: state.patient.enrolments,
	};
};

export default connect(mapStateToProps, {
	loadLabour,
	loadLabourDetails,
	clearLabourDetails,
	startBlock,
	stopBlock,
})(Dashboard);
