// import React, { Component } from 'react';
// import { validate } from '../../services/validationSchemas';
// import {
// 	renderTextInput,
// 	renderSelect,
// 	renderTextArea,
// } from '../../services/utilities';
// import { Field, reduxForm } from 'redux-form';

// const fetal = [
// 	{
// 		id: 'Phma',
// 		label: 'daily',
// 	},
// ];
// class Prescription extends Component {
// 	render() {
// 		const { handleSubmit, previousPage, error, page } = this.props;
// 		return (
// 			<>
// 				<h6 className="element-header">Step {page}. Prescription</h6>
// 				<div className="form-block">
// 					<form onSubmit={handleSubmit}>
// 						{error && (
// 							<div
// 								className="alert alert-danger"
// 								dangerouslySetInnerHTML={{
// 									__html: `<strong>Error!</strong> ${error}`,
// 								}}
// 							/>
// 						)}
// 						<div className="row">
// 							<div className="col-sm-6">
// 								<Field
// 									id="serviceUnit"
// 									name="serviceUnit"
// 									value="Pharmacy"
// 									component={renderTextInput}
// 									label="Select Service Unit"
// 									placeholder="Select Service Unit"
// 									data={fetal}
// 									readOnly
// 								/>
// 							</div>
// 							<div className="col-sm-6">
// 								<Field
// 									id="formulary"
// 									name="formulary"
// 									component={renderSelect}
// 									label="Select Formulary"
// 									placeholder="Select Formulary"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="col-sm-6">
// 								<Field
// 									id="drug_generic_name"
// 									name="drug_generic_name"
// 									component={renderSelect}
// 									label="Select Drug generic name"
// 									placeholder="Select drug generic name"
// 									data={fetal}
// 								/>
// 							</div>

// 							<div className="col-sm-6">
// 								<Field
// 									id="drug_name"
// 									name="drug_name"
// 									component={renderSelect}
// 									label="Select Drug name"
// 									placeholder="Select drug name"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="col-sm-6">
// 								<Field
// 									id="frequency"
// 									name="frequency"
// 									component={renderTextInput}
// 									label="Specify Frequency"
// 									placeholder="specify frequency"
// 									data={fetal}
// 								/>
// 							</div>

// 							<div className="col-sm-6">
// 								<Field
// 									id="frequency_type"
// 									name="frequency_type"
// 									component={renderSelect}
// 									label="Select frequency type"
// 									placeholder="Select frequency type"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="col-sm-6">
// 								<Field
// 									id="dose"
// 									name="dose"
// 									component={renderTextInput}
// 									label="Specify Dose"
// 									placeholder="specify dose"
// 									data={fetal}
// 								/>
// 							</div>

// 							<div className="col-sm-6">
// 								<Field
// 									id="duration"
// 									name="duration"
// 									component={renderTextInput}
// 									label="Specify Duration"
// 									placeholder="specify duration"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>
// 						<div className="row">
// 							<div className="col-sm-12">
// 								<Field
// 									id="note"
// 									name="note"
// 									component={renderTextArea}
// 									label="Specify note"
// 									placeholder="specify note"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="d-flex col-sm-12">
// 								<Field
// 									id="refillable"
// 									name="refillable"
// 									component={renderTextInput}
// 									type="checkbox"
// 								/>
// 								<label className="ml-2" style={{ marginTop: '-2px' }}>
// 									Refillable
// 								</label>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="col-sm-12">
// 								<Field
// 									id="regimen_note"
// 									name="regimen_note"
// 									component={renderTextArea}
// 									label="Write regimen note"
// 									placeholder="write regimen note"
// 									data={fetal}
// 								/>
// 							</div>
// 						</div>

// 						<div className="row">
// 							<div className="col-sm-12 text-right">
// 								<button
// 									className="btn btn-primary"
// 									type="button"
// 									onClick={previousPage}>
// 									Previous
// 								</button>
// 								<button className="btn btn-primary" type="submit">
// 									Next
// 								</button>
// 							</div>
// 						</div>
// 					</form>
// 				</div>
// 			</>
// 		);
// 	}
// }
// Prescription = reduxForm({
// 	form: 'antennatalAssessment', //Form name is same
// 	destroyOnUnmount: false,
// 	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
// 	validate,
// })(Prescription);

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';

