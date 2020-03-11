import React, { Fragment, useState } from 'react';
import { prevStep } from '../actions/patient';
import { closeModals } from '../actions/general';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { patientNOKSchema } from '../services/validationSchemas';
import Select from 'react-select';
import {
	API_URI,
	ethnicities,
	gender,
	maritalStatus,
} from '../services/constants';
import { request } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';

function PatientNOKForm(props) {
	const formData = props.formData;
	const { register, handleSubmit, errors, setValue } = useForm({
		validationSchema: patientNOKSchema,
		defaultValues: {
			nok_surname: formData.nok_surname || '',
			nok_other_names: formData.nok_other_names || '',
			nok_date_of_birth: formData.nok_date_of_birth || '',
			nok_email: formData.nok_email || '',
			nok_gender: formData.nok_gender || '',
			nok_occupation: formData.nok_occupation || '',
			nok_address: formData.nok_address || '',
			nok_phoneNumber: formData.nok_phoneNumber || '',
		},
	});
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (values) => {
		const data = { ...formData, ...values };
		setSubmitting(true);
		try {
			const res = await request(`${API_URI}/patient/save`, 'POST', true, data);
			setSubmitting(false);
			if (res.success) {
				notifySuccess('New patient record was created!');
				props.closeModals(false);
			} else {
				notifyError(res.message);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save patient record');
		}
	};

	register({ name: 'nok_gender' });
	register({ name: 'nok_maritalStatus' });
	register({ name: 'nok_ethnicity' });

	return (
		<Fragment>
			<h6 className="form-header">Partner/Next of Kin</h6>
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
									<input
										className="form-control"
										placeholder="04/12/1978"
										type="text"
										name="nok_date_of_birth"
										ref={register}
									/>
									<small className="text-danger">
										{errors.nok_date_of_birth &&
											errors.nok_date_of_birth.message}
									</small>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlhtmlFor="gender">Gender</label>
									<Select
										name="nok_gender"
										ref={register}
										options={gender}
										onChange={(evt) => {
											if (evt == null) {
												setValue('nok_gender', null);
											} else {
												setValue('nok_gender', String(evt.value));
											}
										}}
									/>
								</div>
							</div>
							<div className="col-sm">
								<div className="form-group">
									<label htmlhtmlFor="nok_maritalStatus">Marital Status</label>
									<Select
										name="nok_maritalStatus"
										ref={register}
										options={maritalStatus}
										onChange={(evt) => {
											if (evt == null) {
												setValue('nok_maritalStatus', null);
											} else {
												setValue('nok_marialStatus', String(evt.value));
											}
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
										placeholder=""
										type="text"
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
										onChange={(evt) => {
											if (evt == null) {
												setValue('nok_ethnicity', null);
											} else {
												setValue('nok_ethnicity', String(evt.value));
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
										name="nok_address"
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
										name="nok_phoneNumber"
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
										name="nok_email"
										ref={register}
										placeholder="example@email.com"
										type="text"
									/>
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
	};
};
export default connect(mapStateToProps, { prevStep, closeModals })(
	PatientNOKForm
);
