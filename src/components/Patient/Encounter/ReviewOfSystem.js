import React, { Component } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';

class ReviewOfSystem extends Component {
	state = {
		selected: null
	}

	handleChange(e) {
		this.setState({selected: e})
	}
	render() {
		const {selected} = this.state;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								name="ethnicity"
								options={reviewOfSystem}
								onChange={evt => {
									this.handleChange(evt);
								}}
							/>
						</div>
					</div>
				</div>
				{selected && (
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								{selected.label}
							</label>
							{ selected.children.map((option, i) => (
								<div key={i}>
									<label>
										<input type="checkbox" className="form-control" value={option} />
										{option}
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
				)}
			</div>
		);
	}
}

export default ReviewOfSystem;
