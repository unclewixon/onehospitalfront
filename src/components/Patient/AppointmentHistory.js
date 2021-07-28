/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';
import TableLoading from '../TableLoading';
import { request, itemRender, hasPassed } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { staffname } from '../../services/utilities';
import ModalViewAppointment from '../Modals/ModalViewAppointment';

const { RangePicker } = DatePicker;

class AppointmentHistory extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
		filtering: false,
		startDate: '',
		endDate: '',
		appointments: [],
		meta: null,
		appointment: null,
	};

	fetchAppointments = async page => {
		try {
			const { startDate, endDate } = this.state;
			const patient_id = this.props.patient.id;
			const p = page || 1;
			this.setState({ loading: true });
			const url = `front-desk/appointments?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({
				loading: false,
				filtering: false,
				meta,
				appointments: arr,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch appointments');
		}
	};

	componentDidMount() {
		this.fetchAppointments();
	}

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchAppointments(nextPage);
	};

	doFilter = async e => {
		e.preventDefault();
		this.fetchAppointments();
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

	viewAppointment = appointment => {
		document.body.classList.add('modal-open');
		this.setState({ appointment, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const {
			loading,
			filtering,
			meta,
			appointments,
			appointment,
			showModal,
		} = this.state;
		return (
			<div className="row">
				<div className="m-0 w-100">
					<div className="table-responsive">
						<form className="row m-0">
							<div className="form-group col-md-4">
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>
							<div className="form-group col-md-2">
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

						<div className="element-box-tp">
							<div className="table-responsive">
								{loading ? (
									<TableLoading />
								) : (
									<table className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th>Date</th>
												<th>Whom to see</th>
												<th>Specialty</th>
												<th>Department</th>
												<th>Status</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{appointments.map((appointment, i) => {
												return (
													<tr key={i}>
														<td className="nowrap">
															<p className="item-title text-color m-0">
																{moment(appointment.appointment_date).format(
																	'DD-MMM-YYYY h:mm a'
																)}
															</p>
														</td>
														<td>
															<p className="item-title text-color m-0">
																{staffname(appointment?.whomToSee)}
															</p>
														</td>
														<td>{appointment.service?.item?.name || '--'}</td>
														<td>{appointment.department?.name || '--'}</td>

														<td>
															{!appointment.encounter &&
															(appointment.status === 'Cancelled' ||
																hasPassed(appointment.appointment_date)) ? (
																<span className="badge badge-danger">
																	{hasPassed(appointment.appointment_date) &&
																	!appointment.encounter
																		? 'Missed'
																		: 'Cancelled'}
																</span>
															) : (
																<>
																	{appointment.status === 'Pending' && (
																		<span className="badge badge-secondary">
																			Pending
																		</span>
																	)}
																	{(appointment.status ===
																		'Pending Paypoint Approval' ||
																		appointment.status ===
																			'Pending HMO Approval') && (
																		<span className="badge badge-secondary">
																			Pending Payment
																		</span>
																	)}
																	{appointment.status === 'Approved' && (
																		<span className="badge badge-success">
																			{appointment.doctorStatus === 0
																				? 'In Queue'
																				: 'Seeing Doctor'}
																		</span>
																	)}
																	{appointment.status === 'Completed' && (
																		<span className="badge badge-success">
																			Completed
																		</span>
																	)}
																</>
															)}
														</td>
														<td className="row-actions">
															<a
																onClick={() =>
																	this.viewAppointment(appointment)
																}
																className="cursor">
																<i className="os-icon os-icon-eye"></i>
															</a>
														</td>
													</tr>
												);
											})}
											{appointments.length === 0 && (
												<tr className="text-center">
													<td colSpan="7">No Appointments</td>
												</tr>
											)}
										</tbody>
									</table>
								)}
							</div>

							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} appointments`}
										itemRender={itemRender}
										onChange={current => this.onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				{showModal && (
					<ModalViewAppointment
						appointment={appointment}
						closeModal={this.closeModal}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, { startBlock, stopBlock })(
	AppointmentHistory
);
