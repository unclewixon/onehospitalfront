import React from 'react';

const EmbryoTransfer = () => {
	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>EMBROYO TRANSFER</label>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<input className="form-control" placeholder="Date" />
					</div>
				</div>
			</div>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>NAME OF EMBROYO TRANSFERED</th>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<th>TIME OF ET:</th>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<th>DATE OF ET:</th>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
				</thead>
			</table>

			<div className="row">
				<div className="col-md-3">
					<div className="form-group">
						<label>DR:</label>
					</div>
				</div>
				<div className="col-md-3">
					<div className="form-group">
						<input className="form-control" placeholder="Dr" type="text" />
					</div>
				</div>

				<div className="col-md-3">
					<div className="form-group">
						<label> EMBRIOLOGIST:</label>
					</div>
				</div>
				<div className="col-md-3">
					<div className="form-group">
						<input
							className="form-control"
							placeholder="Embriologist"
							type="text"
						/>
					</div>
				</div>
			</div>

			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th></th>
						<th>STAGE</th>
						<th>GRADE</th>
						<th>COMMENTS</th>
						<th>ICSI</th>
						<th>IVF</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
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
						<td>2</td>
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
						<td>3</td>
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
						<td>4</td>
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
						<td>5</td>
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
						<td>6</td>
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
						<td>7</td>
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
				</tbody>
			</table>

			<h6 className="element-header">VITRIFICATION RECORD:</h6>
			<div className="row">
				<div className="col-md-4"></div>
				<div className="col-md-4"></div>
				<div className="col-md-4">
					<div className="form-group">
						<label> DATE</label>
						<input className="form-control" placeholder="" type="text" />
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>No OF EMBRYO VIT./DES.:</label>
						<input className="form-control" placeholder="" type="text" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label>No OF STRAWS:</label>
						<input className="form-control" placeholder="" type="text" />
					</div>
				</div>
			</div>
		</>
	);
};

export default EmbryoTransfer;
