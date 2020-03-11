import React, { Fragment } from 'react';
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

function PatientForm(props) {
	const formData = props.formData;

	const { register, handleSubmit, errors, setValue } = useForm({
		validationSchema: patientSchema,
		defaultValues: {
			surname: formData.surname || '',
			other_names: formData.other_names || '',
			date_of_birth: formData.date_of_birth || '',
			email: formData.email || '',
			gender: formData.gender || '',
			occupation: formData.occupation || '',
			address: formData.address || '',
			phoneNumber: formData.phoneNumber || '',
		},
	});

	const onSubmit = (values) => {
		props.nextStep(values);
	};

	return (
		<Fragment>
			<h5 className="form-header">New patient registration</h5>
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
										placeholder="Enter surnam name"
										name="surname"
										type="text"
										ref={register}
									/>
									<small className="text-danger">
										{errors.surname && errors.surname.message}
									</small>
								</div>
							</div>
							<div className="col-sm-8">
								<div className="form-group">
									<label>Other Names</label>
									<input
										className="form-control"
										placeholder="Other Names"
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
									<label>Date of birth</label>
									<input
										className="form-control"
										placeholder="04/12/1978"
										type="text"
										name="date_of_birth"
										ref={register}
									/>
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
										onChange={(evt) => {
											if (evt == null) {
												setValue('gender', null);
											} else {
												setValue('gender', String(evt.value));
											}
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
										onChange={(evt) => {
											if (evt == null) {
												setValue('maritalStatus', null);
											} else {
												setValue('maritalStatus', String(evt.value));
											}
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
										onChange={(evt) => {
											if (evt == null) {
												setValue('insurranceStatus', null);
											} else {
												setValue('insurranceStatus', String(evt.value));
											}
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
										name="occupation"
										ref={register}
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
										onChange={(evt) => {
											if (evt == null) {
												setValue('ethnicity', null);
											} else {
												setValue('ethnicity', String(evt.value));
											}
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
										name="address"
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
										ref={register}
										type="text"
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label>Email</label>
									<input
										className="form-control"
										name="email"
										ref={register}
										placeholder="example@email.com"
										type="text"
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
	};
};

export default connect(mapStateToProps, { closeModals, nextStep })(PatientForm);
