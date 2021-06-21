import React, { Component } from 'react';

class PatientSheet extends Component {
	render() {
		return (
			<div>
				<form>
					<fieldset className="form-group">
						<div className="row">
							<div className="col-sm-3">
								<div className="form-group">
									<label htmlFor> SURNAME</label>
									<input
										className="form-control"
										placeholder="First Name"
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm-3">
								<div className="form-group">
									<label htmlFor> MIDDLE NAME</label>
									<input
										className="form-control"
										placeholder="First Name"
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm-3">
								<div className="form-group">
									<label htmlFor> NAME</label>
									<input
										className="form-control"
										placeholder="Last Name"
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm-3">
								<div className="form-group">
									<label htmlFor> DATE PICKER</label>
									<input
										className="single-daterange form-control"
										placeholder="Date of birth"
										type="text"
										defaultValue="04/12/1978"
									/>
								</div>
							</div>
						</div>
					</fieldset>
				</form>

				<div className="element-box">
					<div className="row">
						<div className="col-lg-12">
							<div className="element-wrapper">
								<h6 className="element-header">Default Form Layout</h6>
								<div className>
									<table className="table table-striped table-bordered">
										<tbody>
											<tr>
												<td tabIndex={1}>
													<div className="form-group row col-form-label">
														<label className="col-sm-6">
															<strong>HOSP NO:</strong>
														</label>
														<div className="col-sm-6">
															<div className="">
																<input
																	name="name"
																	type="text"
																	className="form-control"
																/>
															</div>
														</div>
													</div>
												</td>
												<td tabIndex={1}>
													<div className="form-group row">
														<label className="col-sm-6 col-form-label">
															<strong>SEX</strong>
														</label>
														<div className="col-sm-6">
															<div className="form-check">
																<label className="form-check-label">
																	<input
																		defaultChecked
																		className="form-check-input"
																		name="optionsRadios"
																		type="radio"
																		defaultValue="option1"
																	/>
																	FEMALE
																</label>
															</div>
															<div className="form-check">
																<label className="form-check-label">
																	<input
																		className="form-check-input"
																		name="optionsRadios"
																		type="radio"
																		defaultValue="option2"
																	/>
																	MALE
																</label>
															</div>
														</div>
													</div>
												</td>
												<td tabIndex={1}>
													<div className="form-group row">
														<label className="col-sm-6 col-form-label">
															<strong>TREATMENT CHART</strong>
														</label>
														<div className="col-sm-6">
															<div className="form-check">
																<label className="form-check-label">
																	<input
																		defaultChecked
																		className="form-check-input"
																		name="optionsRadios"
																		type="radio"
																		defaultValue="option1"
																	/>
																	SELF TREATMENT
																</label>
															</div>
															<div className="form-check">
																<label className="form-check-label">
																	<input
																		className="form-check-input"
																		name="optionsRadios"
																		type="radio"
																		defaultValue="option2"
																	/>
																	OOCYTE RECIEPIENT
																</label>
															</div>
														</div>
													</div>
												</td>
											</tr>
											<tr></tr>
										</tbody>
									</table>

									<div>
										<table className="table table-striped table-bordered">
											<tbody>
												<tr>
													<td tabIndex={1}>
														<div className="form-group row">
															<label className="col-sm-6 col-form-label">
																<strong>HIV 1 &amp; II</strong>
															</label>
															<div className="col-sm-6">
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			defaultChecked
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option1"
																		/>
																		POSITIVE
																	</label>
																</div>
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option2"
																		/>
																		NEGATIVE
																	</label>
																</div>
															</div>
														</div>
													</td>
													<td tabIndex={1}>
														<div className="form-group row">
															<label className="col-sm-6 col-form-label">
																<strong>HBSag</strong>
															</label>
															<div className="col-sm-6">
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			defaultChecked
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option1"
																		/>
																		POSITIVE
																	</label>
																</div>
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option2"
																		/>
																		NEGATIVE
																	</label>
																</div>
															</div>
														</div>
													</td>
													<td tabIndex={1}>
														<div className="form-group row">
															<label className="col-sm-6 col-form-label">
																<strong>HCV</strong>
															</label>
															<div className="col-sm-6">
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			defaultChecked
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option1"
																		/>
																		POSITIVE
																	</label>
																</div>
																<div className="form-check">
																	<label className="form-check-label">
																		<input
																			className="form-check-input"
																			name="optionsRadios"
																			type="radio"
																			defaultValue="option2"
																		/>
																		NEGATIVE
																	</label>
																</div>
															</div>
														</div>
													</td>
												</tr>
												<tr></tr>
											</tbody>
										</table>
									</div>
									<br />

									<div>
										<table className="table table-striped table-bordered">
											<tbody>
												<tr>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>FSH</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	FSH
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control"
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>LH</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	LH
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control"
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>PRL</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	PRL
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control"
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>TSH</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	TSH
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control"
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>AMH</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	AMH
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control "
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
													<td tabIndex="1">
														<div className="row">
															<div
																className="col-sm-2"
																style={{ float: 'right' }}>
																<strong>TES</strong>
																<div className="balance-label smaller lighter text-nowrap">
																	TES
																</div>
															</div>
															<div
																className="col-sm-6"
																style={{ float: 'right' }}>
																<input
																	type="text"
																	className="form-control"
																	style={{ height: '30px' }}
																/>
															</div>
															<div
																className="col-sm-4"
																style={{ textAlign: 'right' }}>
																<strong>N.R:2.5-20.0mlU/ml</strong>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>

										<fieldset className="form-group">
											<legend>
												<span>EGG COLLECTION</span>
											</legend>
											<div className="form-group row">
												<label className="col-sm-4 col-form-label" htmlFor>
													Numbers of Eggs Recieved:
												</label>
												<div className="col-sm-8">
													<input
														className="form-control"
														placeholder="First Name"
														type="text"
													/>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-sm-4 col-form-label" htmlFor>
													Instructions for Lab:
												</label>
												<div className="col-sm-8">
													<input
														className="form-control"
														placeholder="Last Name"
														type="text"
													/>
												</div>
											</div>
										</fieldset>

										<div className="">
											<form>
												<div className="row">
													<div className="col-md-4">
														<h6>EGG COLLECTION</h6>
													</div>
													<div className="col-md-4">
														<h6>METHOD:TRANSVIGINAL</h6>
													</div>
													<div className="col-md-4">
														<div className="form-group row">
															<label
																className="col-sm-4 col-form-label"
																htmlFor>
																TIME:
															</label>
															<div className="col-sm-8">
																<input
																	className="form-control"
																	placeholder="time..."
																	type="text"
																/>
															</div>
														</div>
													</div>
												</div>
												<h5 className="element-header">OOCYTE RECOVERY</h5>

												<div className="row">
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor> LEFT OVARY</label>
															<input
																className="form-control"
																placeholder="left ovary"
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>RIGHT OVARY</label>
															<input
																className="form-control"
																placeholder="right ovary"
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>OCR DR:</label>
															<input
																className="form-control"
																placeholder="ocr "
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>EMBR</label>
															<input
																className="form-control"
																placeholder="embr"
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>No of Oocyte Retrieved</label>
															<input
																className="form-control"
																placeholder="oocyte"
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>TOTAL</label>
															<input
																className="form-control"
																placeholder="total"
																type="text"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>SIGNATURE &amp; DATE</label>
															<input
																className="form-control"
																placeholder="upload signature"
																type="file"
															/>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group">
															<label htmlFor>SIGNATURE &amp; DATE</label>
															<input
																className="form-control"
																placeholder="upload signature"
																type="file"
															/>
														</div>
													</div>
												</div>
											</form>
										</div>

										<br />

										<div className="row table table-striped table-bordered">
											<div className="col-md-4 d-flex">
												<div className="col-md-6">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option1"
															/>
															POSITIVE
														</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option2"
															/>
															NEGATIVE
														</label>
													</div>
												</div>
											</div>

											<div className="col-md-8 d-flex ">
												<div className="col-md-3">
													<div className="form-check">DONOR CODE:</div>
												</div>
												<div className="col-md-3">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option2"
															/>
															MASTURBATION
														</label>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option2"
															/>
															WITHDRAWAL
														</label>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option2"
															/>
															TESA/PESA
														</label>
													</div>
												</div>
											</div>
										</div>
										<div>
											<br />

											<div className="row table table-striped table-bordered">
												<div className="col-md-8 d-flex">
													<div className="col-md-3">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option1"
																/>
																FRESH
															</label>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option1"
																/>
																FROZEN
															</label>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option1"
																/>
																GRADIENT
															</label>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option2"
																/>
																SWIM-UP
															</label>
														</div>
													</div>
												</div>

												<div className="col-md-4 d-flex ">
													<div className="col-md-4">
														<div
															className="form-check"
															style={{ marginLeft: '-30px' }}>
															VISCOUSITY:
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option2"
																/>
																NORMAL
															</label>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-check">
															<label className="form-check-label">
																<input
																	className="form-check-input"
																	name="optionsRadios"
																	type="radio"
																	value="option2"
																/>
																ABNORMAL
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<hr />

										<div className="">
											<div className="">
												<form>
													<div className="row">
														<div className="col-md-4">
															<div className="form-group row">
																<label
																	className="col-form-label col-sm-4"
																	for="">
																	Password
																</label>
																<div className="col-sm-8">
																	<input
																		className="form-control"
																		placeholder="Password"
																		type="password"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="form-group row">
																<label
																	className="col-form-label col-sm-4"
																	for="">
																	Password
																</label>
																<div className="col-sm-8">
																	<input
																		className="form-control"
																		placeholder="Password"
																		type="password"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="form-group row">
																<label
																	className="col-form-label col-sm-4"
																	for="">
																	Password
																</label>
																<div className="col-sm-8">
																	<input
																		className="form-control"
																		placeholder="Password"
																		type="password"
																	/>
																</div>
															</div>
														</div>
													</div>
												</form>
												<div className="table-responsive">
													<table className="table table-striped table-bordered">
														<thead>
															<tr>
																<th></th>
																<th>VOL.(ML)</th>
																<th>
																	CELLS
																	<br />
																	(MIL)
																</th>
																<th>
																	CELLS
																	<br />
																	DENSITY
																</th>
																<th>
																	CELLS
																	<br />
																	MOTILITY
																</th>
																<th>PROG</th>
																<th>
																	ABNOR <br /> (%)
																</th>
																<th>
																	AGGLUTINATION <br />
																	(%)
																</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>INITIAL ASSES.1:</td>
																<td></td>
																<td></td>
																<td className="text-center">
																	<div
																		className="status-pill green"
																		data-title="Complete"
																		data-toggle="tooltip"
																		data-original-title
																		title></div>
																</td>
																<td className="text-right"></td>
																<td></td>
																<td></td>
																<td></td>
															</tr>
															<tr>
																<td>PREP 1:</td>
																<td></td>
																<td></td>
																<td className="text-center"></td>
																<td className="text-right"></td>
																<td></td>
																<td></td>
																<td></td>
															</tr>
															<tr>
																<td>INITIAL ASSES.2:</td>
																<td></td>
																<td></td>
																<td className="text-center"></td>
																<td className="text-right"></td>
																<td></td>
																<td></td>
																<td></td>
															</tr>
															<tr>
																<td>PREP 2:</td>
																<td></td>
																<td></td>
																<td></td>
																<td></td>
																<td></td>
																<td className="text-center"></td>
																<td className="text-right"></td>
															</tr>
															<tr>
																<td rows={3}>Comments</td>
																<td colSpan={7}></td>
															</tr>
														</tbody>
													</table>
													<div className="row">
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor>EMBRIOLOGISTS</label>
																<input
																	className="form-control"
																	placeholder="total"
																	type="text"
																/>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor>WITNESS</label>
																<input
																	className="form-control"
																	placeholder="total"
																	type="text"
																/>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor>SIGNATURE &amp; DATE</label>
																<input
																	className="form-control"
																	placeholder="upload signature"
																	type="file"
																/>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor>SIGNATURE &amp; DATE</label>
																<input
																	className="form-control"
																	placeholder="upload signature"
																	type="file"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<br />
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group row">
													<label className="col-sm-7 col-form-label" htmlFor>
														PRE-INJECTION DISSECTION
													</label>
													<div className="col-sm-5">
														<input
															className="form-control"
															placeholder=""
															type="text"
														/>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group row">
													<label className="col-sm-4 col-form-label" htmlFor>
														TIME
													</label>
													<div className="col-sm-8">
														<input
															className="form-control"
															placeholder="First Name"
															type="text"
														/>
													</div>
												</div>
											</div>
										</div>
										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th></th>
													<th>MII</th>
													<th>
														MIGV
														<br />
														FRAG
													</th>
													<th>
														ABN
														<br />
													</th>
													<th colSpan={4}>COMMENTS</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>NO:</td>
													<td></td>
													<td></td>
													<td className="text-center"></td>
													<td className="text-right"></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</tbody>
										</table>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>EMBRIOLOGISTS</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
										</div>
										<hr />

										<div className="row">
											<div className="col-md-3">
												<div className="form-group row">
													<label className="col-form-label col-sm-7" htmlFor>
														IVF/ICSI RECORDS
													</label>
													<div className="col-sm-5">
														<input
															className="form-control"
															placeholder="Password"
															type="password"
														/>
													</div>
												</div>
											</div>
											<div className="col-md-3">
												<div className="col-md-6">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option1"
															/>
															INSEMINATION
														</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-check">
														<label className="form-check-label">
															<input
																className="form-check-input"
																name="optionsRadios"
																type="radio"
																value="option2"
															/>
															INJECTION
														</label>
													</div>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group row">
													<label className="col-form-label col-sm-4" htmlFor>
														OP DATE
													</label>
													<div className="col-sm-8">
														<input
															className="form-control"
															placeholder="Password"
															type="password"
														/>
													</div>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group row">
													<label className="col-form-label col-sm-4" htmlFor>
														TIME:
													</label>
													<div className="col-sm-8">
														<input
															className="form-control"
															placeholder="Password"
															type="password"
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="table-responsive">
											<table className="table table-bordered table-lg table-v2 table-striped">
												<thead>
													<tr>
														<th>TOTAL No. OF OCCYTE</th>
														<th>IVF</th>
														<th>CELLS</th>
													</tr>
												</thead>

												<tr>
													<th rowSpan={2}></th>
													<th>IVF</th>
													<th>CELLS</th>
												</tr>

												<tbody>
													<tr>
														<td></td>
														<td></td>
														<td></td>
													</tr>

													<tr>
														<td colSpan={3}>COMMENT:</td>
													</tr>
												</tbody>
											</table>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor>WITNESS</label>
														<input
															className="form-control"
															placeholder="total"
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor>EMBRIOLOGISTS</label>
														<input
															className="form-control"
															placeholder="total"
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor>SIGNATURE &amp; DATE</label>
														<input
															className="form-control"
															placeholder="upload signature"
															type="file"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label htmlFor>SIGNATURE &amp; DATE</label>
														<input
															className="form-control"
															placeholder="upload signature"
															type="file"
														/>
													</div>
												</div>
											</div>
										</div>
										<br />
										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th colSpan={7}></th>

													<th>NON-FERTILIZED</th>
													<th>OTHERS</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td></td>
													<td>2PN</td>
													<td>3PN</td>
													<td>1PN</td>
													<td>+</td>
													<td>MIL</td>
													<td>ML</td>
													<td>GV</td>
													<td></td>
												</tr>

												<tr>
													<td>IVF</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>COMMENTS</td>
													<td colSpan={9}></td>
												</tr>
											</tbody>
										</table>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>WITNESS</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>EMBRIOLOGISTS</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>ASSESSMENT OF EMBROYO QUALITY</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor> DATE PICKER</label>
													<input
														className="single-daterange form-control"
														placeholder="Date of birth"
														type="text"
														defaultValue="04/12/1978"
													/>
												</div>
											</div>
										</div>
										<table className="table table-striped table-bordered">
											<tbody>
												<tr>
													<td>DAY 2</td>
													<td colSpan={6}>Number of Cleaving Embroyo(s)</td>
												</tr>

												<tr>
													<td>COMMENT</td>
													<td colSpan={6}></td>
												</tr>
											</tbody>
										</table>
										<br />

										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th colSpan={2}>EMBROYO/DROP No:</th>
													<th>1</th>
													<th>2</th>
													<th>3</th>
													<th>4</th>
													<th>5</th>
													<th>6</th>
													<th>7</th>
													<th>8</th>
													<th>9</th>
													<th>10</th>
													<th>11</th>
													<th>12</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td rowSpan={3}>
														DAY 3 <br />
														PROGRESS RECORD/
														<br />
														BIOPSY RECORD
													</td>
													<td>Cell No:</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>Even/Uneven</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>Grade</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>COMMENT</td>
													<td colSpan={13}></td>
												</tr>
											</tbody>
										</table>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>CHANGE OVER DONE BY</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>BIOPSY DONE BY</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>

											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>WITNESS</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>

											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
										</div>
										<br />

										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>EMBROYO TRANSFER</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>

											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor> DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
													/>
												</div>
											</div>
										</div>
										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th>NAME OF EMBROYO TRANSFERED</th>
													<th className="text-center"></th>
													<th>TIME OF ET:</th>
													<th>DATE OF ET:</th>
												</tr>
											</thead>
										</table>

										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>DR:</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>

											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor> EMBRIOLOGISTS:</label>
													<input
														className="form-control"
														placeholder="upload signature"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
										</div>
										<br />

										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th></th>
													<th>STAGE</th>
													<th>GRADE</th>
													<th className="text-center">COMMENTS</th>
													<th className="text-right">ICSI</th>
													<th className="text-right">IVF</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>2</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>3</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>4</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>5</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>6</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
												<tr>
													<td>7</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</tbody>
										</table>
										<br />

										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>DR:</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor> DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
													/>
												</div>
											</div>
										</div>

										<table className="table table-striped table-bordered">
											<thead>
												<tr>
													<th colSpan={6}>Customer Name</th>
												</tr>
											</thead>
											
										</table>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>EMBRIOLOGISTS:</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
											<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor>EMBRIOLOGISTS:</label>
													<input
														className="form-control"
														placeholder="total"
														type="text"
													/>
												</div>
											</div>
											<div className="col-md-6">
											<div className="form-group">
													<label htmlFor>SIGNATURE &amp; DATE</label>
													<input
														className="form-control"
														placeholder="upload signature"
														type="file"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PatientSheet;
