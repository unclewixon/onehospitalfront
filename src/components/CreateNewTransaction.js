import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
} from '../services/utilities';
import waiting from '../assets/images/waiting.gif';

const validate = values => {
	const errors = {};

	if (!values.patient_id || values.patient_id === '') {
		errors.patient_id = 'Please enter patient id ';
	}
	if (!values.description || values.description === '') {
		errors.description = 'Enter description';
	}

	if (!values.amount || values.amount === '') {
		errors.amount = 'please specify you amount';
	}

	if (!values.revenue_category || values.revenue_category === '') {
		errors.revenue_category = 'select revenue category';
	}

	if (!values.service_center || values.service_center === '') {
		errors.service_center = 'select service center';
	}

	return errors;
};
export class CreateNewTransaction extends Component {
	state = {
		submitting: false,
		revenueCategory: ['cash', 'paypoint'],
		serviceCategory: ['online', 'offline'],
	};
	render() {
		const { error } = this.props;
		const { submitting, revenueCategory, serviceCategory } = this.state;
		return (
			<div className="form-block w-100">
				<form>
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
								id="patient_id"
								name="patient_id"
								component={renderTextInput}
								label="Patient Id"
								type="text"
								placeholder="Enter Patient Id"
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="amount"
								name="amount"
								component={renderTextInput}
								label="Amount"
								type="number"
								min="0"
								placeholder="Enter Amount"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<Field
								id="revenue_category"
								name="revenue_category"
								component={renderSelect}
								label="Revenue Category"
								placeholder="Select Revenue Category"
								data={revenueCategory}
							/>
						</div>
						<div className="col-sm-6">
							<Field
								id="servvice_center"
								name="service_center"
								component={renderSelect}
								label="Service Center"
								placeholder="Select service center"
								data={serviceCategory}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<Field
								id="description"
								name="description"
								component={renderTextArea}
								label="Description"
								type="text"
								placeholder="Enter description"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-right">
							<button
								className="btn btn-primary"
								disabled={submitting}
								type="submit">
								{submitting ? (
									<img src={waiting} alt="submitting" />
								) : (
									'Create New Transaction'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

CreateNewTransaction = reduxForm({
	form: 'create_new_transaction',
	validate,
})(CreateNewTransaction);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			patient_id: '',
			description: '',
			amount: '',
			revenue_category: '',
			service_center: '',
		},
	};
};

export default connect(mapStateToProps, null)(CreateNewTransaction);
