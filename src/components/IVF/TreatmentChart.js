import React from 'react';

const TreatmentChart = () => {
	return (
		<>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<label className="col-sm-4 col-form-label">
									<strong>TREATMENT CHART</strong>
								</label>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											SELF TREATMENT
										</label>
									</div>
								</div>
								<div className="col-sm-4">
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
				</tbody>
			</table>
			<h6 className="element-header">VIRAL SCREENING</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<label className="col-sm-6 col-form-label">
									<strong>HIV 1 &amp; II</strong>
								</label>
								<div className="col-sm-6">
									<div className="form-check">
										<label className="form-check-label">
											<input
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
				</tbody>
			</table>
			<h6 className="element-header">ENDOCRINOLOGY</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>FSH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>LH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>PRL</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>TSH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>AMH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control "
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>TES</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<h6 className="element-header">OOCYTE RECIPIENT</h6>
			<fieldset className="form-group">
				<div className="form-group row">
					<label className="col-sm-4 col-form-label">
						Numbers of Eggs Recieved:
					</label>
					<div className="col-sm-8">
						<input
							className="form-control"
							placeholder="Numbers of Eggs Recieved"
							type="text"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-4 col-form-label">
						Instructions for Lab:
					</label>
					<div className="col-sm-8">
						<input
							className="form-control"
							placeholder="Instructions for Lab"
							type="text"
						/>
					</div>
				</div>
			</fieldset>
			<h6 className="element-header">EGG COLLECTION</h6>
			<div className="row">
				<div className="col-md-4">
					<div className="form-group row">
						<label className="col-sm-4 col-form-label">METHOD:</label>
						<div className="col-sm-8">
							<select>
								<option value="">Select Method</option>
								<option value="Transvaginal">Transvaginal</option>
							</select>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group row">
						<label className="col-sm-4 col-form-label">TIME:</label>
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
			<h6 className="element-header">OOCYTE RECOVERY</h6>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label> LEFT OVARY</label>
						<input
							className="form-control"
							placeholder="left ovary"
							type="text"
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>RIGHT OVARY</label>
						<input
							className="form-control"
							placeholder="right ovary"
							type="text"
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>OCR DR:</label>
						<input className="form-control" placeholder="ocr " type="text" />
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>EMBR</label>
						<input className="form-control" placeholder="embr" type="text" />
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>No of Oocyte Retrieved</label>
						<input className="form-control" placeholder="oocyte" type="text" />
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>TOTAL</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
			</div>
		</>
	);
};

export default TreatmentChart;
