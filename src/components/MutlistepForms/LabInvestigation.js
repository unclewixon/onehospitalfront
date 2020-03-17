import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';

const fetal = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];

class LabInvestigation extends Component {
	render() {
		const { handleSubmit, previousPage, error } = this.props;
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
								id="laboratory"
								name="laboratory"
								component={renderSelect}
								label="Laboratory"
								placeholder="Select Laboratory"
								data={fetal}
							/>
						</div>
						<div className="col-sm-6">
							<label>Lab combination</label>
							<Field
								name="lab_combos"
								component={renderMultiselect}
								defaultValue={[]}
								data={['Guitar', 'Cycling', 'Hiking']}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<label>Lab tests to request</label>
							<Field
								name="lab_tests_to_request"
								component={renderMultiselect}
								defaultValue={[]}
								data={['Guitar', 'Cycling', 'Hiking']}
							/>
						</div>
						<div className="col-sm-6">
							<Field
								id="preferred_specimen"
								name="preferred_specimen"
								component={renderTextInput}
								label="Preferred Specimen(s)"
								placeholder="Preferred Specimen(s)"
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
		);
	}
}
LabInvestigation = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(LabInvestigation);

export default LabInvestigation;
