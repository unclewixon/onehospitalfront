import React, { Component } from 'react';

class ReviewOfSystem extends Component {
	render() {
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<select
								placeholder="-- Select a system category --"
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

export default ReviewOfSystem;