import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { ReactComponent as ViewIcon } from '../../assets/svg-icons/view.svg';
import { Table } from 'react-bootstrap';
import { notifySuccess, notifyError } from '../../services/notify';
const dummyData = [
	{ value: '', label: 'Select one', name: 'formulary' },
	{ value: '12', label: 'Line', name: 'formulary' },
	{ value: '13', label: 'Line2', name: 'formulary' },
	{ value: '14', label: 'Line3', name: 'formulary' },
];
const dummyData1 = [
	{ value: '', label: 'Select one', name: 'serviceUnit' },
	{ value: '12', label: 'Line44', name: 'serviceUnit' },
	{ value: '13', label: 'Line55', name: 'serviceUnit' },
	{ value: '14', label: 'Line66', name: 'serviceUnit' },
];

const dummyData2 = [
	{ value: '', label: 'Select one', name: 'genericName' },
	{ value: '12', label: 'Line777', name: 'genericName' },
	{ value: '13', label: 'Line888', name: 'genericName' },
	{ value: '14', label: 'Line999', name: 'genericName' },
];

const dummyData3 = [
	{ value: '', label: 'Select one', name: 'drugName', id: 'drug-id' },
	{ value: '12', label: 'Line0000', name: 'drugName', id: 'drug-id' },
	{ value: '13', label: 'Line1111', name: 'drugName', id: 'drug-id' },
	{ value: '14', label: 'Line0101', name: 'drugName', id: 'drug-id' },
];

const defaultValues = {
	formulary: '',
	genericName: '',
	drugName: '',
	quantity: '',
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	refillNote: '',
};

