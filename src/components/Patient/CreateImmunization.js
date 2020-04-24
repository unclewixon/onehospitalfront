import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	renderMultiselect,
} from '../../services/utilities';
import { API_URI, searchAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import moment from 'moment';
import searchingGIF from '../../assets/images/searching.gif';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';

const validate = values => {
	const errors = {};

	if (!values.prescription || values.prescription === '') {
		errors.prescription = 'select prescription';
	}

	if (!values.batch_no || values.batch_no === '') {
		errors.batch_no = 'please batch no';
	}

	if (!values.vaccine_type || values.vaccine_type === '') {
		errors.vaccine_type = 'please enter vaccine type';
	}
	return errors;
};

const prescription = [
	{
		id: 'yes',
		name: 'yes',
	},
	{
		id: 'no',
		name: 'no',
	},
];

class CreateImmunization extends Component {
	state = {
		submitting: false,
		discharged_date: null,
		date_of_enrol: '',
		query: '',
		patients: [],
		searching: false,
		patient_id: '',
		patient_name: '',
		patientError: false,
	};

	patient = React.createRef();

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};

	submitImmunization = async data => {
		if (!this.props.location.hash) {
			if (this.state.patient_id === '') {
				this.setState({ patientError: true });
				return;
			}
		}

		let values = {
			...data,
			date_of_enrol: this.state.date_of_enrol.toLocaleDateString(),
			patientId: this.props.location.hash
				? this.props.patient.id
				: this.state.patient_id,
		};

		this.setState({ submitting: true });
		try {
			//submit to the backend
			console.log(values);

			this.setState({ submitting: false });
			const { reset, history, location } = this.props;
			reset();
			//redirect to the appropraitate place
			history.push(
				location.hash ? `${location.pathname}#dashboard` : '/immunization'
			);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(e.message || 'Submission of antennatal form not successful');
		}
	};

	resetImmunization = () => {
		const { reset } = this.props;
		this.setState({
			date_of_enrol: '',
			patient_id: '',
			patient_name: '',
			patients: [],
		});

		if (!this.props.location.hash) {
			this.patient.current.value = '';
		}

		reset();
	};

	handlePatientChange = e => {
		this.setState({ query: e.target.value });
		this.searchPatient();
	};

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ searching: true });
				const rs = await request(
					`${API_URI}${searchAPI}?q=${this.state.query}`,
					'GET',
					true
				);
				this.setState({ patients: rs, searching: false });
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({});
			}
		}
	};
	patientSet = pat => {
		// setValue('patient_id', pat.id);

		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		this.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
		this.setState({ patients: [], patientError: false });
	};

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
	};

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting, searching, patients, patient_name } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Immunization Enrolment</h6>
					<div className="element-box">
						<div className="form-block w-100">
							<div className="onboarding-content with-gradient">
								<form onSubmit={handleSubmit(this.submitImmunization)}>
									<div className="modal-body">
										{this.props.location.hash ? null : (
											<div className="row">
												<div className="form-group col-sm-12">
													<label>
														Patient
														{this.state.patientError ? (
															<span className="text-danger">
																{' '}
																* Please search and select patient
															</span>
														) : (
															''
														)}
													</label>

													<input
														className="form-control"
														placeholder="Search for patient"
														type="text"
														name="patient_id"
														ref={this.patient}
														defaultValue={patient_name}
														id="patient"
														onChange={this.handlePatientChange}
														autoComplete="off"
														required
													/>

													{searching && (
														<div className="searching text-center">
															<img alt="searching" src={searchingGIF} />
														</div>
													)}

													{patients &&
														patients.map(pat => {
															return (
																<div
																	style={{ display: 'flex' }}
																	key={pat.id}
																	className="element-box">
																	<a
																		onClick={() => this.patientSet(pat)}
																		className="ssg-item cursor">
																		{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
																		<div
																			className="item-name"
																			dangerouslySetInnerHTML={{
																				__html: `${pat.surname} ${pat.other_names}`,
																			}}
																		/>
																	</a>
																</div>
															);
														})}
												</div>
											</div>
										)}
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>Date of Enrollment</label>
													<div className="custom-date-input">
														<DatePicker
															selected={this.state.date_of_enrol}
															onChange={date =>
																this.setDate(date, 'date_of_enrol')
															}
															peekNextMonth
															showMonthDropdown
															showYearDropdown
															dropdownMode="select"
															dateFormat="dd-MMM-yyyy"
															className="single-daterange form-control"
															placeholderText="Select date of enrollment"
															required
														/>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<Field
													id="vaccine_type"
													name="vaccine_type"
													component={renderTextInput}
													label="Type of Vaccine"
													type="text"
													placeholder="Type of Vaccine"
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-sm-6">
												<Field
													id="batch_no"
													name="batch_no"
													component={renderTextInput}
													label="Vaccine Batch No"
													type="text"
													placeholder="Vaccine Batch No"
												/>
											</div>

											<div className="col-sm-6">
												<Field
													id="prescription"
													name="prescription"
													component={renderSelect}
													label="Select Prescription"
													placeholder="Select prescription"
													data={prescription}
												/>
											</div>
										</div>
									</div>

									<div className="modal-footer buttons-on-right">
										<button
											className="btn btn-default"
											type="button"
											onClick={() => {
												this.resetImmunization();
											}}>
											{' '}
											Cancel
										</button>
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

CreateImmunization = reduxForm({
	form: 'immunization',
	validate,
})(CreateImmunization);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, {})(CreateImmunization));
