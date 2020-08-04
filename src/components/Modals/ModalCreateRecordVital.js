import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextInput, request } from '../../services/utilities';

import { closeModals } from '../../actions/general';
import { API_URI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.bloodPressure) {
		errors.bloodPressure = 'enter blood pressure';
	} else if (
		!/^\d+(\.\d{1,2})?\/\d+(\.\d{1,2})?$/i.test(values.bloodPressure)
	) {
		errors.bloodPressure = 'Please enter a proper format like 110/70';
	}
	if (!values.bloodSugarLevel) {
		errors.bloodSugarLevel = 'enter blood sugar level';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.bloodSugarLevel)) {
		errors.bloodSugarLevel = 'Please enter a valid number';
	}
	if (!values.cervicalDialation) {
		errors.cervicalDialation = 'enter cervical dialation';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.cervicalDialation)) {
		errors.cervicalDialation = 'Please enter a valid number';
	}
	if (!values.currentPulse) {
		errors.currentPulse = 'enter current pulse';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.currentPulse)) {
		errors.currentPulse = 'Please enter a valid number';
	}
	if (!values.currentTemperature) {
		errors.currentTemperature = 'enter current temperature';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.currentTemperature)) {
		errors.currentTemperature = 'Please enter a valid number';
	}
	if (!values.durationOfContractions) {
		errors.durationOfContractions = 'enter duration of pulse';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.durationOfContractions)) {
		errors.durationOfContractions = 'Please enter a valid number';
	}
	if (!values.fetalHeartRate) {
		errors.fetalHeartRate = 'enter fetal heart rate';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.fetalHeartRate)) {
		errors.fetalHeartRate = 'Please enter a valid number';
	}
	if (!values.respirationRate) {
		errors.respirationRate = 'enter respiration rate';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.respirationRate)) {
		errors.respirationRate = 'Please enter a valid number';
	}
	if (!values.numberOfContractions) {
		errors.numberOfContractions = 'enter numbe of contractions';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.numberOfContractions)) {
		errors.numberOfContractions = 'Please enter a valid number';
	}
	if (!values.nextAction) {
		errors.nextAction = 'select a next action type';
	}
	if (!values.isMotherAlive || values.isMotherAlive === '') {
		errors.isMotherAlive = 'select if mother is alive';
	}

	if (!values.fetalHeadDescent || values.fetalHeadDescent === '') {
		errors.fetalHeadDescent = 'select a fetal head descent';
	}

	return errors;
};
export class ModalCreateRecordVital extends Component {
	state = {
		submitting: false,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	createRecord = async data => {
		try {
			const { labourDetail } = this.props;

			this.setState({ submitting: true });
			const rs = await request(
				`labour-management/vital/${labourDetail.id}/save`,
				'POST',
				true,
				data
			);
			console.log(rs);
			notifySuccess('vital record succesfully submitted');

			this.props.closeModals(false);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(e.message || 'Submission of vital not successful');
		}
	};
	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title"> Record Vital</h4>

							<div className="row alert alert-warning">
								True Labour has not started;We cannot take readings
							</div>

							<div className="form-block">
								<form onSubmit={handleSubmit(this.createRecord)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}

									<div className="row">
										<div className="col-sm-6 pl-0">
											<Field
												id="fetalHeartRate"
												name="fetalHeartRate"
												component={renderTextInput}
												label="Fetal heart rate"
												type="text"
												placeholder="What is your current fetal heart rate (beats per minute ) ?"
											/>
										</div>

										<div className="col-sm-6 pl-0">
											<Field
												id="cervicalDialation"
												name="cervicalDialation"
												component={renderTextInput}
												label="Cervical dilation"
												placeholder="What is the current crevical dilation (cms) ?"
											/>
										</div>
									</div>

									<div className="row mt-2">
										<label>Station of the fetal head (Descent ?)</label>

										<div className="col-md-12 pl-0 d-flex">
											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component={'input'}
													type="radio"
													value="-3"
												/>
												<label className="mx-1">-3</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="-2"
												/>
												<label className="mx-1">-2</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="-1"
												/>
												<label className="mx-1">-1</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="0"
												/>
												<label className="mx-1">0</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="1"
												/>
												<label className="mx-1">1</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="2"
												/>
												<label className="mx-1">2</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetalHeadDescent"
													component="input"
													type="radio"
													value="3"
												/>
												<label className="mx-1">3</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Is mother alive ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4 pl-0">
												<Field
													name="isMotherAlive"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4 pl-0">
												<Field
													name="isMotherAlive"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<div className="col-sm-6 pl-0">
											<Field
												id="numberOfContractions"
												name="numberOfContractions"
												component={renderTextInput}
												label="What is the number of contractions per 10 minutes ?"
												type="text"
												placeholder="Enter number of contractions per 10 minutes "
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="durationOfContractions"
												name="durationOfContractions"
												component={renderTextInput}
												label="What is the duration of contractions(seconds) ?"
												type="text"
												placeholder="Enter duration of contractions(seconds) "
											/>
										</div>
									</div>

									<div className="row mt-2">
										<div className="col-sm-6 pl-0">
											<Field
												id="bloodPressure"
												name="bloodPressure"
												component={renderTextInput}
												label="Blood Pressure ?"
												type="text"
												placeholder="systolic/diastolic"
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="currentPulse"
												name="currentPulse"
												component={renderTextInput}
												label="What is current pulse ?"
												type="text"
												placeholder="Enter current pulse"
											/>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-sm-6 pl-0">
											<Field
												id="currentTemperature"
												name="currentTemperature"
												component={renderTextInput}
												label="What is current temperature (&#8451;) ?"
												type="text"
												placeholder="Enter current temperature in &#8451;"
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="bloodSugarLevel"
												name="bloodSugarLevel"
												component={renderTextInput}
												label="What is the blood sugar level (mg/dl)?"
												type="text"
												placeholder="Enter blood sugar level"
											/>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-sm-12 pl-0">
											<Field
												id="respirationRate"
												name="respirationRate"
												component={renderTextInput}
												label="What is the current respiration rate per minute?"
												type="text"
												placeholder="Enter current respiration rate per minute"
											/>
										</div>
									</div>

									<div className="row mt-2">
										<label>What would you like to do ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-6 pl-0">
												<Field
													name="nextAction"
													component="input"
													type="radio"
													value="Flag this patient for increased monitoring. Continue exam "
												/>
												<label className="mx-1">
													Flag this patient for increased monitoring. Continue
													exam{' '}
												</label>
											</div>
											<div className="col-sm-6 pl-0">
												<Field
													name="nextAction"
													component="input"
													type="radio"
													value="stop exam"
												/>
												<label className="mx-1">Stop exam</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Save'
												)}
											</button>

											<button
												className="btn btn-primary ml-2"
												onClick={() => this.props.closeModals(false)}
												type="button">
												Cancel
											</button>
										</div>
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

ModalCreateRecordVital = reduxForm({
	form: 'record_vital',
	validate,
})(ModalCreateRecordVital);

const mapStateToProps = state => {
	return {
		labourDetail: state.patient.labourDetail,
	};
};

export default connect(mapStateToProps, { closeModals })(
	ModalCreateRecordVital
);
