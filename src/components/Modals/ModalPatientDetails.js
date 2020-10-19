import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalPatientDetails = ({ showModal, onModalClick, activeRequest }) => {
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
											<h2
												className="up-header"
												style={{
													color: '#334152',
												}}>{`${activeRequest?.surname} ${activeRequest?.other_names}`}</h2>
										</div>
									</div>
									<div className="up-contents">
										<div className="m-b">
											<div className="element-box-tp">
												<table className="table table-clean">
													<tbody>
														<tr>
															<td>
																<div className="text-left">File Number</div>
															</td>
															<td className="text-right">
																{activeRequest?.fileNumber}
																<div className="value text-success"></div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">Phone</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest?.phoneNumber}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">Adress</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest?.address}
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
													Patient Details
												</h5>
											</div>
										</div>
									</div>
									<table className="table table-padded">
										<tbody>
											<tr>
												<td className="font-weight-bold">Insurance Status</td>
												<td>{activeRequest?.insurranceStatus}</td>
											</tr>
											<tr>
												<td className="font-weight-bold">Number of Visits</td>
												<td>{activeRequest?.noOfVisits}</td>
											</tr>
											<tr>
												<td className="font-weight-bold">Ethnicity</td>
												<td>{activeRequest?.ethnicity}</td>
											</tr>
											<tr>
												<td className="font-weight-bold">Gender</td>
												<td>{activeRequest?.gender}</td>
											</tr>
											<tr>
												<td className="font-weight-bold">Occupation</td>
												<td>{activeRequest?.occupation}</td>
											</tr>
											<tr>
												<td className="font-weight-bold">Date of Birth</td>
												<td>{activeRequest?.date_of_birth}</td>
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

export default ModalPatientDetails;
