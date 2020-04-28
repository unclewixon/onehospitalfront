import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';

import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { ReactComponent as ViewIcon } from '../../assets/svg-icons/view.svg';
import { Table } from 'react-bootstrap';
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
	genericName: '',
	drugName: '',
	quantity: '',
	refills: '',
	frequency: '',
	duration: '',
	refillNote: '',
};

const ImmunizationPrescription = ({ setPrescription }) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues,
	});
	const [editing, setEditing] = useState(false);
	const [serviceId, setServiceId] = useState('');
	const [pharmRequest, setPharmRequest] = useState([]);
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
						ref={register({ required: true })}
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
							<Select
								placeholder="Frequency type"
								ref={register({ name: 'frequency', required: true })}
								name="frequency"
								options={[
									{ value: '', label: 'Select one', name: 'frequency' },
									{ value: 'daily', label: 'Daily', name: 'frequency' },
									{
										value: 'weekly',
										label: 'Weekly',
										name: 'frequency',
									},
									{
										value: 'monthly',
										label: 'Monthly',
										name: 'frequency',
									},
								]}
								onChange={onHandleSelectChange}
								value={{
									label: values.frequency,
									value: values.frequency,
								}}
								required
							/>
						</div>
					</div>
					<div className="row">
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
						<div className="form-group col-sm-6">
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
						{pharmRequest
							? pharmRequest.map((request, index) => {
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
		</div>
	);
};

export default ImmunizationPrescription;
