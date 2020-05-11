import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const ModalExcuseDuty = ({
	showModal,
	onModalClick,
	staff,
	activeRequest,
}) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div className="onboarding-content with-gradient text-center">
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
											<h2 className="up-header" style={{ color: '#334152' }}>
												{activeRequest && activeRequest.staff ? `${activeRequest.staff.first_name} ${activeRequest.staff.last_name} ${activeRequest.staff.other_names}` : ''}
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
																<div className="text-left">Job Title</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest && activeRequest.staff ? activeRequest.staff.job_title : ''}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">Start Date</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{moment(activeRequest.start_date).format(
																		'DD/MM/YYYY'
																	)}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">End Date</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{moment(activeRequest.end_date).format(
																		'DD/MM/YYYY'
																	)}
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
									<form id="formValidate" novalidate="true"></form>
									<div className="element-info">
										<div className="element-info-with-icon">
											<div className="element-info-icon">
												<div className="os-icon os-icon-wallet-loaded"></div>
											</div>
											<div className="element-info-text">
												<h5 className="element-inner-header">
													Staff Excuse Duty
												</h5>
											</div>
										</div>
									</div>
									<table className="table table-padded">
										<tbody>
											<tr>
												<td class="font-weight-bold">Consulting Doctor</td>
												<td>
													{
														activeRequest &&
															activeRequest.appliedBy ?
															`${activeRequest.appliedBy.first_name} ${activeRequest.appliedBy.last_name} ${activeRequest.appliedBy.other_names}`
															: ""
													}
												</td>
											</tr>
											<tr>
												<td class="font-weight-bold">Diagnosis</td>
												<td>{activeRequest.diagnosis ? activeRequest.diagnosis.description : ''}</td>
											</tr>
											<tr>
												<td class="font-weight-bold">Doctor's Note</td>
												<td>{activeRequest.application}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalExcuseDuty;
