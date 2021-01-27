/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, reset, formValueSelector } from 'redux-form';
import DatePicker from 'react-datepicker';
import { loadLabourDetails } from '../actions/patient';

import {
	searchAPI,
	bloodGroup,
	para,
	previousPregnancies,
	labourAPI,
} from '../services/constants';
import { request } from '../services/utilities';
import { renderSelect, renderTextInput } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import searchingGIF from '../assets/images/searching.gif';
import waiting from '../assets/images/waiting.gif';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

const validate = values => {
	const errors = {};

	if (!values.husbandName || values.husbandName === '') {
		errors.husbandName = 'enter husband name';
	}
	if (!values.husbandPhoneNo) {
		errors.husbandPhoneNo = 'Husband phone number is required';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.husbandPhoneNo)) {
		errors.husbandPhoneNo = 'Please enter a valid number';
	} else if (!/^[0][789]\d{9}$/i.test(values.husbandPhoneNo)) {
		errors.husbandPhoneNo = 'Please enter a valid phone number';
	}
	if (!values.parity || values.parity === '') {
		errors.parity = 'select parity';
	}
	if (!values.alive || values.alive === '') {
		errors.alive = 'select alive';
	}
	if (!values.miscarriage || values.miscarriage === '') {
		errors.miscarriage = 'select miscarriage';
	}
	if (!values.presentPregnancy || values.presentPregnancy === '') {
		errors.presentPregnancy = 'Enter state of present pregnancy';
	}

	return errors;
};

const selector = formValueSelector('labour-mgt');

const getOptionValues = option => option.id;
const getOptionLabels = option => `${option.other_names} ${option.surname}`;

const getOptions = async q => {
	if (!q || q.length < 3) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

export class NewLabour extends Component {
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
		lmp: '',
	};

	patient = React.createRef();
	staff = React.createRef();

	onSubmit = async data => {
		console.log(data);
		const { patient_id, lmp } = this.state;
		if (patient_id === '') {
			notifyError('Please search and select a patient');
		}
		if (lmp === '') {
			notifyError('Please lmp date ');
			return;
		}
		const newData = { ...data, lmp };

		try {
			const rs = await request(
				`${labourAPI}/${patient_id}/save`,
				'POST',
				true,
				newData
			);
			notifySuccess('succesfully submitted');
			reset();
			// this.props.loadLabourDetails(rs.data);
			this.props.history.push(`/labour-mgt/detail/${rs.data.id}`);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(
				e.message || 'Submission of Labour management form not successful'
			);
		}
	};
	patientSet = pat => {
		// setValue('patient_id', pat.id);
		console.log(pat);
		let surname = pat.surname ? pat.surname : '';
		let other_names = pat.other_names ? pat.other_names : '';
		let name = surname + ' ' + other_names;

		this.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
		this.setState({ patients: [], patientError: false, query: '' });
	};

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
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

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};

	render() {
		const { handleSubmit } = this.props;
		const {
			submitting,
			searching,
			patients,
			// patient_name,
			// staff_name,
			// searchingStaff,
			// staffs,
			// lmp,
		} = this.state;
		return (
			<div className="element-wrapper">
				{/* <h6 className="element-header">New Labour Management</h6> */}
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(this.onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Patient</label>

									<AsyncSelect
										isClearable
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										ref={this.patient}
										name="patient_id"
										loadOptions={getOptions}
										onChange={e => this.patientSet(e)}
										placeholder="Search patients"
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">
									<Field
										id="husbandName"
										name="husbandName"
										component={renderTextInput}
										label="Husband Name"
										type="text"
										placeholder="Enter name of husband"
									/>
								</div>
								<div className="col-sm-6">
									<Field
										id="husbandPhoneNo"
										name="husbandPhoneNo"
										component={renderTextInput}
										label="Husband Phone No"
										type="text"
										placeholder="Enter the phone of husband"
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<Field
										id="bloodGroup"
										name="bloodGroup"
										component={renderSelect}
										label="Select Blood Group"
										placeholder="Select blood group"
										data={bloodGroup}
									/>
								</div>
								<div className="col-sm-6">
									<Field
										id="parity"
										name="parity"
										component={renderSelect}
										label="Select Parity"
										placeholder="Select Parity"
										data={para}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">
									<Field
										id="alive"
										name="alive"
										component={renderSelect}
										label="Alive"
										placeholder="Select Alive"
										data={previousPregnancies}
									/>
								</div>
								<div className="col-sm-6">
									<Field
										id="miscarriage"
										name="miscarriage"
										component={renderSelect}
										label="Select Miscarriage"
										placeholder="Select miscarriage"
										data={previousPregnancies}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<Field
										id="presentPregnancy"
										name="presentPregnancy"
										component={renderSelect}
										label="Number of current child"
										placeholder="Number of current child"
										data={previousPregnancies}
									/>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label>LMP</label>
										<div className="custom-date-input">
											<DatePicker
												selected={this.state.lmp}
												onChange={date => this.setDate(date, 'lmp')}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												dateFormat="dd-MMM-yyyy"
												className="single-daterange form-control"
												placeholderText="Select date of birth"
												maxDate={new Date()}
												required
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Save'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

NewLabour = reduxForm({
	form: 'labour-mgt',
	validate,
})(NewLabour);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		value: selector(state, 'prescription'),
	};
};

export default withRouter(
	connect(mapStateToProps, { loadLabourDetails })(NewLabour)
);
