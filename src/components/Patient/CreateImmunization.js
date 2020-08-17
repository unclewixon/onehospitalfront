/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import ImmunizationPrescription from './ImmunizationPrescription';
import { renderSelect, renderTextInput } from '../../services/utilities';
import { searchAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { addImmunization, addImmunizationRequest } from '../../actions/patient';

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

const selector = formValueSelector('immunization');

class CreateImmunization extends Component {
	state = {
		submitting: false,
		discharged_date: '',
		nextVisitDate: '',
		dateOfAdministration: '',
		query: '',
		patients: [],
		searching: false,
		patient_id: '',
		patient_name: '',
		patientError: false,
		staffError: false,
		staff_name: '',
		staff_id: '',
		searchingStaff: false,
		staffs: [],
		prescriptions: [],
	};

	patient = React.createRef();
	staff = React.createRef();

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

		this.setState({ submitting: true });
		let values = {
			...data,
			nextVisitDate: this.state.nextVisitDate.toLocaleDateString(),
			dateOfAdministration: this.state.dateOfAdministration.toLocaleDateString(),
			patient_id: this.props.location.hash
				? this.props.patient.id
				: this.state.patient_id,
			prescription: data.prescription === 'yes' ? this.state.prescriptions : [],
			administeredBy: this.state.staff_id,
		};

		try {
			const rs = await request(`patient/immunizations`, 'POST', true, values);
			console.log(rs);
			addImmunizationRequest(rs.immunization);
			this.setState({ submitting: false });
			notifySuccess('Enrolment successful');
			const { reset, history, location } = this.props;
			reset();
			//redirect to the appropraitate place
			history.push(
				location.hash ? `${location.pathname}#dashboard` : '/immunization'
			);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError('Submission of immunization form not successful');
		}
	};

	setPrescription = pres => {
		this.setState(prevState => ({
			prescriptions: [...pres],
		}));
	};

	resetImmunization = () => {
		const { reset } = this.props;
		this.setState({
			dateOfAdministration: '',
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
		this.searchPatient(e.target.name);
	};

	searchPatient = async name => {
		if (this.state.query.length > 2) {
			try {
				if (name === 'patient_id') {
					this.setState({ searching: true });
					const rs = await request(
						`${searchAPI}?q=${this.state.query}`,
						'GET',
						true
					);
					this.setState({ patients: rs, searching: false });
				} else {
					this.setState({ searchingStaff: true });

					const rs = await request(
						`hr/staffs/find?q=${this.state.query}`,
						'GET',
						true
					);
					this.setState({ staffs: rs, searchingStaff: false });
				}
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
		this.setState({ patients: [], patientError: false, query: '' });
	};

	setStaff = pat => {
		let name =
			(pat.first_name ? pat.first_name : '') +
			' ' +
			(pat.last_name ? pat.last_name : '');

		this.setState({ ...this.state, staff_id: pat.id, staff_name: name });
		this.staff.current.value = name;
		this.setState({ staffs: [], staffError: false, query: '' });
	};

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
	};

	render() {
		const { handleSubmit, value } = this.props;
		const {
			submitting,
			searching,
			patients,
			patient_name,
			staff_name,
			searchingStaff,
			staffs,
		} = this.state;
		console.log(value);
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
																		<hr />
																	</a>
																</div>
															);
														})}
												</div>
											</div>
										)}
										<div className="row">
											<div className="col-sm-6">
												<Field
													id="typeOfVaccine"
													name="typeOfVaccine"
													component={renderTextInput}
													label="Type of Vaccine"
													type="text"
													placeholder="Type of Vaccine"
												/>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Date of Administration</label>
													<div className="custom-date-input">
														<DatePicker
															selected={this.state.dateOfAdministration}
															onChange={date =>
																this.setDate(date, 'dateOfAdministration')
															}
															peekNextMonth
															showMonthDropdown
															showYearDropdown
															dropdownMode="select"
															dateFormat="dd-MMM-yyyy"
															className="single-daterange form-control"
															placeholderText="Select date of administration"
															required
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-sm-6">
												<Field
													id="vaccineBatchNo"
													name="vaccineBatchNo"
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

											{/* <div className="col-md-6">
												<label htmlFor="prescription">Prescription</label>
												<br />
												<label className="flex">
													<Field
														name="prescription"
														component={renderTextInput}
														type="radio"
														value="no"
													/>
													<span>No</span>
												</label>
												<label className="flex">
													<Field
														name="prescription"
														component={renderTextInput}
														type="radio"
														value="yes"
													/>
													<span>Yes</span>
												</label>
											</div> */}
										</div>

										{value === 'yes' ? (
											<div className="row mb-5">
												<ImmunizationPrescription
													submitting={submitting}
													setPrescription={this.setPrescription}
												/>
											</div>
										) : null}

										<div className="row mt">
											<div className="form-group col-sm-6">
												<label>
													Administered by
													{this.state.staffError ? (
														<span className="text-danger">
															{' '}
															* Please search and select staff
														</span>
													) : (
														''
													)}
												</label>

												<input
													className="form-control"
													placeholder="Search for staff and select"
													type="text"
													name="staff_id"
													ref={this.staff}
													defaultValue={staff_name}
													id="patient"
													onChange={this.handlePatientChange}
													autoComplete="off"
													required
												/>

												{searchingStaff && (
													<div className="searching text-center">
														<img alt="searching" src={searchingGIF} />
													</div>
												)}

												{staffs.length !== 0 && (
													<div className="element-box">
														{staffs.map(pat => {
															return (
																<div style={{ display: 'flex' }} key={pat.id}>
																	<a
																		onClick={() => this.setStaff(pat)}
																		className="ssg-item cursor">
																		{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
																		<div
																			className="item-name"
																			dangerouslySetInnerHTML={{
																				__html: `${pat.first_name} ${pat.last_name}`,
																			}}
																		/>
																	</a>
																</div>
															);
														})}
													</div>
												)}
											</div>

											<div className="col-sm-6">
												<div className="form-group">
													<label>Next Visit</label>
													<div className="custom-date-input">
														<DatePicker
															selected={this.state.nextVisitDate}
															onChange={date =>
																this.setDate(date, 'nextVisitDate')
															}
															peekNextMonth
															showMonthDropdown
															showYearDropdown
															dropdownMode="select"
															dateFormat="dd-MMM-yyyy"
															className="single-daterange form-control"
															placeholderText="Select next vist"
															minDate={new Date()}
															required
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer buttons-on-right mt-4">
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
		value: selector(state, 'prescription'),
	};
};

export default withRouter(
	connect(mapStateToProps, { addImmunization, addImmunizationRequest })(
		CreateImmunization
	)
);
