import React, { Component } from 'react';

import { renderSelect, renderMultiselect } from '../../services/utilities';

import waiting from '../../assets/images/waiting.gif';
import { Field, reduxForm } from 'redux-form';

const fetal = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
const fetal2 = ['daily', 'weekend', 'monthly'];
class EnrollmentPackages extends Component {
	render() {
		const { handleSubmit, previousPage, error, page, submitting } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. Enrollment Packages</h6>
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
							<div className="col-sm-12">
								<Field
									id="abortion"
									name="abortion"
									component={renderSelect}
									label="Abortion"
									placeholder="Select Abortion"
									data={['Obsterics', 'Gynaecologist']}
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
	form: 'enrollment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EnrollmentPackages);

export default EnrollmentPackages;
