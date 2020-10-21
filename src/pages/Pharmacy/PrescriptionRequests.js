/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import ViewPrescription from '../../components/Pharmacy/ViewPrescription';
import { request } from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';

const { RangePicker } = DatePicker;

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
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			showModal: false,
			activeRequest: null,
			filled: false,
		});
	};

	getServiceUnit = async () => {
		try {
			const res = await request('inventory/categories', 'GET', true);

			if (res && res.length > 0) {
				const selectCat = res.find(cat => cat.name === 'Pharmacy');

				const url = `inventory/stocks-by-category/${selectCat.id}`;
				const rs = await request(url, 'GET', true);
				this.setState({ drugs: rs });
			}
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	};

	componentDidMount() {
		this.getServiceUnit();
		const { startDate, endDate } = this.state;
		this.loadPrescriptions(startDate, endDate);
	}

	loadPrescriptions = async (start, end) => {
		try {
			this.setState({ loading: true });
			const url = `patient/requests/pharmacy?startDate=${start}&endDate=${end}`;
			const rs = await request(url, 'GET', true);
			this.setState({ loading: false, prescriptions: rs });
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

	render() {
		const {
			filtering,
			showModal,
			activeRequest,
			drugs,
			prescriptions,
			filled,
		} = this.state;

		const customStyle = {
			minHeight: '24px !important',
			height: '2rem',
		};

		return (
			<>
				<div className="element-box m-0 mb-4">
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
				<div className="element-box m-0 mb-4">
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
												{request.patient_name ? request.patient_name : ''}
											</td>
											<td>{request.created_by ? request.created_by : ''}</td>
											<td className="nowrap">
												{request.payment_status === 0 && request.isFilled && (
													<span className="badge badge-info text-white">
														Awaiting Payment
													</span>
												)}
												{request.status === 1 && (
													<span className="badge badge-success">Completed</span>
												)}
												{request.payment_status === 1 &&
													request.status === 0 && (
														<span className="badge badge-secondary">
															Awaiting Dispense
														</span>
													)}
												{request.status === 0 && !request.isFilled && (
													<span className="badge badge-warning">Pending</span>
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
															onClick={() => {
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
