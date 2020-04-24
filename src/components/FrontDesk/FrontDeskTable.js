/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import {
	editInventory,
	updateQuantity,
	viewAppointmentDetail,
} from '../../actions/general';
import { formatCurrency, request } from '../../services/utilities';
import BootstrapTable from 'react-bootstrap-table-next';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { API_URI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { toggleProfile } from '../../actions/user';

class FrontDeskTable extends Component {
	ViewAppointmentDetail = appointment => {
		console.log(appointment);
		this.props.viewAppointmentDetail(appointment);
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { appointments, loading } = this.props;

		return (
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
					))
				)}
			</tbody>
		);
	}
}

export default connect(null, { viewAppointmentDetail, toggleProfile })(
	FrontDeskTable
);
