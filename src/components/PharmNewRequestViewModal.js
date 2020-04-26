import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const PharmNewRequestViewModal = ({
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
											backgroundImage: require('../assets/images/b3.jpeg'),
										}}>
										<div className="up-main-info">
											<h2
												className="up-header"
												style={{ color: '#334152' }}>
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
																<div className="text-left">
																	Request Date
																		</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{moment(activeRequest.createdAt).format(
																		'DD/MM/YYYY'
																	)}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">
																	Created By
																		</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest.created_by}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">
																	Request Type
																		</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest.requestType}
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
													Pharmacy Request
												</h5>
											</div>
										</div>
									</div>
										{
											activeRequest.requestBody
												&& activeRequest.requestBody.length
												? activeRequest.requestBody.map((req, index) => (
													<div key={index} className="border border-primary rounded-sm p-3">
														<div>
															<table className="table ">
																<thead>
																	<tr>
																		<th class="font-weight-bold">Drug Generic Name</th>
																		<th class="font-weight-bold">Drug Name</th>
																		<th class="font-weight-bold">Forumalary</th>
																		<th class="font-weight-bold">Dosage</th>
																	</tr>
																</thead>
																<tbody >
																	<tr>
																		<td>{req.drug_generic_name}</td>
																		<td>{req.drug_name}</td>
																		<td>{req.forumalary}</td>
																		<td>{req.dose_quantity}</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div>
															<table className="table table-paded">
																<thead>
																	<tr>
																		<th class="font-weight-bold">Number of Refills</th>
																		<th class="font-weight-bold">Duration</th>
																		<th class="font-weight-bold">Frequency Type</th>
																		<th class="font-weight-bold">EG</th>
																		<th class="font-weight-bold">Refill Note</th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td>{req.refillable ? req.number_of_refills : ''}</td>
																		<td>{req.refillable ? req.refillable.duration : ''}</td>
																		<td>{req.refillable ? req.refillable.frequency_type : ''}</td>
																		<td>{req.refillable ? req.refillable.eg : ''}</td>
																		<td>{req.refillable ? req.refillable.note : ''}</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												)) : []
										}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};


export default PharmNewRequestViewModal;
