import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextInput } from '../../services/utilities';

import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
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
										<div className="col-sm-6 pl-0">
											<Field
												id="fetal_heart_rate"
												name="fetal_heart_rate"
												component={renderTextInput}
												label="Fetal heart rate"
												type="text"
												placeholder="What is your current fetal heart rate (beats per minute ) ?"
											/>
										</div>

										<div className="col-sm-6 pl-0">
											<Field
												id="cervical_dilation"
												name="cervical_dilation"
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
													name="fetal_head"
													component={'input'}
													type="radio"
													value="-3"
												/>
												<label className="mx-1">-3</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="-2"
												/>
												<label className="mx-1">-2</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="-1"
												/>
												<label className="mx-1">-1</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="-1"
												/>
												<label className="mx-1">-1</label>
											</div>
											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="0"
												/>
												<label className="mx-1">0</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="1"
												/>
												<label className="mx-1">1</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
													component="input"
													type="radio"
													value="2"
												/>
												<label className="mx-1">2</label>
											</div>

											<div className="col-sm-1">
												<Field
													name="fetal_head"
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
													name="mother_alive"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4 pl-0">
												<Field
													name="mother_alive"
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
												id="number_of_contraction"
												name="number_of_contraction"
												component={renderTextInput}
												label="What is the number of contractions per 10 minutes ?"
												type="text"
												placeholder="Enter number of contractions per 10 minutes "
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="duration_of_contraction"
												name="duration_of_contraction"
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
												id="blood_pressure"
												name="blood_pressure"
												component={renderTextInput}
												label="Blood Pressure ?"
												type="text"
												placeholder="Enter blood pressure"
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="current_pulse"
												name="current_pulse"
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
												id="current_temperature"
												name="current_temperature"
												component={renderTextInput}
												label="What is current temperature (&#8451;) ?"
												type="text"
												placeholder="Enter current temperature in &#8451;"
											/>
										</div>
										<div className="col-sm-6 pl-0">
											<Field
												id="sugar_level"
												name="sugar_level"
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
												id="respiraion_rate"
												name="respiraion_rate"
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
													name="decision"
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
													name="decision"
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
})(ModalCreateRecordVital);
export default connect(null, { closeModals })(ModalCreateRecordVital);
