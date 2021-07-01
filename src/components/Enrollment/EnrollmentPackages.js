import React, { Component } from 'react';

import { renderSelect } from '../../services/utilities';

import waiting from '../../assets/images/waiting.gif';
import { Field, reduxForm } from 'redux-form';
import { validateAntenatal } from '../../services/validationSchemas';
import { antenatalPackages } from '../../services/constants';

const validate = validateAntenatal;

class EnrollmentPackages extends Component {
	state = {
		submitting: false,
	};

	render() {
		const {
			handleSubmit,
			doSubmit,
			previousPage,
			error,
			page,
			submitting,
		} = this.props;

		return (
			<>
				<h6 className="element-header">Step {page}. Enrollment Packages</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit(doSubmit)}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}

						<div className="row">
							<div className="col-sm-12">
								<Field
									id="package"
									name="package"
									component={renderSelect}
									label="Antenatal Package"
									placeholder="Select Package"
									data={antenatalPackages}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									type="button"
									onClick={previousPage}>
									Previous
								</button>
								<button
									className="btn btn-primary"
									type="submit"
									disabled={submitting}>
									{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}

EnrollmentPackages = reduxForm({
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(EnrollmentPackages);

export default EnrollmentPackages;
