import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { Carousel } from 'antd';
import { loadLabourMeasurement } from '../../actions/patient';
import Select from 'react-select';
import {
	renderTextInput,
	request,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import {
	caput,
	moulding,
	descent,
	cervicalPosition,
} from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { fetchLabTests } from '../../actions/settings';

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
		labTestCategoryRaw: [],
		labTestCategory: [],
		labTests: [],
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
		this.fetchLabTestCategory();

		// fetching labtest disable until confirmed

		// console.log(this.props.LabTests.length, this.props.LabTests);
		// if (this.props.LabTests.length === 0) {
		// 	this.props
		// 		.fetchLabTests()
		// 		.then(response => {
		// this.filterTests(this.props.LabTests);
		// 			console.log(response, 'response');
		// 		})
		// 		.catch(e => {
		// 			notifyError(
		// 				e.message || 'could not fetch service categories and services'
		// 			);
		// 		});
		// } else {
		// 	this.filterTests(this.props.LabTests);
		// 	console.log(this.props.LabTests, 'else block');
		// }
	}

	fetchLabTestCategory = async () => {
		try {
			const { labourDetail } = this.props;
			const rs = await request(
				`lab-tests/categories?loadOnce=${true}&hmo_id=${
					labourDetail?.patient?.hmo_id
				}`,
				'GET',
				true
			);

			let data = [];
			rs.forEach((item, index) => {
				const res = { label: item.name, value: item.id };
				data = [...data, res];
			});
			this.setState({ labTestCategoryRaw: rs, labTestCategory: data });
		} catch (error) {
			console.log(error);
			notifyError('error fetching lab test category');
		}
	};

	handleChangeLabTestCategory = evt => {
		let value = String(evt.value);
		this.fetchLabTestsByCategory(value);
	};

	handleChangeProcedure = evt => {
		this.setState({ labTests: evt });
	};

	fetchLabTestsByCategory = id => {
		const { labTestCategoryRaw } = this.state;
		const rs = labTestCategoryRaw.find(cat => cat.id === Number(id));
		let labtests = [];
		const tests = rs.lab_tests || [];
		tests.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			labtests = [...labtests, res];
		});
		this.setState({ tests: labtests });
	};

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	// componentDidMount() {
	// 	this.fetchMeasurement();
	// }

	fetchMeasurement = async () => {
		const { labourDetail } = this.props;
		try {
			this.setState({ loading: true });
			const rs = await request(
				`labour-management/${labourDetail.id}/measurement`,
				'GET',
				true
			);
			console.log(rs);
			this.props.loadLabourMeasurement(rs);
			this.setState({ loading: false });
		} catch (e) {
			console.log(e);
			this.setState({ loading: false });
			notifyError('Error fetching labour measurement request');
		}
	};

	filterTests = tsts => {
		const tests = tsts.map(el => el.name);
		this.setState({ tests });
		console.log(tsts, 'Tests');
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

		// eslint-disable-next-line array-callback-return
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
		const mappedId = this.state.labTests.map(lbt => String(lbt.value));
		newData.labTests = mappedId;
		console.dir(newData);
		try {
			this.setState({ submitting: true });

			const rs = await request(
				`labour-management/measurement/${labourDetail.id}/save`,
				'POST',
				true,
				newData
			);
			console.log(rs);
			notifySuccess('succesfully submitted');
			this.fetchMeasurement();
			this.props.closeModals(false);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(
				e.message || 'Submission of labour measurement form not successful'
			);
		}
	};

	render() {
		const { submitting, examDate, tests, labTestCategory } = this.state;
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
							<h4 className="onboarding-title mb-1">Take Measurement</h4>
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
									<Carousel arrows infinite={false} className="p-4">
										<div>
											<div style={{ textAlign: 'left' }}>
												<p>
													True Labour Sign:Begins irregularly but becomes
													regular and predictable. Felt in the lower back and
													sweeps around the abdomen in a wave pattern.Continues
													no matter the woman's level of activity. Increases in
													duration,frequency and intensity with the passage of
													time.Accompanied by "show" (blood stained manus
													discharged) Achieved cervical efficement and cervical
													dilation
												</p>
												<p>
													False Labour Sign:Begins irregularly and remain
													irregular. Often disappear with ambulation or
													sleep.Felt first abdominally and remain confined to
													the abdomen and groin. Does not increase in
													duration,frequency or intensity with the passage of
													time. Show absent .Does not achieve cervical
													effacement and cervical dilation
												</p>
											</div>

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
										</div>

										<div className="row mt-1 mx-1 px-2 mb-4">
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
														** if there is bismeech,shoulder or face
														presentation, inform the Doctor
													</p>
												</div>
											</div>
										</div>
										<div>
											<div className="row px-3">
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
											<div className="row px-2">
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
											<div className="row px-2">
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

											<div className="row px-2">
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
										</div>

										<div className="row px-2">
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Has the woman passed urine since the last
														measurement
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
														Has cyatacin been adminstered during the current
														exam
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
											{/* lab test disabled until confirmed */}
											{/* <div className="col-sm-12">
												<label className="mx-1">Lab Tests</label>
												<Field
													id="labTests"
													name="labTests"
													component={renderMultiselect}
													label="Lab Tests"
													placeholder="What lab tests were done ?"
													data={tests}
												/>
											</div> */}
										</div>
										<div>
											<div className="row mt-2 px-2">
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
															<label className="mx-1">
																Difficult Breathing
															</label>
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
																onChange={date =>
																	this.setDate(date, 'examDate')
																}
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

											<div className="row">
												<div className="form-group col-sm-6">
													<label>Lab Test category</label>
													<Select
														name="test_category"
														placeholder="Select Test Category"
														options={labTestCategory}
														onChange={evt =>
															this.handleChangeLabTestCategory(evt)
														}
														required
													/>
												</div>
												<div className="form-group col-sm-6">
													<label>Lab Tests to request</label>
													<Select
														name="lab_tests"
														placeholder="Select lab tests to request"
														isMulti
														options={tests}
														onChange={evt => this.handleChangeProcedure(evt)}
														required
													/>
												</div>
											</div>

											<div className="row mt-3 px-2">
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
														className="btn btn-secondary ml-2"
														disabled={submitting}
														type="button">
														Cancel
													</button>
												</div>
											</div>
										</div>
									</Carousel>
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

export default connect(mapStateToProps, {
	closeModals,
	loadLabourMeasurement,
	fetchLabTests,
})(ModalCreateLabMeasurement);
