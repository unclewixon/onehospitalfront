import React, { Component } from 'react';
import { renderTextInput, renderSelect } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { validateAntennatal } from '../../services/validationSchemas';
// const fetal = [
// 	{
// 		value: 'daily',
// 		label: 'daily',
// 	},
// 	{ value: 'weekend', label: 'weekend' },
// 	{ value: 'monthly', label: 'monthly' },
// ];
// const fetal2 = ['daily', 'weekend', 'monthly'];

const bloodGroup = [
	{
		id: 'A+',
		name: 'A+',
	},
	{
		id: 'A-',
		name: 'A-',
	},
	{
		id: 'B+',
		name: 'B+',
	},
	{
		id: 'B-',
		name: 'B-',
	},
	{
		id: 'AB+',
		name: 'AB+',
	},
	{
		id: 'O+',
		name: 'O+',
	},
	{
		id: 'O-',
		name: 'O-',
	},
];
const validate = validateAntennatal;
export class FathersInfo extends Component {
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
									onClick={previousPage}>
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
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(FathersInfo);
export default FathersInfo;
