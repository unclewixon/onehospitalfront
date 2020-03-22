import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import moment from 'moment';
import {
	renderTextInput,
	request,
	renderSelect,
} from '../../services/utilities';
import TimePicker from 'antd/lib/time-picker';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';

const validate = values => {
	const errors = {};
	if (!values.cervical_length) {
		errors.cervical_length = 'enter cervical_length';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.cervical_length)) {
		errors.cervical_length = 'Please enter a valid number';
	}
	if (!values.cervical_effacement) {
		errors.cervical_effacement = 'enter cervical_effacement';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.cervical_effacement)) {
		errors.cervical_effacement = 'Please enter a valid number';
	}

	return errors;
};
class ModalCreateLabMeasurement extends Component {
	state = {
		submitting: false,
		exam_date: null,
		exam_time: null,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	render() {
		const { submitting, exam_time, exam_date } = this.state;
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
							<h4 className="onboarding-title">Create Labour Measurement</h4>
							<div style={{ textAlign: 'left' }}>
								<p>
									True Labour Sign:Begins irregularly but becomes regular and
									predictable. Felt in the lower back and sweeps around the
									abdomen in a wave pattern.Continues no matter the woman's
									level of activity. Increases in duration,frequency and
									intensity with the passage of time.Accompanied by "show"
									(blood stained manus discharged) Achieved cervical efficement
									and cervical dilation
								</p>
								<p>
									False Labour Sign:Begins irregularly and remain irregular.
									Often disappear with ambulation or sleep.Felt first
									abdominally and remain confined to the abdomen and groin. Does
									not increase in duration,frequency or intensity with the
									passage of time. Show absent .Does not achieve cervical
									effacement and cervical dilation
								</p>
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
										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Select if patient is in true or false labour
												</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="labour"
															component="input"
															type="radio"
															value="true"
															label="True Labour"
														/>
														<label className="mx-1">True Labour</label>
													</div>

													<div className="mx-2">
														<Field
															name="labour"
															component="input"
															type="radio"
															value="false"
															label="False Labour"
														/>
														<label className="mx-1">False Labour</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<h3>Abdominal Palpation/Examination</h3>

										<div className="col-sm-12">
											<div className="form-group">
												<label>Presentation</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="caphaic"
														/>
														<label className="mx-1">Caphaic</label>
													</div>

													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="bismac"
														/>
														<label className="mx-1">Bismac</label>
													</div>
													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="shoulder"
														/>
														<label className="mx-1">Shoulder</label>
													</div>
													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="any other"
														/>
														<label className="mx-1"> any other</label>
													</div>
												</div>
												<p>** If head is fat ,Please inform the Doctor</p>
											</div>
										</div>

										<div className="col-sm-12">
											<div className="form-group">
												<label>Position of fetus</label>
											</div>
										</div>

										<div className="col-sm-12">
											<div className="form-group">
												<label>Fetal lies</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="fetal_lie"
															component="input"
															type="radio"
															value="longitudinal"
														/>
														<label className="mx-1">longitudinal</label>
													</div>

													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="oblique"
														/>
														<label className="mx-1">Oblique</label>
													</div>
													<div className="mx-2">
														<Field
															name="presentation"
															component="input"
															type="radio"
															value="transverse"
														/>
														<label className="mx-1">Transverse</label>
													</div>
												</div>
												<p>
													** if there is bismeech,shoulder or face presentation,
													inform the Doctor
												</p>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<Field
												id="descent"
												name="descent"
												component={renderSelect}
												label="Descent"
												placeholder="Select Department"
												data={['old', 'young']}
											/>
										</div>
										<p>** if buttocks felt, inform the Doctor</p>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="cervical_length"
												name="cervical_length"
												component={renderTextInput}
												label="Cervical Length (cm)"
												type="text"
												placeholder="Enter cervical length"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="cervical_effacement"
												name="cervical_effacement"
												component={renderTextInput}
												label="Cervical effacement (%)"
												type="text"
												placeholder="Enter cervical effacement"
											/>
										</div>

										<div className="col-sm-4">
											<Field
												id="cervical_position"
												name="cervical_position"
												component={renderSelect}
												label="Cervical position"
												placeholder="Enter cervical position"
												data={['kia', 'we']}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Membrances/Liquor</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="membranes"
															component={'input'}
															type="radio"
															value="intact Membrance"
														/>
														<label className="mx-1">intact Membrance</label>
													</div>

													<div className="mx-2">
														<Field
															name="membranes"
															component="input"
															type="radio"
															value="clear"
														/>
														<label className="mx-1">Clear</label>
													</div>
													<div className="mx-2">
														<Field
															name="membranes"
															component="input"
															type="radio"
															value="Blood stained"
														/>
														<label className="mx-1">Blood stained</label>
													</div>
													<div className="mx-2">
														<Field
															name="membranes"
															component="input"
															type="radio"
															value="light maconium staining"
														/>
														<label>Light Maconium Staining</label>
													</div>

													<div className="mx-2">
														<Field
															name="membranes"
															component="input"
															type="radio"
															value="heavy maconium staining"
														/>
														<label>Heavy Maconium Staining</label>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6">
											<Field
												id="moulding"
												name="moulding"
												component={renderSelect}
												label="Moulding"
												placeholder="select moulding"
												data={['kia', 'we']}
											/>
										</div>

										<div className="col-sm-6">
											<Field
												id="caput"
												name="caput"
												component={renderSelect}
												label="Caput"
												placeholder="select caput"
												data={['kia', 'we']}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Has the woman passed urine since the last measurement
												</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="passed_urine"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="passed_urine"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>
										</div>

										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Has cyatacin been adminstered during the current exam
												</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="cyatacin"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="cyatacin"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>
										</div>

										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Has other Drugs or IV fluids been adminstered during
													current exam ?{' '}
												</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="other_drug"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="other_drug"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-12">
											<Field
												id="lab_tests"
												name="lab_tests"
												component={renderTextInput}
												label="Lab Tests"
												placeholder="What lab tests were done ?"
											/>
										</div>
									</div>
									<div className="row">
										<h3>Other Measurements</h3>

										<div className="col-md-12 p-0">
											<div className="col-md-12 d-flex">
												<div className="col-sm-4 pl-0">
													<Field
														name="difficult_breathing"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">Difficult Breathing</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="shock"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">Shock</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="vaginal_bleeding"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">Vaginal bleeding</label>
												</div>
											</div>
											<div className="col-md-12 d-flex">
												<div className="col-sm-4 pl-0">
													<Field
														name="convulsion"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">
														Convulsion or Unconsciousness
													</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="prosipned_cord"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">Prosipned cord</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="fetal_distress"
														component="input"
														type="checkbox"
													/>
													<label className="mx-1">Fetal distress</label>
												</div>
											</div>
										</div>
										<div className="col-sm-12">
											<Field
												id="examiner_name"
												name="examiner_name"
												component={renderTextInput}
												label="Examiner's  Name"
												placeholder="Examiner's name?"
											/>
										</div>
										<div className="col-sm-12 d-flex">
											<div className="col-md-6 pl-0">
												<TimePicker
													use12Hours
													defaultValue={moment('13:30:56', 'HH:mm:ss')}
												/>
											</div>

											<div className="col-md-6 pl-0">
												<DatePicker
													defaultValue={moment('2015-01-01', 'mm/dd/yyyy')}
												/>
											</div>
										</div>
									</div>
									<div className="row mt-3">
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
												disabled={submitting}
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

ModalCreateLabMeasurement = reduxForm({
	form: 'labour_measurement',
	validate,
})(ModalCreateLabMeasurement);
export default connect(null, { closeModals })(ModalCreateLabMeasurement);
