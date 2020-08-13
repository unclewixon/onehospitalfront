import React from 'react';
import searchingGIF from '../../assets/images/searching.gif';
import { formatDateStr, trimText } from '../../services/utilities';
import { connect } from 'react-redux';
import { openEncounter, viewAppointmentDetail } from '../../actions/general';
import { toggleProfile } from '../../actions/user';
import Tooltip from 'antd/lib/tooltip';

const AppointmentTable = ({
	appointments,
	today,
	loading,
	viewAppointmentDetail,
	toggleProfile,
	openEncounter,
}) => {
	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		toggleProfile(true, info);
	};

	const doOpenEncounter = (appointmentId, patient) => {
		openEncounter(true, { appointmentId, patient });
	};

	return (
		<table className="table table-padded">
			<thead>
				<tr>
					<th hidden={today}>Date</th>
					<th>Patient</th>
					<th>Description</th>
					<th>Status</th>
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
				) : appointments && appointments.length ? (
					appointments.map((appointment, i) => {
						return (
							<tr key={i}>
								<td className="nowrap" hidden={today}>
									{formatDateStr(appointment.createdAt, 'DD-MM-YYYY')}
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
									{/* <span className="status-pill smaller green"></span> */}
									<span style={{ fontSize: '0.7rem' }}>
										{appointment.status}
									</span>
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
									{/*{appointment.status === 'With Doctor' &&*/}
									<Tooltip title="Start Consultation">
										<a
											href="javascript:;"
											onClick={() =>
												doOpenEncounter(appointment.id, appointment?.patient)
											}>
											<i className="os-icon os-icon-edit-1" />
										</a>
									</Tooltip>
									{/*}*/}
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
