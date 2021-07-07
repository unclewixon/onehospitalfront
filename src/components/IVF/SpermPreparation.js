import React from 'react';

const SpermPreparation = () => {
	return (
		<>
			<h6 className="element-header">SPERM PREPARATION</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											PARTNER
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
											DONOR
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-6">
									<strong>DONOR CODE</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
									/>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											MASTURBATION
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
											WITHDRAWAL
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
											TESA/PESA
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											FRESH
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
											FROZEN
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											GRADIENT
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
											SWIM UP
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<strong>VISCOUSITY</strong>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="optionsRadios"
												type="radio"
												defaultValue="option1"
											/>
											NORMAL
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
											ABNORMAL
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="row">
				<div className="col-md-4">
					<div className="form-group row">
						<label className="col-form-label col-sm-5">
							Time of Production
						</label>
						<div className="col-sm-7">
							<input
								className="form-control"
								placeholder="Time of Production"
								type="text"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group row">
						<label className="col-form-label col-sm-5">Time Received</label>
						<div className="col-sm-7">
							<input
								className="form-control"
								placeholder="Time Received"
								type="text"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group row">
						<label className="col-form-label col-sm-5">Time Analyzed</label>
						<div className="col-sm-7">
							<input
								className="form-control"
								placeholder="Time Analyzed"
								type="text"
							/>
						</div>
					</div>
				</div>
			</div>
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
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>
						<tr>
							<td>PREP 1:</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>
						<tr>
							<td>INITIAL ASSES.2:</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>
						<tr>
							<td>PREP 2:</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>
						<tr>
							<td>Comment</td>
							<td colSpan="7">
								<input
									className="form-control"
									placeholder="Comment"
									type="text"
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>EMBRIOLOGIST</label>
							<input
								className="form-control"
								placeholder="Embriologist"
								type="text"
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>WITNESS</label>
							<input
								className="form-control"
								placeholder="Witness"
								type="text"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SpermPreparation;
