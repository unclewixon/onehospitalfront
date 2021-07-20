import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { API_URI, TOKEN_COOKIE } from '../services/constants';
import { prevStep, resetStep } from '../actions/patient';
import { closeModals } from '../actions/general';
import { patientNOKSchema } from '../services/validationSchemas';
import {
	ethnicities,
	gender,
	maritalStatus,
	relationships,
} from '../services/constants';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { setPatientRecord } from '../actions/user';
import { addNewPatient, updatePatient } from '../actions/patient';
import SSRStorage from '../services/storage';
import { loadPatients } from '../actions/patient';

function PatientNOKForm(props) {
	const formData = props.formData;
	const patient = props.patient;
	const register_new_patient = props.register_new_patient;
	const [formTitle, setFormTitle] = useState('');
	const [patientData, setPatientData] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [genderValue, setGenderValue] = useState('');
	const [ethValue, setEthValue] = useState('');
	const [relationshipValue, setRelationshipValue] = useState('');
	const [maritalValue, setMaritalValue] = useState('');
	const storage = new SSRStorage();

	const { location } = props;
	const path = location.pathname.split('/').pop();

	useEffect(() => {
		let formValues = {
			nok_surname: formData.nok_surname || '',
			nok_other_names: formData.nok_other_names || '',
			nok_date_of_birth: formData.nok_date_of_birth || '',
			nok_email: formData.nok_email || '',
			nok_gender: formData.nok_gender || '',
			nok_occupation: formData.nok_occupation || '',
			nok_address: formData.nok_address || '',
			nok_phoneNumber: formData.nok_phoneNumber || '',
			nok_relationship: formData.nok_relationship || '',
		};
		setFormTitle('Partner/Next of Kin');
		setPatientData(formValues);
		if (!register_new_patient) {
			setFormTitle('Edit Partner/Next of Kin');
			formValues = {
				nok_surname: patient.nextOfKin?.surname || '',
				nok_other_names: patient.nextOfKin?.other_names || '',
				nok_date_of_birth: patient.nextOfKin?.nok_date_of_birth
					? new Date(patient.nextOfKin.nok_date_of_birth)
					: '',
				nok_email: patient.nextOfKin?.email || '',
				nok_gender: patient.nextOfKin?.gender || '',
				nok_occupation: patient.nextOfKin?.occupation || '',
				nok_address: patient.nextOfKin?.address || '',
				nok_ethnicity: patient.nextOfKin?.ethnicity || '',
				nok_maritalStatus: patient.nextOfKin?.maritalStatus || '',
				nok_phoneNumber: patient.nextOfKin?.phoneNumber || '',
				nok_relationship: patient.nextOfKin?.relationship || '',
			};
			setValue('nok_date_of_birth', patientData?.nok_date_of_birth);
			setGenderValue(
				gender.filter(option => option.label === formValues.nok_gender)
			);
			setEthValue(
				ethnicities.filter(option => option.label === formValues.nok_ethnicity)
			);
			setMaritalValue(
				maritalStatus.filter(
					option => option.label === formValues.nok_maritalStatus
				)
			);
			setRelationshipValue(
				relationships.filter(
					option => option.label === formValues.nok_relationship
				)
			);

			handleChange(
				'nok_ethnicity',
				formValues.nok_ethnicity,
				setEthValue,
				ethnicities
			);
			handleChange(
				'nok_relationship',
				formValues.nok_relationship,
				setRelationshipValue,
				relationships
			);
			handleChange(
				'nok_maritalStatus',
				formValues.nok_maritalStatus,
				setMaritalValue,
				maritalStatus
			);
			handleChange('nok_gender', formValues.nok_gender, setGenderValue, gender);
			setPatientData(formValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formTitle]);

	const { register, handleSubmit, errors, setValue, watch } = useForm({
		validationSchema: patientNOKSchema,
		defaultValues: patientData,
	});

	const handleChange = (name, type, fn, lists = []) => {
		let res = lists.find(p => p.value === type);
		fn(res);
		if (type == null) {
			setValue(name, null);
		} else {
			setValue(name, type);
		}
	};

	const onSubmit = async values => {
		const data = { ...formData, ...values };
		const datum = {
			...data,
			date_of_birth: data.date_of_birth
				? moment(data.date_of_birth).format('YYYY-MM-DD')
				: '',
		};
		console.log(datum);
		const formDataObj = new FormData();
		const unValidatedFields = [
			'occupation',
			'address',
			'ethnicity',
			'nok_date_of_birth',
			'relationship',
			'nok_occupation',
			'nok_address',
			'nok_email',
			'nok_phoneNumber',
			'nok_gender',
			'nok_maritalStatus',
			'nok_ethnicity',
		];
		for (const key in datum) {
			formDataObj.append(key, datum[key]);
		}

		for (const f in unValidatedFields) {
			if (!(f in datum)) {
				formDataObj.append(f, '');
			}
		}

		const user = await storage.getItem(TOKEN_COOKIE);
		const jwt = `Bearer ${user.token}`;
		let headers = { Authorization: jwt };
		setSubmitting(true);
		if (!register_new_patient) {
			axios
				.patch(`${API_URI}/patient/${patient.id}/update`, formDataObj, {
					headers,
				})
				.then(res => {
					setSubmitting(false);
					if (res.data?.success) {
						props.setPatientRecord(res.data?.patient);
						props.updatePatient(res.data?.patient);
						notifySuccess(`${patient.other_names} record was updated!`);
						if (path === 'front-desk') {
							props.history.push('/front-desk/patients');
						}
						props.closeModals(false);
					} else {
						notifyError(res.data.message);
					}
				})
				.catch(e => {
					setSubmitting(false);
					notifyError(
						e.message || `could not update ${patient.other_names} record`
					);
				});
		} else {
			axios
				.post(`${API_URI}/patient/save`, formDataObj, { headers })
				.then(res => {
					setSubmitting(false);
					if (res.data?.success) {
						const pat = res.data?.patient || {};
						props.addNewPatient(pat);
						const allPatients = [pat, ...props.patients];
						props.loadPatients(allPatients);
						notifySuccess('New patient account created!');
						if (path === 'front-desk') {
							props.history.push('/front-desk/patients');
						}
						props.closeModals(false);
						props.resetStep();
					} else {
						notifyError(res.data.message);
					}
				})
				.catch(e => {
					setSubmitting(false);
					const _message = e.response.data.message
						.map(m => Object.values(m.constraints).join(', '))
						.join(', ');
					notifyError(_message || 'could not save patient record');
				});
		}
	};

	const values = watch();
	register({ name: 'nok_gender' });
	register({ name: 'nok_maritalStatus' });
	register({ name: 'nok_ethnicity' });
	register({ name: 'nok_relationship' });

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
									<label>Surname</label>
									<input
										className="form-control"
										placeholder="Enter surname name"
										defaultValue={patientData.nok_surname || ''}
										name="nok_surname"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.nok_surname && errors.nok_surname.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Other Names</label>
									<input
										className="form-control"
										placeholder="Other Names"
										name="nok_other_names"
										defaultValue={patientData.nok_other_names || ''}
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.nok_other_names && errors.nok_other_names.message}
									</small>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Date of birth</label>
									<div className="custom-date-input">
										<DatePicker
											selected={
												patientData?.nok_date_of_birth ||
												values?.nok_date_of_birth
											}
											onChange={date => setValue('nok_date_of_birth', date)}
											peekNextMonth
											showMonthDropdown
											ref={register({ name: 'nok_date_of_birth' })}
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MM-yyyy"
											className="single-daterange form-control"
											placeholderText="Select date of birth"
											maxDate={new Date()}
											name="nok_date_of_birth"
										/>
									</div>
									{errors.nok_date_of_birth && (
										<small className="text-danger">
											{errors.nok_date_of_birth.message}
										</small>
									)}
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="gender">Gender</label>
									<Select
										name="nok_gender"
										ref={register}
										options={gender}
										value={genderValue}
										onChange={evt => {
											handleChange(
												'nok_gender',
												String(evt.value),
												setGenderValue,
												gender
											);
										}}
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="nok_maritalStatus">Marital Status</label>
									<Select
										name="nok_maritalStatus"
										ref={register}
										options={maritalStatus}
										value={maritalValue}
										onChange={evt => {
											handleChange(
												'nok_maritalStatus',
												String(evt.value),
												setMaritalValue,
												maritalStatus
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Occupation</label>
									<input
										className="form-control"
										placeholder="Occupation"
										type="text"
										defaultValue={patientData.nok_occupation || ''}
										name="nok_occupation"
										ref={register}
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Ethnicity</label>
									<Select
										id="nok_ethnicity"
										ref={register}
										options={ethnicities}
										value={ethValue}
										onChange={evt => {
											handleChange(
												'nok_ethnicity',
												String(evt.value),
												setEthValue,
												ethnicities
											);
										}}
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Relationship to patient</label>
									<Select
										id="nok_relationship"
										ref={register}
										options={relationships}
										value={relationshipValue}
										onChange={evt => {
											handleChange(
												'nok_relationship',
												String(evt.value),
												setRelationshipValue,
												relationships
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Address</label>
									<input
										className="form-control"
										placeholder="Address"
										name="nok_address"
										defaultValue={patientData.nok_address || ''}
										ref={register}
										type="text"
									/>
									{errors.nok_address && (
										<small className="text-danger">
											{errors.nok_address.message}
										</small>
									)}
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="form-control"
										name="nok_phoneNumber"
										placeholder="Phone No."
										defaultValue={patientData.nok_phoneNumber || ''}
										ref={register}
										type="text"
									/>
									{errors.nok_phoneNumber && (
										<small className="text-danger">
											{errors.nok_phoneNumber.message}
										</small>
									)}
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Email</label>
									<input
										className="form-control"
										name="nok_email"
										placeholder="Email"
										ref={register}
										defaultValue={patientData.nok_email || ''}
										type="text"
									/>
									{errors.nok_email && (
										<small className="text-danger">
											{errors.nok_email.message}
										</small>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer ">
						<button
							className="btn btn-secondary buttons-on-left"
							type="button"
							onClick={() => props.prevStep(1)}>
							Previous
						</button>
						<button className="btn btn-primary buttons-on-right" type="submit">
							{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
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
		patients: state.patient.patients,
		register_new_patient: state.general.register_new_patient,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		setPatientRecord,
		prevStep,
		resetStep,
		closeModals,
		loadPatients,
		addNewPatient,
		updatePatient,
	})(PatientNOKForm)
);
