/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import searchingGIF from '../../assets/images/searching.gif';
import {
	confirmAction,
	formatDateStr,
	request,
	trimText,
} from '../../services/utilities';
import { connect } from 'react-redux';
import { openEncounter, viewAppointmentDetail } from '../../actions/general';
import { toggleProfile } from '../../actions/user';
import Tooltip from 'antd/lib/tooltip';
import Button from '../common/Button';
import { notifyError, notifySuccess } from '../../services/notify';
// import { Badge } from '../common';

const AppointmentTable = ({
	appointments,
	today,
	loading,
	viewAppointmentDetail,
	toggleProfile,
	openEncounter,
}) => {
	const [updating, setUpdating] = useState(null);

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		toggleProfile(true, info);
	};

	const doOpenEncounter = (appointmentId, patient) => {
		openEncounter(true, { appointmentId, patient });
	};

	const updateStatus = async ({ id, action }) => {
		try {
			setUpdating(id);
			const data = { appointmentId: id, action };
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

	return (
		<table className="table table-padded">
			<thead>
				<tr>
					<th hidden={today}>Date</th>
					<th>Patient</th>
					<th>Description</th>
					<th>Accepted</th>
					<th className="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<tr>
						<td colSpan="5" className="text-center">
							<img alt="searching" src={searchingGIF} />
						</td>
					</tr>
				) : appointments.length > 0 ? (
					appointments.map((appointment, i) => {
						console.log(appointment);
						return (
							<tr key={i}>
								<td className="nowrap" hidden={today}>
									{formatDateStr(appointment.createdAt, 'DD-MMM-YYYY')}
								</td>
								<td>
									{`${appointment?.patient?.surname} ${appointment?.patient?.other_names}`}
								</td>

								<td className="cell-with-media">
									<span style={{ fontSize: '0.7rem' }}>
										{trimText(appointment.description, 150)}
									</span>
								</td>
								<td>
									{appointment.doctorStatus === 0 ? (
										<Button
											isSubmitting={updating && updating === appointment.id}
											isValid={!updating}
											onClick={() => confirm({ id: appointment.id, action: 1 })}
											className="btn btn-sm btn-success"
											value="Accept"
										/>
									) : (
										!appointment.encounter && (
											<Button
												onClick={() =>
													doOpenEncounter(appointment.id, appointment?.patient)
												}
												className="btn btn-sm btn-info"
												value="Start Encounter"
											/>
										)
									)}
								</td>
								<td className="row-actions">
									<Tooltip title="View Appointment Details">
										<a
											href="#"
											onClick={() => viewAppointmentDetail(appointment)}>
											<i className="os-icon os-icon-folder" />
										</a>
									</Tooltip>
									<Tooltip title="Patient Profile">
										<a
											href="#"
											onClick={() => showProfile(appointment?.patient)}>
											<i className="os-icon os-icon-user" />
										</a>
									</Tooltip>
								</td>
							</tr>
						);
					})
				) : (
					<tr className="text-center">
						<td colSpan="5">No Appointments</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
export default connect(null, {
	viewAppointmentDetail,
	toggleProfile,
	openEncounter,
})(AppointmentTable);
