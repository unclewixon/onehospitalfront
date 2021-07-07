import React from 'react';

const EmbryoAssessment = () => {
	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>ASSESSMENT OF EMBROYO QUALITY</label>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<input
							className="single-daterange form-control"
							placeholder="Date"
							type="text"
						/>
					</div>
				</div>
			</div>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td>
							<strong>DAY 2</strong>
						</td>
						<td>Number of Cleaving Embroyo(s)</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>

					<tr>
						<td>COMMENT</td>
						<td colSpan="2">
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
				</tbody>
			</table>
			<br />

			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th colSpan="2">EMBROYO/DROP No:</th>
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
						<td rowSpan="3">
							DAY 3 <br />
							PROGRESS RECORD/
							<br />
							BIOPSY RECORD
						</td>
						<td>Cell No:</td>
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
						<td>Even/Uneven</td>
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
						<td>Grade</td>
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
						<td>COMMENT</td>
						<td colSpan="13">
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
				</tbody>
			</table>
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label>CHANGE OVER DONE BY</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label>BIOPSY DONE BY</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label>WITNESS</label>
						<input className="form-control" placeholder="total" type="text" />
					</div>
				</div>
			</div>
		</>
	);
};

export default EmbryoAssessment;
