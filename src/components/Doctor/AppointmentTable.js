/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
	confirmAction,
	formatDate,
	request,
	trimText,
	patientname,
	hasPassed,
} from '../../services/utilities';
import { toggleProfile } from '../../actions/user';
import Button from '../common/Button';
import { notifyError, notifySuccess } from '../../services/notify';
import ProfilePopup from '../Patient/ProfilePopup';
import TableLoading from '../TableLoading';
import ModalViewAppointment from '../Modals/ModalViewAppointment';
import OpenEncounter from '../Patient/Modals/OpenEncounter';
import NewAssessment from '../Antenatal/NewAssessment';
import { startBlock, stopBlock } from '../../actions/redux-block';

const AppointmentTable = ({
	appointments,
	loading,
	updateAppointment,
	history,
}) => {
	const [updating, setUpdating] = useState(null);
	const [appointment, setAppointment] = useState(null);
	const [appointmentId, setAppointmentId] = useState(null);
	const [patient, setPatient] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [encounterModal, setEncounterModal] = useState(false);
	const [assessmentModal, setAssessmentModal] = useState(false);
	const [antenatal, setAntenatal] = useState(null);

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

	const startAssessment = (id, patient, antenatal) => {
		document.body.classList.add('modal-open');
		setPatient(patient);
		setAntenatal(antenatal);
		setAppointmentId(id);
		setAssessmentModal(true);
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
			const url = 'front-desk/appointments/accept';
			const res = await request(url, 'PATCH', true, data);
			setUpdating(null);
			if (res.success) {
				updateAppointment(res.appointment);
				notifySuccess('Front desk has been notified!');
			} else {
				notifyError('Something went wrong. Cannot select patient');
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
		setAssessmentModal(false);
		setAppointment(null);
		setPatient(null);
		setAppointmentId(null);
		document.body.classList.remove('modal-open');
	};

	const blastPrompt = async id => {
		try {
			dispatch(startBlock());
			const url = `front-desk/appointments/${id}/repeat-prompt`;
			await request(url, 'GET', true);
			dispatch(stopBlock());
		} catch (e) {
			setUpdating(null);
			notifyError('Something went wrong');
			dispatch(stopBlock());
		}
	};

	return loading ? (
		<TableLoading />
	) : (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Date</th>
						<th>Patient</th>
						<th>Type</th>
						<th>Reason</th>
						<th>Accepted</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment, i) => {
						return (
							<tr key={i}>
								<td className="nowrap">
									{formatDate(
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
												{patientname(appointment.patient, true)}
											</a>
										</Tooltip>
									</p>
								</td>
								<td>{appointment.consultation_type || '--'}</td>
								<td>
									<p className="item-title text-color m-0">
										{trimText(appointment.description || '--', 150)}
									</p>
								</td>
								{profile.details.room ? (
									<td>
										{appointment.status === 'Completed' ? (
											<span className="badge badge-success">Completed</span>
										) : (
											<>
												{appointment.doctorStatus === 0 ? (
													<>
														{!appointment.encounter &&
														(appointment.status === 'Cancelled' ||
															hasPassed(appointment.appointment_date)) ? (
															<span className="badge badge-danger">
																{hasPassed(appointment.appointment_date)
																	? 'Missed'
																	: 'Cancelled'}
															</span>
														) : (
															<Button
																isSubmitting={
																	updating && updating === appointment.id
																}
																isValid={!updating}
																onClick={() =>
																	confirm({ id: appointment.id, action: 1 })
																}
																className="btn btn-sm btn-primary"
																value="Accept"
															/>
														)}
													</>
												) : (
													<>
														{!appointment.encounter &&
														(appointment.status === 'Cancelled' ||
															hasPassed(appointment.appointment_date)) ? (
															<span className="badge badge-danger">
																{hasPassed(appointment.appointment_date)
																	? 'Missed'
																	: 'Cancelled'}
															</span>
														) : (
															<>
																{appointment.encounter ? (
																	<span className="badge badge-success">
																		Completed
																	</span>
																) : (
																	<>
																		{appointment?.antenatal ? (
																			<button
																				onClick={() =>
																					startAssessment(
																						appointment.id,
																						appointment?.patient,
																						appointment.antenatal
																					)
																				}
																				className="btn btn-sm btn-info text-white">
																				Start Assessment
																			</button>
																		) : (
																			<button
																				onClick={() =>
																					startEncounter(
																						appointment.id,
																						appointment?.patient
																					)
																				}
																				className="btn btn-sm btn-info text-white">
																				Start Encounter
																			</button>
																		)}
																		<Tooltip title="Call Patient">
																			<a
																				onClick={() =>
																					blastPrompt(appointment.id)
																				}
																				className="btn text-primary ml-1">
																				<i className="os-icon os-icon-volume-2" />
																			</a>
																		</Tooltip>
																	</>
																)}
															</>
														)}
													</>
												)}
											</>
										)}
									</td>
								) : (
									<>
										{appointment.status === 'Completed' ? (
											<td>
												<span className="badge badge-success">Completed</span>
											</td>
										) : (
											<>
												{!appointment.encounter &&
												(appointment.status === 'Cancelled' ||
													hasPassed(appointment.appointment_date)) ? (
													<td>
														<span className="badge badge-danger">
															{hasPassed(appointment.appointment_date)
																? 'Missed'
																: 'Cancelled'}
														</span>
													</td>
												) : (
													<td>
														<Tooltip title="please select a consulting room">
															<button className="btn btn-sm btn-link">
																Accept
															</button>
														</Tooltip>
													</td>
												)}
											</>
										)}
									</>
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
					updateAppointment={updateAppointment}
				/>
			)}
			{assessmentModal && (
				<NewAssessment
					closeModal={closeModal}
					appointment_id={appointmentId}
					refreshAssessments={() => {
						history.push(`/antenatal#assessments`);
						const info = { patient, type: 'antenatal', item: antenatal };
						dispatch(toggleProfile(true, info));
					}}
					patient={patient}
					antenatal={antenatal}
				/>
			)}
		</>
	);
};

export default withRouter(AppointmentTable);
