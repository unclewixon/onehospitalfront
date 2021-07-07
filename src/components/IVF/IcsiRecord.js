import React from 'react';

const IcsiRecord = () => {
	return (
		<>
			<h6 className="element-header">ICSI PRE-INJECTION DISSECTION</h6>
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<div className="form-group row">
						<label className="col-sm-4 col-form-label">TIME</label>
						<div className="col-sm-8">
							<input className="form-control" placeholder="Time" type="text" />
						</div>
					</div>
				</div>
			</div>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th></th>
						<th>MII</th>
						<th>MIGV</th>
						<th>FRAG</th>
						<th>ABN</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>NO:</td>
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
						<td colSpan="4">
							<input
								className="form-control"
								placeholder="Comment"
								type="text"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<h6 className="element-header">IVF/ICSI RECORD</h6>
			<div className="row">
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
						<label className="col-form-label col-sm-4">OP DATE</label>
						<div className="col-sm-8">
							<input
								className="form-control"
								placeholder="OP DATE"
								type="text"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-3">
					<div className="form-group row">
						<label className="col-form-label col-sm-4">TIME:</label>
						<div className="col-sm-8">
							<input className="form-control" placeholder="Time" type="text" />
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
							<th>ICSI</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<th rowSpan="2">
								<input className="form-control" placeholder="" type="text" />
							</th>
							<th>No of Oocyte Inseminated</th>
							<th>No of Oocyte Injected</th>
						</tr>
						<tr>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
							<td>
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>

						<tr>
							<td>COMMENT:</td>
							<td colSpan="2">
								<input className="form-control" placeholder="" type="text" />
							</td>
						</tr>
					</tbody>
				</table>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>WITNESS</label>
							<input className="form-control" placeholder="total" type="text" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>EMBRIOLOGISTS</label>
							<input className="form-control" placeholder="total" type="text" />
						</div>
					</div>
				</div>
			</div>
			<h6 className="element-header">DAY 1</h6>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<td colSpan="5"></td>
						<td colSpan="3">NON-FERTILIZED</td>
						<td>OTHERS</td>
					</tr>
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
				</thead>
				<tbody>
					<tr>
						<td>IVF</td>
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
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>

					<tr>
						<td>ICSI</td>
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
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
					<tr>
						<td>COMMENTS</td>
						<td colSpan="9">
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
				</tbody>
			</table>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>WITNESS</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>EMBRIOLOGISTS</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
			</div>
		</>
	);
};

export default IcsiRecord;
