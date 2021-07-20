import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { withRouter } from 'react-router-dom';

import waiting from '../../assets/images/waiting.gif';
import { request, formatPatientId } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { searchAPI } from '../../services/constants';

const OutPatientAppointmentForm = ({ closeModal, addAppointment }) => {
	const { register, handleSubmit, setValue, watch } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const values = watch();

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.other_names} ${option.surname} (${formatPatientId(option.id)} ${
			option.legacy_patient_id ? `[${option.legacy_patient_id}]` : ''
		})`;

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}&isOpd=1`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onSubmit = async values => {
		try {
			setSubmitting(true);
			const rs = await request('patient/opd', 'POST', true, values);
			setSubmitting(false);
			if (rs.success) {
				notifySuccess('Out patient appointment created!');
				addAppointment(rs.appointment);
				closeModal();
			} else {
				notifyError(
					rs.message || 'Could not save out patient appointment record'
				);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'Could not schedule appointment');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				<div className="row">
					<div className="col-md-12">
						<div className="form-group relative">
							<label>Search Patient</label>
							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient"
								loadOptions={getOptions}
								onChange={e => {
									setValue('surname', e.surname);
									setValue('other_names', e.other_names);
									setValue('email', e.email);
									setValue('phoneNumber', e.phone_number);
									setValue('gender', e.gender);
									setValue('date_of_birth', e.date_of_birth);
									setValue('address', e.address);
								}}
								placeholder="Search patients"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Surname</label>
							<input
								className="form-control"
								placeholder="Surname"
								type="text"
								name="surname"
								value={values.surname}
								onChange={handleInputChange}
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Other Names</label>
							<input
								className="form-control"
								placeholder="Other names"
								type="text"
								name="other_names"
								onChange={handleInputChange}
								value={values.other_names}
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Email</label>
							<input
								className="form-control"
								placeholder="Email address"
								type="email"
								name="email"
								value={values.email}
								onChange={handleInputChange}
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Phone</label>
							<input
								className="form-control"
								placeholder="Phone number"
								type="number"
								name="phoneNumber"
								value={values.phoneNumber}
								onChange={handleInputChange}
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Gender</label>
							<Select
								id="gender"
								placeholder="Select"
								options={[
									{
										label: 'Male',
										value: 'male',
									},
									{
										label: 'Female',
										value: 'female',
									},
								]}
								ref={register({
									name: 'gender',
									required: true,
								})}
								onChange={evt => {
									if (evt == null) {
										setValue('gender', null);
									} else {
										setValue('gender', String(evt.value));
									}
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Date of Birth</label>
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
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>OPD Type</label>
							<Select
								id="opdType"
								placeholder="Select"
								options={[
									{
										label: 'Immunization',
										value: 'immunization',
									},
									{
										label: 'Laboratory',
										value: 'laboratory',
									},
								]}
								ref={register({
									name: 'opdType',
									required: true,
								})}
								onChange={evt => {
									if (evt == null) {
										setValue('opdType', null);
									} else {
										setValue('opdType', String(evt.value));
									}
								}}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label>Address</label>
					<textarea
						className="form-control"
						name="address"
						value={values.address}
						rows="3"
						onChange={handleInputChange}
						ref={register({
							required: true,
						})}></textarea>
				</div>
			</div>
			<div className="modal-footer buttons-on-right">
				<button className="btn btn-primary" type="submit" disabled={submitting}>
					{submitting ? (
						<img src={waiting} alt="submitting" />
					) : (
						'Schedule Appointment'
					)}
				</button>
				<button
					className="btn btn-link"
					data-dismiss="modal"
					type="button"
					onClick={closeModal}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default withRouter(OutPatientAppointmentForm);
