/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import ViewPrescription from '../../components/Pharmacy/ViewPrescription';
import { request, updateImmutable, itemRender } from '../../services/utilities';

const { RangePicker } = DatePicker;

const category_id = 1;

class PrescriptionRequests extends Component {
	state = {
		filtering: false,
		loading: false,
		activeRequest: null,
		showModal: false,
		startDate: '',
		endDate: '',
		patientId: '',
		drugs: [],
		prescriptions: [],
		filled: false,
		meta: null,
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			showModal: false,
			activeRequest: null,
			filled: false,
		});
	};

	getServiceUnit = async hmoId => {
		try {
			const url = `inventory/stocks-by-category/${category_id}/${hmoId}`;
			const rs = await request(url, 'GET', true);
			this.setState({ drugs: rs });
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	};

	componentDidMount() {
		const { startDate, endDate } = this.state;
		this.loadPrescriptions(startDate, endDate);
	}

	loadPrescriptions = async (start, end, p) => {
		try {
			const page = p || 1;
			this.setState({ loading: true });
			const url = `patient/requests/pharmacy?startDate=${start}&endDate=${end}&limit=10&page=${page}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loading: false, prescriptions: result, meta });
		} catch (e) {
			this.setState({ loading: false });
			notifyError('could not fetch prescription requests');
		}
	};

	updatePrescriptions = update => {
		const { prescriptions } = this.state;
		const updatedDrugs = updateImmutable(prescriptions, update);
		this.setState({ prescriptions: updatedDrugs });
	};

	filterEntries = () => {
		const { startDate, endDate } = this.state;
		this.setState({ filtering: true });
		this.loadPrescriptions(startDate, endDate);
		this.setState({ filtering: false });
	};

	onNavigatePage = nextPage => {
		const { startDate, endDate } = this.state;
		this.loadPrescriptions(startDate, endDate, nextPage);
	};

	render() {
		const {
			filtering,
			showModal,
			activeRequest,
			drugs,
			prescriptions,
			filled,
			meta,
		} = this.state;

		const customStyle = {
			minHeight: '24px !important',
			height: '2rem',
		};

		return (
			<>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-6">
							<label>From - To</label>
							<RangePicker
								onChange={e => {
									const date = e.map(date => {
										return moment(date._d).format('YYYY-MM-DD');
									});
									this.setState({
										startDate: date[0],
										endDate: date[1],
									});
								}}
							/>
						</div>
						<div className="form-group col-md-3">
							<label className="mr-2 " htmlFor="patient">
								Request
							</label>
							<select className="form-control" style={{ ...customStyle }}>
								<option value="">All</option>
								<option value="open">Open</option>
								<option value="filled">Filled</option>
								<option value="completed">Completed</option>
							</select>
						</div>
						<div className="form-group col-md-3 mt-4">
							<a
								className="btn btn-sm btn-primary btn-upper text-white"
								onClick={() => this.filterEntries()}>
								<i className="os-icon os-icon-ui-37" />
								<span>
									{filtering ? (
										<img src={waiting} alt="submitting" />
									) : (
										'Filter'
									)}
								</span>
							</a>
						</div>
					</form>
				</div>
				<div className="element-box m-0 mb-4 p-3">
					<div className="table table-responsive">
						<table
							id="table"
							className="table table-theme v-middle table-hover">
							<thead>
								<tr>
									<th>Request Date</th>
									<th>Patient Name</th>
									<th>Request From</th>
									<th>Request Status</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{prescriptions.map((request, index) => {
									return (
										<tr className="" key={index}>
											<td>
												<span>
													{moment(request.createdAt).format(
														'DD-MMM-YYYY HH:mm A'
													)}
												</span>
											</td>
											<td>
												{`${request.patient.surname} ${request.patient.other_names}`}
											</td>
											<td>{request.created_by ? request.created_by : ''}</td>
											<td className="nowrap">
												{request.status === 0 && !request.isFilled && (
													<span className="badge badge-warning">Pending</span>
												)}
												{request.transaction &&
													request.transaction.status === 0 &&
													request.isFilled && (
														<span className="badge badge-info text-white">
															Awaiting Payment
														</span>
													)}
												{request.transaction &&
													request.transaction.status === 1 &&
													request.status === 0 && (
														<span className="badge badge-secondary">
															Awaiting Dispense
														</span>
													)}
												{request.status === 1 && (
													<span className="badge badge-success">Completed</span>
												)}
											</td>
											<td className="row-actions text-center">
												{request.isFilled && (
													<Tooltip title="View Prescription">
														<a
															className="info"
															onClick={() => {
																document.body.classList.add('modal-open');
																this.setState({
																	activeRequest: request,
																	showModal: true,
																	filled: true,
																});
															}}>
															<i className="os-icon os-icon-eye" />
														</a>
													</Tooltip>
												)}
												{!request.isFilled && (
													<Tooltip title="Fill Prescription">
														<a
															className="primary"
															onClick={async () => {
																await this.getServiceUnit(
																	request.patient.hmo.id
																);
																document.body.classList.add('modal-open');
																this.setState({
																	activeRequest: request,
																	showModal: true,
																	filled: false,
																});
															}}>
															<i className="os-icon os-icon-check-square" />
														</a>
													</Tooltip>
												)}
												<Tooltip title="Print Prescription">
													<a className="ml-2">
														<i className="icon-feather-printer" />
													</a>
												</Tooltip>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} prescriptions`}
								itemRender={itemRender}
								onChange={current => this.onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
				{showModal && (
					<ViewPrescription
						closeModal={this.closeModal}
						activeRequest={activeRequest}
						drugs={drugs}
						updatePrescriptions={this.updatePrescriptions}
						filled={filled}
					/>
				)}
			</>
		);
	}
}

export default PrescriptionRequests;