const Prescription = ({
	setPrescription,
	onSubmit,
	pharmacyRequest,
	previousPage,
	page,
}) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues,
	});
	const [editing, setEditing] = useState(false);
	const [serviceId, setServiceId] = useState('');
	const [pharmRequest, setPharmRequest] = useState(pharmacyRequest);
	const [activeRequest, setActiveRequest] = useState(null);

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

	const values = watch();
	const onHandleSelectChange = e => {
		if (e) {
			const { name, value } = e;
			setValue(name, value);
		}
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onDrugSelection = e => {
		onHandleSelectChange(e);
		setServiceId(e.id);
	};
	const onTrash = index => {
		const newPharm = pharmRequest.filter((pharm, i) => index !== i);

		setPharmRequest(newPharm);
		setPrescription(newPharm);
	};
	const startEdit = (request, index) => {
		onTrash(index);
		Object.entries(request).map(req => {
			const [key, value] = req;
			setValue(key, value);
		});
		setEditing(true);
	};

	const onFormSubmit = (data, e) => {
		e.preventDefault();
		const { diagnosis, ...rest } = data;

		let newPharm = [...pharmRequest, rest];
		console.log(data);

		setPharmRequest(newPharm);
		setPrescription(newPharm);
		setEditing(false);
		reset(defaultValues);
	};

	return (
		<div className="form-block w-100 px-2">
			<h6 className="element-header">Step {page}. Prescription</h6>
			<div className="row">
				<div className="form-group col-sm-6">
					<label>Service Unit</label>
					<Select
						placeholder="Choose a Service Unit"
						ref={register({ name: 'serviceUnit', required: true })}
						name="serviceUnit"
						options={dummyData1}
						onChange={onHandleSelectChange}
						value={{
							label: values.serviceUnit,
							value: values.serviceUnit,
						}}
					/>
				</div>
				<div className="form-group col-sm-6">
					<label>Formulary</label>
					<Select
						placeholder="Choose a formulary"
						name="formulary"
						ref={register({ name: 'formulary', required: true })}
						onChange={onHandleSelectChange}
						options={dummyData}
						value={{
							label: values.formulary,
							value: values.formulary,
						}}
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-12">
					<label>Drug Generic Name</label>
					<Select
						placeholder="Choose a drug generic name"
						name="genericName"
						ref={register({ name: 'genericName', required: true })}
						onChange={onHandleSelectChange}
						options={dummyData2}
						value={{
							label: values.genericName,
							value: values.genericName,
						}}
						required
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-6">
					<label>Drug Name</label>
					<Select
						placeholder="Choose a drug name"
						ref={register({ name: 'drugName', required: true })}
						name="drugName"
						options={dummyData3}
						onChange={e => onDrugSelection(e)}
						value={{
							label: values.drugName,
							value: values.drugName,
						}}
					/>
				</div>
				<div className="form-group col-sm-6">
					<label>Dose Quantity</label>
					<input
						type="number"
						className="form-control"
						placeholder="Dose Quantity"
						ref={register}
						name="quantity"
						onChange={onHandleInputChange}
						min="0"
					/>
				</div>
			</div>
			<div style={{ textAlign: 'right' }}>
				<label className="form-check-label">
					<input
						className="form-check-input mt-0"
						name="urgent"
						type="checkbox"
						onClick={onRefillableClick}
					/>{' '}
					Refillable
				</label>
			</div>
			{refillable ? (
				<div>
					<div>
						<h6>Refills Count</h6>
					</div>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Number of Refill</label>
							<input
								type="number"
								className="form-control"
								placeholder="Number of refills"
								ref={register}
								name="refills"
								onChange={onHandleInputChange}
								min="0"
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Frequency</label>
							<input
								type="text"
								className="form-control"
								placeholder="frequency"
								ref={register}
								name="frequency"
								onChange={onHandleInputChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Frequency Type</label>
							<Select
								placeholder="Frequency type"
								ref={register({ name: 'frequencyType', required: true })}
								name="frequencyType"
								options={[
									{ value: '', label: 'Select one', name: 'frequencyType' },
									{ value: 'daily', label: 'Daily', name: 'frequencyType' },
									{
										value: 'weekly',
										label: 'Weekly',
										name: 'frequencyType',
									},
									{
										value: 'monthly',
										label: 'Monthly',
										name: 'frequencyType',
									},
								]}
								onChange={onHandleSelectChange}
								value={{
									label: values.frequencyType,
									value: values.frequencyType,
								}}
								required
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Duration</label>
							<input
								type="text"
								className="form-control"
								placeholder="Duration"
								ref={register}
								name="duration"
								min="0"
								pattern="[0-9]+"
								onChange={onHandleInputChange}
							/>
						</div>
					</div>

					<div className="row">
						<div className="form-group col-sm-12">
							<label>Refill Note</label>
							<input
								type="text"
								className="form-control"
								placeholder="Note"
								ref={register}
								name="refillNote"
								onChange={onHandleInputChange}
							/>
						</div>
					</div>
				</div>
			) : null}
			<div className="row">
				{!editing ? (
					<div className="form-group col-sm-3">
						<button
							type="button"
							onClick={handleSubmit(onFormSubmit)}
							style={{
								backgroundColor: 'transparent',
								border: 'none',
							}}>
							<PlusIcon
								style={{
									width: '1.5rem',
									height: '1.5rem',
									cursor: 'pointer',
								}}
							/>
						</button>
					</div>
				) : (
					<button
						type="button"
						onClick={handleSubmit(onFormSubmit)}
						className="btn btn-primary">
						Done
					</button>
				)}
			</div>

			<div>
				<Table>
					<thead>
						<tr>
							<th className="text-center">Generic Name</th>
							<th className="text-center">Drug Name</th>
							<th className="text-center">Quantity</th>
							<th className="text-center">No of refill</th>
							<th className="text-center">Frequency</th>
							<th className="text-center">Duration</th>
							<th className="text-center">Note</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{pharmacyRequest
							? pharmacyRequest.map((request, index) => {
									return (
										<tr key={index}>
											<td className="text-center">{request.genericName}</td>
											<td className="text-center">{request.drugName}</td>
											<td className="text-center"> {request.quantity}</td>
											<td className="text-center">
												{' '}
												{request.refills ? request.refills : '-'}
											</td>
											<td className="text-center">
												{' '}
												{request.frequency ? request.frequency : '-'}
											</td>
											<td className="text-center">
												{' '}
												{request.duration ? request.duration : '-'}
											</td>
											<td className="text-center">
												{' '}
												{request.refillNote ? request.refillNote : '-'}
											</td>
											<td className="text-center">
												{' '}
												{'  '}
												<EditIcon
													onClick={() => {
														if (editing) {
															return;
														} else {
															startEdit(request, index);
														}
													}}
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer',
													}}
												/>{' '}
												{'  '}
												<TrashIcon
													onClick={() => onTrash(index)}
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer',
													}}
												/>
											</td>
										</tr>
									);
							  })
							: []}
					</tbody>
				</Table>
			</div>

			<div className="row mt-4">
				<div className="col-sm-12 text-right">
					<button
						className="btn btn-primary"
						type="button"
						onClick={previousPage}>
						Previous
					</button>
					<button
						className="btn btn-primary"
						type="button"
						onClick={handleSubmit(() => {
							pharmacyRequest.length
								? onSubmit()
								: notifyError('Please Prescribe a drug');
						})}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Prescription;
