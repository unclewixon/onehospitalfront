import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';

import {
	confirmAction,
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { patientAPI, USER_RECORD } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess } from '../../services/notify';
import { toggleProfile } from '../../actions/user';
import SSRStorage from '../../services/storage';

const storage = new SSRStorage();

const validate = values => {
	const errors = {};

	if (
		!values.health_state ||
		(values.health_state && values.health_state === '')
	) {
		errors.health_state = 'select state of health';
	}

	if (!values.reason || values.reason === '') {
		errors.reason = 'please specify your reason for admitting patient';
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
	};

	doAdmitPatient =async (data) => {
		try {
			const { patient } = this.props;
			this.setState({ submitting: true });
			const formData = { ...data, nicu: data.nicu === true };
			const url = `${patientAPI}/admissions/${patient.id}/save`;
			await request(url, 'POST', true, formData);
			this.setState({ submitting: false });
			this.props.reset('admit_patient');
			notifySuccess('Admission Started!');
			storage.removeItem(USER_RECORD);
			this.props.toggleProfile(false);
			if (data.nicu === true) {
				this.props.history.push('/nicu');
			} else {
				this.props.history.push('/nurse/in-patients/admitted');
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not start admission',
			});
		}
	}

	admitPatient = async data => {
		confirmAction(
			this.doAdmitPatient,
			data,
			'Do you want to admit patient?',
			'Are you sure?'
		);
	};

	render() {
		const { error, handleSubmit, location } = this.props;
		const { submitting } = this.state;
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
											label="Health State"
											placeholder="Select health state"
											data={healthState}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6 d-flex align-items-center">
										<div className="d-flex relative mt-3">
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
												style={{ marginTop: '-2px' }}
											>
												Admit to NICU
											</label>
										</div>
									</div>
								</div>
								<div className="row mt-2">
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
								</div>
								<div className="col-sm-12">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Admit'
										)}
									</button>
									<Link
										to={`${location.pathname}#dashboard`}
										className="btn btn-secondary"
									>
										Cancel
									</Link>
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
	connect(mapStateToProps, { reset, toggleProfile })(PatientAdmission)
);
