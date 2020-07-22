import React from 'react';
import Modal from 'react-modal';

const QueueOverlay = ({ isOpen, handleClose, data }) => {
	return (
		<Modal
			ariaHideApp={false}
			className="slide-pane slide-pane_from_right"
			style={{
				content: { width: '96%' },
			}}
			overlayClassName="slide-pane__overlay"
			closeTimeoutMS={500}
			isOpen={isOpen}
			shouldCloseOnEsc={true}
			contentLabel="Title"
			shouldCloseOnOverlayClick={true}>
			<div className="slide-pane__content">
				<div className="content-i">
					<div className="content-box">
						<div className="row">
							<button
								aria-label="Close"
								className="close"
								type="button"
								onClick={handleClose}>
								<span className="os-icon os-icon-close"></span>
							</button>
							<div className="col-md-12">
								<div className="support-index">
									<div className="support-ticket-content-w force-show-folded-info">
										<div className="support-ticket-content">
											<div className="support-ticket-content-header">
												<h4 className="ticket-header">Appointment Details</h4>
											</div>

											<div className="onboarding-content with-gradient">
												<div className="modal-body">
													<div className="row">
														<div className="col-sm-4">
															<div className="user-profile compact">
																<div
																	className="up-head-w"
																	style={{
																		backgroundImage: require('../assets/images/b3.jpeg'),
																	}}>
																	<div className="up-main-info">
																		<h2
																			className="up-header"
																			style={{ color: '#334152' }}>
																			{data?.patientName}
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
																									data?.appointment?.patient
																										?.date_of_birth
																								}
																							</div>
																						</td>
																					</tr>
																					<tr>
																						<td>
																							<div className="text-left">
																								Gender
																							</div>
																						</td>
																						<td className="text-right">
																							<div className="value text-success">
																								{
																									data?.appointment?.patient
																										?.gender
																								}
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
																									data?.appointment?.patient
																										?.insurranceStatus
																								}
																							</div>
																						</td>
																					</tr>

																					<tr>
																						<td>
																							<div className="text-left">
																								File Number
																							</div>
																						</td>
																						<td className="text-right">
																							<div className="value text-success">
																								{
																									data?.appointment?.patient
																										?.fileNumber
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
																			<td>
																				{data?.appointment?.appointment_date}
																			</td>
																		</tr>

																		<tr>
																			<td className="font-weight-bold">
																				Department
																			</td>
																			<td>
																				{data?.appointment?.department?.name}
																			</td>
																		</tr>
																		<tr>
																			<td className="font-weight-bold">
																				Specialization
																			</td>
																			<td>
																				{
																					data?.appointment?.specialization
																						?.name
																				}
																			</td>
																		</tr>
																		{data?.appointment?.department?.staff ? (
																			<tr>
																				<td className="font-weight-bold">
																					Whom to See
																				</td>
																				<td>
																					{data?.appointment?.department?.staff}
																				</td>
																			</tr>
																		) : null}
																		{data?.appointment?.consultingRoom?.name ? (
																			<tr>
																				<td className="font-weight-bold">
																					Consultation Room
																				</td>
																				<td>
																					{
																						data?.appointment?.consultingRoom
																							?.name
																					}
																				</td>
																			</tr>
																		) : null}

																		{data?.appointment?.referredBy ? (
																			<tr>
																				<td className="font-weight-bold">
																					Referred By
																				</td>
																				<td>{data?.appointment?.referredBy}</td>
																			</tr>
																		) : null}
																		{data?.appointment?.referralCompany ? (
																			<tr>
																				<td className="font-weight-bold">
																					Referral Company
																				</td>
																				<td>
																					{data?.appointment?.referralCompany}
																				</td>
																			</tr>
																		) : null}
																		{data?.appointment?.description ? (
																			<tr>
																				<td className="font-weight-bold">
																					Description
																				</td>
																				<td>
																					{data?.appointment?.description}
																				</td>
																			</tr>
																		) : null}
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										{/* <div
										className="support-ticket-info"
										style={{ position: 'relative' }}>
										<div className="customer text-capitalize">
											<div className="avatar" style={{ boxShadow: 'none' }}>
												<img alt="" src="" />
											</div>
											<h4 className="customer-name">
												{}
											</h4>
											<div className="customer-tickets">
												Patient Details
											</div>
										</div>

										<h5 className="info-header">A few Colleagues</h5>
										<div>profile data list</div>
									</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default QueueOverlay;
