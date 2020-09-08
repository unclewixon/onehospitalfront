import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { closeModals } from '../../actions/general';
import { addNewPatient } from '../../actions/patient';
// import { addTransaction } from '../../actions/transaction';

function OutPatientAppointmentForm(props) {
	const { register, handleSubmit, setValue, watch } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const values = watch();
	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onSubmit = async values => {
		setSubmitting(true);
		const rs = await request(`patient/opd`, 'POST', true, values);
		setSubmitting(false);
		if (rs.success) {
			notifySuccess('New Out Patient appointment record has been saved!');
			// props.addTransaction(rs.appointment);
			dispatch(addNewPatient(rs?.patient));
			props.closeModals(false);
		} else {
			notifyError(
				rs.message || 'Could not save out patient appointment record'
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Surname</label>
							<input
								className="form-control"
								placeholder=""
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
								placeholder=""
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
								placeholder=""
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
								placeholder=""
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
								dateFormat="yyyy-MM-dd"
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
						'Save Schedule'
					)}
				</button>
				<button
					className="btn btn-link"
					data-dismiss="modal"
					type="button"
					onClick={() => props.closeModals(false)}>
					{' '}
					Cancel
				</button>
			</div>
		</form>
	);
}

export default connect(null, { closeModals })(OutPatientAppointmentForm);
