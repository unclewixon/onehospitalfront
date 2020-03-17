import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	request,
	renderSelect,
	renderTextArea,
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
class Prescription extends Component {
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
								id="service_center"
								name="service_center"
								component={renderSelect}
								label="Select Service Center"
								placeholder="Select Service Center"
								data={fetal}
							/>
						</div>
						<div className="col-sm-6">
							<Field
								id="formulary"
								name="formulary"
								component={renderSelect}
								label="Select Formulary"
								placeholder="Select Formulary"
								data={fetal}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="drug_generic_name"
								name="drug_generic_name"
								component={renderSelect}
								label="Select Drug generic name"
								placeholder="Select drug generic name"
								data={fetal}
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="drug_name"
								name="drug_name"
								component={renderSelect}
								label="Select Drug name"
								placeholder="Select drug name"
								data={fetal}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="frequency"
								name="frequency"
								component={renderTextInput}
								label="Specify Frequency"
								placeholder="specify frequency"
								data={fetal}
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="frequency_type"
								name="frequency_type"
								component={renderSelect}
								label="Select frequency type"
								placeholder="Select frequency type"
								data={fetal}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="dose"
								name="dose"
								component={renderTextInput}
								label="Specify Dose"
								placeholder="specify dose"
								data={fetal}
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="duration"
								name="duration"
								component={renderTextInput}
								label="Specify Duration"
								placeholder="specify duration"
								data={fetal}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<Field
								id="note"
								name="note"
								component={renderTextArea}
								label="Specify note"
								placeholder="specify note"
								data={fetal}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<label>Refillable</label>
							<Field
								id="refillable"
								name="refillable"
								component={renderTextInput}
								type="checkbox"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 my-2">
							<button className="btn btn-primary">+</button>
							<button className="btn btn-primary">-</button>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<Field
								id="regimen_note"
								name="regimen_note"
								component={renderTextArea}
								label="Write regimen note"
								placeholder="write regimen note"
								data={fetal}
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
Prescription = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(Prescription);

export default Prescription;
