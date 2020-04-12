import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';

const ModalClinicalLab = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	const [Loading, setLoading] = useState(false);

	console.log(activeRequest)

	return (
		<Modal
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Enter Lab Result
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="p-4 bg-light border-2">
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Patient Name: </span>
								{activeRequest.patient_name ? activeRequest.patient_name : ''}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<span>Patient ID: </span>
								{'No yet available'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Specimen: </span>
								{activeRequest.requestBody.refferredSpecimen}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<span>Request Date: </span>
								{moment(activeRequest.createdAt).format('DD/MM/YYYY hh:mm')}
							</p>
						</div>
					</div>
				</div>
				<div className="mt-4 p-4 bg-light border-2">
					<div>
						<h6>GROUPS</h6>
					</div>
					{activeRequest &&
						activeRequest.requestBody &&
						activeRequest.requestBody.groups &&
						activeRequest.requestBody.groups.map(grp => (
							<div>
								<div>
									<div className="ml-4">
										<p>
											<span>Group Name: </span>
											{grp.name}
										</p>
									</div>
									{/* {grp.tests &&
										grp.tests.map(test => (
											<div className="ml-2 p-4 bg-white border-2">
												<p >{test.name}</p>
												<Table className="table bordered">
													<thead>
														<tr>
															<th>Param Name</th>
															<th>Range</th>
															<th>Result</th>
														</tr>
													</thead>
													<tbody>
														{
															test.parameters && test.parameters.map(param => (
																<tr>
																	<td>
																		{param.name}
																	</td>
																	<td>
																		{param.refferedRange}
																	</td>
																	<td>
																		<input
																			type="text"
																			name="groupTestResult"
																			id={param.id}
																			value=""
																			onChange
																		/>
																	</td>
																</tr>
															))
														}
													</tbody>
												</Table>
											</div>
										))} */}
									{grp.parameters && grp.parameters.length ? (
										<div>
											<div className="ml-4">
												<p>
													<span>Parameters: </span>
												</p>
											</div>
											<div className="ml-2 p-4 bg-white border-2">
												<Table className="table bordered">
													<thead>
														<tr>
															<th>Param Name</th>
															<th>Range</th>
															<th>Result</th>
														</tr>
													</thead>
													<tbody>
														{
															grp.parameters.map(param => (
																<tr>
																	<td>{param.name}</td>
																	<td>{param.range}</td>
																	<td>
																		<input
																			type="text"
																			name="groupParameterResult"
																			id={param.id}
																			onChange
																		/>
																	</td>
																</tr>
															))
														}
													</tbody>
												</Table>
											</div>
										</div>
									) : null
									}
								</div>
							</div>
						))
					}
				</div>
				<div className="mt-4 p-4 bg-light border-2">
					<div>
						<h6>TESTS</h6>
					</div>
					{activeRequest &&
						activeRequest.requestBody &&
						activeRequest.requestBody.tests &&
						activeRequest.requestBody.tests.map(tst => (
							<div>
								<div className="ml-4">
									<p>
										<span>Test Name: </span>
										{tst.testName}
									</p>
								</div>
								<div className="ml-4">
									<p>Parameters: </p>
								</div>
								{
									tst.paramenters && tst.paramenters.length ? (
										<div className="ml-2 p-4 bg-white border-2">
											<Table className="table bordered">
												<thead>
													<tr>
														<th>Param Name</th>
														<th>Range</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													{tst.paramenters &&
														tst.paramenters.map(param => (
															<tr>
																<td>{param.name}</td>
																<td>{param.range}</td>
																<td>
																	<input
																		type="text"
																		name="parameterResult"
																		id={param.id}
																		onChange
																	/>
																</td>
															</tr>
														))}
												</tbody>
											</Table>
										</div>
									) : null
								}

							</div>
						))}
				</div>
				<div>
				<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> Save</span>
										)}
									</button>
				</div>
			</Modal.Body>
		</Modal>
	)
}
export default ModalClinicalLab;
