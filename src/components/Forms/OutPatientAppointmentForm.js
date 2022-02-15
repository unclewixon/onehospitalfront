import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
// import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import { withRouter } from 'react-router-dom';

import { genders } from '../../services/constants';
import {
	request,
	Compulsory,
	ErrorBlock,
	ReactSelectAdapter,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { messageService } from '../../services/message';

const OutPatientAppointmentForm = ({ closeModal, history, location }) => {
	const path = location.pathname.split('/');

	const [dateOfBirth, setDateOfBirth] = useState(null);

	const dispatch = useDispatch();

	// const getOptions = async q => {
	// 	if (!q || q.length < 1) {
	// 		return [];
	// 	}

	// 	const url = `${searchAPI}?q=${q}&is_opd=1`;
	// 	const res = await request(url, 'GET', true);
	// 	return res;
	// };

	const handleSubmit = async values => {
		try {
			const data = {
				...values,
				date_of_birth: moment(values.date_of_birth, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
				gender: values.gender?.value || '',
			};

			dispatch(startBlock());
			const rs = await request('patient/opd', 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('Out patient created!');
				if (path[1] === 'front-desk') {
					history.push('/front-desk/patients');
				} else {
					messageService.sendMessage({
						type: 'new-patient',
						data: rs.patient,
					});
				}
				closeModal();
				closeModal();
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not save out patient record',
				};
			}
		} catch (e) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save patient record' };
		}
	};

	return (
		<div className="onboarding-content with-gradient">
			<div className="modal-body">
				<Form
					onSubmit={handleSubmit}
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
						if (!values.phone_number) {
							errors.phone_number = "Enter patient's phone number";
						}
						if (!values.date_of_birth) {
							errors.date_of_birth = "Enter patient's date of birth";
						}
						if (!values.gender) {
							errors.gender = "Select patient's gender";
						}
						if (!values.address) {
							errors.address = "Select patient's address";
						}
						return errors;
					}}
					render={({ handleSubmit, submitting, submitError }) => (
						<form onSubmit={handleSubmit}>
							{submitError && (
								<div
									className="alert alert-danger"
									dangerouslySetInnerHTML={{
										__html: `<strong>Error!</strong> ${submitError}`,
									}}
								/>
							)}
							{/* <div className="row">
								<div className="col-md-12">
									<div className="form-group relative">
										<label>Search Patient</label>
										<AsyncSelect
											isClearable
											getOptionValue={option => option.id}
											getOptionLabel={option =>
												`${option.name} ${
													option.phone_number && option.phone_number !== ''
														? `${option.phone_number}`
														: ''
												}`
											}
											defaultOptions
											name="patient"
											loadOptions={getOptions}
											onChange={e => {
												console.log(e);
												// setValue('surname', e.surname);
												// setValue('other_names', e.other_names);
												// setValue('email', e.email);
												// setValue('phoneNumber', e.phone_number);
												// setValue('gender', e.gender);
												// setValue('date_of_birth', e.date_of_birth);
												// setValue('address', e.address);
											}}
											placeholder="Search OPD patients"
										/>
									</div>
								</div>
							</div> */}
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
										<ErrorBlock name="surname" />
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
										<ErrorBlock name="other_names" />
									</div>
								</div>
							</div>
							<div className="row">
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
										<ErrorBlock name="email" />
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
										<ErrorBlock name="phone_number" />
									</div>
								</div>
							</div>
							<div className="row">
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
										<ErrorBlock name="gender" />
									</div>
								</div>
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
																? onChange(format(new Date(date), 'dd-MM-yyyy'))
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
										<ErrorBlock name="date_of_birth" />
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
										<ErrorBlock name="address" />
									</div>
								</div>
							</div>
							<div className="modal-footer buttons-on-right">
								<button
									className="btn btn-primary"
									type="submit"
									disabled={submitting}>
									Submit
								</button>
							</div>
						</form>
					)}
				/>
			</div>
		</div>
	);
};

export default withRouter(OutPatientAppointmentForm);
