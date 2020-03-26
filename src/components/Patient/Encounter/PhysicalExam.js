import React, { Component } from 'react';

class PhysicalExam extends Component {
	render() {
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<select
								placeholder="-- Select an examination category --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalExam;
