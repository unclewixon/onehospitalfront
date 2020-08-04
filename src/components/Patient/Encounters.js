import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

import { openEncounter } from '../../actions/general';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import FrontDeskTable from '../FrontDesk/FrontDeskTable';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';

class Encounters extends Component {
	state = {
		appointments: [],
		loading: false,
		canView: false,
	};
	doOpenEncounter = appointment => {
		console.log(appointment);
		this.props.openEncounter(true, appointment.id);
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(`front-desk/appointments/today`, 'GET', true);

			const { patient } = this.props;
			const appointments = rs
				.filter(key => patient.id === key.patient.id)
				.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
			var enc = [];
			const asyncRes = await Promise.all(
				appointments.map(async value => {
					var stat = await this.getViewStatus(value);
					value.stat = stat;
					return value;
				})
			);

			console.log(enc);
			console.log(asyncRes);
			//console.log(result);

			this.setState({ loading: false, appointments });
		} catch (error) {
			console.log(error);
		}
	};

	getViewStatus = async appointment => {
		try {
			const rs = await request(
				`consultation/appointment/` + appointment.id,
				'GET',
				true
			);
			console.log(rs);
			return !!rs;
		} catch (error) {
			return false;
		}
	};

	doOpenPreEncounter = () => {
		console.log('print pre encounter');
	};

	doViewEncounter = () => {
		console.log('view encounter');
	};

	doPrint = () => {
		console.log('print encounter');
	};

	doCancel = () => {
		console.log('cancel encounter');
	};

	render() {
		const { appointments, loading, canView } = this.state;
		return (
			<>
				<div className="row">
					<div className="col-sm-12">
						<div className="element-box-tp">
							<div className="table-responsive">
								<table className="table table-padded">
									<thead>
										<tr>
											<th>Date</th>
											<th>Patient</th>
											<th>Whom to see</th>
											<th>Consulting Room</th>
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
										) : appointments.length > 0 ? (
											appointments.map((appointment, i) => {
												return (
													<tr key={i}>
														<td className="nowrap">
															{moment(appointment.createdAt).format(
																'DD-MM-YYYY'
															)}
														</td>
														<td>
															<span className="smaller lighter">
																{appointment.patient?.fileNumber}
															</span>
															<br />
															<span>{`${appointment.patient.surname} (${appointment.patient.other_names})`}</span>
														</td>

														<td className="cell-with-media">
															<span>
																{`${appointment.specialization?.name} (${appointment.department?.name})`}
															</span>
														</td>

														<td className="cell-with-media">
															<span>{appointment.consultingRoom?.name}</span>
														</td>

														<td>
															{/* <span className="status-pill smaller green"></span> */}
															<span>{appointment.status}</span>
														</td>
														<td className="row-actions">
															<DropdownButton
																id="dropdown-basic-button"
																title="Action"
																size="sm">
																<Dropdown.Item
																	disabled={appointment.stat}
																	onClick={() =>
																		this.doOpenEncounter(appointment)
																	}>
																	Chart
																</Dropdown.Item>
																<Dropdown.Item
																	onClick={this.doOpenPreEncounter}>
																	Pre-Encounter
																</Dropdown.Item>
																<Dropdown.Item onClick={this.doViewEncounter}>
																	View Details
																</Dropdown.Item>
																<Dropdown.Item onClick={this.doPrint}>
																	Print
																</Dropdown.Item>
																<Dropdown.Item onClick={this.doCancel}>
																	Cancel
																</Dropdown.Item>
															</DropdownButton>
														</td>
													</tr>
												);
											})
										) : (
											<tr colSpan="4" className="text-center">
												<td>No Appointments</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		encounters: state.patient.encounters,
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { openEncounter })(Encounters)
);
