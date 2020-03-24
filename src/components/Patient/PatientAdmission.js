import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	renderMultiselect,
} from '../../services/utilities';
import { API_URI, socket } from '../../services/constants';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { createClinicalTask } from '../../actions/general';

const validate = values => {
	const errors = {};

	if (!values.leave_type || values.leave_type === '') {
		errors.leave_type = 'select leave type';
	}
	if (!values.reason || values.reason === '') {
		errors.reason = 'please specify you reason';
	}

	return errors;
};

const healthState = [
	{ label: 'Critical', value: 'Critical' },
	{ label: 'Mild', value: 'Mild' },
	{ label: 'Normal', value: 'Normal' },
];
class PatientAdmission extends Component {
	state = {
		submitting: false,
		discharged_date: null,
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	changeTask = e => {
		if (e.target.checked) {
			this.props.createClinicalTask(true);
		}
	};
	render() {
		const { error, leave_categories, vitalSign } = this.props;
		const { submitting, discharged_date } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Admit Patient</h6>
					<div className="element-box">
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
											id="health_state"
											name="health_state"
											component={renderSelect}
											label="Patient current Health State"
											placeholder="Select patient health state"
											data={healthState}
										/>
									</div>

									<div className="col-sm-6 d-flex align-items-center">
										<div
											className="d-flex"
											style={{ position: 'relative', top: '25%' }}>
											<div>
												<Field
													name="risk"
													id="risk"
													component={renderTextInput}
													type="checkbox"
												/>
											</div>
											<label
												htmlFor="risk"
												className="ml-1"
												style={{ marginTop: '-2px' }}>
												Risk to Fall ?
											</label>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-6">
										<Field
											id="location"
											name="location"
											component={renderSelect}
											label="Select Location"
											placeholder="Select Location"
											data={['Deda Hospital', 'other']}
										/>
									</div>
									<div className="col-sm-6">
										<Field
											id="ward"
											name="ward"
											component={renderSelect}
											label="Admit to Ward"
											placeholder="Select ward admitted to"
											data={['Exclusive Suite', 'Normal']}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-6">
										<Field
											id="reason"
											name="reason"
											component={renderTextArea}
											label="Specify reason for admission"
											type="text"
											placeholder="Enter reason for admission"
										/>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<label>Anticipated discharge date</label>
											<div className="custom-date-input">
												<DatePicker
													selected={discharged_date}
													onChange={date =>
														this.setDate(date, 'discharged_date')
													}
													peekNextMonth
													showMonthDropdown
													showYearDropdown
													dropdownMode="select"
													dateFormat="dd-MMM-yyyy"
													className="single-daterange form-control"
													placeholderText="anticipated discharged date"
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="row my-2">
									<div className="col-sm-12">
										<button
											className="btn btn-link text-left"
											style={{ textDecoration: 'underline' }}
											type="button"
											onClick={() => this.props.createClinicalTask(true)}>
											Create a Clinical task ?
										</button>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-6">
										<label>Care Givers</label>
										<Field
											name="care_givers"
											component={renderMultiselect}
											defaultValue={[]}
											data={['Guitar', 'Cycling', 'Hiking']}
										/>
									</div>
									<div className="col-sm-6">
										<Field
											id="primary_care_giver"
											name="primary_care_giver"
											component={renderSelect}
											label="Primary Care Giver"
											placeholder="-- select primary care giver --"
											data={healthState}
										/>
									</div>
								</div>

								<div>
									<div className="col-sm-12 text-right">
										<button className="btn btn-primary" disabled={submitting}>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Admit'
											)}
										</button>
										<button className="btn btn-primary">Cancel</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PatientAdmission = reduxForm({
	form: 'create_patient_admission',
	validate,
})(PatientAdmission);

export default connect(null, { createClinicalTask })(PatientAdmission);
