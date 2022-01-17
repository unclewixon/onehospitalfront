/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Formik, Field } from 'formik';
import { Form, Image, Button } from 'react-bootstrap';
import { object, string, number } from 'yup';
import Select from 'react-select';

import { request, updateImmutable } from '../../services/utilities';
import placeholder from '../../assets/images/placeholder.jpg';
import { loadDepartments } from '../../actions/department';
import {
	API_URI,
	contracts,
	genders,
	maritalStatuses,
	religions,
	staffAPI,
	TOKEN_COOKIE,
} from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import SSRStorage from '../../services/storage';

export const StepOneSchema = object({
	username: string().required('Username is required'),
	first_name: string().required('Please enter first name'),
	last_name: string().required('Please enter last name'),
	profession: string().required('Please enter profession'),
	gender: string().required('Please enter gender'),
	role_id: string().required('Role is required'),
	department_id: string().required('Department is required'),
	date_of_birth: string().required('Date of birth is required'),
	address: string().required('Address is required'),
	nationality: number()
		.typeError('Country is required')
		.required('Country is required'),
	state_of_origin: number()
		.typeError('State is required')
		.required('State is required'),
	phone_number: string().test(
		'required',
		'Phone number is required',
		value => !!value
	),
	email: string()
		.email()
		.required('Email address is required'),
});

export const StepTwoSchema = object({
	marital_status: string().required('Marital status is required'),
	bank_name: string().required('Bank name is required'),
	account_number: string().required('Enter an account number'),
	employment_start_date: string().required('This field is required'),
	contract_type: string().required('This field is required'),
	monthly_salary: string().required('This field is required'),
	annual_salary: string().required('This field is required'),
	next_of_kin: string().required('This field is required'),
	next_of_kin_contact_no: string().required('This field is required'),
});

const storage = new SSRStorage();

