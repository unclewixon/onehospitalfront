import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from './../../services/notify';
import './ModalClinicalLab.css';

const ModalClinicalLab = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	const [Loading, setLoading] = useState(false);

	const saveLabRequest = async (data, cb) => {
		try {
			await request(`patient/fill-request`, 'POST', true, data);
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
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>

			<Modal.Body>
				<div className="onboarding-content text-center px-0">
					<div className="modal-body">
						<div className="row">
							<div className="col-md-4">
								<p>
									<span
										style={{
											textTransform: 'uppercase',
											fontSize: '11px',
											letterSpacing: '1px',
											fontWeight: 'bold',
											color: '#B8B8B8',
											marginBottom: '5px',
										}}>
										Request Date,
									</span>
									<br />
									{moment(activeRequest.createdAt).format('MM/DD/YYYY')}
								</p>
							</div>
							<div className="col-md-4">
								<p className="specimen">
									Specimen Name,
									<br />
									{activeRequest.requestBody.refferredSpecimen}
								</p>
							</div>
						</div>
						<div
							style={{ fontSize: '12px', color: '#111', fontWeight: 'bold' }}
							className="madison"></div>

						<div className="col-md-4">
							<div>Request Note</div>
							<div>
								<div className="value text-success">
									{activeRequest.requestBody.requestNote}
								</div>
							</div>
						</div>

						<div className="col-sm-12">
							<div className="element-wrapper">
								<form id="formValidate" noValidate></form>
								<div className="element-info">
									<div
										className="element-info-with-icon"
										style={{
											marginTop: '40px',
											marginRight: '35px',
											justifyContent: 'center',
										}}>
										<div className="element-info-icon">
											<div className="os-icon os-icon-pen"></div>
										</div>
										<div className="element-info-text">
											<h5 className="element-inner-header text-center">
												Enter Lab Result
											</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="">
						<div className="row here">
							<div className="col-sm here">
								{activeRequest.requestBody.groups ||
								activeRequest.requestBody.group ? (
									<div className="form-group">
										<span>
											{activeRequest &&
												activeRequest.requestBody &&
												activeRequest.requestBody.groups &&
												activeRequest.requestBody.groups.map((grp, gInex) => (
													<div key={gInex}>
														<div>
															{grp.tests &&
																grp.tests.map((test, i) => (
																	<div key={i}>
																		<table
																			style={{
																				width: '100%',
																			}}>
																			<thead>
																				<tr>
																					<td
																						style={{
																							textTransform: 'uppercase',
																							letterSpacing: '1px',
																							color: '#B8B8B8',
																							fontSize: '10px',
																							fontWeight: 'bold',
																							textAlign: 'left',
																						}}>
																						Name
																					</td>

																					<td
																						style={{
																							textTransform: 'uppercase',
																							letterSpacing: '1px',
																							color: '#B8B8B8',
																							fontSize: '10px',
																							fontWeight: 'bold',
																							textAlign: 'right',
																						}}>
																						Result
																					</td>
																				</tr>
																			</thead>
																			<tbody>
																				{test.paramenters &&
																					test.paramenters.map(
																						(param, pInex) => (
																							<tr key={pInex}>
																								<td
																									style={{
																										padding: '15px 0px',
																										borderBottom:
																											'1px solid rgba(0,0,0,0.05)',
																									}}>
																									<div
																										style={{
																											color: '#111',
																											fontSize: '14px',
																											fontWeight: 'bold',
																											textAlign: 'left',
																										}}>
																										{param.name}
																									</div>
																									<div
																										style={{
																											color: '#B8B8B8',
																											fontSize: '12px',
																											textAlign: 'left',
																										}}>
																										Range:
																										{param.range}
																									</div>
																								</td>

																								<td
																									style={{
																										padding: '15px 0px',
																										textAlign: 'right',
																										fontSize: '14px',
																										fontWeight: 'bold',
																										color: '#111',
																										borderBottom:
																											'1px solid rgba(0,0,0,0.05)',
																									}}>
																									{param.result === '' ? (
																										<input
																											name={`tp${gInex}${pInex}`}
																											onChange={e =>
																												updateGroupTestResult(
																													e,
																													pInex,
																													i,
																													gInex
																												)
																											}
																											size="4"
																										/>
																									) : (
																										param.result
																									)}
																								</td>
																							</tr>
																						)
																					)}
																			</tbody>

																			<tbody>
																				{grp.parameters &&
																				grp.parameters.length ? (
																					<div>
																						<div>
																							{grp.parameters.map(
																								(param, pInex) => (
																									<tr key={pInex}>
																										<td
																											style={{
																												padding: '15px 0px',
																												borderBottom:
																													'1px solid rgba(0,0,0,0.05)',
																											}}>
																											<div
																												style={{
																													color: '#111',
																													fontSize: '14px',
																													fontWeight: 'bold',
																													textAlign: 'left',
																												}}>
																												{param.name}
																											</div>
																											<div
																												style={{
																													color: '#B8B8B8',
																													fontSize: '12px',
																													textAlign: 'left',
																												}}>
																												Range:
																												{param.range}
																											</div>
																										</td>

																										<td
																											style={{
																												padding: '15px 0px',
																												textAlign: 'right',
																												fontSize: '14px',
																												fontWeight: 'bold',
																												color: '#111',
																												borderBottom:
																													'1px solid rgba(0,0,0,0.05)',
																											}}>
																											{param.result === '' ? (
																												<input
																													name={`gp${gInex}${pInex}`}
																													onChange={e =>
																														updateGroupTestResult(
																															e,
																															pInex,
																															i,
																															gInex
																														)
																													}
																													size="4"
																												/>
																											) : (
																												// param.result
																												<input
																													name={`gp${gInex}${pInex}`}
																													onChange={e =>
																														updateGroupTestResult(
																															e,
																															pInex,
																															i,
																															gInex
																														)
																													}
																													size="4"
																												/>
																											)}
																										</td>
																									</tr>
																								)
																							)}
																						</div>
																					</div>
																				) : null}
																			</tbody>

																			<tbody>
																				{activeRequest &&
																					activeRequest.requestBody &&
																					activeRequest.requestBody.group &&
																					activeRequest.requestBody.group.map(
																						(grp, gInex) => (
																							<div key={gInex}>
																								<div>
																									{grp.tests &&
																										grp.tests.map(
																											(test, tInex) => (
																												<div>
																													{test.paramenters &&
																														test.paramenters.map(
																															(
																																param,
																																pInex
																															) => (
																																<tr key={pInex}>
																																	<td
																																		style={{
																																			padding:
																																				'15px 0px',
																																			borderBottom:
																																				'1px solid rgba(0,0,0,0.05)',
																																		}}>
																																		<div
																																			style={{
																																				color:
																																					'#111',
																																				fontSize:
																																					'14px',
																																				fontWeight:
																																					'bold',
																																				textAlign:
																																					'left',
																																			}}>
																																			{
																																				param.name
																																			}
																																		</div>
																																		<div
																																			style={{
																																				color:
																																					'#B8B8B8',
																																				fontSize:
																																					'12px',
																																				textAlign:
																																					'left',
																																			}}>
																																			Range:
																																			{
																																				param.range
																																			}
																																		</div>
																																	</td>

																																	<td
																																		style={{
																																			padding:
																																				'15px 0px',
																																			textAlign:
																																				'right',
																																			fontSize:
																																				'14px',
																																			fontWeight:
																																				'bold',
																																			color:
																																				'#111',
																																			borderBottom:
																																				'1px solid rgba(0,0,0,0.05)',
																																		}}>
																																		{param.result ===
																																		'' ? (
																																			<input
																																				name={`gp${gInex}${pInex}`}
																																				onChange={e =>
																																					updateGroupTestResult(
																																						e,
																																						pInex,
																																						i,
																																						gInex
																																					)
																																				}
																																				size="4"
																																			/>
																																		) : (
																																			// param.result
																																			<input
																																				name={`gtp${gInex}${pInex}${tInex}`}
																																				onChange
																																				size="4"
																																			/>
																																		)}
																																	</td>
																																</tr>
																															)
																														)}
																												</div>
																											)
																										)}
																								</div>
																							</div>
																						)
																					)}
																				: null
																			</tbody>

																			<tbody>
																				{grp.parameters &&
																				grp.parameters.length ? (
																					<div>
																						<div>
																							{grp.parameters.map(
																								(param, pInex) => (
																									<tr key={pInex}>
																										<td
																											style={{
																												padding: '15px 0px',
																												borderBottom:
																													'1px solid rgba(0,0,0,0.05)',
																											}}>
																											<div
																												style={{
																													color: '#111',
																													fontSize: '14px',
																													fontWeight: 'bold',
																													textAlign: 'left',
																												}}>
																												{param.name}
																											</div>
																											<div
																												style={{
																													color: '#B8B8B8',
																													fontSize: '12px',
																													textAlign: 'left',
																												}}>
																												Range:
																												{param.range}
																											</div>
																										</td>

																										<td
																											style={{
																												padding: '15px 0px',
																												textAlign: 'right',
																												fontSize: '14px',
																												fontWeight: 'bold',
																												color: '#111',
																												borderBottom:
																													'1px solid rgba(0,0,0,0.05)',
																											}}>
																											{param.result === '' ? (
																												<input
																													name={`gp${gInex}${pInex}`}
																													size="4"
																												/>
																											) : (
																												// param.result
																												<input
																													name={`gp${gInex}${pInex}`}
																													size="4"
																												/>
																											)}
																										</td>
																									</tr>
																								)
																							)}
																						</div>
																					</div>
																				) : null}
																			</tbody>
																		</table>
																	</div>
																))}
														</div>
													</div>
												))}
										</span>
									</div>
								) : null}

								<table style={{ width: '100%' }}>
									<tbody>
										<tr>
											<td
												style={{
													textTransform: 'uppercase',
													letterSpacing: '1px',
													color: '#B8B8B8',
													fontSize: '10px',
													fontWeight: 'bold',
													textAlign: 'left',
												}}>
												Name
											</td>
											<td
												style={{
													textTransform: 'uppercase',
													letterSpacing: '1px',
													color: '#B8B8B8',
													fontSize: '10px',
													fontWeight: 'bold',
													textAlign: 'right',
												}}>
												Amount
											</td>
										</tr>
										<tr>
											<td
												style={{
													padding: '15px 0px',
													borderBottom: '1px solid rgba(0,0,0,0.05)',
												}}>
												<div
													style={{
														color: '#111',
														fontSize: '14px',
														fontWeight: 'bold',
														textAlign: 'left',
													}}>
													Web development starter kit
												</div>
												<div
													style={{
														color: '#B8B8B8',
														fontSize: '12px',
														textAlign: 'left',
													}}>
													Range:
												</div>
											</td>
											<td
												style={{
													padding: '15px 0px',
													textAlign: 'right',
													fontSize: '14px',
													fontWeight: 'bold',
													color: '#111',
													borderBottom: '1px solid rgba(0,0,0,0.05)',
												}}>
												<input type="text" size="4" />
											</td>
										</tr>
										<tr>
											<td style={{ padding: '15px 0px' }}>
												<div
													style={{
														color: '#111',
														fontSize: '14px',
														fontWeight: 'bold',
														textAlign: 'left',
													}}>
													Bootstrap tutorials books
												</div>
												<div
													style={{
														color: '#B8B8B8',
														fontSize: '12px',
														textAlign: 'left',
													}}>
													Range:
												</div>
											</td>
											<td
												style={{
													padding: '15px 0px',
													textAlign: 'right',
													fontSize: '14px',
												}}>
												<input type="text" size="4" />
											</td>
										</tr>
									</tbody>
								</table>

								<div className="row">
									<div className="col-sm">
										<div className="form-group">
											<button
												style={{ marginTop: '10px' }}
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
			</Modal.Body>
		</Modal>
	);
};
export default ModalClinicalLab;
