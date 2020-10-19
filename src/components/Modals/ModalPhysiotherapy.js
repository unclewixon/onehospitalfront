import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const ModalPhysiotherapy = ({
	showModal,
	onModalClick,
	patient,
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
												{activeRequest.patient_name
													? activeRequest.patient_name
													: ''}
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
																<div className="text-left">Request Date</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{moment(activeRequest.createdAt).format(
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
													Physiotherapy Appointment
												</h5>
											</div>
										</div>
									</div>

									<table className="table table-padded">
										<thead>
											<tr>
												<th className="font-weight-bold">Specialization</th>
												<th className="font-weight-bold">Session Count</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													{activeRequest.requestBody &&
													activeRequest.requestBody.length
														? activeRequest.requestBody.map((spec, i) => (
																<div key={i}>{spec.specialization}</div>
														  ))
														: []}
												</td>
												<td>
													{activeRequest &&
													activeRequest.requestBody &&
													activeRequest.requestBody.length
														? activeRequest.requestBody.map((body, i) => (
																<div key={i}>{body.sessionCount}</div>
														  ))
														: ''}
												</td>
											</tr>

											<tr>
												<td className="font-weight-bold">Created By</td>
												<td>{activeRequest.created_by}</td>
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

export default ModalPhysiotherapy;
