/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'reactn';
import { useCallback, useEffect } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SSRStorage from '../../services/storage';
import SelectRoomModal from '../../components/Modals/SelectRoomModal';
import { socket } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { viewAppointmentDetail } from '../../actions/general';
import { toggleProfile } from '../../actions/user';
import AppointmentTable from '../../components/Doctor/AppointmentTable';
const storage = new SSRStorage();

function DoctorHome({ profile }) {
	const staff = profile.details;

	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [activeRoom, setActiveRoom] = useState(null);
	const [appointments, setAppointments] = useState([]);
	const [listenning, setListenning] = useState(false);

	const getAppointments = useCallback(async () => {
		try {
			setLoading(true);
			const res = await request(`front-desk/appointments/today`, 'GET', true);
			setAppointments(
				res.filter(appointment => appointment.whomToSee.id === staff.id)
			);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			notifyError(e.message || 'could not fetch appointments');
		}
	}, [staff.id]);

	useEffect(() => {
		if (!listenning) {
			setListenning(true);

			socket.on('new-appointment', res => {
				console.log('new appointment message');
				if (res.success) {
					const appointment = res.appointment;
					const today = moment().format('YYYY-MM-DD');
					if (appointment.appointment_date === today) {
						setAppointments([...appointments, appointment]);
					}
				}
			});

			socket.on('appointment-update', data => {
				if (data.action === 1) {
					getAppointments();
				}
			});
		}
	}, [appointments, getAppointments, listenning]);

	const initModal = useCallback(async () => {
		const room = await storage.getItem('ACTIVE:ROOM');
		if (!room) {
			setShowModal(true);
		} else {
			setActiveRoom(room);
		}
	}, []);

	useEffect(() => {
		initModal();
	}, [initModal]);

	useEffect(() => {
		if (loading) {
			getAppointments();
		}
	}, [getAppointments, loading]);

	const closeModal = room => {
		setShowModal(false);
		if (room) {
			setActiveRoom(room);
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							{activeRoom && (
								<div className="element-actions">
									<h6>
										Active Room:{' '}
										<span className="text-success">{activeRoom.name}</span>
									</h6>
								</div>
							)}
							<h6 className="element-header">Overview </h6>
							<div className="element-content">
								<div className="row">
									<div className="col-sm-3 col-xxxl-3">
										<a className="element-box el-tablo" href="#">
											<div className="label">Appointments Today</div>
											<div className="value">15</div>
											<div className="trending">
												<span>Patients</span>
											</div>
										</a>
									</div>
									<div className="col-sm-3 col-xxxl-3">
										<a className="element-box el-tablo" href="#">
											<div className="label">Appointments Seen</div>
											<div className="value">4</div>
											<div className="trending">
												<span>Patients</span>
											</div>
										</a>
									</div>
									<div className="col-sm-3 col-xxxl-3">
										<a className="element-box el-tablo" href="#">
											<div className="label">Pending Appointments</div>
											<div className="value">8</div>
											<div className="trending">
												<span>Patients</span>
											</div>
										</a>
									</div>
									<div className="col-sm-3 col-xxxl-3">
										<a className="element-box el-tablo" href="#">
											<div className="label">Total Appointments</div>
											<div className="value">8</div>
											<div className="trending">
												<span>Patients</span>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">Today's Appointments</h6>
							<div className="element-box-tp">
								<div className="table-responsive">
									<AppointmentTable
										appointments={appointments}
										loading={loading}
										today={true}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && <SelectRoomModal setCloseModal={closeModal} />}
		</div>
	);
}
const mapStateToProps = state => {
	return {
		profile: state.user.profile,
	};
};

export default withRouter(
	connect(mapStateToProps, { viewAppointmentDetail, toggleProfile })(DoctorHome)
);
