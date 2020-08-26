import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { patientAPI, staffAPI } from '../../services/constants';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { createClinicalTask } from '../../actions/general';

import { notifySuccess } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { setPatientRecord } from '../../actions/user';

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

// const location = [
// 	{ id: 'Deda Hospital', name: 'Deda Hospital' },
// 	{ id: 'Other', name: 'Other' },
// ];

// const ward = [
// 	{ id: 'Exclusive Suite', name: 'Exclusive Suite' },
// 	{ id: 'Normal', name: 'Normal' },
// ];

class PatientAdmission extends Component {
	state = {
		submitting: false,
		loading: false,
		staffs: [],
		rooms: [],
		staffsMultiple: [],
		discharged_date: null,
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	changeTask = e => {
		if (e.target.checked) {
			this.props.createClinicalTask(true);
		}
	};

	componentDidMount() {
		this.fetchStaffs();
		this.fetchRooms();
	}

	fetchRooms = async data => {
		try {
			this.setState({ loading: true });
			const rs = await request('rooms', 'GET', true);

			console.log(rs);

			let rooms = [];
			rs.forEach(function(value) {
				rooms = [
					...rooms,
					{
						id: value.id,
						name: ' Room ' + value.name + ' Floor ' + value.floor,
					},
				];
			});
			this.setState({ rooms });
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			console.log(error);
		}
	};

	fetchStaffs = async data => {
		try {
			this.setState({ loading: true });
			const rs = await request(`${staffAPI}`, 'GET', true);

			let staffs = [];
			let staffsMultiple = [];
			rs.forEach(function(value) {
				staffs = [
					...staffs,
					{ id: value.id, name: value.first_name + ' ' + value.last_name },
				];
				staffsMultiple.push(value.first_name + ' ' + value.last_name);
			});

			this.setState({ staffs });
			this.setState({ staffsMultiple });
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			console.log(error);
		}
	};

	admitPatient = async data => {
		const { vitals, patient } = this.props;
		const { discharged_date } = this.state;
		// let StaffID = [];

		// data.care_givers.forEach(function(value) {
		// 	let s = staffs.find(p => p.name === value);
		// 	StaffID.push(s.id);
		// });

		let formData = {
			healthState: data.health_state,
			riskToFall: data.risk === true,
			// room_id: data.ward,
			reason: data.reason,
			// pcg: data.primary_care_giver,
			tasks: vitals,
			discharge_date: moment(discharged_date).format('DD-MM-YY'),
			// care_givers: StaffID,
		};

		console.log(formData);

		this.setState({ submitting: true });
		try {
			await request(
				`${patientAPI}/admissions/${patient.id}/save`,
				'POST',
				true,
				formData
			);
			this.setState({ submitting: false });
			patient.isAdmitted = true;
			this.props.setPatientRecord(patient);
			this.props.dispatch(reset('create_patient_admission'));
			notifySuccess('Admission Started !');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not start admission',
			});
		}
	};

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting, discharged_date, loading } = this.state;
		return (
			<>
				{loading ? (
					<div>
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
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
											</div>
										</div>

										<div className="row">
											{/* <div className="col-sm-6">
												<Field
													id="location"
													name="location"
													component={renderSelect}
													label="Select Location"
													placeholder="Select Location"
													data={location}
												/>
											</div> */}
											{/* <div className="col-sm-6">
												<Field
													id="ward"
													name="ward"
													component={renderSelect}
													label="Admit to Ward"
													placeholder="Select ward admitted to"
													data={rooms}
												/>
											</div> */}
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

										{/* <div className="row my-2">
											<div className="col-sm-12">
												<button
													className="btn btn-link text-left"
													style={{ textDecoration: 'underline' }}
													type="button"
													onClick={() => this.props.createClinicalTask(true)}>
													Create a Clinical task ?
												</button>
											</div>
										</div> */}

										{/* <div className="row">
											<div className="col-sm-6">
												<label>Care Givers</label>
												<Field
													name="care_givers"
													component={renderMultiselect}
													placeholder="-- select care giver --"
													data={staffsMultiple}
												/>
											</div>
											<div className="col-sm-6">
												<Field
													id="primary_care_giver"
													name="primary_care_giver"
													component={renderSelect}
													label="Primary Care Giver"
													placeholder="-- select primary care giver --"
													data={staffs}
												/>
											</div>
										</div> */}

										<div>
											<div className="col-sm-12 text-right">
												<button
													className="btn btn-primary"
													disabled={submitting}>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														'Admit'
													)}
												</button>
												<button className="btn btn-primary">Cancel</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

PatientAdmission = reduxForm({
	form: 'create_patient_admission',
	validate,
})(PatientAdmission);

const mapStateToProps = (state, ownProps) => {
	console.log(state.patient.vitals);
	return {
		vitals: state.patient.vitals,
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, {
	setPatientRecord,
	createClinicalTask,
})(PatientAdmission);
