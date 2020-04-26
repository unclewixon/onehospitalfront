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
import FrontDesk from '../../pages/FrontDesk';
import FrontDeskTable from './FrontDeskTable';

const Appointment = props => {
	const [loading, setLoading] = useState(false);
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		socket.on('appointmentSaved', res => {
			if (res.success) {
				const appointment = res.appointment;
				const today = moment().format('YYYY-MM-DD');
				if (appointment.appointment_date === today) {
					setAppointments([...appointments, appointment]);
				}
			}
		});
	}, [appointments]);

	useEffect(() => {
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
			console.log(res);
			setAppointments(res);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			notifyError(e.message || 'could not fetch appointments');
		}
	}

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
											<FrontDeskTable
												appointments={appointments}
												loading={loading}
												today={true}
											/>
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
const mapStateToProps = state => {
	return {
		reviewTransaction: state.transaction.reviewTransaction,
		//	hmoList: state.hmo.hmo_list,
	};
};
export default connect(mapStateToProps, {})(Appointment);
