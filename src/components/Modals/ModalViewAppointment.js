/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import Select from 'react-select';
import { paymentTypeExtra } from '../../services/constants';

class ModalViewAppointment extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { view_appointment_detail } = this.props;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content text-center">
						<div className="modal-header smaller">
							<button
								aria-label="Close"
								className="close"
								type="button"
								onClick={() => this.props.closeModals(false)}>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>

						<div className="onboarding-content with-gradient">
							<div className="modal-body">
								<div className="row">
									<div className="col-sm-4">
										<div className="user-profile compact">
											<div
												className="up-head-w"
												style={{
													backgroundImage: require('../../assets/images/b3.jpeg'),
												}}>
												<div className="up-main-info">
													<h2
														className="up-header"
														style={{ color: '#334152' }}>
														{view_appointment_detail.patient.surname}{' '}
														{view_appointment_detail.patient.other_names}
													</h2>
												</div>
											</div>

											<div className="up-contents">
												<div className="m-b">
													<div className="element-box-tp">
														<table className="table table-clean">
															<tbody>
																<tr>
																	<td>
																		<div className="text-left">
																			Date of Birth
																		</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{
																				view_appointment_detail.patient
																					.date_of_birth
																			}
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div className="text-left">Gender</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{view_appointment_detail.patient.gender}
																		</div>
																	</td>
																</tr>

																<tr>
																	<td>
																		<div className="text-left">
																			Insurance status
																		</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{
																				view_appointment_detail.patient
																					.insurranceStatus
																			}
																		</div>
																	</td>
																</tr>

																<tr>
																	<td>
																		<div className="text-left">File Number</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{
																				view_appointment_detail.patient
																					.fileNumber
																			}
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="element-wrapper">
											<div className="element-info">
												<div className="element-info-with-icon">
													<div className="element-info-icon">
														<div className="os-icon os-icon-wallet-loaded"></div>
													</div>
													<div className="element-info-text">
														<h5 className="element-inner-header">
															Appointment Detail
														</h5>
														{/*appointment_date*/}
														{/*department.name*/}
														{/*consultingRoom.name*/}
														{/*specialization.name*/}
														{/*department.staff.first_name*/}
													</div>
												</div>
											</div>
											<table className="table table-padded">
												<tbody>
													<tr>
														<td className="font-weight-bold">
															Appointment Date
														</td>
														<td>{view_appointment_detail.appointment_date}</td>
													</tr>

													<tr>
														<td className="font-weight-bold">Department</td>
														<td>{view_appointment_detail.department.name}</td>
													</tr>
													<tr>
														<td className="font-weight-bold">Specialization</td>
														<td>
															{view_appointment_detail.specialization.name}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold">Whom to See</td>
														<td>
															{
																view_appointment_detail.department?.staff
																	?.first_name
															}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold">
															Consultation Room
														</td>
														<td>
															{view_appointment_detail.consultingRoom.name}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		view_appointment_detail: state.general.view_appointment_detail,
	};
};
export default connect(mapStateToProps, { closeModals })(ModalViewAppointment);
