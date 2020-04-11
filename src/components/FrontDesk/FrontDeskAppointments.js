/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { request } from '../../services/utilities';
import { viewAppointmentDetail } from '../../actions/general.js';
import { API_URI, socket } from '../../services/constants';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import moment from 'moment';
import { connect } from 'react-redux';
import { toggleProfile } from '../../actions/user';

const Appointment = props => {
	const [loading, setLoading] = useState(false);
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		socket.on('appointmentSaved', res => {
			if (res.success) {
				const appointment = res.appointment;
				const today = moment().format('YYYY-MM-DD');
				if (appointment.appointment_date === today) {
					setAppointments(appointments => [...appointments, appointment]);
				}
			}
		});
	}, [appointments]);

	const ViewAppointmentDetail = appointment => {
		console.log(appointment);
		props.viewAppointmentDetail(appointment);
	};

	useEffect(() => {
		console.log('ff');
		getAppointments();
	}, []);

	async function getAppointments() {
		try {
			setLoading(true);
			const res = await request(
				`${API_URI}/front-desk/appointments/today`,
				'GET',
				true
			);
			setAppointments(res);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			notifyError(e.message || 'could not fetch appointments');
		}
	}

	const showProfile = patient => () => {
		const info = { patient, type: 'patient' };
		props.toggleProfile(true, info);
	};

	const changeDate = e => {
		console.log(e.target.value);
		let value = e.target.value;
		let startDate = moment().format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');

		if (value === 'last week') {
			startDate = moment()
				.subtract(1, 'weeks')
				.startOf('week')
				.format('YYYY-MM-DD');

			endDate = moment()
				.subtract(1, 'weeks')
				.endOf('week')
				.format('YYYY-MM-DD');
		} else if (value === '30 days') {
			startDate = moment()
				.subtract(30, 'days')
				.format('YYYY-MM-DD');
		}
		console.log(startDate, endDate);
	};

	return (
		<div className="tab-content">
			<div className="tab-pane active show" id="tab_overview">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="element-wrapper">
									<div className="element-actions">
										<form className="form-inline justify-content-sm-end">
											<select
												className="form-control form-control-sm"
												onChange={e => changeDate(e)}>
												<option value="today">Today</option>
												<option value="last week">Last Week</option>
												<option value="30 days">Last 30 Days</option>
											</select>
										</form>
									</div>
									<div className="element-box-tp">
										<div className="table-responsive">
											<table className="table table-padded">
												<thead>
													<tr>
														<th>Patient</th>
														<th>Whom to see</th>
														<th className="text-left">Status</th>
														<th className="text-center">Actions</th>
													</tr>
												</thead>
												<tbody>
													{loading ? (
														<tr>
															<td colSpan="4" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : (
														appointments &&
														appointments.map((appointment, i) => (
															<tr key={i}>
																<td>
																	<span className="smaller lighter">
																		{appointment.patient.fileNumber}
																	</span>
																	<br />
																	<span>{`${appointment.patient.surname}, ${appointment.patient.other_names}`}</span>
																</td>
																<td className="cell-with-media">
																	<span>
																		{`${appointment.specialization.name} (${appointment.department.name})`}
																	</span>
																</td>
																<td className="nowrap">
																	{/* <span className="status-pill smaller green"></span> */}
																	<span>{appointment.status}</span>
																</td>
																<td className="row-actions">
																	<a
																		href="#"
																		onClick={() =>
																			ViewAppointmentDetail(appointment)
																		}>
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a
																		href="#"
																		onClick={showProfile(appointment.patient)}>
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
																	</a>
																</td>
															</tr>
														))
													)}
												</tbody>
											</table>
											<div className="controls-below-table">
												<div className="table-records-info">
													Showing records 1 - 5
												</div>
												<div className="table-records-pages">
													<ul>
														<li>
															<a href="#">Previous</a>
														</li>
														<li>
															<a className="current" href="#">
																1
															</a>
														</li>
														<li>
															<a href="#">2</a>
														</li>
														<li>
															<a href="#">3</a>
														</li>
														<li>
															<a href="#">4</a>
														</li>
														<li>
															<a href="#">Next</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default connect(null, { viewAppointmentDetail, toggleProfile })(
	Appointment
);
