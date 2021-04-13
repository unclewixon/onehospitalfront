/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';

import {
	confirmAction,
	formatDateStr,
	request,
	trimText,
	formatPatientId,
	hasPassed,
} from '../../services/utilities';
import { toggleProfile } from '../../actions/user';
import Button from '../common/Button';
import { notifyError, notifySuccess } from '../../services/notify';
import ProfilePopup from '../Patient/ProfilePopup';
import TableLoading from '../TableLoading';
import ModalViewAppointment from '../Modals/ModalViewAppointment';
import OpenEncounter from '../Patient/Modals/OpenEncounter';

const AppointmentTable = ({ appointments, loading }) => {
	const [updating, setUpdating] = useState(null);
	const [appointment, setAppointment] = useState(null);
	const [appointmentId, setAppointmentId] = useState(null);
	const [patient, setPatient] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [encounterModal, setEncounterModal] = useState(false);

	const profile = useSelector(state => state.user.profile);

	const dispatch = useDispatch();

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const startEncounter = (id, patient) => {
		document.body.classList.add('modal-open');
		setPatient(patient);
		setAppointmentId(id);
		setEncounterModal(true);
	};

	const updateStatus = async ({ id, action }) => {
		try {
			setUpdating(id);
			const staff = profile.details;
			const data = {
				appointmentId: id,
				action,
				doctor_id: staff.id,
				consulting_room_id: staff.room.id,
			};
			const url = 'front-desk/appointments/accept-decline';
			const res = await request(url, 'PATCH', true, data);
			setUpdating(null);
			if (res.success) {
				notifySuccess('Front desk has been notified');
			}
		} catch (e) {
			setUpdating(null);
			notifyError('Something went wrong. Unable to update appointment status');
		}
	};

	const confirm = data => {
		confirmAction(
			updateStatus,
			data,
			'You are about to accept an appointment',
			'Please confirm!'
		);
	};

	const viewAppointment = item => {
		document.body.classList.add('modal-open');
		setAppointment(item);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setEncounterModal(false);
		setAppointment(null);
		setPatient(null);
		setAppointmentId(null);
		document.body.classList.remove('modal-open');
	};

	return loading ? (
		<TableLoading />
	) : (
		<>
			<table className="table table-padded">
				<thead>
					<tr>
						<th>Date</th>
						<th>Patient</th>
						<th>Reason</th>
						<th>Accepted</th>
						<th className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment, i) => {
						return (
							<tr key={i}>
								<td className="nowrap">
									{formatDateStr(
										appointment.appointment_date,
										'DD-MMM-YYYY h:mm a'
									)}
								</td>
								<td>
									<p className="item-title text-color m-0">
										<Tooltip
											title={<ProfilePopup patient={appointment.patient} />}>
											<a
												className="cursor"
												onClick={() => showProfile(appointment.patient)}>
												{`${appointment.patient.surname} ${
													appointment.patient.other_names
												} (${formatPatientId(appointment.patient?.id)})`}
											</a>
										</Tooltip>
									</p>
								</td>

								<td>
									<p className="item-title text-color m-0">
										{trimText(appointment.description, 150)}
									</p>
								</td>
								{profile.details.room ? (
									<td>
										{appointment.doctorStatus === 0 ? (
											<Button
												isSubmitting={updating && updating === appointment.id}
												isValid={!updating}
												onClick={() =>
													confirm({ id: appointment.id, action: 1 })
												}
												className="btn btn-sm btn-success"
												value="Accept"
											/>
										) : !appointment.encounter &&
										  appointment.status !== 'Cancelled' &&
										  !hasPassed(appointment.appointment_date) ? (
											<Button
												onClick={() =>
													startEncounter(appointment.id, appointment?.patient)
												}
												className="btn btn-sm btn-info"
												value="Start Encounter"
											/>
										) : (
											<span className="badge badge-danger">
												{hasPassed(appointment.appointment_date) &&
												!appointment.encounter
													? 'Missed'
													: 'Cancelled'}
											</span>
										)}
									</td>
								) : (
									<td>
										<Tooltip title="please select a consulting room">
											<a className="btn btn-primary text-white">Accept</a>
										</Tooltip>
									</td>
								)}
								<td className="row-actions">
									<Tooltip title="View Appointment Details">
										<a onClick={() => viewAppointment(appointment)}>
											<i className="os-icon os-icon-eye cursor" />
										</a>
									</Tooltip>
								</td>
							</tr>
						);
					})}
					{appointments.length === 0 && (
						<tr className="text-center">
							<td colSpan="5">No Appointments</td>
						</tr>
					)}
				</tbody>
			</table>
			{showModal && appointment && (
				<ModalViewAppointment
					appointment={appointment}
					closeModal={closeModal}
				/>
			)}
			{encounterModal && (
				<OpenEncounter
					patient={patient}
					appointment_id={appointmentId}
					closeModal={closeModal}
				/>
			)}
		</>
	);
};

export default AppointmentTable;
