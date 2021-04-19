import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';
import waiting from '../../assets/images/waiting.gif';
import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { notifySuccess, notifyError } from '../../services/notify';
import { diagnosisAPI, searchAPI } from '../../services/constants';
import {
	request,
	groupBy,
	hasExpired,
	formatPatientId,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	genericName: '',
	drugId: '',
	quantity: '',
	anotherFacility: false,
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	regimen_instruction: '',
	diagnosis: [],
};

const category_id = 1;

const PrescriptionForm = ({ patient, history, module, location }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});
	const [refillable, setRefillable] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [inventories, setInventories] = useState([]);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [editing, setEditing] = useState(false);
	const [prescription, setPrescription] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [genName, setGenName] = useState(null);
	const [diagnosisType, setDiagnosisType] = useState('10');
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [loading, setLoading] = useState(true);
	const [regimenNote, setRegimenNote] = useState('');

	const [diagnoses, setDiagnoses] = useState([]);
	const [frequencyType, setFrequencyType] = useState(null);
	const [chosenDrug, setChosenDrug] = useState(null);
	const [chosenGeneric, setChosenGeneric] = useState(null);

	const dispatch = useDispatch();

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};
	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (Icd${option.diagnosisType}: ${option.icd10Code ||
			option.procedureCode})`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=${diagnosisType}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getServiceUnit = useCallback(
		async hmoId => {
			try {
				dispatch(startBlock());
				const url = `inventory/stocks-by-category/${category_id}/${hmoId}`;
				const rs = await request(url, 'GET', true);
				setInventories(rs);
				setLoading(false);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('Error fetching drugs');
				setLoading(false);
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (loading && patient) {
			getServiceUnit(patient.hmo.id);
		}
	}, [getServiceUnit, loading, patient]);

	// group drugs by generic name
	const drugValues = groupBy(
		inventories.filter(drug => drug.generic_name !== null),
		'generic_name'
	);

	// list of drugs by generic name
	const drugObj = Object.keys(drugValues).map(name => ({
		generic_name: name,
		drugs: drugValues[name],
	}));

	// list generic names
	const genericNameOptions = Object.keys(drugValues).map(name => ({
		value: name,
		label: name,
	}));

	// list of drugs
	const genericItem = drugObj.find(
		drug => genName && drug.generic_name === genName
	);

	const drugNameOptions = genericItem
		? genericItem.drugs.map(drug => ({
				value: drug.id,
				label: `${drug.name}${drug.vendor ? ` - ${drug.vendor.name}` : ''}`,
		  }))
		: [];

	const onFormSubmit = (data, e) => {
		const drug = inventories.find(drug => drug.id === data.drugId);
		const newDrug = [
			...drugsSelected,
			{
				...data,
				drugName: drug?.name || '',
				drugCost: drug?.sales_price || 0.0,
				hmoId: drug.hmo.id,
				hmoPrice: drug?.hmoPrice || 0.0,
			},
		];
		setDrugsSelected(newDrug);
		setEditing(false);
		setSelectedDrug(null);
		reset(defaultValues);

		setDiagnoses([]);
		setFrequencyType(null);
		setChosenDrug(null);
		setChosenGeneric(null);
	};

	const onTrash = index => {
		const newPharm = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected(newPharm);
	};

	const startEdit = (request, index) => {
		onTrash(index);
		const items = Object.entries(request);
		for (const req of items) {
			const [key, value] = req;
			setValue(key, value);
		}
		setEditing(true);
	};

	const submitRequest = async e => {
		try {
			e.preventDefault();

			let patient_id;
			if (chosenPatient) {
				patient_id = chosenPatient.id;
			} else {
				patient_id = patient && patient.id ? patient.id : '';
			}
			if (!patient_id) {
				notifyError('No patient has been selected');
				return;
			}

			if (drugsSelected.length === 0) {
				notifyError('No drugs has been selected');
				return;
			}

			setSubmitting(true);

			const data = drugsSelected.map((request, i) => ({
				id: i + 1,
				drug_generic_name: request.genericName,
				drug_name: request.drugName,
				drug_cost: request.drugCost,
				drug_hmo_id: request.hmoId,
				drug_hmo_cost: request.hmoPrice,
				drug_id: request.drugId,
				dose_quantity: request.quantity,
				refills:
					request.refills && request.refills !== '' ? request.refills : 0,
				frequency: request.frequency,
				frequencyType: request.frequencyType,
				duration: request.duration,
				regimenInstruction: request.regimen_instruction,
				diagnosis: request.diagnosis || [],
				prescription: request.prescription ? 'Yes' : 'No',
			}));

			const regimen = {
				requestType: 'pharmacy',
				items: data,
				patient_id,
				request_note: regimenNote,
			};

			const rs = await request('patient/save-request', 'POST', true, regimen);
			setSubmitting(false);
			if (rs.success) {
				notifySuccess('pharmacy request done');
				if (module !== 'patient') {
					history.push('/pharmacy');
				} else {
					history.push(`${location.pathname}#pharmacy`);
				}
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError('Error while creating new pharmacy request');
		}
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onDrugSelection = e => {
		const drug = inventories.find(drug => drug.id === e.value);
		const expired = hasExpired(drug.expiry_date);
		if (expired) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Expiration</h3>
							<p>{`${drug.name} has expired`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: 10 }}
									onClick={onClose}>
									Okay
								</button>
							</div>
						</div>
					);
				},
			});
		} else {
			setValue('drugId', e.value);
			setSelectedDrug(drug);
		}
	};

	return (
		<div className="form-block element-box">
			<form onSubmit={handleSubmit(onFormSubmit)}>
				{!patient && (
					<div className="form-group mr-2">
						<label className="mr-2 " htmlFor="patient">
							Patient Name
						</label>
						<AsyncSelect
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option =>
								`${option.other_names} ${option.surname} (${formatPatientId(
									option.id
								)})`
							}
							defaultOptions
							name="patient"
							loadOptions={getPatients}
							onChange={val => {
								if (val) {
									getServiceUnit(val.hmo.id);
									setChosenPatient(val);
								} else {
									setChosenPatient(null);
									setInventories([]);
								}
								setValue('genericName', '');
								setGenName(null);

								// reset drug
								setValue('drugId', '');
								setSelectedDrug(null);

								setChosenGeneric(null);
								setChosenDrug(null);
							}}
							placeholder="Search patients"
						/>
					</div>
				)}
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

								// reset drug
								setValue('drugId', '');
								setSelectedDrug(null);
								setChosenGeneric(e);
							}}
							options={genericNameOptions}
							required
							value={chosenGeneric}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6 relative">
						<label>Drug Name</label>
						{selectedDrug && (
							<div className="posit-top">
								<div className="row">
									<div className="col-sm-12">
										<span
											className={`badge badge-${
												selectedDrug.quantity > 0 ? 'info' : 'danger'
											} text-white`}>{`Stock Level: ${selectedDrug.quantity}; Base Price: ₦${selectedDrug.sales_price}`}</span>
									</div>
								</div>
							</div>
						)}
						<Select
							placeholder="Choose a drug name"
							ref={register({ name: 'drugId', required: true })}
							name="drugId"
							options={drugNameOptions}
							value={chosenDrug}
							onChange={e => {
								onDrugSelection(e);
								setChosenDrug(e);
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
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-10">
						{refillable && (
							<>
								<label>Number of refills</label>
								<input
									type="number"
									className="form-control"
									placeholder="Number of refills"
									ref={register({ name: 'refills' })}
									name="refills"
									onChange={onHandleInputChange}
								/>
							</>
						)}
					</div>
					<div className="form-group col-sm-2" style={{ textAlign: 'right' }}>
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
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Frequency</label>
						<input
							type="number"
							className="form-control"
							placeholder="eg 3"
							ref={register({ required: true })}
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
							value={frequencyType}
							options={[
								{ value: '', label: 'Select frequency' },
								{ value: 'immediately', label: 'Immediately' },
								{ value: 'daily', label: 'Daily' },
								{
									value: 'weekly',
									label: 'Weekly',
								},
								{
									value: 'monthly',
									label: 'Monthly',
								},
							]}
							onChange={e => {
								setValue('frequencyType', e.value);
								setFrequencyType(e);
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Duration</label>
						<input
							type="number"
							className="form-control"
							placeholder="(value in days) eg: 7"
							ref={register({ required: true })}
							name="duration"
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-6">
						<label>Note</label>
						<input
							type="text"
							className="form-control"
							placeholder="Regimen line instruction"
							ref={register}
							name="regimen_instruction"
							onChange={onHandleInputChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-12 relative">
						<div className="posit-top">
							<div className="row">
								<div className="form-group col-sm-12">
									<label>
										<input
											type="radio"
											checked={diagnosisType === '10'}
											onChange={() => setDiagnosisType('10')}
										/>{' '}
										ICD10
									</label>
									<label className="ml-2">
										<input
											type="radio"
											checked={diagnosisType === '2'}
											onChange={() => setDiagnosisType('2')}
										/>{' '}
										ICPC-2
									</label>
								</div>
							</div>
						</div>
						<h6>Diagnosis Data</h6>
						<AsyncSelect
							required
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							isMulti
							value={diagnoses}
							name="diagnosis"
							ref={register({ name: 'diagnosis', required: true })}
							loadOptions={getOptions}
							onChange={e => {
								setValue('diagnosis', e);
								setDiagnoses(e);
							}}
							placeholder="Search for diagnosis"
						/>
					</div>
				</div>
				<div>
					<h6>Prescription from another facility</h6>
				</div>
				<div className="row">
					<div className="form-group col-sm-2">
						<label>
							<input
								type="radio"
								checked={prescription}
								onChange={() => setPrescription(true)}
							/>{' '}
							Yes
						</label>
					</div>
					<div className="form-group col-sm-2">
						<label>
							<input
								type="radio"
								checked={!prescription}
								onChange={() => setPrescription(false)}
							/>{' '}
							No
						</label>
					</div>
					<div className="8" />
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
				</div>
			</form>

			<div>
				<Table>
					<thead>
						<tr>
							<th>Generic Name</th>
							<th>Drug Name</th>
							<th>Summary</th>
							<th>Diagnosis</th>
							<th nowrap="nowrap" className="text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{drugsSelected.map((request, index) => {
							return (
								<tr key={index}>
									<td>{request.genericName}</td>
									<td>{request.drugName}</td>
									<td>
										<div className="badge badge-dark">{`${request.quantity} - ${request.frequency}x ${request.frequencyType} for ${request.duration} days`}</div>
									</td>
									<td>
										{request.diagnosis
											? request.diagnosis
													.map(
														d =>
															`Icd${d.diagnosisType}: ${
																d.description
															} (${d.icd10Code || d.procedureCode})`
													)
													.join(', ')
											: '-'}
									</td>
									<td>
										<div className="display-flex">
											<div>
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
												/>
											</div>
											<div className="ml-2">
												<TrashIcon
													onClick={() => onTrash(index)}
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer',
													}}
												/>
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className="row mt-4">
				<div className="form-group col-sm-12">
					<label>Regimen Note</label>
					<textarea
						className="form-control"
						name="regimen_note"
						rows="3"
						placeholder="Regimen note"
						onChange={e => setRegimenNote(e.target.value)}>
						{regimenNote}
					</textarea>
				</div>
			</div>
			<div>
				<button
					onClick={submitRequest}
					disabled={submitting}
					className="btn btn-primary mt-4">
					{submitting ? (
						<img src={waiting} alt="submitting" />
					) : (
						<span> Save</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default withRouter(PrescriptionForm);
