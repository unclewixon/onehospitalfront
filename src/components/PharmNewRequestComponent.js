import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { ReactComponent as PlusIcon } from '../assets/svg-icons/plus.svg';
import waiting from '../assets/images/waiting.gif';
// import searchingGIF from '../assets/images/searching.gif'
// import { ReactComponent as MinusIcon } from '../assets/svg-icons/minus.svg';
import { ReactComponent as EditIcon } from '../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../assets/svg-icons/trash.svg';
import { ReactComponent as ViewIcon } from '../assets/svg-icons/view.svg';
import { Table } from 'react-bootstrap';
import { notifySuccess, notifyError } from './../services/notify';
import PharmNewRequestViewModal from './PharmNewRequestViewModal';
import { addPharmacyRequest } from '../actions/patient';
import { connect } from 'react-redux';
import { diagnosisAPI } from '../services/constants';
import { request } from '../services/utilities';
import AsyncSelect from 'react-select/async';
import { loadInvCategories, loadInventories } from '../actions/inventory';

import uniqBy from 'lodash.uniqby';

const defaultValues = {
	serviceUnit: '',
	formulary: '',
	genericName: '',
	drugName: '',
	quantity: '',
	anotherFacility: false,
	refills: '',
	frequency: '',
	eg: '',
	duration: '',
	refillNote: '',
};

