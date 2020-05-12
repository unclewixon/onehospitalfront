import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from './../../services/notify';
import { useForm } from 'react-hook-form';

const ModalClinicalLab = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	const {register, handleSubmit, setValue} = useForm()
	const [Loading, setLoading] = useState(false);
	const [groupTestResult, setGroupTestResult] = useState({});
	const [groupTestParam, setGroupTestParam] = useState({});
	const [paramResult, setParamResult] = useState({});

	const saveLabRequest = async (data, cb) => {
		try {
			const rs = await request(
				`${API_URI}/patient/save-request`,
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

	const handleInputResultChange = (e, i) => {
		const { name, value } = e.target;
		let newGroupResultValue = { ...groupTestResult };
		let newGroupTestParam = { ...groupTestParam };
		let newParamResult = { ...paramResult };
		if (name === 'groupTestResult') {
			newGroupResultValue[i] = {
				result: value,
			};
		}
		if (name === 'groupTestParam') {
			newGroupTestParam[i] = {
				result: value,
			};
		}
		if (name === 'paramResult') {
			newParamResult[i] = {
				result: value,
			};
		}
		setGroupTestResult(newGroupResultValue);
		setGroupTestParam(newGroupTestParam);
		setParamResult(newParamResult);
	};

	const onSaveClick = values => {
		setLoading(true);
		let resultObj = {};
		let resultVals = Object.values(groupTestResult).length
			? Object.values(groupTestResult).map((val, i) => {
					resultObj[i] = { ...val };
			  })
			: [];
		let newParamObj = {};
		let groupParamVals = Object.values(groupTestParam).length
			? Object.values(groupTestParam).map((val, i) => {
					newParamObj[i] = { ...val };
			  })
			: [];
		let testParamObj = {};
		let newTestParamObj = Object.values(paramResult).length
			? Object.values(paramResult).map((val, i) => {
					testParamObj[i] = { ...val };
			  })
			: [];

		let fullGroup = {};
		let newParams = {};
		let fullTestsObj = {};
		let fullParas = {};
		const groups =
			activeRequest &&
			activeRequest.requestBody &&
			activeRequest.requestBody.groups
				? activeRequest.requestBody.groups.map((group, i) => {
						const fullTests =
							group.tests && group.tests.length
								? group.tests.map((tests, ind) => {
										const fullParams = tests.paramenters.map(
											(params, index) => {
												newParams[index] = {
													...params,
													result: resultObj[index].result,
												};
												return newParams[index];
											}
										);
										fullTestsObj[ind] = {
											...tests,
											paramenters: fullParams,
										};
										return fullTestsObj[ind];
								  })
								: [];

						const fullParamsArray =
							group.parameters && group.parameters.length
								? group.parameters.map((params, i) => {
										fullParas[i] = {
											...params,
											result: newParamObj[i].result,
										};
										return fullParas[i];
								  })
								: [];
						fullGroup[i] = {
							...group,
							tests: fullTests,
							parameters: fullParamsArray,
						};
						return fullGroup[i];
				  })
				: [];

		const tests =
			activeRequest &&
			activeRequest.requestBody &&
			activeRequest.requestBody.tests
				? activeRequest.requestBody.tests.map((test, index) => {
						const fullParams =
							test.paramenters && test.paramenters.length
								? test.paramenters.map((params, ind) => {
										newParams[ind] = {
											...params,
											result: testParamObj[ind].result,
										};
										return newParams[ind];
								  })
								: [];
						fullTestsObj[index] = {
							...test,
							paramenters: fullParams,
						};
						return fullTestsObj[index];
				  })
				: [];

		let newRequestObj = {
			requestType: activeRequest.requestType,
			patient_id: activeRequest.patient_id,
			requestBody: {
				specialization: '',
				sessionCount: '',
				groups: groups,
				tests: tests,
				refferredSpecimen: activeRequest.requestBody.refferredSpecimen,
				requestNote: activeRequest.requestBody.requestNote,
			},
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
															<td>Request Note</td>
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
									<form onSubmit={handleSubmit(onSaveClick)}>
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
																														<td>
																															{param.name}
																														</td>
																														<td>
																															{param.range}
																														</td>
																														<td>
																															{param.result ===
																															'' ? (
																																<input
																																	type="text"
																																	name={`${gInex}.${grp.name}.${tInex}.${test.testName}.${pInex}.${param.name}-group`}
																																	ref={register}
																																	// name="groupTestResult"
																																	// value={
																																	// 	groupTestResult &&
																																	// 	groupTestResult[
																																	// 		i
																																	// 	] &&
																																	// 	groupTestResult[
																																	// 		i
																																	// 	].result
																																	// 		? groupTestResult[
																																	// 				i
																																	// 		  ].result
																																	// 		: ''
																																	// }
																																	onChange={e =>
																																		// handleInputResultChange(
																																		// 	e,
																																		// 	i
																																		// )
																																		setValue(`${gInex}.${grp.name}.${tInex}.${test.testName}.${pInex}.${param.name}-group`, e.target.value)
																																	}
																																/>
																															) : (
																																<span>
																																	{param.result}
																																</span>
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
																															<input
																																type="text"
																																name={`${gInex}.${grp.name}.${pInex}.${param.name}-param`}
																																ref={register}
																																// name="groupTestParam"
																																// value={
																																// 	groupTestParam &&
																																// 	groupTestParam[
																																// 		i
																																// 	] &&
																																// 	groupTestParam[
																																// 		i
																																// 	].result
																																// 		? groupTestParam[
																																// 				i
																																// 		  ].result
																																// 		: ''
																																// }
																																onChange={e =>
																																	// handleInputResultChange(
																																	// 	e,
																																	// 	i
																																	// )
																																	setValue(`${gInex}.${grp.name}.${pInex}.${param.name}-param`, e.target.value)
																																}
																																// onChange={e =>
																																// 	handleInputResultChange(
																																// 		e,
																																// 		i
																																// 	)
																																// }
																															/>
																														) : (
																															<span>
																																{param.result}
																															</span>
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
																														<td>
																															{param.name}
																														</td>
																														<td>
																															{param.range}
																														</td>
																														<td>
																															{param.result ===
																															'' ? (
																																<input
																																	type="text"
																																	name={`${gInex}.${grp.name}.${tInex}.${test.testName}.${pInex}.${param.name}-group`}
																																	ref={register}
																																	// name="groupTestResult"
																																	// value={
																																	// 	groupTestResult &&
																																	// 	groupTestResult[
																																	// 		i
																																	// 	] &&
																																	// 	groupTestResult[
																																	// 		i
																																	// 	].result
																																	// 		? groupTestResult[
																																	// 				i
																																	// 		  ].result
																																	// 		: ''
																																	// }
																																	onChange={e =>
																																		// handleInputResultChange(
																																		// 	e,
																																		// 	i
																																		// )
																																		setValue(`${gInex}.${grp.name}.${tInex}.${test.testName}.${pInex}.${param.name}-group`, e.target.value)
																																	}
																																/>
																															) : (
																																<span>
																																	{param.result}
																																</span>
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
																															<input
																																type="text"
																																name={`${gInex}.${grp.name}.${pInex}.${param.name}-param`}
																																ref={register}
																																// name="groupTestParam"
																																// value={
																																// 	groupTestParam &&
																																// 	groupTestParam[
																																// 		i
																																// 	] &&
																																// 	groupTestParam[
																																// 		i
																																// 	].result
																																// 		? groupTestParam[
																																// 				i
																																// 		  ].result
																																// 		: ''
																																// }
																																onChange={e =>
																																	// handleInputResultChange(
																																	// 	e,
																																	// 	i
																																	// )
																																	setValue(`${gInex}.${grp.name}.${pInex}.${param.name}-param`, e.target.value)
																																}
																																// onChange={e =>
																																// 	handleInputResultChange(
																																// 		e,
																																// 		i
																																// 	)
																																// }
																															/>
																														) : (
																															<span>
																																{param.result}
																															</span>
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
																													{param.result ===
																													'' ? (
																														<input
																															type="text"
																															// name="paramResult"
																															// value={
																															// 	paramResult &&
																															// 	paramResult[
																															// 		i
																															// 	] &&
																															// 	paramResult[i]
																															// 		.result
																															// 		? paramResult[
																															// 				i
																															// 		  ].result
																															// 		: ''
																															// }
																															// onChange={e =>
																															// 	handleInputResultChange(
																															// 		e,
																															// 		i
																															// 	)
																															// }
																															name={`${tInex}.${tst.testName}.${pInex}.${param.name}-test`}
																																ref={register}
																																onChange={e =>
																																	setValue(`${tInex}.${tst.testName}.${pInex}.${param.name}-test`, e.target.value)
																																}
																														/>
																													) : (
																														<span>
																															{param.result}
																														</span>
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
																													{param.result ===
																													'' ? (
																														<input
																															type="text"
																															// name="paramResult"
																															// value={
																															// 	paramResult &&
																															// 	paramResult[
																															// 		i
																															// 	] &&
																															// 	paramResult[i]
																															// 		.result
																															// 		? paramResult[
																															// 				i
																															// 		  ].result
																															// 		: ''
																															// }
																															// onChange={e =>
																															// 	handleInputResultChange(
																															// 		e,
																															// 		i
																															// 	)
																															// }
																															name={`${tInex}.${tst.testName}.${pInex}.${param.name}-test`}
																																ref={register}
																																onChange={e =>
																																	setValue(`${tInex}.${tst.testName}.${pInex}.${param.name}-test`, e.target.value)
																																}
																														/>
																													) : (
																														<span>
																															{param.result}
																														</span>
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
