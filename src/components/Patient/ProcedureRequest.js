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
const ProcedureRequest = () => {
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
				<h6 className="element-header">New Procedure Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
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
									<label>Procedure</label>
									<Select
										name="procedure"
										placeholder="Select procedure"
										isMulti
										options={labCategories}
										ref={register({ name: 'procedure' })}
										onChange={evt => {
											setValue('procedure', String(evt.value));
										}}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-4">
									<label>Primary Diagnosis</label>
									<input
										className="form-control"
										placeholder="primary diagnosis"
										type="text"
										name="primary_diagnosis"
										ref={register}
									/>
								</div>

								<div className="form-group col-sm-4">
									<label>Bill number</label>
									<input
										className="form-control"
										placeholder="Bill number"
										type="text"
										name="bill_number"
										ref={register}
									/>
								</div>
								<div className="form-group col-sm-4">
									<label>Bill *</label>
									<input
										className="form-control"
										placeholder="bill whatever"
										type="number"
										name="bill_*"
										min="0"
										ref={register}
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-12">
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

							<div>
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Procedure Request'
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
export default ProcedureRequest;