const PharmNewRequestComponent = ({
	patient,
	addPharmacyRequest,
	allPatients,
	patientsLoading,
	loadInvCategories,
	loadInventories,
	categories,
	inventories,
}) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues,
	});
	const [submitting, setSubmitting] = useState(false);
	const [pharmRequest, setPharmRequest] = useState([]);
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [prescription, setPrescription] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [serviceId, setServiceId] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [genName, setGenName] = useState('');

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};
	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;
	const handleChangeOptions = selectedOption => {
		setValue('diagnosis', selectedOption);
		setSelectedOption(selectedOption);
	};
	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(`${diagnosisAPI}/search?q=${val}`, 'GET', true);
		return res;
	};

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
					`inventory/stocks-by-category/${id}`,
					'GET',
					true
				);
				loadInventories(res);
			} catch (error) {
				notifyError('Error fetching pharmacy items');
			}
		},
		[loadInventories]
	);

	useEffect(() => {
		getServiceUnit();
		if (categories.length > 0) {
			const selectCat = categories.filter(cat => cat.name === 'Pharmacy');
			getPharmacyItems(selectCat[0].id);
		}
	}, [categories, getPharmacyItems, getServiceUnit]);

	const serviceOptions =
		categories && categories.length
			? categories.map(cat => {
					return {
						value: cat.id,
						label: cat.name,
					};
			  })
			: [];

	// const handleServiceUnitChange = e => {
	// 	getPharmacyItems(e.value)
	// }
	let drugObj = {};
	// eslint-disable-next-line no-unused-vars
	const drugValues =
		inventories && inventories.length
			? // eslint-disable-next-line array-callback-return
			  inventories.map(drug => {
					drugObj[drug.generic_name] = {
						value: drug.name,
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
							value: drug && drug.generic_name ? drug.generic_name : 'nil',
							label: drug && drug.generic_name ? drug.generic_name : 'nil',
						};
					})
			: [];
	const filteredGenericNameOptions = uniqBy(genericNameOptions, 'value');

	const drugNameOptions =
		genericNameOptions && genericNameOptions.length
			? genericNameOptions
					.filter(drug => drug.value === genName)
					.map(drug => drugObj[drug.value])
			: [];

	const values = watch();

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const onFormSubmit = (data, e) => {
		let newPharm = [...pharmRequest, data];
		setPharmRequest(newPharm);
		setEditing(false);
		reset(defaultValues);
	};

	const onTrash = index => {
		const newPharm = pharmRequest.filter((pharm, i) => index !== i);
		setPharmRequest(newPharm);
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

	const saveTableData = e => {
		setSubmitting(true);
		e.preventDefault();

		let patient_id = '';
		if (chosenPatient) {
			patient_id = chosenPatient.value;
		} else {
			patient_id = patient && patient.id ? patient.id : '';
		}
		if (!patient_id) {
			notifyError('No patient has been selected');
		}

		addPharmacyRequest(
			pharmRequest,
			patient_id,
			prescription,
			serviceId,
			message => {
				if (message) {
					setSubmitting(false);
					notifySuccess('Saved new pharmacy request');
				} else {
					setSubmitting(false);
					notifyError('Error saving new pharmacy request');
				}
			}
		);
	};
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
		setValue('drugName', e.value);
		setServiceId(e.id);
	};

	return (
		<div className="row" style={{ width: '100%' }}>
			<div className="col-sm-12">
				{activeRequest ? (
					<PharmNewRequestViewModal
						activeRequest={activeRequest}
						patient={patient}
						showModal={showModal}
						onModalClick={onModalClick}
					/>
				) : null}
				<div className="element-wrapper">
					<h6 className="element-header">New Request</h6>
					<div className="col-lg-12 form-block w-100 element-box">
						<form onSubmit={handleSubmit(onFormSubmit)}>
							{!patient ? (
								<div className="form-group mr-2">
									<label className="mr-2 " htmlFor="patient">
										Patient Name
									</label>
									<Select
										id="patient"
										name="patient"
										isClearable
										isLoading={patientsLoading}
										isSearchable
										onChange={val => setChosenPatient(val)}
										options={allPatients}
										value={chosenPatient}
									/>
								</div>
							) : null}

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Unit</label>
									<Select
										ref={register({ name: 'serviceUnit', required: true })}
										name="serviceUnit"
										required
										options={serviceOptions}
										isDisabled
										defaultValue={{
											value: 'pharmacy',
											label: 'Pharmacy',
										}}
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Formulary</label>
									<Select
										placeholder="Choose a formulary"
										name="formulary"
										ref={register({ name: 'formulary', required: true })}
										value={{
											value: 'pharmacy',
											label: 'Pharmacy',
										}}
										onChange={e => setValue('formulary', e.value)}
										options={[
											{
												value: 'pharmacy',
												label: 'Pharmacy',
											},
										]}
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
											setValue('genericName', e.value);
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
										type="number"
										className="form-control"
										placeholder="Dose Quantity"
										ref={register({ required: true })}
										name="quantity"
										onChange={onHandleInputChange}
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
										<div className="form-group col-sm-4">
											<input
												type="number"
												className="form-control"
												placeholder="Number of refills"
												ref={register({ name: 'refills' })}
												name="refills"
												onChange={onHandleInputChange}
											/>
										</div>
										<div className="form-group col-sm-4">
											<input
												type="text"
												className="form-control"
												placeholder="E.g. 3"
												ref={register}
												name="eg"
												onChange={onHandleInputChange}
											/>
										</div>
										<div className="form-group col-sm-4">
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
											/>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-sm-6">
											<input
												type="number"
												className="form-control"
												placeholder="Duration"
												ref={register}
												name="duration"
												onChange={onHandleInputChange}
											/>
										</div>
										<div className="form-group col-sm-6">
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
								<div className="form-group col-sm-12">
									<h6>Diagnosis Data</h6>
									<AsyncSelect
										required
										cacheOptions
										value={selectedOption}
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										name="diagnosis"
										ref={register({ name: 'diagnosis', required: true })}
										loadOptions={getOptions}
										onChange={handleChangeOptions}
										placeholder="Enter ICD10 Code"
									/>
								</div>
							</div>
							<div>
								<h6>Prescription from another facility</h6>
							</div>
							<div className="row">
								<div className="form-group col-sm-3">
									<label>
										<input
											type="radio"
											checked={prescription}
											onChange={() => setPrescription(true)}
										/>{' '}
										Yes
									</label>
								</div>
								<div className="form-group col-sm-3">
									<label>
										<input
											type="radio"
											checked={!prescription}
											onChange={() => setPrescription(false)}
										/>{' '}
										No
									</label>
								</div>
							</div>
							<div className="row">
								{!editing ? (
									<div className="form-group col-sm-3">
										<button
											onClick={handleSubmit}
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
									<button onClick={handleSubmit} className="btn btn-primary">
										Done
									</button>
								)}

								{/* <div className="form-group col-sm-3">
							<MinusIcon style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} />
						</div> */}
							</div>
						</form>

						<div>
							<Table>
								<thead>
									<tr>
										<th>Generic Name</th>
										<th>Drug Name</th>
										<th>Quantity</th>
										<th>Diagnosis</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{pharmRequest
										? pharmRequest.map((request, index) => {
												return (
													<tr key={index}>
														<td>{request.genericName}</td>
														<td>{request.drugName}</td>
														<td>{request.quantity}</td>
														<td>{request.diagnosis.description}</td>
														<td>
															<ViewIcon
																onClick={() => {
																	setActiveRequest(request);
																	onModalClick();
																}}
																style={{
																	width: '1rem',
																	height: '1rem',
																	cursor: 'pointer',
																}}
															/>{' '}
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
						<div>
							<button
								onClick={saveTableData}
								className={
									submitting
										? 'btn btn-primary disabled mt-4'
										: 'btn btn-primary mt-4'
								}>
								{submitting ? (
									<img src={waiting} alt="submitting" />
								) : (
									<span> Save</span>
								)}
							</button>
						</div>
					</div>
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
	addPharmacyRequest,
	loadInvCategories,
	loadInventories,
})(PharmNewRequestComponent);
