import React, { Component } from 'react';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
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
export class FathersInfo extends Component {
	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. FathersInfo</h6>
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
									id="father_name"
									name="father_name"
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
	form: 'enrollment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FathersInfo);
export default FathersInfo;
