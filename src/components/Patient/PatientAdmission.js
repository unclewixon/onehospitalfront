import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';

import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { patientAPI, USER_RECORD } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess } from '../../services/notify';
import { setPatientRecord, toggleProfile } from '../../actions/user';
import SSRStorage from '../../services/storage';

const storage = new SSRStorage();

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
	{ id: 'Stable', name: 'Stable' },
	{ id: 'Critical', name: 'Critical' },
	{ id: 'Intermediate', name: 'Intermediate' },
];

class PatientAdmission extends Component {
	state = {
		submitting: false,
		discharged_date: null,
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	admitPatient = async data => {
		try {
			const { patient } = this.props;
			const { discharged_date } = this.state;

			const formData = {
				healthState: data.health_state,
				riskToFall: data.risk === true,
				nicu: data.nicu === true,
				reason: data.reason,
				discharge_date: moment(discharged_date).format('YYYY-MM-DD'),
			};

			this.setState({ submitting: true });

			const url = `${patientAPI}/admissions/${patient.id}/save`;
			const rs = await request(url, 'POST', true, formData);
			this.setState({ submitting: false });
			this.props.setPatientRecord(rs.patient);
			this.props.reset('admit_patient');
			notifySuccess('Admission Started!');
			storage.removeItem(USER_RECORD);
			this.props.toggleProfile(false);
			this.props.history.push('/nurse/in-patients/care');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not start admission',
			});
		}
	};

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting, discharged_date } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Admit Patient</h6>
					<div className="element-box">
						<div className="form-block w-100">
							<form onSubmit={handleSubmit(this.admitPatient)}>
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
										<div
											className="d-flex "
											style={{
												position: 'relative',
												top: '25%',
												marginLeft: '20px',
											}}>
											<div>
												<Field
													name="nicu"
													id="nicu"
													component={renderTextInput}
													type="checkbox"
												/>
											</div>
											<label
												htmlFor="nicu"
												className="ml-1"
												style={{ marginTop: '-2px' }}>
												Admit to NICU
											</label>
										</div>
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

								<div>
									<div className="col-sm-12 text-right">
										<button className="btn btn-primary" disabled={submitting}>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Admit'
											)}
										</button>
										<button className="btn btn-secondary">Cancel</button>
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
	form: 'admit_patient',
	validate,
})(PatientAdmission);

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { setPatientRecord, reset, toggleProfile })(
		PatientAdmission
	)
);
