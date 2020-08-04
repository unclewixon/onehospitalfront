import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from './../../services/notify';

const ModalClinicalLab = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	const [Loading, setLoading] = useState(false);

	const saveLabRequest = async (data, cb) => {
		try {
			const rs = await request(
				`${API_URI}/patient/fill-request`,
				'POST',
				true,
				data
			);
			cb();
			notifySuccess('Saved Lab Request');
		} catch (error) {
			cb();
			notifyError('Could not save request');
		}
	};

	const updateGroupTestResult = (e, p, t, g) => {
		activeRequest.requestBody.groups[g].tests[t].paramenters[p].result =
			e.target.value;
	};

	const updateGroupParamResult = (e, p, g) => {
		activeRequest.requestBody.groups[g].parameters[p].result = e.target.value;
	};

	const updateTestResult = (e, p, t) => {
		activeRequest.requestBody.tests[t].paramenters[p].result = e.target.value;
	};

	const onSaveClick = values => {
		let newRequestObj = {
			request_id: activeRequest.id,
			requestBody: activeRequest.requestBody,
		};
		saveLabRequest(newRequestObj, () => setLoading(false));
	};

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
														<tr>
															<td>
																<div className="text-left">
																	Request Specimen
																</div>
															</td>
															<td className="text-right">
																<div className="value text-success">
																	{activeRequest.requestBody.refferredSpecimen}
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div className="text-left">Request Note</div>
															</td>
															<td></td>
														</tr>
														<tr>
															<td className="text-justify">
																<div className="value text-success">
																	{activeRequest.requestBody.requestNote}
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
									<form id="formValidate" noValidate></form>
									<div className="element-info">
										<div className="element-info-with-icon">
											<div className="element-info-icon">
												<div className="os-icon os-icon-pen"></div>
											</div>
											<div className="element-info-text">
												<h5 className="element-inner-header">
													Enter Lab Result
												</h5>
											</div>
										</div>
									</div>

									<div className="">
										<div className="row">
											<div className="col-sm">
												{activeRequest.requestBody.groups ||
												activeRequest.requestBody.group ? (
													<div className="form-group">
														<label>Groups</label>
														<span className="form-control">
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.groups &&
																activeRequest.requestBody.groups.map(
																	(grp, gInex) => (
																		<div key={gInex}>
																			<div>
																				<div className="ml-4">
																					<p>
																						<span>Group Name: </span>
																						{grp.name}
																					</p>
																				</div>
																				{grp.tests &&
																					grp.tests.map((test, tInex) => (
																						<div className="ml-2 p-4 border-2">
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
																										test.paramenters.map(
																											(param, pInex) => (
																												<tr key={pInex}>
																													<td>{param.name}</td>
																													<td>{param.range}</td>
																													<td>
																														{param.result ===
																														'' ? (
																															<form>
																																<input
																																	name={`gtp${gInex}`}
																																	onChange={e =>
																																		updateGroupTestResult(
																																			e,
																																			pInex,
																																			tInex,
																																			gInex
																																		)
																																	}
																																/>
																															</form>
																														) : (
																															param.result
																														)}
																													</td>
																												</tr>
																											)
																										)}
																								</tbody>
																							</Table>
																						</div>
																					))}
																				{grp.parameters &&
																				grp.parameters.length ? (
																					<div>
																						<div className="ml-4">
																							<p>
																								<span>Parameters: </span>
																							</p>
																						</div>
																						<div className="ml-2 p-4 border-2">
																							<Table className="table bordered">
																								<thead>
																									<tr>
																										<th>Param Name</th>
																										<th>Range</th>
																										<th>Result</th>
																									</tr>
																								</thead>
																								<tbody>
																									{grp.parameters.map(
																										(param, pInex) => (
																											<tr key={pInex}>
																												<td>{param.name}</td>
																												<td>{param.range}</td>
																												<td>
																													{param.result ===
																													'' ? (
																														<form>
																															<input
																																name={`gp${gInex}${pInex}`}
																																onChange={e =>
																																	updateGroupParamResult(
																																		e,
																																		pInex,
																																		gInex
																																	)
																																}
																															/>
																														</form>
																													) : (
																														param.result
																													)}
																												</td>
																											</tr>
																										)
																									)}
																								</tbody>
																							</Table>
																						</div>
																					</div>
																				) : null}
																			</div>
																		</div>
																	)
																)}
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.group &&
																activeRequest.requestBody.group.map(
																	(grp, gInex) => (
																		<div key={gInex}>
																			<div>
																				<div className="ml-4">
																					<p>
																						<span>Group Name: </span>
																						{grp.name}
																					</p>
																				</div>
																				{grp.tests &&
																					grp.tests.map((test, tInex) => (
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
																										test.paramenters.map(
																											(param, pInex) => (
																												<tr key={pInex}>
																													<td>{param.name}</td>
																													<td>{param.range}</td>
																													<td>
																														{param.result ===
																														'' ? (
																															<form>
																																<input
																																	name={`gtp${gInex}${tInex}${pInex}`}
																																	onChange
																																/>
																															</form>
																														) : (
																															param.result
																														)}
																													</td>
																												</tr>
																											)
																										)}
																								</tbody>
																							</Table>
																						</div>
																					))}
																				{grp.parameters &&
																				grp.parameters.length ? (
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
																									{grp.parameters.map(
																										(param, pInex) => (
																											<tr key={pInex}>
																												<td>{param.name}</td>
																												<td>{param.range}</td>
																												<td>
																													{param.result ===
																													'' ? (
																														<form>
																															<input
																																name={`gp${gInex}${pInex}`}
																															/>
																														</form>
																													) : (
																														param.result
																													)}
																												</td>
																											</tr>
																										)
																									)}
																								</tbody>
																							</Table>
																						</div>
																					</div>
																				) : null}
																			</div>
																		</div>
																	)
																)}
														</span>
													</div>
												) : null}
											</div>
										</div>
										{activeRequest.requestBody.tests ||
										activeRequest.requestBody.test ? (
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Tests</label>
														<span className="form-control">
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.tests &&
																activeRequest.requestBody.tests.map(
																	(tst, tInex) => (
																		<div key={tInex}>
																			<div className="ml-4">
																				<p>
																					<span>Test Name: </span>
																					{tst.testName}
																				</p>
																			</div>
																			<div className="ml-4">
																				<p>Parameters: </p>
																			</div>
																			{tst.paramenters &&
																			tst.paramenters.length ? (
																				<div className="ml-2 p-4 border-2">
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
																								tst.paramenters.map(
																									(param, pInex) => (
																										<tr key={pInex}>
																											<td>{param.name}</td>
																											<td>{param.range}</td>
																											<td>
																												{param.result === '' ? (
																													<form>
																														<input
																															name={`tp${tInex}${pInex}`}
																															onChange={e =>
																																updateTestResult(
																																	e,
																																	pInex,
																																	tInex
																																)
																															}
																														/>
																													</form>
																												) : (
																													param.result
																												)}
																											</td>
																										</tr>
																									)
																								)}
																						</tbody>
																					</Table>
																				</div>
																			) : null}
																		</div>
																	)
																)}
															{activeRequest &&
																activeRequest.requestBody &&
																activeRequest.requestBody.test &&
																activeRequest.requestBody.test.map(
																	(tst, tInex) => (
																		<div key={tInex}>
																			<div className="ml-4">
																				<p>
																					<span>Test Name: </span>
																					{tst.testName}
																				</p>
																			</div>
																			<div className="ml-4">
																				<p>Parameters: </p>
																			</div>
																			{tst.paramenters &&
																			tst.paramenters.length ? (
																				<div className="ml-2 p-4 border-2">
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
																								tst.paramenters.map(
																									(param, pInex) => (
																										<tr key={pInex}>
																											<td>{param.name}</td>
																											<td>{param.range}</td>
																											<td>
																												{param.result === '' ? (
																													<form>
																														<input
																															name={`tp${tInex}${pInex}`}
																														/>
																													</form>
																												) : (
																													param.result
																												)}
																											</td>
																										</tr>
																									)
																								)}
																						</tbody>
																					</Table>
																				</div>
																			) : null}
																		</div>
																	)
																)}
														</span>
													</div>
												</div>
											</div>
										) : null}
										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													<button
														className={
															Loading
																? 'btn btn-primary disabled'
																: 'btn btn-primary'
														}
														onClick={onSaveClick}>
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
