import React, { Fragment, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { closeModals } from '../actions/general';
import { nextStep } from '../actions/patient';
import { patientSchema } from '../services/validationSchemas';
import { ethnicities, gender, maritalStatus } from '../services/constants';

function PatientForm(props) {
	const formData = props.formData;
	const patient = props.patient;
	const register_new_patient = props.register_new_patient;

	const [formTitle, setFormTitle] = useState('');
	const [patientData, setPatientData] = useState({});
	const [genderValue, setGenderValue] = useState('');
	const [hmoValue, setHmoValue] = useState('');
	const [ethValue, setEthValue] = useState('');
	const [maritalValue, setMaritalValue] = useState('');

	const hmoList = useSelector(state => state.hmo.hmo_list);
	const hmos = hmoList.map(hmo => {
		return {
			value: hmo.id,
			label: hmo.name,
		};
	});

	useEffect(() => {
		let formValues = {
			surname: formData.surname || '',
			other_names: formData.other_names || '',
			date_of_birth: formData.date_of_birth || '',
			email: formData.email || '',
			gender: formData.gender || '',
			occupation: formData.occupation || '',
			address: formData.address || '',
			phoneNumber: formData.phoneNumber || '',
			maritalStatus: formData.maritalStatus || '',
			ethnicity: formData.ethnicity || '',
			hmo: formData.hmo || '',
		};
		setFormTitle('New patient registration');
		setPatientData({ ...formValues });
		if (!register_new_patient) {
			setFormTitle('Edit patient data');
			formValues = {
				surname: patient.surname,
				other_names: patient.other_names || '',
				date_of_birth: patient.date_of_birth
					? new Date(patient.date_of_birth)
					: '',
				email: patient.email || '',
				maritalStatus: patient.maritalStatus || '',
				ethnicity: patient.ethnicity || '',
				gender: patient.gender || '',
				occupation: patient.occupation || '',
				address: patient.address || '',
				phoneNumber: patient.phoneNumber || '',
				hmo: patient.hmo_id || '',
			};
			setGenderValue(
				gender.filter(option => option.label === formValues.gender)
			);
			setHmoValue(hmos.filter(option => option.label === formValues.hmo));
			setEthValue(
				ethnicities.filter(option => option.label === formValues.ethnicity)
			);
			setMaritalValue(
				maritalStatus.filter(
					option => option.label === formValues.maritalStatus
				)
			);

			handleChange('gender', formValues.gender, setGenderValue, gender);
			handleChange(
				'maritalStatus',
				formValues.maritalStatus,
				setMaritalValue,
				maritalStatus
			);
			handleChange('hmoId', formValues.hmo, setHmoValue, hmos);
			handleChange('ethnicity', formValues.ethnicity, setEthValue, ethnicities);
			setPatientData(formValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formTitle]);

	const { register, handleSubmit, errors, setValue, watch } = useForm({
		validationSchema: patientSchema,
		defaultValues: patientData,
	});
	const values = watch();

	const onSubmit = values => {
		props.nextStep(values);
	};

	const handleChange = (name, type, fn, lists = []) => {
		let res = lists.find(
			p => p.value === type || p.value === parseInt(type, 10)
		);
		fn(res);
		if (type == null) {
			setValue(name, null);
		} else {
			setValue(name, type);
		}
	};

	return (
		<Fragment>
			<div className="modal-header faded smaller">
				<h5 className="form-header">{formTitle}</h5>
				<button
					aria-label="Close"
					className="close"
					data-dismiss="modal"
					type="button"
					onClick={() => props.closeModals(false)}>
					<span aria-hidden="true"> ×</span>
				</button>
			</div>

			<div className="form-desc"></div>
			<div className="onboarding-content with-gradient">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="modal-body">
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>
										Surname<span className="compulsory-field">*</span>
									</label>
									<input
										className="form-control"
										placeholder="Enter surname name"
										defaultValue={patientData.surname || ''}
										name="surname"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.surname && errors.surname.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>
										Other Names<span className="compulsory-field">*</span>
									</label>
									<input
										className="form-control"
										placeholder="Other Names"
										defaultValue={patientData.other_names || ''}
										name="other_names"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.other_names && errors.other_names.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>
										Email<span className="compulsory-field">*</span>
									</label>
									<input
										className="form-control"
										name="email"
										ref={register}
										defaultValue={patientData.email || ''}
										placeholder="example@email.com"
										type="text"
									/>
									<small className="text-danger">
										{errors.email && errors.email.message}
									</small>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>
										Date of birth<span className="compulsory-field">*</span>
									</label>
									<div className="custom-date-input">
										<DatePicker
											selected={values?.date_of_birth}
											onChange={date => setValue('date_of_birth', date)}
											peekNextMonth
											showMonthDropdown
											ref={register({ name: 'date_of_birth' })}
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MM-yyyy"
											className="single-daterange form-control"
											placeholderText="Select date of birth"
											maxDate={new Date()}
											name="date_of_birth"
										/>
									</div>
									<small className="text-danger">
										{errors.date_of_birth && errors.date_of_birth.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="gender">
										Gender<span className="compulsory-field">*</span>
									</label>
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
									{errors.gender && (
										<small className="text-danger">
											{errors.gender.message}
										</small>
									)}
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="maritalStatus">
										Marital Status<span className="compulsory-field">*</span>
									</label>
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
									{errors.maritalStatus && (
										<small className="text-danger">
											{errors.maritalStatus.message}
										</small>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>
										HMO<span className="compulsory-field">*</span>
									</label>

									<Select
										id="hmoId"
										ref={register({ name: 'hmoId' })}
										options={hmos}
										value={hmoValue}
										onChange={evt => {
											handleChange(
												'hmoId',
												String(evt.value),
												setHmoValue,
												hmos
											);
										}}
									/>
									{errors.hmoId && (
										<small className="text-danger">
											{errors.hmoId.message}
										</small>
									)}
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Occupation</label>
									<input
										className="form-control"
										placeholder="Occupation"
										type="text"
										defaultValue={patientData.occupation || ''}
										name="occupation"
										ref={register}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>
										Address<span className="compulsory-field">*</span>
									</label>
									<input
										className="form-control"
										placeholder="Address"
										name="address"
										defaultValue={patientData.address || ''}
										ref={register}
										type="text"
									/>
									<small className="text-danger">
										{errors.address && errors.address.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>
										Phone Number<span className="compulsory-field">*</span>
									</label>
									<input
										className="form-control"
										name="phoneNumber"
										defaultValue={patientData.phoneNumber || ''}
										ref={register}
										type="text"
									/>
									<small className="text-danger">
										{errors.phoneNumber && errors.phoneNumber.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Ethnicity</label>
									<Select
										name="ethnicity"
										ref={register({ name: 'ethnicity' })}
										options={ethnicities}
										value={ethValue}
										onChange={evt => {
											handleChange(
												'ethnicity',
												String(evt.value),
												setEthValue,
												ethnicities
											);
										}}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer buttons-on-right">
						<button
							className="btn btn-default"
							type="button"
							onClick={() => props.closeModals(false)}>
							Cancel
						</button>
						<button className="btn btn-primary" type="submit">
							Next
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
		patient: state.user.patient,
		register_new_patient: state.general.register_new_patient,
	};
};

export default connect(mapStateToProps, { closeModals, nextStep })(PatientForm);