function ModalCreateStaff({ updateStaffs, closeModal, staff, staffs }) {
	const [section, setSection] = useState('step-one');
	const [form, setForm] = useState(staff);
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true);

	const departments = useSelector(state => state.department);
	const roles = useSelector(state => state.role.roles);
	const countries = useSelector(state => state.utility.countries);
	const banks = useSelector(state => state.utility.banks);
	const specializations = useSelector(state => state.settings.specializations);

	const dispatch = useDispatch();

	const _countries = countries.map(c => ({ value: c.id, label: c.name }));
	const sortedCountries = _countries;

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

	useEffect(() => {
		document.body.classList.add('modal-open');
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	const stepOne = () => {
		setSection('step-one');
	};

	const formatDateEntry = entry => {
		if (typeof form === 'undefined') {
			return '';
		}

		if (form !== null && form[entry] !== null) {
			try {
				return moment(form[entry]).toDate(); //;
			} catch (e) {
				return '';
			}
		} else {
			return '';
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg modal-centered" role="document">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">
							{form !== null ? 'Edit Staff Form' : 'Create Staff Form'}
						</h4>
						<div className="form-block">
							{section === 'step-one' ? (
								<Formik
									validateOnMount
									validationSchema={StepOneSchema}
									enableReinitialize
									initialValues={{
										username: form?.user?.username || '',
										profession: form?.profession || '',
										role_id: form?.user?.role?.id || '',
										department_id: form?.department?.id || '',
										first_name: form?.first_name || '',
										last_name: form?.last_name || '',
										other_names: form?.other_names || '',
										date_of_birth: formatDateEntry('date_of_birth'),
										gender: form?.gender || '',
										religion: form?.religion || '',
										nationality: form?.nationality || '',
										state_of_origin: form?.state_of_origin || '',
										lga: form?.lga || '',
										email: form?.email || '',
										phone_number: form?.phone_number || '',
										address: form?.address || '',
										profile_pic: form?.profile_pic,
										avatar: '',
									}}
									children={props => (
										<StepOne
											{...props}
											roles={roles}
											departments={departments}
											sortedCountries={sortedCountries}
											genders={genders}
											religions={religions}
											countries={countries}
										/>
									)}
									onSubmit={params => {
										setForm({ ...form, ...params });
										setSection('step-two');
										console.log('------------ enter step-2');
									}}
								/>
							) : (
								<Formik
									validateOnMount
									validationSchema={StepTwoSchema}
									enableReinitialize
									initialValues={{
										job_title: form?.job_title || '',
										specialization_id: form?.specialization_id || '',
										pension_mngr: form?.pension_mngr || '',
										marital_status: form?.marital_status || '',
										bank_name: form?.bank_name || '',
										number_of_children: form?.number_of_children || '',
										account_number: form?.account_number || '',
										employment_start_date: formatDateEntry(
											'employment_start_date'
										),
										contract_type: form?.contract_type || '',
										monthly_salary: form?.monthly_salary || '',
										annual_salary: form?.annual_salary || '',
										next_of_kin: form?.next_of_kin || '',
										next_of_kin_relationship:
											form?.next_of_kin_relationship || '',
										next_of_kin_dob: formatDateEntry('next_of_kin_dob'),
										next_of_kin_address: form?.next_of_kin_address || '',
										next_of_kin_contact_no: form?.next_of_kin_contact_no || '',
									}}
									children={props => (
										<StepTwo
											{...props}
											specializations={specializations}
											banks={banks}
											maritalStatus={maritalStatuses}
											contracts={contracts}
											setSection={stepOne}
											isSubmitting={saving}
										/>
									)}
									onSubmit={async params => {
										console.log('--------------------- submit form');
										setSaving(true);
										const formData = new FormData();

										for (const key in form) {
											if (key === 'date_of_birth') {
												formData.append(
													key,
													moment(form?.date_of_birth)?.format('YYYY-MM-DD')
												);
											} else {
												formData.append(key, form[key]);
											}
										}

										for (const key in params) {
											if (key === 'next_of_kin_dob') {
												formData.append(
													key,
													moment(params?.next_of_kin_dob)?.format('YYYY-MM-DD')
												);
											} else if (key === 'employment_start_date') {
												formData.append(
													key,
													moment(params?.employment_start_date)?.format(
														'YYYY-MM-DD'
													)
												);
											} else {
												formData.append(key, params[key]);
											}
										}
										const user = await storage.getItem(TOKEN_COOKIE);
										const jwt = `Bearer ${user.token}`;
										const headers = {
											Authorization: jwt,
											'content-type': 'multipart/form-data',
										};
										if (staff) {
											try {
												const url = `${API_URI}/hr/staffs/${staff.id}/update`;
												const res = await axios.patch(url, formData, {
													headers,
												});
												setSaving(false);
												if (res.data?.success) {
													const allStaffs = updateImmutable(
														staffs,
														res.data?.staff
													);
													updateStaffs(allStaffs);
													notifySuccess('Staff details has been saved');
													closeModal();
												} else {
													notifyError(
														res.data?.message || 'could not save staff details'
													);
												}
											} catch (e) {
												setSaving(false);
												notifyError(
													e.message || 'could not save staff details'
												);
											}
										} else {
											try {
												const url = `${API_URI}/${staffAPI}`;
												const res = await axios.post(url, formData, {
													headers,
												});
												setSaving(false);
												if (res.data?.success) {
													updateStaffs([...staffs, res.data?.staff]);
													notifySuccess('Staff account has been saved');
													closeModal();
												} else {
													notifyError(
														res.data?.message || 'could not save staff details'
													);
												}
											} catch (e) {
												setSaving(false);
												notifyError(
													e.message || 'could not save staff details'
												);
											}
										}
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function StepOne({
	setFieldValue,
	handleSubmit,
	isSubmitting,
	isValid,
	values,
	roles,
	sortedCountries,
	departments,
	genders,
	religions,
	countries,
}) {
	const {
		username,
		profession,
		first_name,
		last_name,
		other_names,
		role_id,
		department_id,
		date_of_birth,
		gender,
		religion,
		nationality,
		address,
		email,
		phone_number,
		state_of_origin,
		lga,
		profile_pic,
		// avatar,
	} = values;
	const [states, setStates] = useState([]);
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (nationality) {
			const country = countries.find(c => c.id === parseInt(nationality, 10));
			if (country) {
				setStates(country.states.map(s => ({ value: s.id, label: s.name })));
			}
		}
	}, [nationality, countries]);

	return (
		<Form>
			<div className="row">
				<div className="col-sm-3 profile-tile" style={{ borderBottom: 'none' }}>
					<a className="profile-tile-box" style={{ width: '155px' }}>
						<div className="pt-avatar-w">
							{image ? (
								<Image src={URL.createObjectURL(image)} fluid />
							) : (
								<Image alt="" src={profile_pic ? profile_pic : placeholder} />
							)}
						</div>
						<div className="pt-user-name">
							<button
								type="button"
								onClick={() => document.querySelector('#profile_pic').click()}
								className="btn btn-info">
								Choose Image
							</button>
						</div>
					</a>
					<input
						type="file"
						accept="image/*"
						id="profile_pic"
						className="d-none"
						onChange={e => {
							setImage(e.currentTarget.files[0]);
							setFieldValue('avatar', e.currentTarget.files[0]);
						}}
					/>
				</div>
				<div className="col-sm-9">
					<div className="row">
						<div className="col-sm-6">
							<Field
								name="username"
								placeholder="Username"
								label={{ value: 'Username' }}
								value={username}
							/>
						</div>
						<div className="col-sm-6">
							<Field
								name="profession"
								placeholder="Profession"
								value={profession}
								label={{ value: 'Profession' }}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<label>User Role</label>
							<Select
								name="role_id"
								value={role_id}
								options={
									(roles &&
										roles.map(role => ({
											value: role.id,
											label: role.name,
										}))) ||
									[]
								}
								onChange={({ value }) => setFieldValue('role_id', value)}
							/>
						</div>
						<div className="col-sm-6">
							<label>Department</label>
							<Select
								name="department_id"
								value={department_id}
								options={
									(departments &&
										departments.map(item => ({
											value: item.id,
											label: item.name,
										}))) ||
									[]
								}
								onChange={({ value }) => setFieldValue('department_id', value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<Field
						name="first_name"
						placeholder="First Name"
						value={first_name}
						label={{ value: 'First Name' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						value={last_name}
						placeholder="Last Name"
						name="last_name"
						label={{ value: 'Last Name' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="other_names"
						placeholder="Other Name"
						value={other_names}
						label={{ value: 'Other Name' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<div className="form-group">
						<label>Date of Birth</label>
						<div className="custom-date-input">
							<DatePicker
								selected={date_of_birth}
								onChange={date => setFieldValue('date_of_birth', date)}
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								dateFormat="dd-MM-yyyy"
								className="single-daterange form-control"
								placeholderText="Select date of birth"
								maxDate={new Date()}
								name="date_of_birth"
							/>
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<label>Gender</label>
					<Select
						name="gender"
						value={gender}
						placeholder="Select Gender"
						options={genders || []}
						onChange={({ value }) => setFieldValue('gender', value)}
					/>
				</div>
				<div className="col-sm-4">
					<label>Religion</label>
					<Select
						name="religion"
						label="Religion"
						value={religion}
						placeholder="Select Religion"
						options={religions || []}
						onChange={({ value }) => setFieldValue('religion', value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<label>Nationality</label>
					<Select
						name="nationality"
						value={nationality}
						options={sortedCountries || []}
						onChange={({ value }) => setFieldValue('nationality', value)}
					/>
				</div>
				<div className="col-sm-4">
					<label>State of Origin</label>
					<Select
						name="state_of_origin"
						value={state_of_origin}
						options={states}
						onChange={({ value }) => setFieldValue('state_of_origin', value)}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="lga"
						value={lga}
						label={{ value: 'LGA' }}
						placeholder="LGA"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<Field
						name="email"
						label={{ value: 'Email' }}
						placeholder="Email"
						value={email}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="phone_number"
						placeholder="Phone Number"
						value={phone_number}
						label={{ value: 'Phone Number' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="address"
						placeholder="Address"
						value={address}
						label={{ value: 'Address' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 text-right">
					<Button
						variant="default"
						className="btn btn-primary"
						onClick={handleSubmit}
						disabled={isValid || isSubmitting}
						type="submit"
					>Next</Button>
				</div>
			</div>
		</Form>
	);
}

function StepTwo({
	setFieldValue,
	handleSubmit,
	isSubmitting,
	isValid,
	values,
	specializations,
	maritalStatus,
	banks,
	contracts,
	setSection,
}) {
	const {
		job_title,
		specialization_id,
		pension_mngr,
		marital_status,
		bank_name,
		number_of_children,
		account_number,
		employment_start_date,
		contract_type,
		monthly_salary,
		annual_salary,
		next_of_kin,
		next_of_kin_relationship,
		next_of_kin_dob,
		next_of_kin_address,
		next_of_kin_contact_no,
	} = values;
	return (
		<div>
			<div className="row">
				<div className="col-sm-4">
					<Field
						name="job_title"
						placeholder="Job Title"
						value={job_title}
						label={{ value: 'Job Title' }}
					/>
				</div>
				<div className="col-sm-4">
					<label>Specialization</label>
					<Select
						name="specialization_id"
						placeholder="Select Specialization"
						value={specialization_id}
						options={
							(specializations &&
								specializations.map(specialization => ({
									value: specialization.id,
									label: specialization.name,
								}))) ||
							[]
						}
						onChange={({ value }) => setFieldValue('specialization_id', value)}
					/>
				</div>
				<div className="col-sm-4">
					<label>Contract Type</label>
					<Select
						value={contract_type}
						name="contract_type"
						label="Contract"
						options={contracts || []}
						onChange={({ value }) => setFieldValue('contract_type', value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<label>Bank</label>
					<Select
						name="bank_name"
						placeholder="Select Bank"
						options={
							(banks &&
								banks.map(bank => ({
									value: bank.name,
									label: bank.name,
								}))) ||
							[]
						}
						onChange={({ value }) => setFieldValue('bank_name', value)}
						value={bank_name}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="account_number"
						placeholder="Account Number"
						value={account_number}
						label={{ value: 'Account Number' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="pension_mngr"
						placeholder="Pension Manager"
						value={pension_mngr}
						label={{ value: 'Pension Manager' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<div className="form-group">
						<label>Employment start date</label>
						<div className="custom-date-input">
							<DatePicker
								selected={employment_start_date}
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								dateFormat="dd-MM-yyyy"
								className="single-daterange form-control"
								placeholderText="Select date of employment"
								maxDate={new Date()}
								onChange={date => setFieldValue('employment_start_date', date)}
							/>
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<Field
						name="monthly_salary"
						placeholder="Gross Salary (Monthly)"
						value={monthly_salary}
						label={{ value: 'Gross Salary (Monthly)' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="annual_salary"
						placeholder="Gross Salary (Annually)"
						value={annual_salary}
						label={{ value: 'Gross Salary (Annually)' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<label>Marital Status</label>
					<Select
						name="marital_status"
						label="Marital Status"
						options={maritalStatus || []}
						onChange={({ value }) => setFieldValue('marital_status', value)}
						value={marital_status}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="number_of_children"
						placeholder="Number of Children"
						value={number_of_children}
						label={{ value: 'Number of Children' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<Field
						name="next_of_kin"
						placeholder="Next of Kin Name"
						value={next_of_kin}
						label={{ value: 'Next of kin name' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="next_of_kin_relationship"
						placeholder="Next of Kin Relationship"
						value={next_of_kin_relationship}
						label={{ value: 'Next of kin relationship' }}
					/>
				</div>
				<div className="col-sm-4">
					<Field
						name="next_of_kin_contact_no"
						placeholder="Next of Kin Phone Number"
						value={next_of_kin_contact_no}
						label={{ value: 'Next of Kin Phone Number' }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-8">
					<Field
						name="next_of_kin_address"
						placeholder="Next of Kin Address"
						value={next_of_kin_address}
						label={{ value: 'Next of Kin address' }}
					/>
				</div>
				<div className="col-sm-4">
					<div className="form-group">
						<label>Next of Kin Date of Birth</label>
						<div className="custom-date-input">
							<DatePicker
								selected={next_of_kin_dob}
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								dateFormat="dd-MM-yyyy"
								className="single-daterange form-control"
								placeholderText="Select nok date of birth"
								maxDate={new Date()}
								onChange={date => setFieldValue('next_of_kin_dob', date)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6 text-left">
					<button onClick={setSection} className="btn btn-secondary">
						Previous
					</button>
				</div>
				<div className="col-sm-6 text-right">
					<Button
						variant="default"
						className="btn btn-primary"
						onClick={handleSubmit}
						isValid={isValid || isSubmitting}
						type="submit"
					>Save</Button>
				</div>
			</div>
		</div>
	);
}

export default ModalCreateStaff;
