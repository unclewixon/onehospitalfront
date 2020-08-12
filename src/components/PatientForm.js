import React, { Fragment, useEffect, useState } from 'react';
import { closeModals } from '../actions/general';
import { nextStep } from '../actions/patient';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { patientSchema } from '../services/validationSchemas';
import Select from 'react-select';
import {
	ethnicities,
	gender,
	maritalStatus,
	insuranceStatus,
} from '../services/constants';
import { getAllHmos } from '../actions/hmo';
import DatePicker from 'react-datepicker';

function PatientForm(props) {
	const formData = props.formData;
	const patient = props.patient;
	const register_new_patient = props.register_new_patient;
	const [formTitle, setFormTitle] = useState('');
	const [patientData, setPatientData] = useState({});
	const [genderValue, setGenderValue] = useState('');
	const [insValue, setInsValue] = useState('');
	const [hmoValue, setHmoValue] = useState('');
	const [ethValue, setEthValue] = useState('');
	const [maritalValue, setMaritalValue] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [isHmo, setIsHmo] = useState(false);
	const [hmos, setHmos] = useState([]);
	const getAllHmos = () => {
		let hmos = props.hmoList.map(hmo => {
			return {
				value: hmo.id,
				label: hmo.name,
			};
		});

		setHmos(hmos);
	};
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
			insurranceStatus: formData.insurranceStatus || '',
			hmo: formData.hmo || '',
		};
		setFormTitle('New patient registration');
		setPatientData({ ...formValues });
		if (!register_new_patient) {
			setFormTitle('Edit patient data');
			formValues = {
				surname: patient.surname,
				other_names: patient.other_names || '',
				date_of_birth: patient.date_of_birth || '',
				email: patient.email || '',
				maritalStatus: patient.maritalStatus || '',
				insurranceStatus: patient.insurranceStatus || '',
				ethnicity: patient.ethnicity || '',
				gender: patient.gender || '',
				occupation: patient.occupation || '',
				address: patient.address || '',
				phoneNumber: patient.phoneNumber || '',
				hmo: patient.hmo || '',
			};
			setGenderValue(
				gender.filter(option => option.label === formValues.gender)
			);
			setInsValue(
				insuranceStatus.filter(
					option => option.label === formValues.insurranceStatus
				)
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
			handleChange(
				'insurranceStatus',
				formValues.insurranceStatus,
				setInsValue,
				insuranceStatus
			);
			handleChange('hmoId', formValues.hmo, setHmoValue, hmos);
			handleChange('ethnicity', formValues.ethnicity, setEthValue, ethnicities);
			setPatientData(formValues);
		}
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
		let res = lists.find(p => p.value === type);
		fn(res);
		if (type == null) {
			setValue(name, null);
		} else {
			if (name === 'insurranceStatus') {
				if (type === 'HMO') {
					setIsHmo(true);
					setValue(name, type);
				} else {
					setIsHmo(false);
					setValue(name, type);
					setValue('hmoId', null);
				}
			} else {
				setValue(name, type);
			}
		}
	};

	useEffect(() => {
		if (!loaded) {
			props.getAllHmos();
		}
		getAllHmos();
		setLoaded(true);
	}, [loaded, props]);
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
									<label>Surame</label>
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
									<label>Other Names</label>
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
									<label>Email</label>
									<input
										className="form-control"
										name="email"
										ref={register}
										defaultValue={patientData.email || ''}
										placeholder="example@email.com"
										type="text"
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Date of birth</label>
									<div className="custom-date-input">
										<DatePicker
											selected={values?.date_of_birth}
											onChange={date => setValue('date_of_birth', date)}
											peekNextMonth
											showMonthDropdown
											ref={register({ name: 'date_of_birth' })}
											showYearDropdown
											dropdownMode="select"
											dateFormat="yyyy-MM-dd"
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
							<div className="col-sm">
								<div className="form-group">
									<label htmlFor="maritalStatus">Marital Status</label>
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
						</div>
						<div className="row">
							<div className="col-sm">
								<div className="form-group">
									<label>Insurance Status</label>
									<Select
										id="insurranceStatus"
										ref={register({ name: 'insurranceStatus' })}
										options={insuranceStatus}
										value={insValue}
										onChange={evt => {
											handleChange(
												'insurranceStatus',
												String(evt.value),
												setInsValue,
												insuranceStatus
											);
										}}
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Hmos</label>
									<Select
										id="hmoId"
										ref={register({ name: 'hmoId' })}
										options={isHmo ? hmos : []}
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
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Occupation</label>
									<input
										className="form-control"
										placeholder=""
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
									<label>Address</label>
									<input
										className="form-control"
										name="address"
										defaultValue={patientData.address || ''}
										ref={register}
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="form-control"
										name="phoneNumber"
										defaultValue={patientData.phoneNumber || ''}
										ref={register}
										type="text"
									/>
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
							{' '}
							Cancel
						</button>
						<button className="btn btn-primary" type="submit">
							{' '}
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
		hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, { closeModals, nextStep, getAllHmos })(
	PatientForm
);
