import React, { Component } from 'react';

class HxForm extends Component {
	render() {
		const { previous, next } = this.props;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<select
								placeholder="-- Select a history category --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" onClick={next}>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default HxForm;
