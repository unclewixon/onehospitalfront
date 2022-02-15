/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import startCase from 'lodash.startcase';
import { withRouter } from 'react-router-dom';

import waiting from '../../assets/images/waiting.gif';
import {
	request,
	confirmAction,
	itemRender,
	hasPassed,
	patientname,
	updateImmutable,
	staffname,
	qsParse,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';
import AppointmentFormModal from '../../components/Modals/AppointmentFormModal';
import ModalViewAppointment from '../../components/Modals/ModalViewAppointment';
import { toggleProfile } from '../../actions/user';
import ProfilePopup from '../../components/Patient/ProfilePopup';
import TableLoading from '../../components/TableLoading';
import { messageService } from '../../services/message';

const { RangePicker } = DatePicker;

class AllAppointments extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patients: [],
		hmos: [],
		startDate: '',
		endDate: '',
		meta: null,
		appointments: [],
		showModal: false,
		count: 0,
		showAppointment: false,
		patient_id: '',
		status: '',
	};

	componentDidMount() {
		this.fetchAppointments();
		const { location, history } = this.props;
		const query = qsParse(location.search.replace('?', ''));
		if (query && query.new) {
			const newCount = parseInt(query.new, 10);
			if (newCount > 0 && this.state.count === 0 && !location.state) {
				history.replace({ pathname: '/front-desk/appointments/queue' });
			}
		}
	}

	componentDidUpdate() {
		messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'appointment-update') {
				const { appointments } = this.state;
				const appointment = data.appointment || data.queue?.appointment;
				const result = updateImmutable(appointments, appointment);
				this.setState({ appointments: result });
			}
		});
	}

	componentWillUpdate(nextProps, nextState) {
		const query = qsParse(nextProps.location.search.replace('?', ''));
		if (query && query.new) {
			const newCount = parseInt(query.new, 10);
			if (newCount > this.state.count) {
				this.setState({ showModal: true, count: newCount });
			}
		}
	}

	cancelApppointment = async data => {
		try {
			const { appointments } = this.state;
			this.setState({ loading: true, filtering: true });
			const url = `front-desk/appointments/${data.id}/cancel`;
			const rs = await request(url, 'PATCH', true);
			notifySuccess('appointment cancelled');

			if (rs.isActive === false) {
				const filtr = appointments.filter(a => a.id !== rs.id);
				this.setState({
					loading: false,
					filtering: false,
					appointments: filtr,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	cancel = data => {
		confirmAction(this.cancelApppointment, data);
	};

	showProfile = patient => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			this.props.toggleProfile(true, info);
		}
	};

	fetchAppointments = async page => {
		try {
			const { filter } = this.props;
			const { startDate, endDate, patient_id, status } = this.state;
			const p = page || 1;
			const sd = startDate || '';
			const ed = endDate || '';
			const today = moment().format('YYYY-MM-DD');
			const date =
				filter === 'today'
					? `&today=${today}`
					: `&startDate=${sd}&endDate=${ed}`;
			this.setState({ loading: true });
			const url = `front-desk/appointments?page=${p}&limit=15&patient_id=${patient_id}&status=${status}${date}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				loading: false,
				filtering: false,
				meta,
				appointments: result,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch appointments');
		}
	};

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
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	viewAppointmentDetail = item => {
		document.body.classList.add('modal-open');
		this.setState({ showAppointment: true, appointment: item });
	};

	closeModal = () => {
		this.setState({ showModal: false, showAppointment: false });
		document.body.classList.remove('modal-open');
	};

	addAppointment = item => {
		const { appointments, meta } = this.state;
		const newMeta = { ...meta, totalPages: meta.totalPages + 1 };
		this.setState({ appointments: [item, ...appointments], meta: newMeta });
	};

	render() {
		const {
			filtering,
			loading,
			meta,
			appointments,
			showModal,
			showAppointment,
			appointment,
		} = this.state;
		const { filter } = this.props;

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="element-box m-0 mb-4 p-3">
						<form className="row">
							<div
								className={`form-group${
									filter === 'all' ? ' col-md-3' : ' col-md-6'
								}`}>
								<label className="mr-2 " htmlFor="id">
									Search
								</label>
								<input
									style={{ height: '32px' }}
									id="search"
									className="form-control"
									name="search"
									onChange={e => this.setState({ patient_id: e.target.value })}
									placeholder="search for patient: emr id, name, phone number, email"
								/>
							</div>
							{filter === 'all' && (
								<div className="form-group col-md-4">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
							)}
							<div className="form-group col-md-3">
								<label className="mr-2" htmlFor="id">
									Status
								</label>
								<select
									style={{ height: '32px' }}
									id="status"
									className="form-control"
									name="status"
									onChange={e => this.setState({ status: e.target.value })}>
									<option value="">All</option>
									<option value="Pending">Pending</option>
									<option value="Approved">Approved</option>
									<option value="Missed">Missed</option>
									<option value="Cancelled">Cancelled</option>
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
					<div className="element-box p-3 m-0 mt-3">
						<div className="table-responsive">
							{loading ? (
								<TableLoading />
							) : (
								<table className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>Date</th>
											<th>Patient</th>
											<th>Whom to see</th>
											<th>Specialty</th>
											<th>Department</th>
											<th>Type</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{appointments.map((item, i) => {
											return (
												<tr key={i}>
													<td className="nowrap">
														<p className="item-title text-color m-0">
															{moment(item.appointment_date).format(
																'DD-MMM-YYYY h:mm a'
															)}
														</p>
													</td>
													<td>
														<p className="item-title text-color m-0">
															<Tooltip
																title={<ProfilePopup patient={item.patient} />}>
																<a
																	className="cursor"
																	onClick={() =>
																		this.showProfile(item.patient)
																	}>
																	{patientname(item.patient, true)}
																</a>
															</Tooltip>
														</p>
													</td>
													<td>
														{item.consultingRoom && item.whomToSee && (
															<p className="item-title text-color m-0">
																{`${item.consultingRoom.name} (${staffname(
																	item.whomToSee
																).replace('-', '')})`}
															</p>
														)}
														{!item.consultingRoom && item.whomToSee && (
															<p className="item-title text-color m-0">
																{staffname(item.whomToSee).replace('-', '')}
															</p>
														)}
														{item.consultingRoom && !item.whomToSee && (
															<p className="item-title text-color m-0">
																{item.consultingRoom.name}
															</p>
														)}
														{!item.consultingRoom && !item.whomToSee && (
															<p className="item-title text-color m-0">--</p>
														)}
													</td>
													<td>{item.service?.item?.name || '--'}</td>
													<td>{item.department?.name || '--'}</td>
													<td>
														{item.consultation_type
															? startCase(item.consultation_type)
															: '--'}
													</td>
													<td>
														{!item.encounter &&
														(item.status === 'Cancelled' ||
															item.status === 'Missed') ? (
															<span className="badge badge-danger">
																{item.status}
															</span>
														) : (
															<>
																{item.status === 'Pending' && (
																	<span className="badge badge-secondary">
																		Pending
																	</span>
																)}
																{(item.status === 'Pending Paypoint Approval' ||
																	item.status === 'Pending HMO Approval') && (
																	<span className="badge badge-secondary">
																		Pending Payment
																	</span>
																)}
																{item.status === 'Approved' && (
																	<span
																		className={`badge ${
																			item.doctorStatus === 0
																				? 'badge-primary'
																				: 'badge-info text-white'
																		}`}>
																		{item.doctorStatus === 0
																			? 'In Queue'
																			: 'Seeing Doctor'}
																	</span>
																)}
																{item.status === 'Completed' && (
																	<span className="badge badge-success">
																		Completed
																	</span>
																)}
															</>
														)}
													</td>
													<td className="row-actions">
														<Tooltip title="View Appointment">
															<a
																onClick={() => this.viewAppointmentDetail(item)}
																className="cursor">
																<i className="os-icon os-icon-eye"></i>
															</a>
														</Tooltip>
														{!item.encounter &&
															!hasPassed(item.appointment_date) &&
															item.status !== 'Cancelled' && (
																<Tooltip title="Cancel Appointment">
																	<a
																		className="danger cursor"
																		onClick={() => this.cancel(item)}>
																		<i className="os-icon os-icon-ui-15"></i>
																	</a>
																</Tooltip>
															)}
													</td>
												</tr>
											);
										})}
										{appointments && appointments.length === 0 && (
											<tr className="text-center">
												<td colSpan="8">No Appointments</td>
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
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
				{showModal && (
					<AppointmentFormModal
						addAppointment={e => this.addAppointment(e)}
						closeModal={this.closeModal}
					/>
				)}
				{showAppointment && (
					<ModalViewAppointment
						appointment={appointment}
						closeModal={this.closeModal}
					/>
				)}
			</div>
		);
	}
}

export default withRouter(
	connect(null, {
		startBlock,
		stopBlock,
		toggleProfile,
	})(AllAppointments)
);
