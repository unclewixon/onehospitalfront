import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';
import Button from '../common/Button';
import { openEncounter } from '../../actions/general';
import { request, formatPatientId } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { notifyError, notifySuccess } from '../../services/notify';

class Encounters extends Component {
	state = {
		appointments: [],
		loading: false,
		canView: false,
	};

	doOpenEncounter = (appointment, patient) => {
		this.props.openEncounter(true, { appointmentId: appointment.id, patient });
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
			this.setState({ loading: false });
			notifyError('error fetching encounters');
		}
	};

	getViewStatus = async appointment => {
		try {
			const url = `consultation/appointment/${appointment.id}`;
			const rs = await request(url, 'GET', true);
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
		const { appointments, loading } = this.state;
		const { staff } = this.props;
		return (
			<div className="col-sm-12 col-xxl-6">
				<div className="element-wrapper">
					<h6 className="element-header">Encounters</h6>
					<div className="element-box p-3 m-0">
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>Date</th>
										<th>Patient</th>
										<th>Patient ID</th>
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
														{moment(appointment.createdAt).format('DD-MM-YYYY')}
													</td>
													<td>
														<span>{`${appointment.patient.surname} ${appointment.patient.other_names}`}</span>
													</td>
													<td>
														<span className="smaller lighter">
															{formatPatientId(appointment.patient?.id)}
														</span>
													</td>

													<td className="cell-with-media">
														<span>
															{`${appointment.whomToSee?.last_name} ${appointment.whomToSee?.first_name}`}
														</span>
													</td>

													<td className="cell-with-media">
														<span>{appointment.consultingRoom?.name}</span>
													</td>

													<td>
														{appointment.stat ? (
															<span className="badge badge-success">
																Consultation Completed
															</span>
														) : (
															<span className="badge badge-warning">
																Pending Consultation
															</span>
														)}
													</td>
													<td className="row-actions">
														{appointment.transaction?.status === 1 && (
															<DropdownButton
																id="dropdown-basic"
																title="Action"
																size="sm"
																key={appointment.id}>
																{!appointment.stat && (
																	<Dropdown.Item
																		onClick={() =>
																			this.doOpenEncounter(
																				appointment,
																				appointment.patient
																			)
																		}>
																		Chart
																	</Dropdown.Item>
																)}
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
														)}
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		encounters: state.patient.encounters,
		patient: state.user.patient,
		staff: state.user.profile.details,
	};
};

export default withRouter(
	connect(mapStateToProps, { openEncounter })(Encounters)
);
