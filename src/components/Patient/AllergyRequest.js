import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { API_URI, socket } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
const allergyCategories = [
	{ value: 'Drug', label: 'Drug' },
	{ value: 'Food', label: 'Food' },
	{ value: 'Environment', label: 'Environment' },
	{ value: 'other', label: 'other' },
];
const severity = [
	{
		value: 'mild',
		label: 'mild',
	},
	{ value: 'moderate', label: 'moderate' },
	{ value: 'severe', label: 'severe' },
	{ value: 'intolerance', label: 'intolerance' },
];
const AllergyRequest = () => {
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
				<h6 className="element-header">New Allergy</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Category</label>
									<Select
										name="category"
										placeholder="Select Allergy Category"
										options={allergyCategories}
										ref={register({ name: 'category' })}
										onChange={evt => {
											if (evt === null) {
												setValue('category', null);
											} else {
												setValue('category', String(evt.value));
											}
										}}
										required
									/>
								</div>

								<div className="form-group col-sm-6">
									<label>Allergy</label>
									<input
										className="form-control"
										placeholder="Allergy"
										type="text"
										name="allergy"
										ref={register}
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-12">
									<label>Severity </label>
									<Select
										name="severity"
										placeholder="Select severity"
										options={severity}
										ref={register({ name: 'severity' })}
										onChange={evt => {
											if (evt === null) {
												setValue('severity', null);
											} else {
												setValue('severity', String(evt.value));
											}
										}}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Reaction</label>
									<textarea
										required
										className="form-control"
										name="reaction"
										rows="3"
										placeholder="Enter reaction"
										ref={register}></textarea>
								</div>
							</div>

							<div>
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Allergy Request'
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

export default AllergyRequest;