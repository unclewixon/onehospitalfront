/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import ViewPrescription from '../../components/Pharmacy/ViewPrescription';
import { request, updateImmutable, itemRender } from '../../services/utilities';

class PrescriptionQueue extends Component {
	state = {
		filtering: false,
		loading: false,
		patientId: '',
		activeRequest: null,
		showModal: false,
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
		drugs: [],
		prescriptions: [],
		filled: false,
		meta: null,
	};

	getServiceUnit = async hmoId => {
		try {
			const res = await request('inventory/categories', 'GET', true);

			if (res && res.length > 0) {
				const selectCat = res.find(cat => cat.name === 'Pharmacy');

				const url = `inventory/stocks-by-category/${selectCat.id}/${hmoId}`;
				const rs = await request(url, 'GET', true);
				this.setState({ drugs: rs });
			}
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			showModal: false,
			activeRequest: null,
			filled: false,
		});
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
			notifyError('could not fetch prescription queue');
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
			showModal,
			activeRequest,
			drugs,
			prescriptions,
			filled,
			meta,
		} = this.state;

		return (
			<>
				<div className="element-box p-3 m-0 mb-4">
					<div className="table table-responsive">
						<table
							id="table"
							className="table table-theme v-middle table-hover">
							<thead>
								<tr>
									<th>Date</th>
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
												{request.status === 0 && !request.isFilled && (
													<span className="badge badge-warning">Pending</span>
												)}
												{request.transaction_status === 0 &&
													request.status === 0 &&
													request.isFilled && (
														<span className="badge badge-info text-white">
															Awaiting Payment
														</span>
													)}
												{request.transaction_status === 1 &&
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
													<Tooltip title="Fill Prescription">
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
																	request.patient_hmo_id
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

export default PrescriptionQueue;
