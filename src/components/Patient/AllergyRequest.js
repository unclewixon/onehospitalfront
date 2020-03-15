import React, { useState, useEffect } from 'react';

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
				<h6 className="element-header">New Allergy Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Category</label>
									<Select
										name="category"
										placeholder="Select Allergy Category"
										options={serviceCenter}
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
								<div className="form-group col-sm-6">
									<label>Reaction</label>
									<textarea
										required
										className="form-control"
										name="reaction"
										rows="3"
										placeholder="Enter reaction"
										ref={register}></textarea>
								</div>
								<div className="form-group col-sm-6">
									<label>Severity </label>
									<Select
										name="severity"
										placeholder="Select severity"
										options={labCategories}
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
