import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	renderMultiselect,
} from '../../services/utilities';
import {
	API_URI,
	ethnicities,
	gender,
	insuranceStatus,
	maritalStatus,
	socket,
	yesNO,
} from '../../services/constants';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { createClinicalTask } from '../../actions/general';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';
import Popover from 'antd/lib/popover';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { patientSchema } from '../../services/validationSchemas';

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

class CreateImmunization extends Component {
	state = {
		submitting: false,
		discharged_date: null,
	};

	render() {
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Add Record</h6>
					<div className="element-box">
						<div className="form-block w-100">
							<div className="onboarding-content with-gradient">
								<form>
									<div className="modal-body">
										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														placeholder="Enter Name"
														name="name"
														type="text"
													/>
												</div>
											</div>
											<div className="col-sm">
												<div className="form-group">
													<label>Date of Enrollment</label>
													<input
														className="form-control"
														placeholder="04/12/1978"
														name="date"
														type="text"
													/>
												</div>
											</div>
											<div className="col-sm">
												<div className="form-group">
													<label>Type of Vaccine</label>
													<input
														className="form-control"
														name="vaccine_type"
														placeholder="Type of Vaccine"
														type="text"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													<label>Vaccine Batch No</label>
													<input
														className="form-control"
														placeholder="Vaccine Batch No"
														type="text"
														name="batch_no"
													/>
												</div>
											</div>
											<div className="col-sm">
												<div className="form-group">
													<label htmlFor="Prescription">Prescription</label>
													<Select id="prescription" options={yesNO} />
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer buttons-on-right">
										<button className="btn btn-default" type="button">
											{' '}
											Cancel
										</button>
										<button className="btn btn-primary" type="submit">
											{' '}
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentStep: state.patient.formStep,
	};
};

export default connect(mapStateToProps, {})(CreateImmunization);
