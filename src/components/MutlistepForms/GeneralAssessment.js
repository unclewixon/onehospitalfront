import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	request,
	renderSelect,
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
class GeneralAssessment extends Component {
	render() {
		const { handleSubmit, error } = this.props;
		return (
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
								id="heart_of_fundus"
								name="heart_of_fundus"
								component={renderTextInput}
								label="Height of Fundus (cm)"
								type="text"
								placeholder="Enter height of fundus"
							/>
						</div>
						<div className="col-sm-6">
							<Field
								id="fetal_heart_rate"
								name="fetal_heart_rate"
								component={renderTextInput}
								label="Fetal Heart Rate"
								type="text"
								placeholder="Enter fetal heart rate"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-4">
							<Field
								id="presentation_position_fetals"
								name="presentation_position_fetals"
								component={renderSelect}
								label="Presentation and Position of Fetals"
								placeholder="Select Presentation and Position of Fetals"
								data={fetal}
							/>
						</div>
						<div className="col-sm-4">
							<Field
								id="fetal_lie"
								name="fetal_lie"
								component={renderSelect}
								label="Fetal Lie"
								placeholder="Select fetal lie"
								data={fetal}
							/>
						</div>

						<div className="col-sm-4">
							<Field
								id="relationship_to_brim"
								name="relationship_to_brim"
								component={renderSelect}
								label="Relationship to Brim"
								placeholder="Select Relationship to Brim"
								data={fetal}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

GeneralAssessment = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(GeneralAssessment);
export default GeneralAssessment;
