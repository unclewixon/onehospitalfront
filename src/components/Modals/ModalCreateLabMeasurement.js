import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import moment from 'moment';
import {
	renderTextInput,
	request,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import {
	API_URI,
	patientAPI,
	searchAPI,
	labourAPI,
} from '../../services/constants';
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import {
	caput,
	moulding,
	descent,
	cervicalPosition,
} from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { getAllLabTests, getAllLabGroups } from '../../actions/settings';
const validate = values => {
	const errors = {};
	if (!values.cervicalLength) {
		errors.cervicalLength = 'enter cervical length';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.cervicalLength)) {
		errors.cervicalLength = 'Please enter a valid number';
	}
	if (!values.cervicalEffacement) {
		errors.cervicalEffacement = 'enter cervical effacement';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.cervicalEffacement)) {
		errors.cervicalEffacement = 'Please enter a valid number';
	}
	if (!values.membranes) {
		errors.membranes = 'select a membrane type';
	}
	if (!values.cervicalPosition || values.cervicalPosition === '') {
		errors.cervicalPosition = 'select a cervical position';
	}

	return errors;
};
const otherMeasurement = [
	'difficult_breathing',
	'shock',
	'vaginal_bleeding',
	'convulsion_or_unconsciousness',
	'prospined_cord',
	'fetal_distress',
];

const position = [
	{
		id: 'Cephalic',
		name: 'Cephalic',
	},
	{
		id: 'Breech',
		name: 'Breech',
	},
];
class ModalCreateLabMeasurement extends Component {
	state = {
		submitting: false,
		exam_date: null,
		exam_time: null,
		examDate: '',
		tests: [],
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
		if (this.props.LabTests.length === 0) {
			this.props
				.getAllLabTests()
				.then(response => {
					this.filterTests(this.props.LabTests);
				})
				.catch(e => {
					notifyError(
						e.message || 'could not fetch service categories and services'
					);
				});
		} else {
			this.filterTests(this.props.LabTests);
		}
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	filterTests = tsts => {
		const tests = tsts.map(el => el.name);
		this.setState({ tests });
	};

	onChange = (time, timeString) => {
		console.log(time, timeString);
	};

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};

	createMeasurement = async data => {
		let newData = {
			measurements: [],
		};

		Object.entries(data).map(el => {
			if (otherMeasurement.includes(el[0])) {
				newData['measurements'].push(el[0].split('_').join(' '));
			} else {
				newData[el[0]] = el[1];
			}
		});

		newData['dateOfMeasurement'] = moment(this.state.examDate).format(
			'DD/MM/YYYY'
		);
		newData['timeOfMeasurement'] = moment(this.state.examDate).format('LT');
		newData['examiner_id'] = this.props.staff.profile.details.id;

		console.log(this.props.staff.profile.details.id, newData);
		const { labourDetail } = this.props;
		newData = { ...newData, ...labourDetail };
		console.dir(newData);
		try {
			this.setState({ submitting: true });

			const rs = await request(
				`${API_URI}/labour-management/measurement/${labourDetail.id}/save`,
				'POST',
				true,
				newData
			);
			console.log(rs);
			notifySuccess('succesfully submitted');
			this.props.closeModals(false);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(
				e.message || 'Submission of labour measurement form not successful'
			);
		}
	};

