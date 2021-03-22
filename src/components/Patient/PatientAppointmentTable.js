/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { viewAppointmentDetail } from '../../actions/general';
import { fullname } from '../../services/utilities';
import moment from 'moment';
import TableLoading from '../TableLoading';

class PatientAppointmentTable extends Component {
	ViewAppointmentDetail = appointment => {
		this.props.viewAppointmentDetail(appointment);
	};

	render() {
		const { appointments, loading } = this.props;

		return loading ? (
			<TableLoading />
		) : (
			<table className="table table-responsive table-padded">
				<thead>
					<tr>
						<th>Date</th>
						<th>Whom to see</th>
						<th>C.R</th>
						<th>Status</th>
						<th className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment, i) => {
						return (
							<tr key={i}>
								<td className="nowrap">
									<span
										style={{
											fontSize: '0.7rem',
										}}>
										{moment(appointment.appointment_date).format('DD-MM-YYYY')}
									</span>
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
								</td>
							</tr>
						);
					})}
					{appointments && appointments.length === 0 && (
						<tr className="text-center">
							<td colSpan="7">No Appointments</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}

export default connect(null, { viewAppointmentDetail })(
	PatientAppointmentTable
);
