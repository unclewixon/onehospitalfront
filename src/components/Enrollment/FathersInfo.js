import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderTextInput, renderSelect } from '../../services/utilities';
import { bloodGroup } from '../../services/constants';

const validate = values => {
	const errors = {};
	return errors;
};

class FathersInfo extends Component {
	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. Father's Info</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}
						<div className="row">
							<div className="col-sm-6">
								<Field
									id="name"
									name="name"
									component={renderTextInput}
									label="Father's Name"
									type="text"
									placeholder="Enter father name"
								/>
							</div>
							<div className="col-sm-6">
								<Field
									id="phone"
									name="phone"
									component={renderTextInput}
									label="Phone"
									type="text"
									placeholder="Enter phone"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<Field
									id="blood_group"
									name="blood_group"
									component={renderSelect}
									label="Select Blood Group"
									placeholder="Select blood group"
									data={bloodGroup}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									type="button"
									onClick={previousPage}
								>
									Previous
								</button>
								<button className="btn btn-primary" type="submit">
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}

FathersInfo = reduxForm({
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(FathersInfo);

export default FathersInfo;