	render() {
		const { submitting, exam_time, exam_date, examDate, tests } = this.state;
		const { error, handleSubmit } = this.props;
		const { first_name, last_name } = this.props.staff.profile.details;
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
								<form onSubmit={handleSubmit(this.createMeasurement)}>
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
															name="isFalseLabour"
															component="input"
															type="radio"
															value="true"
															label="True Labour"
														/>
														<label className="mx-1">True Labour</label>
													</div>

													<div className="mx-2">
														<Field
															name="isFalseLabour"
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
												{/* <label>Position of fetus</label> */}
												<Field
													id="positionOfFetus"
													name="positionOfFetus"
													component={renderSelect}
													label="Position of Fetals"
													placeholder="Select Position of Fetals"
													data={position}
												/>
											</div>
										</div>

										<div className="col-sm-12">
											<div className="form-group">
												<label>Fetal lies</label>
												<div className="d-flex">
													<div className="mx-2">
														<Field
															name="fetalLies"
															component="input"
															type="radio"
															value="longitudinal"
														/>
														<label className="mx-1">longitudinal</label>
													</div>

													<div className="mx-2">
														<Field
															name="fetalLies"
															component="input"
															type="radio"
															value="oblique"
														/>
														<label className="mx-1">Oblique</label>
													</div>
													<div className="mx-2">
														<Field
															name="fetalLies"
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
												data={descent}
											/>
										</div>
										<p>** if buttocks felt, inform the Doctor</p>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="cervicalLength"
												name="cervicalLength"
												component={renderTextInput}
												label="Cervical Length (cm)"
												type="text"
												placeholder="Enter cervical length"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="cervicalEffacement"
												name="cervicalEffacement"
												component={renderTextInput}
												label="Cervical effacement (%)"
												type="text"
												placeholder="Enter cervical effacement"
											/>
										</div>

										<div className="col-sm-4">
											<Field
												id="cervicalPosition"
												name="cervicalPosition"
												component={renderSelect}
												label="Cervical position"
												placeholder="Enter cervical position"
												data={cervicalPosition}
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
												data={moulding}
											/>
										</div>

										<div className="col-sm-6">
											<Field
												id="caput"
												name="caput"
												component={renderSelect}
												label="Caput"
												placeholder="select caput"
												data={caput}
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
															name="hasPassedUrine"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="hasPassedUrine"
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
															name="administeredCyatacin"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="administeredCyatacin"
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
															name="administeredDrugs"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>

													<div className="mx-2">
														<Field
															name="administeredDrugs"
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
											<label className="mx-1">Lab Tests</label>
											<Field
												id="labTests"
												name="labTests"
												component={renderMultiselect}
												label="Lab Tests"
												placeholder="What lab tests were done ?"
												data={tests}
											/>
										</div>
									</div>
									<div className="row mt-2">
										<h3>Other Measurements</h3>

										<div className="col-md-12 p-0">
											<div className="col-md-12 d-flex">
												<div className="col-sm-4 pl-0">
													<Field
														name="difficult_breathing"
														component="input"
														type="checkbox"
														value="Difficult Breathing"
													/>
													<label className="mx-1">Difficult Breathing</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="shock"
														component="input"
														type="checkbox"
														value="Shock"
													/>
													<label className="mx-1">Shock</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="vaginal_bleeding"
														component="input"
														type="checkbox"
														value="Vaginal bleeding"
													/>
													<label className="mx-1">Vaginal bleeding</label>
												</div>
											</div>
											<div className="col-md-12 d-flex">
												<div className="col-sm-4 pl-0">
													<Field
														name="convulsion_or_unconsciousness"
														component="input"
														type="checkbox"
														value="Convulsion or Unconsciousness"
													/>
													<label className="mx-1">
														Convulsion or Unconsciousness
													</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="prospined_cord"
														component="input"
														type="checkbox"
														value="Prospined cord"
													/>
													<label className="mx-1">Prosipned cord</label>
												</div>

												<div className="col-sm-4 pl-0">
													<Field
														name="fetal_distress"
														component="input"
														type="checkbox"
														value="Fetal distress"
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
												placeholder={first_name + ' ' + last_name}
												readOnly
											/>
										</div>
										{/* <div className="col-sm-12 d-flex">
											<div className="col-md-6 pl-0">
												<TimePicker
													use12Hours
													defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
													onChange={() => this.onChange()}
												/>
											</div>

											<div className="col-md-6 pl-0">
												<DatePicker
													defaultValue={moment('2015-01-01', 'mm/dd/yyyy')}
												/>
											</div>
										</div> */}
										<div className="col-sm-12">
											<div className="form-group">
												<label> Time and Date of measurement</label>
												<div className="custom-date-input">
													<DatePicker
														selected={examDate}
														onChange={date => this.setDate(date, 'examDate')}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														className="single-daterange form-control"
														placeholderText="Select date and time"
														timeInputLabel="Time:"
														dateFormat="MM/dd/yyyy h:mm aa"
														showTimeInput
														minDate={new Date()}
														required
													/>
												</div>
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

const mapStateToProps = state => {
	return {
		labourDetail: state.patient.labourDetail,
		staff: state.user,
		LabTests: state.settings.lab_tests,
	};
};

export default connect(mapStateToProps, { closeModals, getAllLabTests })(
	ModalCreateLabMeasurement
);
