import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
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
import { toggleProfile } from '../../actions/user';
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
	};

	admitPatient = async data => {
		try {
			const { patient } = this.props;

			const formData = {
				healthState: data.health_state,
				riskToFall: data.risk === true,
				nicu: data.nicu === true,
				reason: data.reason,
			};

			this.setState({ submitting: true });

			const url = `${patientAPI}/admissions/${patient.id}/save`;
			await request(url, 'POST', true, formData);
			this.setState({ submitting: false });
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
											label="Patient current Health State"
											placeholder="Select patient health state"
											data={healthState}
										/>
									</div>
								</div>
								<div className="row">
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
								</div>
								<div className="col-sm-12">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Admit'
										)}
									</button>
									<button className="btn btn-secondary">Cancel</button>
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
