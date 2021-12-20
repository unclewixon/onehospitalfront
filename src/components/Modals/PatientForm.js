import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import startCase from 'lodash.startcase';
import { withRouter } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

import FormWizard from '../FormWizard';
import {
	genders,
	maritalStatuses,
	ethnicities,
	hmoAPI,
	relationships,
} from '../../services/constants';
import { request, staffname } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { messageService } from '../../services/message';
import { setPatientRecord } from '../../actions/user';

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

const Condition = ({ when, is, children }) => (
	<Field name={when} subscription={{ value: true }}>
		{({ input: { value } }) => (value === is ? children : null)}
	</Field>
);

const PatientForm = ({ patient, closeModal, history, location }) => {
	const path = location.pathname.split('/');

	const [loaded, setLoaded] = useState(false);
	const [hmo, setHmo] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [nokDateOfBirth, setNokDateOfBirth] = useState(null);
	const [staff, setStaff] = useState(null);

	const dispatch = useDispatch();

	const getHmoSchemes = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `${hmoAPI}/schemes?q=${q}`;
		const { result } = await request(url, 'GET', true);
		return result;
	};

	const getStaffs = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const result = await request(url, 'GET', true);
		return result;
	};

	let initialValues = {};
	if (patient) {
		initialValues = {
			surname: patient.surname || '',
			other_names: patient.other_names || '',
			email: patient.email || '',
			date_of_birth: patient.date_of_birth
				? moment(patient.date_of_birth, 'YYYY-MM-DD').format('DD-MM-YYYY')
				: '',
			gender: patient.gender
				? {
						value: startCase(patient.gender),
						label: startCase(patient.gender),
				  }
				: '',
			maritalStatus: patient.maritalStatus
				? {
						value: patient.maritalStatus,
						label: patient.maritalStatus,
				  }
				: '',
			hmo_id: patient.hmo?.id || '',
			occupation: patient.occupation || '',
			address: patient.address || '',
			phone_number: patient.phone_number || '',
			ethnicity: patient.ethnicity
				? { value: patient.ethnicity, label: patient.ethnicity }
				: '',
			nok_surname: patient?.nextOfKin?.surname || '',
			nok_other_names: patient?.nextOfKin?.other_names || '',
			nok_date_of_birth: patient?.nextOfKin?.date_of_birth
				? moment(patient.nextOfKin.date_of_birth, 'YYYY-MM-DD').format(
						'DD-MM-YYYY'
				  )
				: '',
			nok_gender: patient?.nextOfKin?.gender
				? {
						value: patient?.nextOfKin?.gender,
						label: patient?.nextOfKin?.gender,
				  }
				: '',
			nok_maritalStatus: patient?.nextOfKin?.maritalStatus
				? {
						value: patient?.nextOfKin?.maritalStatus,
						label: patient?.nextOfKin?.maritalStatus,
				  }
				: '',
			nok_occupation: patient.nextOfKin?.occupation || '',
			nok_ethnicity: patient?.nextOfKin?.ethnicity
				? {
						value: patient?.nextOfKin?.ethnicity,
						label: patient?.nextOfKin?.ethnicity,
				  }
				: '',
			nok_relationship: patient?.nextOfKin?.relationship
				? {
						value: patient?.nextOfKin?.relationship,
						label: patient?.nextOfKin?.relationship,
				  }
				: '',
			nok_address: patient?.nextOfKin?.address || '',
			nok_phoneNumber: patient?.nextOfKin?.phoneNumber || '',
			nok_email: patient?.nextOfKin?.email || '',
			is_staff: patient?.staff?.id || false,
		};
	}

	useEffect(() => {
		if (!loaded) {
			if (patient) {
				if (patient.date_of_birth) {
					setDateOfBirth(moment(patient.date_of_birth, 'YYYY-MM-DD').toDate());
				} else {
					setDateOfBirth(null);
				}
				if (patient?.nextOfKin?.date_of_birth) {
					setNokDateOfBirth(
						moment(patient.nextOfKin.date_of_birth, 'YYYY-MM-DD').toDate()
					);
				} else {
					setNokDateOfBirth(null);
				}
				if (patient?.staff) {
					setStaff(patient.staff);
				} else {
					setStaff(null);
				}
				setHmo(patient?.hmo);
			}
			setLoaded(true);
		}
	}, [loaded, patient]);

	const onSubmit = async values => {
		const data = {
			...values,
			date_of_birth: moment(values.date_of_birth, 'DD-MM-YYYY').format(
				'YYYY-MM-DD'
			),
			nok_date_of_birth:
				values.nok_date_of_birth && values.nok_date_of_birth !== ''
					? moment(values.nok_date_of_birth, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
			ethnicity: values.ethnicity?.value || '',
			gender: values.gender?.value || '',
			maritalStatus: values.maritalStatus?.value || '',
			nok_ethnicity: values.nok_ethnicity?.value || '',
			nok_gender: values.nok_gender?.value || '',
			nok_maritalStatus: values.nok_maritalStatus?.value || '',
			nok_relationship: values.nok_relationship?.value || '',
		};

		if (!patient) {
			try {
				dispatch(startBlock());
				const rs = await request('patient', 'POST', true, data);
				dispatch(stopBlock());
				if (rs.success) {
					notifySuccess('Patient account created!');
					if (path[1] === 'front-desk') {
						history.push('/front-desk/patients');
					} else {
						messageService.sendMessage({
							type: 'new-patient',
							data: rs.patient,
						});
					}
					closeModal();
				} else {
					return {
						[FORM_ERROR]: rs.message || 'could not save patient record',
					};
				}
			} catch (e) {
				console.log(e.message);
				dispatch(stopBlock());
				return { [FORM_ERROR]: 'could not save patient record' };
			}
		} else {
			try {
				dispatch(startBlock());
				const url = `patient/${patient.id}`;
				const rs = await request(url, 'PUT', true, data);
				dispatch(stopBlock());
				if (rs.success) {
					dispatch(setPatientRecord({ ...patient, ...rs.patient }));
					if (path === 'patients') {
						messageService.sendMessage({
							type: 'update-patient',
							data: rs.patient,
						});
					}
					notifySuccess('Patient account saved!');
					closeModal();
				} else {
					return {
						[FORM_ERROR]: rs.message || 'could not save patient record',
					};
				}
			} catch (e) {
				console.log(e.message);
				dispatch(stopBlock());
				return { [FORM_ERROR]: 'could not save patient record' };
			}
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg" style={{ maxWidth: '1024px' }}>
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<h5 className="form-header">
							{patient ? 'Edit Patient Record' : 'New Patient Registeration'}
						</h5>
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}>
							<span className="os-icon os-icon-close" />
						</button>
					</div>
					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<div className="support-index">
								<div className="support-ticket-content-w">
									<div
										className="support-ticket-info"
										style={{ flex: '0 0 200px' }}>
										<div
											className="customer mb-0 pb-0"
											style={{ width: '110px', borderBottom: '0 none' }}>
											<div
												className="avatar"
												style={{
													width: '110px',
													borderRadius: '65px',
													margin: 'auto',
												}}>
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
									}}>
									<FormWizard
										initialValues={Object.fromEntries(
											Object.entries(initialValues).filter(([_, v]) => v !== '')
										)}
										onSubmit={onSubmit}
										btnClasses="modal-footer buttons-on-right">
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.surname) {
													errors.surname = "Enter patient's surname";
												}
												if (!values.other_names) {
													errors.other_names = "Enter patient's other names";
												}
												if (!values.email) {
													errors.email = "Enter patient's email address";
												}
												if (!values.date_of_birth) {
													errors.date_of_birth =
														"Enter patient's date of birth";
												}
												if (!values.gender) {
													errors.gender = "Select patient's gender";
												}
												if (!values.maritalStatus) {
													errors.maritalStatus =
														"Select patient's marital status";
												}
												if (!values.hmo_id) {
													errors.hmo_id = "Select patient's HMO";
												}
												if (!values.address) {
													errors.address = "Enter patient's address";
												}
												if (!values.phone_number) {
													errors.phone_number = "Enter patient's phone number";
												}
												if (!values.ethnicity) {
													errors.ethnicity = "Enter patient's ethnicity";
												}
												return errors;
											}}>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Surname <Compulsory />
														</label>
														<Field
															name="surname"
															className="form-control"
															component="input"
															type="text"
															placeholder="Surname"
														/>
														<Error name="surname" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Other Names <Compulsory />
														</label>
														<Field
															name="other_names"
															className="form-control"
															component="input"
															type="text"
															placeholder="Other Names"
														/>
														<Error name="other_names" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Email <Compulsory />
														</label>
														<Field
															name="email"
															className="form-control"
															component="input"
															type="email"
															placeholder="Email e.g example@gmail.com"
														/>
														<Error name="email" />
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
															Marital Status <Compulsory />
														</label>
														<Field
															name="maritalStatus"
															component={ReactSelectAdapter}
															options={maritalStatuses}
														/>
														<Error name="maritalStatus" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															HMO <Compulsory />
														</label>
														<Field name="hmo_id">
															{({ input, meta }) => (
																<AsyncSelect
																	isClearable
																	getOptionValue={option => option.id}
																	getOptionLabel={option =>
																		`${option.name} ${
																			option.name !== 'Private'
																				? option.phone_number || ''
																				: ''
																		}`
																	}
																	defaultOptions
																	value={hmo}
																	loadOptions={getHmoSchemes}
																	onChange={e => {
																		setHmo(e);
																		e
																			? input.onChange(e.id)
																			: input.onChange('');
																	}}
																	placeholder="Search hmo scheme"
																/>
															)}
														</Field>
														<Error name="hmo_id" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Occupation</label>
														<Field
															name="occupation"
															className="form-control"
															component="input"
															type="text"
															placeholder="Occupation"
														/>
													</div>
												</div>
											</div>
											<div className="row">
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
															Ethnicity <Compulsory />
														</label>
														<Field
															name="ethnicity"
															component={ReactSelectAdapter}
															options={ethnicities}
														/>
														<Error name="ethnicity" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-2">
													<div className="form-group">
														<label>Is Staff</label>
														<Field
															name="is_staff"
															component="input"
															type="checkbox"
														/>
													</div>
												</div>
												<Condition when="is_staff" is={true}>
													<div className="col-sm-10">
														<div className="form-group">
															<label>Staff</label>
															<Field name="staff_id">
																{({ input, meta }) => (
																	<AsyncSelect
																		isClearable
																		getOptionValue={option => option.id}
																		getOptionLabel={option => staffname(option)}
																		defaultOptions
																		value={staff}
																		loadOptions={getStaffs}
																		onChange={e => {
																			setStaff(e);
																			e
																				? input.onChange(e.id)
																				: input.onChange('');
																		}}
																		placeholder="Search staff"
																	/>
																)}
															</Field>
														</div>
													</div>
												</Condition>
											</div>
										</FormWizard.Page>
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.nok_surname) {
													errors.nok_surname = 'Enter next of kin surname';
												}
												if (!values.nok_other_names) {
													errors.nok_other_names =
														'Enter next of kin other names';
												}
												if (!values.nok_gender) {
													errors.nok_gender = "Select next of kin's gender";
												}
												if (!values.nok_address) {
													errors.nok_address = "Enter next of kin's address";
												}
												if (!values.nok_phoneNumber) {
													errors.nok_phoneNumber =
														"Select next of kin's phone number";
												}
												if (!values.nok_ethnicity) {
													errors.nok_ethnicity =
														"Select next of kin's ethnicity";
												}
												return errors;
											}}>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Surname <Compulsory />
														</label>
														<Field
															name="nok_surname"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Surname"
														/>
														<Error name="nok_surname" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Other Names <Compulsory />
														</label>
														<Field
															name="nok_other_names"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Other Names"
														/>
														<Error name="nok_other_names" />
													</div>
												</div>
											</div>
											<div className="row">
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
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Gender <Compulsory />
														</label>
														<Field
															name="nok_gender"
															component={ReactSelectAdapter}
															options={genders}
														/>
														<Error name="nok_gender" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Marital Status</label>
														<Field
															name="nok_maritalStatus"
															component={ReactSelectAdapter}
															options={maritalStatuses}
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Occupation</label>
														<Field
															name="nok_occupation"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Occupation"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Ethnicity <Compulsory />
														</label>
														<Field
															name="nok_ethnicity"
															component={ReactSelectAdapter}
															options={ethnicities}
														/>
														<Error name="nok_ethnicity" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Relationship to Patient</label>
														<Field
															name="nok_relationship"
															component={ReactSelectAdapter}
															options={relationships}
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Address <Compulsory />
														</label>
														<Field
															name="nok_address"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Address"
														/>
														<Error name="nok_address" />
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
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Email</label>
														<Field
															name="nok_email"
															className="form-control"
															component="input"
															type="email"
															placeholder="Email e.g example@gmail.com"
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

export default withRouter(PatientForm);
