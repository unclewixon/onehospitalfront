import React, { Fragment, useEffect, useState } from 'react';
import { closeModals } from '../../actions/general';
import DatePicker from 'react-datepicker';
// import { updateStaff } from '../../actions/user';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { staffAPI } from '../../services/constants';
import { gender, maritalStatus, religions } from '../../services/constants';
import moment from 'moment';
// import orderBy from 'lodash.orderby';

function EditStaff(props) {
	const formData = props.formData;
	const staff = props.staff;
	const edit_staff_data = props.edit_staff_datad;
	const [formTitle, setFormTitle] = useState('');
	const [staffData, setStaffData] = useState({});
	const [genderValue, setGenderValue] = useState('');
	const [bank, setBankValue] = useState([]);
	const [date_of_birth, setDob] = useState();
	const [next_of_kin_dob, setNextOfKinDob] = useState();
	const [religionValue, setReligionValue] = useState('');
	const [maritalValue, setMaritalValue] = useState('');
	// const [nationality, setNationalityValue] = useState('');
	const [submitting, setSubmitting] = useState(false);

	// const _countries = props.countries.map(c => ({
	// 	value: c.name,
	// 	label: c.name,
	// }));
	// const sortedCountries = orderBy(_countries, ['value'], ['asc']);

	const banks = props.banks.map(bank => {
		return { value: bank.name, label: bank.name };
	});

	useEffect(() => {
		let formValues = {
			account_number: formData.account_number,
			address: formData.address || '',
			bank_name: formData.bank_name,
			date_of_birth: formData.date_of_birth || '',
			email: formData.email || '',
			employment_start_date: formData.employment_start_date,
			first_name: formData.first_name,
			gender: formData.gender || '',
			last_name: formData.last_name || '',
			lga: formData.lga,
			maritalStatus: formData.maritalStatus || '',
			nationality: formData.nationality,
			next_of_kin: formData.next_of_kin,
			next_of_kin_address: formData.next_of_kin_address,
			next_of_kin_contact_no: formData.next_of_kin_contact_no,
			next_of_kin_dob: formData.next_of_kin_dob,
			number_of_children: formData.number_of_children,
			other_names: formData.other_names || '',
			state: formData.state || '',
			surname: formData.surname,
			// phoneNumber: formData.phone_number || '',
			religion: formData.religion,
		};
		setFormTitle('Edit staff data');
		setStaffData(formValues);
		if (!edit_staff_data) {
			setFormTitle('Edit staff data');
			formValues = {
				account_number: staff.details.account_number,
				address: staff.details.address || '',
				bank_name: staff.details.bank_name,
				date_of_birth: staff.details.date_of_birth || '',
				email: staff.details.email || '',
				employment_start_date: staff.details.employment_start_date,
				first_name: staff.details.first_name || '',
				gender: staff.details.gender || '',
				last_name: staff.details.last_name || '',
				lga: staff.details.lga,
				maritalStatus: staff.details.marital_status || '',
				nationality: staff.details.nationality,
				next_of_kin: staff.details.next_of_kin,
				next_of_kin_address: staff.details.next_of_kin_address,
				next_of_kin_dob: staff.details.next_of_kin_dob,
				next_of_kin_relationship: staff.details.next_of_kin_relationship,
				next_of_kin_contact_no: staff.details.next_of_kin_contact_no,
				number_of_children: staff.details.number_of_children,
				other_names: staff.details.other_names || '',
				state: staff.details.state_of_origin,
				surname: staff.details.surname,
				phoneNumber: staff.details.phone_number || '',
				religion: staff.details.religion,
			};
			setGenderValue(
				gender.filter(option => option.label === formValues.gender)
			);

			setMaritalValue(
				maritalStatus.filter(
					option => option.label === formValues.maritalStatus
				)
			);

			setReligionValue(
				religions.filter(option => option.label === formValues.religion)
			);

			setBankValue(
				banks.filter(option => option.label === formValues.bank_name)
			);

			// setNationalityValue(
			// 	sortedCountries.filter(
			// 		option => option.label === formValues.nationality
			// 	)
			// );
			setStaffData(formValues);
			setDob(formValues.date_of_birth);
			setNextOfKinDob(moment(formValues.next_of_kin_dob).format('DD-MM-YYYY'));
			console.log(next_of_kin_dob);
			handleChange('gender', formValues.gender, setGenderValue, gender);
			handleChange(
				'maritalStatus',
				formValues.maritalStatus,
				setMaritalValue,
				maritalStatus
			);
			handleChange(
				'religion',
				formValues.religion,
				setReligionValue,
				religions
			);
			setStaffData(formValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formTitle]);

	const { register, handleSubmit, errors, setValue } = useForm({
		// validationSchema: staffSchema,
		defaultValues: staffData,
	});

	const onSubmit = async values => {
		setSubmitting(true);
		try {
			await request(
				`${staffAPI}/${staff.details.id}/update`,
				'PATCH',
				true,
				values
			);
			// props.updateStaff(rs);
			setSubmitting(false);
			notifySuccess('profile updated');
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			notifyError(e.message || 'could not create staff');
		}
	};

	const handleChange = (name, type, fn, lists = []) => {
		let res = lists.find(p => p.value === type);
		fn(res);
		if (type == null) {
			setValue(name, null);
		} else {
			if (name === 'nationality') {
				// onSelectCountry();
				// if (type === 'HMO') {
				// 	setValue(name, type);
				// }
				// else {
				// 	setValue(name, type);
				// }
			} else {
				setValue(name, type);
			}
		}
	};

	return (
		<Fragment>
			<h5 className="form-header">{formTitle}</h5>
			<div className="form-desc"></div>
			<div className="onboarding-content with-gradient">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="modal-body">
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>First Name</label>
									<input
										className="form-control"
										placeholder="Enter first name"
										defaultValue={staffData.first_name || ''}
										name="first_name"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.first_name && errors.first_name.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Last Name</label>
									<input
										className="form-control"
										placeholder="Last Names"
										defaultValue={staffData.last_name || ''}
										name="last_names"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.last_name && errors.last_name.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Other Names</label>
									<input
										className="form-control"
										placeholder="Other Names"
										defaultValue={staffData.other_names || ''}
										name="other_names"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.other_names && errors.other_names.message}
									</small>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="gender">Department</label>
									<Select
										id="gender"
										ref={register({ name: 'gender' })}
										options={gender}
										value={genderValue}
										onChange={evt => {
											handleChange(
												'gender',
												String(evt.value),
												setGenderValue,
												gender
											);
										}}
										isDisabled
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Date of Birth</label>
									<div className="custom-date-input">
										<DatePicker
											selected={date_of_birth}
											onChange={date => setDob(date)}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MM-yyyy"
											className="single-daterange form-control"
											placeholderText="Select date of birth"
											maxDate={new Date()}
											ref={register({ name: 'date_of_birth' })}
										/>
									</div>
								</div>
							</div>

							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="religion">Religion</label>
									<Select
										id="religion"
										ref={register({ name: 'religion' })}
										options={religions}
										value={religionValue}
										onChange={evt => {
											handleChange(
												'religion',
												String(evt.value),
												setReligionValue,
												religions
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Email address</label>
									<input
										className="form-control"
										placeholder="johndoe@gmail.com"
										type="text"
										defaultValue={staffData.email || ''}
										name="email"
										ref={register}
									/>
									<small className="text-danger">
										{errors.email && errors.email.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="form-control"
										name="phoneNumber"
										defaultValue={staffData.phoneNumber || ''}
										ref={register}
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="gender">Gender</label>
									<Select
										id="gender"
										ref={register({ name: 'gender' })}
										options={gender}
										value={genderValue}
										onChange={evt => {
											handleChange(
												'gender',
												String(evt.value),
												setGenderValue,
												gender
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Nationality</label>
									<input
										className="form-control"
										name="nationality"
										defaultValue={staffData.nationality || ''}
										ref={register}
										disabled
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>State of Origin</label>
									<input
										className="form-control"
										name="state"
										defaultValue={staffData.state || ''}
										ref={register}
										disabled
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>LGA</label>
									<input
										className="form-control"
										placeholder="Local government"
										type="text"
										defaultValue={staffData.lga || ''}
										name="lga"
										ref={register}
									/>
									<small className="text-danger">
										{errors.lga && errors.lga.message}
									</small>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Contact Address</label>
									<input
										className="form-control"
										name="address"
										defaultValue={staffData.address || ''}
										ref={register}
										type="text"
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<div className="form-group">
									<label htmlFor="gender">Marital Status</label>
									<Select
										id="maritalStatus"
										ref={register({ name: 'maritalStatus' })}
										options={maritalStatus}
										value={maritalValue}
										onChange={evt => {
											handleChange(
												'maritalStatus',
												String(evt.value),
												setMaritalValue,
												maritalStatus
											);
										}}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Number of Children</label>
									<input
										className="form-control"
										placeholder="Number of Children"
										type="number"
										defaultValue={staffData.number_of_children || ''}
										name="number_of_children"
										ref={register}
									/>
									<small className="text-danger">
										{errors.number_of_children &&
											errors.number_of_children.message}
									</small>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<div className="form-group">
									<label htmlFor="gender">Bank</label>
									<Select
										id="gender"
										ref={register({ name: 'bank' })}
										options={banks}
										value={bank}
										onChange={evt => {
											handleChange(
												'bank',
												String(evt.value),
												setBankValue,
												banks
											);
										}}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Account Number</label>
									<input
										className="form-control"
										placeholder="04/12/1978"
										type="text"
										defaultValue={staffData.account_number || ''}
										name="account_number"
										ref={register}
									/>
									<small className="text-danger">
										{errors.account_number && errors.account_number.message}
									</small>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Employment start date</label>
									<input
										className="form-control"
										placeholder="04/12/1978"
										type="text"
										defaultValue={staffData.employment_start_date || ''}
										name="employment_start_date"
										disabled
										ref={register}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<div className="form-group">
									<label>Next of Kin name</label>
									<input
										className="form-control"
										placeholder="John Doe"
										type="text"
										defaultValue={staffData.next_of_kin || ''}
										name="next_of_kin"
										ref={register}
									/>
									<small className="text-danger">
										{errors.next_of_kin && errors.next_of_kin.message}
									</small>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Next of Kin relationship</label>
									<input
										className="form-control"
										placeholder="Brother"
										type="text"
										defaultValue={staffData.next_of_kin_relationship || ''}
										name="next_of_kin_relationship"
										ref={register}
									/>
									<small className="text-danger">
										{errors.next_of_kin_relationship &&
											errors.next_of_kin_relationship.message}
									</small>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Next of Kin phone number</label>
									<input
										className="form-control"
										placeholder="08012345679"
										type="text"
										defaultValue={staffData.next_of_kin_contact_no || ''}
										name="next_of_kin_contact_no"
										ref={register}
									/>
									<small className="text-danger">
										{errors.next_of_kin_contact_no &&
											errors.next_of_kin_contact_no.message}
									</small>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-8">
								<div className="form-group">
									<label>Next of Kin address</label>
									<input
										className="form-control"
										placeholder="Address"
										type="text"
										defaultValue={staffData.next_of_kin_address || ''}
										name="next_of_kin_address"
										ref={register}
									/>
									<small className="text-danger">
										{errors.next_of_kin_address &&
											errors.next_of_kin_address.message}
									</small>
								</div>
							</div>
							{/* <div className="col-sm-4">
								<div className="form-group">
									<label>Next of Kin Date of Birth</label>
									<div className="custom-date-input">
										<DatePicker
											selected={next_of_kin_dob}
											onChange={date => setNextOfKinDob(date)}
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
							</div> */}
						</div>
					</div>

					<div className="modal-footer buttons-on-right">
						<button
							className="btn btn-default"
							type="button"
							onClick={() => props.closeModals(false)}>
							Cancel
						</button>
						<button
							className="btn btn-primary"
							type="submit"
							disabled={submitting}>
							{submitting ? <img src={waiting} alt="submitting" /> : 'Update'}
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		formData: state.patient.formData,
		staff: state.user.staff,
		// register_new_patient: state.general.register_new_patient,
		countries: state.utility.countries,
		banks: state.utility.banks,
	};
};

//@TODO: please add updateStaff as parameter to connect reoslving updateStaff action

export default connect(mapStateToProps, { closeModals })(EditStaff);
