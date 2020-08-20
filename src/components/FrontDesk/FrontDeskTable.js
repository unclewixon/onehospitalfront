/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewAppointmentDetail } from '../../actions/general';
import { fullname } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { toggleProfile } from '../../actions/user';

class FrontDeskTable extends Component {
	ViewAppointmentDetail = appointment => {
		this.props.viewAppointmentDetail(appointment);
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { appointments, loading, today } = this.props;

		return (
			<table className="table table-padded">
				<thead>
					<tr>
						<th hidden={today}>Date</th>
						<th>Patient</th>
						<th>Whom to see</th>
						<th>C.R</th>
						<th>Status</th>
						<th className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan="6" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</td>
						</tr>
					) : appointments && appointments.length ? (
						appointments.map((appointment, i) => {
							return (
								<tr key={i}>
									<td className="nowrap" hidden={today}>
										{moment(appointment.createdAt).format('DD-MM-YYYY')}
									</td>
									<td>
										<span
											className="smaller lighter"
											style={{ fontSize: '0.7rem' }}>
											{appointment.patient?.fileNumber}
										</span>
										<br />
										<span
											style={{
												fontSize: '0.7rem',
											}}>{`${appointment.patient.surname} ${appointment.patient.other_names}`}</span>
									</td>

									<td className="cell-with-media">
										<span style={{ fontSize: '0.7rem' }}>
											{`${fullname(appointment?.whomToSee)}`}
										</span>
									</td>

									<td className="cell-with-media">
										<span style={{ fontSize: '0.7rem' }}>
											{appointment.consultingRoom?.name}
										</span>
									</td>

									<td>
										{/* <span className="status-pill smaller green"></span> */}
										<span style={{ fontSize: '0.7rem' }}>
											{appointment.status}
										</span>
									</td>
									<td className="row-actions">
										<a
											href="#"
											onClick={() => this.ViewAppointmentDetail(appointment)}>
											<i className="os-icon os-icon-folder"></i>
										</a>
										<a
											href="#"
											onClick={() => this.showProfile(appointment.patient)}>
											<i className="os-icon os-icon-user"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
							);
						})
					) : (
						<tr className="text-center">
							<td colSpan="6">No Appointments</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}

export default connect(null, { viewAppointmentDetail, toggleProfile })(
	FrontDeskTable
);
