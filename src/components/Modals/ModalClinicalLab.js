import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';
import { useForm } from 'react-hook-form';

const ModalClinicalLab = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	const [Loading, setLoading] = useState(false);
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			parameterResult: "",
			groupParameterResult: "",
			groupTestResult: ""
		},
		mode: "onBlur"
	})

	const onSaveClick = values => {
		debugger
	}
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
											backgroundImage: require('../../assets/images/profile_bg1.jpg'),
										}}>
										<div className="up-main-info">
											<h2 className="up-header">
												{activeRequest.patient_name
													? activeRequest.patient_name
													: ''}
											</h2>
										</div>
									</div>

									<div className="up-contents">
										<div className="m-b">
											<div className="row m-b">
												<div className="col-sm-12 b-b">
													<div className="el-tablo centered padded-v">
														<div className="value">
															{moment(activeRequest.createdAt).format(
																'DD/MM/YYYY'
															)}
														</div>
														<div className="label">Request Date</div>
													</div>
												</div>
											</div>

											<div className="padded">

												<div className="os-progress-bar primary">
													<div className="col-sm-12 b-b">
														<div className="el-tablo centered padded-v">
															<div className="label">Request Specimen</div>
															<div className="value">
																{activeRequest.requestBody.refferredSpecimen}
															</div>
														</div>
													</div>
												</div>
												<div className="os-progress-bar primary">
													<div className="col-sm-12 b-b">
														<div className="el-tablo centered padded-v">
															<div className="label"></div>
															<div className="value">
																<p></p>
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
												<div className="os-icon os-icon-pen"></div>
											</div>
											<div className="element-info-text">
												<h5 className="element-inner-header">
													Enter Lab Result
												</h5>
												{/*appointment_date*/}
												{/*department.name*/}
												{/*consultingRoom.name*/}
												{/*specialization.name*/}
												{/*department.staff.first_name*/}
											</div>
										</div>
									</div>
									<form onSubmit={handleSubmit(onSaveClick)}>
										<div className="">
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Groups</label>
														<span className="form-control">
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.groups &&
																activeRequest.requestBody.groups.map((grp, i) => (
																	<div key={i}>
																		<div>
																			<div className="ml-4">
																				<p>
																					<span>Group Name: </span>
																					{grp.name}
																				</p>
																			</div>
																			{grp.tests &&
																				grp.tests.map(test => (
																					<div className="ml-2 p-4 bg-white border-2">
																						<p >{test.testName}</p>
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
																									test.paramenters && test.paramenters.map((param, i) => (
																										<tr key={i}>
																											<td>
																												{param.name}
																											</td>
																											<td>
																												{param.range}
																											</td>
																											<td>
																												<input
																													type="text"
																													name="groupTestResult"
																													id="groupTestResult"
																													ref={register({ required: true })}
																													onChange={e => setValue("groupTestResult", e.target.value)}
																												/>
																											</td>
																										</tr>
																									))
																								}
																							</tbody>
																						</Table>
																					</div>
																				))}
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
																								{grp.parameters.map((param, i) => (
																									<tr key={i}>
																										<td>{param.name}</td>
																										<td>{param.range}</td>
																										<td>
																											<input
																												type="text"
																												name="groupParameterResult"
																												ref={register({ required: true })}
																												onChange={e => setValue("groupParameterResult", e.target.value)}
																											/>
																										</td>
																									</tr>
																								))}
																							</tbody>
																						</Table>
																					</div>
																				</div>
																			) : null}
																		</div>
																	</div>
																))}
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.group &&
																activeRequest.requestBody.group.map((grp, i) => (
																	<div key={i}>
																		<div>
																			<div className="ml-4">
																				<p>
																					<span>Group Name: </span>
																					{grp.name}
																				</p>
																			</div>
																			{grp.tests &&
																				grp.tests.map(test => (
																					<div className="ml-2 p-4 bg-white border-2">
																						<p>{test.testName}</p>
																						<Table className="table bordered">
																							<thead>
																								<tr>
																									<th>Param Name</th>
																									<th>Range</th>
																									<th>Result</th>
																								</tr>
																							</thead>
																							<tbody>
																								{test.paramenters &&
																									test.paramenters.map((param, i) => (
																										<tr key={i}>
																											<td>{param.name}</td>
																											<td>{param.range}</td>
																											<td>
																												<input
																													type="text"
																													name="groupTestResult"
																													id="groupTestResult"
																													ref={register({ required: true })}
																													onChange={e => setValue("groupTestResult", e.target.value)}
																												/>
																											</td>
																										</tr>
																									))}
																							</tbody>
																						</Table>
																					</div>
																				))}
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
																								{grp.parameters.map((param, i) => (
																									<tr key={i}>
																										<td>{param.name}</td>
																										<td>{param.range}</td>
																										<td>
																											<input
																												type="text"
																												name="groupParameterResult"
																												ref={register({ required: true })}
																												onChange={e => setValue("groupParameterResult", e.target.value)}
																											/>
																										</td>
																									</tr>
																								))}
																							</tbody>
																						</Table>
																					</div>
																				</div>
																			) : null}
																		</div>
																	</div>
																))}
														</span>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Tests</label>
														<span className="form-control">
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.tests &&
																activeRequest.requestBody.tests.map((tst, i) => (
																	<div key={i}>
																		<div className="ml-4">
																			<p>
																				<span>Test Name: </span>
																				{tst.testName}
																			</p>
																		</div>
																		<div className="ml-4">
																			<p>Parameters: </p>
																		</div>
																		{tst.paramenters && tst.paramenters.length ? (
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
																							tst.paramenters.map((param, i) => (
																								<tr key={i}>
																									<td>{param.name}</td>
																									<td>{param.range}</td>
																									<td>
																										<input
																											type="text"
																											name="parameterResult"
																											ref={register({ required: true })}
																											onChange={e => setValue("parameterResult", e.target.value)}
																										/>
																									</td>
																								</tr>
																							))}
																					</tbody>
																				</Table>
																			</div>
																		) : null}
																	</div>
																))}
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.test &&
																activeRequest.requestBody.test.map((tst, i) => (
																	<div key={i}>
																		<div className="ml-4">
																			<p>
																				<span>Test Name: </span>
																				{tst.testName}
																			</p>
																		</div>
																		<div className="ml-4">
																			<p>Parameters: </p>
																		</div>
																		{tst.paramenters && tst.paramenters.length ? (
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
																							tst.paramenters.map((param, i) => (
																								<tr key={i}>
																									<td>{param.name}</td>
																									<td>{param.range}</td>
																									<td>
																										<input
																											type="text"
																											name="parameterResult"
																											ref={register({ required: true })}
																											onChange={e => setValue("parameterResult", e.target.value)}
																										/>
																									</td>
																								</tr>
																							))}
																					</tbody>
																				</Table>
																			</div>
																		) : null}
																	</div>
																))}
														</span>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Request Note</label>
														<span className="form-control">
															{activeRequest.requestBody.requestNote}
														</span>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<button
															className={
																Loading
																	? 'btn btn-primary disabled'
																	: 'btn btn-primary'
															}>
															{Loading ? (
																<img src={waiting} alt="submitting" />
															) : (
																	<span> Save</span>
																)}
														</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
export default ModalClinicalLab;
