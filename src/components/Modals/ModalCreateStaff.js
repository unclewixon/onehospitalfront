import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import orderBy from 'lodash.orderby';

import { renderTextInput, request, renderSelect } from '../../services/utilities';
import { API_URI, staffAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { addStaff } from '../../actions/hr';
import { closeModals } from '../../actions/general';

const validate = values => {
	const errors = {};
	if (!values.username) {
        errors.username = 'enter username';
	}
	if (!values.password) {
        errors.password = 'enter password';
	}
	if (!values.role_id || values.role_id === '') {
        errors.role_id = 'select role';
    }
	if (!values.first_name) {
        errors.first_name = 'enter first name';
    }
	if (!values.last_name) {
        errors.last_name = 'enter last name';
    }
	if (!values.department_id || values.department_id === '') {
        errors.department_id = 'select department';
    }
	if (!values.religion || values.religion === '') {
        errors.religion = 'select religion';
    }
	if (!values.email) {
        errors.email = 'enter email address';
    }
	if (!values.phone_number) {
        errors.phone_number = 'enter phone number';
    }
	if (!values.gender || values.gender === '') {
        errors.gender = 'select gender';
    }
	if (!values.nationality || values.nationality === '') {
        errors.nationality = 'select nationality';
    }
	if (!values.state_of_origin || values.state_of_origin === '') {
        errors.state_of_origin = 'select state of origin';
    }
	if (!values.lga) {
        errors.lga = 'enter local government area';
    }
	if (!values.address) {
        errors.address = 'enter address';
    }
	if (!values.job_title) {
        errors.job_title = 'enter job title';
    }
	if (!values.marital_status || values.marital_status === '') {
        errors.marital_status = 'select marital status';
    }
	if (!values.number_of_children) {
        errors.number_of_children = 'enter number of children';
    }
	if (!values.bank_name || values.bank_name === '') {
        errors.bank_name = 'select bank';
    }
	if (!values.account_number) {
        errors.account_number = 'enter account number';
    }
	if (!values.contract_type || values.contract_type === '') {
        errors.contract_type = 'select type of contract';
    }
	if (!values.monthly_salary) {
        errors.monthly_salary = 'enter monthly salary';
    }
	if (!values.annual_salary) {
        errors.annual_salary = 'enter annual salary';
    }
	if (!values.next_of_kin) {
        errors.next_of_kin = 'enter next of kin name';
    }
	if (!values.next_of_kin_relationship) {
        errors.next_of_kin_relationship = 'enter next of kin relationship';
    }
	if (!values.next_of_kin_contact_no) {
        errors.next_of_kin_contact_no = 'enter next of kin phone number';
    }
	if (!values.next_of_kin_address) {
        errors.next_of_kin_address = 'enter next of kin address';
    }
	if (!values.specialization_id) {
        errors.specialization_id = 'select your specialization';
    }
    return errors;
};

class ModalCreateStaff extends Component {
	state = {
		submitting: false,
		date_of_birth: null,
		next_of_kin_dob: null,
		employment_start_date: null,
		states: [],
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	doCreateStaff = async data => {
		const { date_of_birth, next_of_kin_dob, employment_start_date } = this.state;
		if(!date_of_birth) {
			throw new SubmissionError({ _error: 'select date of birth' });
		}
		if(!employment_start_date) {
			throw new SubmissionError({ _error: 'select date of employment' });
		}
		if(!next_of_kin_dob) {
			throw new SubmissionError({ _error: 'select nok date of birth' });
		}
		let staff = {
			...data, 
			date_of_birth: moment(date_of_birth).format('YYYY-MM-DD'),
			next_of_kin_dob: moment(next_of_kin_dob).format('YYYY-MM-DD'),
			employment_start_date: moment(employment_start_date).format('YYYY-MM-DD'),
		};
		this.setState({ submitting: true });
		try {
			const rs = await request(`${API_URI}${staffAPI}`, 'POST', true, staff);
			this.props.addStaff(rs);
			this.setState({ submitting: false, next_of_kin_dob: null, date_of_birth: null, employment_start_date: null });
			this.props.reset('create_staff');
			notifySuccess('new staff created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({ _error: e.message || 'could not create staff' });
		}
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	onSelectCountry = e => {
		const { countries } = this.props;
		const countryId = e.target.value;
		const country = countries.find(c => c.id === parseInt(countryId, 10));
		if(country) {
			this.setState({ states: country.states });
		} else {
			this.setState({ states: [] });
		}
	};

	render() {
		const { error, handleSubmit, roles, departments, banks, countries, specializations } = this.props;
		const { submitting, date_of_birth, next_of_kin_dob, employment_start_date, states } = this.state;
		const _countries = countries.map(c => ({id: c.id, name: c.name}));
		const sortedCountries = orderBy(_countries, ['name'], ['asc']);
		const genders = [
			{id: 'Female', name: 'Female'},
			{id: 'Male', name: 'Male'},
		];
		const marital_status = [
			{id: 'Married', name: 'Married'},
			{id: 'Single', name: 'Single'},
		];
		const contracts = [
			{id: 'Full time', name: 'Full time'},
			{id: 'Part time', name: 'Part time'},
		];
		const religions = [
			{id: 'Atheist', name: 'Atheist'},
			{id: 'Buddhism', name: 'Buddhism'},
			{id: 'Christianity', name: 'Christianity'},
			{id: 'Hinduism', name: 'Hinduism'},
			{id: 'Islam', name: 'Islam'},
		];

		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Create New Staff</h4>
							<div className="onboarding-text">create new staff profile</div>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.doCreateStaff)}>
									{error && <div className="alert alert-danger" dangerouslySetInnerHTML={{__html: `<strong>Error!</strong> ${error}`}}/>}
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="username"
												name="username"
												component={renderTextInput}
												label="Username"
												type="text"
												placeholder="Enter username"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="password"
												name="password"
												component={renderTextInput}
												label="Password"
												type="password"
												placeholder="Enter password"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="role_id"
												name="role_id"
												component={renderSelect}
												label="Role"
												placeholder="Select Role"
												data={roles}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="first_name"
												name="first_name"
												component={renderTextInput}
												label="First Name"
												type="text"
												placeholder="Enter first name"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="last_name"
												name="last_name"
												component={renderTextInput}
												label="Last Name"
												type="text"
												placeholder="Enter last name"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="other_names"
												name="other_names"
												component={renderTextInput}
												label="Other Names"
												type="text"
												placeholder="Enter other names"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="department_id"
												name="department_id"
												component={renderSelect}
												label="Department"
												placeholder="Select Department"
												data={departments}
											/>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Date of Birth</label>
												<div className="custom-date-input">
													<DatePicker
														selected={date_of_birth}
														onChange={date => this.setDate(date, 'date_of_birth')}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="dd-MMM-yyyy"
														className="single-daterange form-control"
														placeholderText="Select date of birth"
														maxDate={new Date()}
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<Field
												id="religion"
												name="religion"
												component={renderSelect}
												label="Religion"
												placeholder="Select Religion"
												data={religions}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="email"
												name="email"
												component={renderTextInput}
												label="Email address"
												type="email"
												placeholder="Enter email address"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="phone_number"
												name="phone_number"
												component={renderTextInput}
												label="Phone number"
												type="text"
												placeholder="Enter phone number"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="gender"
												name="gender"
												component={renderSelect}
												label="Gender"
												placeholder="Select Gender"
												data={genders}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="nationality"
												name="nationality"
												component={renderSelect}
												label="Nationality"
												placeholder="Select Nationality"
												data={sortedCountries}
												onChange={this.onSelectCountry}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="state_of_origin"
												name="state_of_origin"
												component={renderSelect}
												label="State of Origin"
												placeholder="Select State of Origin"
												data={states}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="lga"
												name="lga"
												component={renderTextInput}
												label="LGA"
												type="text"
												placeholder="Enter LGA"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<Field
												id="address"
												name="address"
												component={renderTextInput}
												label="Contact Address"
												type="text"
												placeholder="Enter contact address"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="job_title"
												name="job_title"
												component={renderTextInput}
												label="Profession"
												type="text"
												placeholder="Enter job title"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="specialization_id"
												name="specialization_id"
												component={renderSelect}
												label="Specialization"
												placeholder="Select Specialization"
												data={specializations}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="pension_mngr"
												name="pension_mngr"
												component={renderTextInput}
												label="Pension Manager"
												type="number"
												placeholder="Enter pension manager"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="marital_status"
												name="marital_status"
												component={renderSelect}
												label="Marital Status"
												placeholder="Select Marital Status"
												data={marital_status}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="number_of_children"
												name="number_of_children"
												component={renderTextInput}
												label="Number of Children"
												type="number"
												placeholder="Enter number of children"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="bank_name"
												name="bank_name"
												component={renderSelect}
												label="Bank"
												placeholder="Select Bank"
												data={banks}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="account_number"
												name="account_number"
												component={renderTextInput}
												label="Account Number"
												type="text"
												placeholder="Enter account number"
											/>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Employment start date</label>
												<div className="custom-date-input">
													<DatePicker
														selected={employment_start_date}
														onChange={date => this.setDate(date, 'employment_start_date')}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="dd-MMM-yyyy"
														className="single-daterange form-control"
														placeholderText="Select date of employment"
														maxDate={new Date()}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="contract_type"
												name="contract_type"
												component={renderSelect}
												label="Contract Type"
												placeholder="Select type of contract"
												data={contracts}
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="monthly_salary"
												name="monthly_salary"
												component={renderTextInput}
												label="Gross salary (Monthly)"
												type="number"
												placeholder="Enter gross salary (monthly)"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="annual_salary"
												name="annual_salary"
												component={renderTextInput}
												label="Gross salary (Annual)"
												type="number"
												placeholder="Enter gross salary (annual)"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<Field
												id="next_of_kin"
												name="next_of_kin"
												component={renderTextInput}
												label="Next of Kin name"
												type="text"
												placeholder="Enter nok name"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="next_of_kin_relationship"
												name="next_of_kin_relationship"
												component={renderTextInput}
												label="Next of Kin relationship"
												type="text"
												placeholder="Enter nok relationship"
											/>
										</div>
										<div className="col-sm-4">
											<Field
												id="next_of_kin_contact_no"
												name="next_of_kin_contact_no"
												component={renderTextInput}
												label="Next of Kin phone number"
												type="text"
												placeholder="Enter nok phone number"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-8">
											<Field
												id="next_of_kin_address"
												name="next_of_kin_address"
												component={renderTextInput}
												label="Next of Kin address"
												type="text"
												placeholder="Enter nok address"
											/>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Next of Kin Date of Birth</label>
												<div className="custom-date-input">
													<DatePicker
														selected={next_of_kin_dob}
														onChange={date => this.setDate(date, 'next_of_kin_dob')}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="dd-MMM-yyyy"
														className="single-daterange form-control"
														placeholderText="Select nok date of birth"
														maxDate={new Date()}
													/>
												</div>
											</div>
										</div>
									</div>
									{/* <div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="is_consultant">Is Consultant?</label>
												<input className="form-control ml-2" type="checkbox" value="1"/>
											</div>
										</div>
									</div> */}
									<div className="row">
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? <img src={waiting} alt="submitting"/> : 'Create Profile'}</button>
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

ModalCreateStaff = reduxForm({
	form: 'create_staff',
	validate,
})(ModalCreateStaff);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			role_id: '',
			department_id: '',
			religion: '',
			gender: 'Male',
			nationality: '',
			state_of_origin: '',
			marital_status: '',
			bank_name: '',
			contract_type: '',
			monthly_salary: 0,
			annual_salary: 0,
		},
		roles: state.role.roles,
		departments: state.settings.departments,
		countries: state.utility.countries,
		banks: state.utility.banks,
		specializations: state.settings.specializations,
	}
};

export default connect(mapStateToProps, { reset, closeModals, addStaff })(ModalCreateStaff);
