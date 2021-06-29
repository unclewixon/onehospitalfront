/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import { connect } from 'react-redux';

import { notifyError } from '../../services/notify';
import ViewPrescription from '../../components/Pharmacy/ViewPrescription';
import { request, updateImmutable, itemRender } from '../../services/utilities';
import ProfilePopup from '../../components/Patient/ProfilePopup';
import { toggleProfile } from '../../actions/user';

class PrescriptionQueue extends Component {
	state = {
		filtering: false,
		loading: false,
		patientId: '',
		activeRequest: null,
		showModal: false,
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

	componentDidMount() {
		this.loadPrescriptions();
	}

	loadPrescriptions = async p => {
		try {
			const page = p || 1;
			this.setState({ loading: true });
			const date = moment().format('YYYY-MM-DD');
			const url = `requests/list/pharmacy?page=${page}&limit=10&today=${date}`;
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

	onNavigatePage = nextPage => {
		this.loadPrescriptions(nextPage);
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const {
			showModal,
			activeRequest,
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
										<tr key={index}>
											<td>
												<span>
													{moment(request.createdAt).format(
														'DD-MMM-YYYY h:mm A'
													)}
												</span>
											</td>
											<td>
												<p className="item-title text-color m-0">
													<Tooltip
														title={<ProfilePopup patient={request.patient} />}>
														<a
															className="cursor"
															onClick={() => this.showProfile(request.patient)}>
															{`${request.patient.other_names} ${request.patient.surname}`}
														</a>
													</Tooltip>
													{request.patient.isAdmitted && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger ml-1" />
														</Tooltip>
													)}
												</p>
											</td>
											<td>{request.created_by ? request.created_by : ''}</td>
											<td className="nowrap">
												{request.status === 0 && !request.isFilled && (
													<span className="badge badge-warning">Pending</span>
												)}
												{request.transaction &&
													request.transaction.status === 0 &&
													request.status === 0 &&
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
												{request.status === 1 && (
													<Tooltip title="Print Prescription">
														<a className="ml-2">
															<i className="icon-feather-printer" />
														</a>
													</Tooltip>
												)}
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
						updatePrescriptions={this.updatePrescriptions}
						filled={filled}
					/>
				)}
			</>
		);
	}
}

export default connect(null, { toggleProfile })(PrescriptionQueue);
