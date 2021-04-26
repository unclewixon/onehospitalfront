import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { connect } from 'react-redux';
import uniqBy from 'lodash.uniqby';
import { Table } from 'react-bootstrap';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { loadInvCategories, loadInventories } from '../../actions/inventory';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';

const dummyData1 = [
	{ value: 'Pharmacy', label: 'Pharmacy', name: 'serviceUnit' },
];

const frequencyType = [
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
];

const defaultValues = {
	formulary: '',
	genericName: '',
	drugName: '',
	quantity: '',
	refills: '',
	frequency: '',
	frequencyType: '',
	eg: '',
	duration: '',
	refillNote: '',
	serviceUnit: 'Pharmacy',
};

const Prescription = ({
	setPrescription,
	onSubmit,
	pharmacyRequest,
	previousPage,
	loadInvCategories,
	loadInventories,
	page,
	categories,
	inventories,
}) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues,
	});
	const [editing, setEditing] = useState(false);
	const [serviceId, setServiceId] = useState('');
	const [pharmRequest, setPharmRequest] = useState(pharmacyRequest);
	// const [activeRequest, setActiveRequest] = useState(null);
	const [genName, setGenName] = useState('');

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

	// const onDrugSelection = e => {
	// 	onHandleSelectChange(e);
	// 	setServiceId(e.id);
	// };

	const onDrugSelection = e => {
		setValue('drugName', e.label);
		// setServiceId(e.value);
		console.log(e.value);
		setServiceId(e.value);
	};
	const onTrash = index => {
		const newPharm = pharmRequest.filter((pharm, i) => index !== i);

		setPharmRequest(newPharm);
		setPrescription(newPharm);
	};
	const startEdit = (request, index) => {
		onTrash(index);
		// eslint-disable-next-line array-callback-return
		Object.entries(request).map(req => {
			const [key, value] = req;
			setValue(key, value);
		});
		setEditing(true);
	};

	const onFormSubmit = (data, e) => {
		e.preventDefault();
		const { diagnosis, ...rest } = data;
		let req = {
			service_id: serviceId,
			...rest,
		};
		let newPharm = [...pharmRequest, req];
		console.log(data);

		setPharmRequest(newPharm);
		setPrescription(newPharm);
		setEditing(false);
		reset(defaultValues);
	};

	let drugObj = {};
	// eslint-disable-next-line no-unused-vars
	const drugValues =
		inventories && inventories.length
			? // eslint-disable-next-line array-callback-return
			  inventories.map(drug => {
					drugObj[drug.generic_name] = {
						value: drug.id,
						label: drug.name,
						...drug,
					};
			  })
			: [];

	const genericNameOptions =
		inventories && inventories.length
			? inventories
					.filter(drug => drug.generic_name !== null)
					.map(drug => {
						return {
							value: drug && drug.id ? drug.id : 'nil',
							label: drug && drug.generic_name ? drug.generic_name : 'nil',
						};
					})
			: [];
	const filteredGenericNameOptions = uniqBy(genericNameOptions, 'value');

	const drugNameOptions =
		genericNameOptions && genericNameOptions.length
			? genericNameOptions
					.filter(drug => drug.value === genName)
					.map(drug => drugObj[drug.label])
			: [];

	const getServiceUnit = useCallback(async () => {
		try {
			const res = await request(`inventory/categories`, 'GET', true);
			loadInvCategories(res);
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	}, [loadInvCategories]);

	const getPharmacyItems = useCallback(
		async id => {
			try {
				const res = await request(
					`inventory/stocks-by-category/52b49109-028a-46c6-b5f3-1e88a48d333f`,
					'GET',
					true
				);
				loadInventories(res);
			} catch (error) {
				notifyError('Erroe fetching pharmacy items');
			}
		},
		[loadInventories]
	);

	useEffect(() => {
		getServiceUnit();
		getPharmacyItems();
	}, [getServiceUnit, getPharmacyItems]);

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
						value={{ value: 'Pharmacy', label: 'Pharmacy' }}
					/>
				</div>
				<div className="form-group col-sm-6">
					<label>Formulary</label>
					<Select
						placeholder="Choose a formulary"
						name="formulary"
						ref={register({ name: 'formulary', required: true })}
						onChange={e => setValue('formulary', e.label)}
						options={genericNameOptions}
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
						onChange={e => {
							setValue('genericName', e.label);
							console.log(e.value);
							setGenName(e.value);
						}}
						options={filteredGenericNameOptions}
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
						options={drugNameOptions}
						onChange={e => onDrugSelection(e)}
					/>
				</div>
				<div className="form-group col-sm-6">
					<label>Dose Quantity</label>
					<input
						type="text"
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
							<label>EG</label>
							<input
								type="number"
								className="form-control"
								placeholder="EG"
								ref={register}
								name="eg"
								onChange={onHandleInputChange}
								min="0"
							/>
						</div>
					</div>
					<div className="row">
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
						<div className="form-group col-sm-6">
							<label>Frequency Type</label>
							<Select
								placeholder="Frequency type"
								ref={register({ name: 'frequencyType', required: true })}
								name="frequencyType"
								options={frequencyType}
								onChange={onHandleSelectChange}
								value={{
									label: values.frequencyType,
									value: values.frequencyType,
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
						onClick={handleSubmit(onSubmit)}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ inventory }) => ({
	categories: inventory.categories,
	inventories: inventory.inventories,
});

export default connect(mapStateToProps, {
	loadInvCategories,
	loadInventories,
})(Prescription);
