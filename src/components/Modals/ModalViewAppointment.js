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
													backgroundImage: require('../../assets/images/profile_bg1.jpg'),
												}}>
												<div className="up-main-info">
													<h2 className="up-header">
														{view_appointment_detail.patient.surname}{' '}
														{view_appointment_detail.patient.other_names}
													</h2>
												</div>
											</div>

											<div className="up-contents">
												<div className="m-b">
													<div className="row m-b">
														<div className="col-sm-12 b-b">
															<div className="el-tablo centered padded-v">
																<div className="value">
																	{
																		view_appointment_detail.patient
																			.date_of_birth
																	}
																</div>
																<div className="label">Date of Birth</div>
															</div>
														</div>
													</div>

													<div className="padded">
														<div className="os-progress-bar primary">
															<div className="col-sm-12 b-b">
																<div className="el-tablo centered padded-v">
																	<div className="label">Gender</div>
																	<div className="value">
																		{view_appointment_detail.patient.gender}
																	</div>
																</div>
															</div>
														</div>

														<div className="os-progress-bar primary">
															<div className="col-sm-12 b-b">
																<div className="el-tablo centered padded-v">
																	<div className="label">Insurance Status</div>
																	<div className="value">
																		{
																			view_appointment_detail.patient
																				.insurranceStatus
																		}
																	</div>
																</div>
															</div>
														</div>
														<div className="os-progress-bar primary">
															<div className="col-sm-12 b-b">
																<div className="el-tablo centered padded-v">
																	<div className="label">File Number</div>
																	<div className="value">
																		{view_appointment_detail.patient.fileNumber}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="element-wrapper">
											<form id="formValidate" novalidate="true"></form>
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

											<div className="">
												<div className="row">
													<div className="col-sm">
														<div className="form-group">
															<label>Appointment Date</label>
															<span className="form-control">
																{view_appointment_detail.appointment_date}
															</span>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-sm">
														<div className="form-group">
															<label>Department</label>
															<span className="form-control">
																{view_appointment_detail.department.name}
															</span>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-sm">
														<div className="form-group">
															<label>Specialization</label>
															<span className="form-control">
																{view_appointment_detail.specialization.name}
															</span>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-sm">
														<div className="form-group">
															<label>Whom to See</label>
															<span className="form-control">
																{
																	view_appointment_detail.department.staff
																		.first_name
																}
															</span>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-sm">
														<div className="form-group">
															<label>Consulting Room</label>
															<span className="form-control">
																{view_appointment_detail.consultingRoom.name}
															</span>
														</div>
													</div>
												</div>
											</div>
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
