import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import waiting from '../../assets/images/waiting.gif';
import { useForm } from 'react-hook-form';
// import { request } from '../../services/utilities';
// import { notifyError, notifySuccess } from '../../services/notify';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';

function OutPatientAppointmentForm(props) {
	const { register, handleSubmit, setValue, getValues } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async values => {
		setSubmitting(true);
		// const rs = await request(
		// 	`front-desk/appointments/new`,
		// 	'POST',
		// 	true,
		// 	values
		// );
		// setSubmitting(false);
		// if (rs.success) {
		// 	notifySuccess('New appointment record has been saved!');
		// 	props.addTransaction(rs.appointment);
		// 	props.closeModals(false);
		// } else {
		// 	notifyError(rs.message || 'Could not save appointment record');
		// }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>First Name</label>
							<input
								className="form-control"
								placeholder=""
								type="text"
								name="firstName"
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Last Name</label>
							<input
								className="form-control"
								placeholder=""
								type="text"
								name="lastName"
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
							<label>Email</label>
							<input
								className="form-control"
								placeholder=""
								type="email"
								name="email"
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Phone</label>
							<input
								className="form-control"
								placeholder=""
								type="number"
								name="phoneNumber"
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
					<div className="col-sm-6">
						<div className="form-group">
							<label>Age</label>
							<input
								className="form-control"
								placeholder=""
								type="number"
								name="age"
								ref={register({
									required: true,
								})}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label>Address</label>
					<textarea
						className="form-control"
						name="address"
						rows="3"
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
