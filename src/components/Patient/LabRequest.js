import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { API_URI, socket } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
const labCategories = [
	{ value: 'cancer', label: 'cancer' },
	{ value: 'x-ray', label: 'x-ray' },
	{ value: 'blood', label: 'blood' },
];
const serviceCenter = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
const LabRequest = () => {
	// const page = location.pathname.split('/').pop();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async values => {
		console.log(values);
		setSubmitting(true);
		// socket.emit('saveAppointment', values);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Lab Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Patient Id</label>
									<Select
										name="patient_id"
										placeholder="Select patient Id"
										options={serviceCenter}
										ref={register({ name: 'patient_id' })}
										onChange={evt => {
											setValue('patient_id', String(evt.value));
										}}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Center</label>
									<Select
										name="service_center"
										placeholder="Select Service Center"
										options={serviceCenter}
										ref={register({ name: 'service_center' })}
										onChange={evt => {
											setValue('service_center', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Categories</label>
									<Select
										name="lab_categories"
										placeholder="Select lab categories"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_categories' })}
										onChange={evt => {
											setValue('lab_categories', String(evt.value));
										}}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Lab Combination</label>
									<Select
										name="lab_combos"
										placeholder="Select Lab Combination"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_combos' })}
										onChange={evt => {
											setValue('lab_combos', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Tests to request</label>
									<Select
										name="lab_tests_torequest"
										placeholder="Select lab tests to request"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_test_torequest' })}
										onChange={evt => {
											setValue('lab_test_torequest', String(evt.value));
										}}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Referred Specimen</label>
									<textarea
										required
										className="form-control"
										name="referred_specimen"
										rows="3"
										placeholder="Enter referred specimen"
										ref={register}></textarea>
								</div>
								<div className="form-group col-sm-6">
									<label>Request Note</label>
									<textarea
										required
										className="form-control"
										name="request_note"
										rows="3"
										placeholder="Enter request note"
										ref={register}></textarea>
								</div>
							</div>

							<div className="row">
								<div className="form-check col-sm-6">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="urgent"
											type="checkbox"
											value={true}
											ref={register}
										/>{' '}
										Please check if urgent
									</label>
								</div>

								<div className="col-sm-6 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Lab Request'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LabRequest;
