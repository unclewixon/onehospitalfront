import React, { Component } from 'react';
import { renderSelect } from '../../../services/utilities';
import { obstericHistory } from '../../../services/constants';
import { Field, reduxForm } from 'redux-form';
import { ObstericsHistory } from '../../Enrollment/ObstericsHistory';

class HxForm extends Component {
	render() {
		const { previous, next } = this.props;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Field
								id="obstericsHistory"
								required
								name="obstericsHistory"
								component={renderSelect}
								label="Select Previous Obsteric History"
								placeholder="Select Previous Obsteric History"
								data={obstericHistory}
							/>
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

HxForm = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount,
})(HxForm);

export default HxForm;
