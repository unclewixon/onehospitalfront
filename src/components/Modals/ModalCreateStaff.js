import React, { useState, useEffect, useCallback } from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import startCase from 'lodash.startcase';
import { withRouter } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

import FormWizard from '../FormWizard';
import {
	genders,
	maritalStatuses,
	relationships,
	religions,
	contracts,
	staffAPI,
} from '../../services/constants';
import { request, updateImmutable } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import { loadDepartments } from '../../actions/department';

const Compulsory = () => {
	return <span className="compulsory-field">*</span>;
};

const Error = ({ name }) => (
	<Field
		name={name}
		subscription={{ touched: true, error: true }}
		render={({ meta: { touched, error } }) =>
			touched && error ? <small className="text-danger">{error}</small> : null
		}
	/>
);

const ReactSelectAdapter = ({ input, ...rest }) => (
	<Select {...input} {...rest} searchable />
);

const ModalCreateStaff = ({ updateStaffs, closeModal, staff, staffs }) => {
	const [loading, setLoading] = useState(true);
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [states, setStates] = useState([]);
	const [dateOfEmployment, setDateOfEmployment] = useState(null);
	const [nokDateOfBirth, setNokDateOfBirth] = useState(null);

	const departments = useSelector(state => state.department);
	const roles = useSelector(state => state.role.roles);
	const countries = useSelector(state => state.utility.countries);
	const banks = useSelector(state => state.utility.banks);
	const specializations = useSelector(state => state.settings.specializations);

	const sortedCountries = countries.sort((a, b) => (a.name > b.name ? 1 : -1));

	const dispatch = useDispatch();

	let initialValues = {};
	if (staff) {
		initialValues = {};
	}

	const fetchDepartment = useCallback(async () => {
		try {
			const rs = await request('departments', 'GET', true);
			dispatch(loadDepartments(rs));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			notifyError(error.message || 'could not fetch departments!');
		}
	}, [dispatch]);

	useEffect(() => {
		if (loading) {
			fetchDepartment();
		}
	}, [fetchDepartment, loading]);

	const onSubmit = async values => {
		try {
			const data = {
				...values,
				date_of_birth: moment(values.date_of_birth, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
				employment_start_date: moment(
					values.date_of_employment,
					'DD-MM-YYYY'
				).format('YYYY-MM-DD'),
				next_of_kin_dob:
					values.nok_date_of_birth && values.nok_date_of_birth !== ''
						? moment(values.nok_date_of_birth, 'DD-MM-YYYY').format(
								'YYYY-MM-DD'
						  )
						: '',
				bank_name: values.bank_id?.name || '',
				contract_type: values.contract_type?.value || '',
				department_id: values.department_id?.id || '',
				gender: values.gender?.value || '',
				marital_status: values.marital_status?.value || '',
				next_of_kin_relationship: values.nok_relationship?.value || '',
				religion: values.religion?.value || '',
				role_id: values.role_id?.id || '',
				specialization_id: values.specialization_id?.id || '',
				state_of_origin: values.state_of_origin?.id || '',
				nationality: values.country_id || null,
				pension_mngr: values?.pension_manager || null,
				next_of_kin: values?.nok_name || null,
				next_of_kin_address: values?.nok_address || null,
				next_of_kin_contact_no: values?.nok_phoneNumber || null,
				employee_number: values?.employee_number || null,
			};

			dispatch(startBlock());
			const url = staff ? `${staffAPI}/${staff.id}` : staffAPI;
			const rs = await request(url, staff ? 'PUT' : 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				const allStaffs = staff
					? updateImmutable(staffs, rs.staff)
					: [rs.staff, ...staffs];
				updateStaffs(allStaffs);
				notifySuccess('Staff account saved!');
				closeModal();
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not save staff profile',
				};
			}
		} catch (e) {
			console.log(e.message);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save staff profile' };
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-lg" style={{ maxWidth: '1024px' }}>
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<h5 className="form-header">
							{staff ? 'Edit Staf Record' : 'New Staff Account'}
						</h5>
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}
						>
							<span className="os-icon os-icon-close" />
						</button>
					</div>
					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<div className="support-index">
								<div className="support-ticket-content-w">
									<div
										className="support-ticket-info"
										style={{ flex: '0 0 200px' }}
									>
										<div
											className="customer mb-0 pb-0"
											style={{ width: '110px', borderBottom: '0 none' }}
										>
											<div
												className="avatar"
												style={{
													width: '110px',
													borderRadius: '65px',
													margin: 'auto',
												}}
											>
												<img
													alt=""
													style={{ width: '110px', borderRadius: '65px' }}
													src={require('../../assets/images/placeholder.jpg')}
												/>
											</div>
											<div className="mt-3 text-center">
												<button className="btn btn-info btn-small text-white">
													<i className="os-icon os-icon-ui-51" /> upload picture
												</button>
												<button className="btn btn-primary btn-small mt-2">
													<i className="os-icon os-icon-ui-65" /> take photo
												</button>
											</div>
										</div>
									</div>
								</div>
								<div
									className=""
									style={{
										width: 'calc(100% - 240px)',
										marginLeft: '20px',
									}}
								>
									<FormWizard
										initialValues={Object.fromEntries(
											Object.entries(initialValues).filter(([_, v]) => v !== '')
										)}
										onSubmit={onSubmit}
										btnClasses="modal-footer buttons-on-right"
									>
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.username) {
													errors.username = 'Enter staff username';
												}
												if (!values.role_id) {
													errors.role_id = 'Select staff role';
												}
												if (!values.department_id) {
													errors.department_id = 'Select staff department';
												}
												if (!values.first_name) {
													errors.first_name = 'Enter first name';
												}
												if (!values.last_name) {
													errors.last_name = 'Enter last name';
												}
												if (!values.date_of_birth) {
													errors.date_of_birth = 'Select date of birth';
												}
												if (!values.gender) {
													errors.gender = 'Select gender';
												}
												if (!values.religion) {
													errors.religion = 'Select religion';
												}
												if (!values.country_id) {
													errors.country_id = 'Select nationality';
												}
												if (!values.state_of_origin) {
													errors.state_of_origin = 'Select state of origin';
												}
												if (!values.lga) {
													errors.lga = 'Enter staff lga';
												}
												if (!values.email) {
													errors.email = 'Enter email address';
												}
												if (!values.phone_number) {
													errors.phone_number = 'Enter phone number';
												}
												if (!values.address) {
													errors.address = 'Enter address';
												}
												return errors;
											}}
										>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Username <Compulsory />
														</label>
														<Field
															name="username"
															className="form-control"
															component="input"
															type="text"
															placeholder="Username"
														/>
														<Error name="username" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															User Role <Compulsory />
														</label>
														<Field
															name="role_id"
															component={ReactSelectAdapter}
															options={roles}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<Error name="role_id" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Department <Compulsory />
														</label>
														<Field
															name="department_id"
															component={ReactSelectAdapter}
															options={departments}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<Error name="department_id" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															First Name <Compulsory />
														</label>
														<Field
															name="first_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="First Name"
														/>
														<Error name="first_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Last Name <Compulsory />
														</label>
														<Field
															name="last_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="Last Name"
														/>
														<Error name="last_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Other Names</label>
														<Field
															name="other_names"
															className="form-control"
															component="input"
															type="text"
															placeholder="Other Names"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Date of Birth <Compulsory />
														</label>
														<Field
															name="date_of_birth"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={dateOfBirth}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setDateOfBirth(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of birth"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
														<Error name="date_of_birth" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Gender <Compulsory />
														</label>
														<Field
															name="gender"
															component={ReactSelectAdapter}
															options={genders}
														/>
														<Error name="gender" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Religion <Compulsory />
														</label>
														<Field
															name="religion"
															component={ReactSelectAdapter}
															options={religions}
														/>
														<Error name="religion" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Nationality <Compulsory />
														</label>
														<Field
															name="country_id"
															render={({ name, input }) => (
																<Select
																	name={name}
																	searchable
																	getOptionValue={option => option.id}
																	getOptionLabel={option => option.name}
																	options={sortedCountries}
																	onChange={(item, prevVal) => {
																		input.onChange(item.id);
																		setStates(item.states);
																	}}
																/>
															)}
														/>
														<Error name="country_id" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															State of Origin <Compulsory />
														</label>
														<Field
															name="state_of_origin"
															component={ReactSelectAdapter}
															options={states}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<Error name="state_of_origin" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															LGA <Compulsory />
														</label>
														<Field
															name="lga"
															className="form-control"
															component="input"
															type="text"
															placeholder="LGA"
														/>
														<Error name="lga" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Email Address <Compulsory />
														</label>
														<Field
															name="email"
															className="form-control"
															component="input"
															type="email"
															placeholder="Email Address"
														/>
														<Error name="email" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Phone Number <Compulsory />
														</label>
														<Field
															name="phone_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Phone Number"
														/>
														<Error name="phone_number" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Address <Compulsory />
														</label>
														<Field
															name="address"
															className="form-control"
															component="input"
															type="text"
															placeholder="Address"
														/>
														<Error name="address" />
													</div>
												</div>
											</div>
										</FormWizard.Page>
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.profession) {
													errors.profession = 'Enter staff profession';
												}
												if (!values.specialization_id) {
													errors.specialization_id = 'Select specialization';
												}
												if (!values.date_of_employment) {
													errors.date_of_employment =
														'Select date of employment';
												}
												if (!values.contract_type) {
													errors.contract_type = 'Select type of contract';
												}
												if (!values.bank_id) {
													errors.bank_id = 'Select bank';
												}
												if (!values.account_number) {
													errors.account_number = 'Enter salary account number';
												}
												if (!values.monthly_salary) {
													errors.monthly_salary = 'Enter monthly salary';
												}
												if (!values.annual_salary) {
													errors.annual_salary = 'Enter annual salary';
												}
												if (!values.marital_status) {
													errors.marital_status = 'Select marital status';
												}
												if (!values.nok_name) {
													errors.nok_name = 'Enter next of kin name';
												}
												if (!values.nok_relationship) {
													errors.nok_relationship =
														'Select next of kin relationship';
												}
												if (!values.nok_phoneNumber) {
													errors.nok_phoneNumber =
														'Enter next of kin phone number';
												}
												return errors;
											}}
										>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label>Is Consultant</label>
														<Field
															name="is_consultant"
															component="input"
															type="checkbox"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Profession <Compulsory />
														</label>
														<Field
															name="profession"
															className="form-control"
															component="input"
															type="text"
															placeholder="Profession"
														/>
														<Error name="profession" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Job Title</label>
														<Field
															name="job_title"
															className="form-control"
															component="input"
															type="text"
															placeholder="Job Title"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Specialization <Compulsory />
														</label>
														<Field
															name="specialization_id"
															component={ReactSelectAdapter}
															options={specializations}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<Error name="specialization_id" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Date of Employment <Compulsory />
														</label>
														<Field
															name="date_of_employment"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={dateOfEmployment}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setDateOfEmployment(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of employment"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
														<Error name="date_of_employment" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Type of Contract <Compulsory />
														</label>
														<Field
															name="contract_type"
															component={ReactSelectAdapter}
															options={contracts}
														/>
														<Error name="contract_type" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Employee Number</label>
														<Field
															name="employee_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Employee Number"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Bank <Compulsory />
														</label>
														<Field
															name="bank_id"
															component={ReactSelectAdapter}
															options={banks}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<Error name="bank_id" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Account Number <Compulsory />
														</label>
														<Field
															name="account_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Account Number"
														/>
														<Error name="account_number" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Pension Manager</label>
														<Field
															name="pension_manager"
															className="form-control"
															component="input"
															type="text"
															placeholder="Pension Manager"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Gross Salary (Monthly) <Compulsory />
														</label>
														<Field
															name="monthly_salary"
															className="form-control"
															component="input"
															type="text"
															placeholder="Gross Salary (Monthly)"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Gross Salary (Annually) <Compulsory />
														</label>
														<Field
															name="annual_salary"
															className="form-control"
															component="input"
															type="text"
															placeholder="Gross Salary (Annually)"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Marital Status <Compulsory />
														</label>
														<Field
															name="marital_status"
															component={ReactSelectAdapter}
															options={maritalStatuses}
														/>
														<Error name="marital_status" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Number of Children</label>
														<Field
															name="number_of_children"
															className="form-control"
															component="input"
															type="text"
															placeholder="Number of Children"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Name <Compulsory />
														</label>
														<Field
															name="nok_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Name"
														/>
														<Error name="nok_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Relationship to Staff</label>
														<Field
															name="nok_relationship"
															component={ReactSelectAdapter}
															options={relationships}
														/>
														<Error name="nok_relationship" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Phone Number <Compulsory />
														</label>
														<Field
															name="nok_phoneNumber"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Phone Number"
														/>
														<Error name="nok_phoneNumber" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Address</label>
														<Field
															name="nok_address"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Address"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Date of Birth</label>
														<Field
															name="nok_date_of_birth"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={nokDateOfBirth}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setNokDateOfBirth(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of birth"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
													</div>
												</div>
											</div>
										</FormWizard.Page>
									</FormWizard>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ModalCreateStaff);
