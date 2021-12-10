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
import { request, hasExpired, patientname } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
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

const PrescriptionForm = ({ patient, history, module, location, itemId }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});
	const [refillable, setRefillable] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [editing, setEditing] = useState(false);
	const [prescription, setPrescription] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [loading, setLoading] = useState(true);
	const [regimenNote, setRegimenNote] = useState('');

	const [generic, setGeneric] = useState(null);
	const [diagnoses, setDiagnoses] = useState([]);
	const [frequencyType, setFrequencyType] = useState(null);

	const dispatch = useDispatch();

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};
	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (${option.type}: ${option.code})`;

	const getOptions = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
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

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=1000', 'GET', true);
			setGenericDrugs(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			setLoaded(true);
		}
		if (loading && patient && !chosenPatient) {
			setChosenPatient(patient);
			setLoading(false);
		}
	}, [chosenPatient, loadGenericDrugs, loaded, loading, patient]);

	const onFormSubmit = (data, e) => {
		const newDrug = [
			...drugsSelected,
			{ drug: selectedDrug, generic, ftype: frequencyType, ...data },
		];
		setDrugsSelected(newDrug);
		setEditing(false);
		setSelectedDrug(null);
		reset(defaultValues);

		setDiagnoses([]);
		setGeneric(null);
		setFrequencyType(null);
	};

	const onTrash = index => {
		const newPharm = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected(newPharm);
	};

	const startEdit = (item, index) => {
		onTrash(index);
		const items = Object.entries(item);
		for (const req of items) {
			const [key, value] = req;
			setValue(key, value);
		}
		setFrequencyType(item.ftype);
		setSelectedDrug(item.drug);
		setGeneric(item.generic);
		setEditing(true);
	};

	const submitRequest = async e => {
		try {
			e.preventDefault();

			if (!chosenPatient) {
				notifyError('No patient has been selected');
				return;
			}

			const patient_id = chosenPatient.id;

			if (drugsSelected.length === 0) {
				notifyError('No drugs has been selected');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());

			const data = drugsSelected.map((item, i) => ({
				id: i + 1,
				generic: item.generic,
				drug: item.drug,
				dose_quantity: item.quantity,
				refills: item.refills && item.refills !== '' ? item.refills : 0,
				frequency: item.frequency,
				frequencyType: item.frequencyType,
				duration: item.duration,
				regimenInstruction: item.regimen_instruction,
				diagnosis: item.diagnosis || [],
				prescription: item.prescription ? 'Yes' : 'No',
			}));

			const regimen = {
				requestType: 'drugs',
				items: data,
				patient_id,
				request_note: regimenNote,
				antenatal_id: module === 'antenatal' ? itemId : null,
				admission_id: module === 'admission' ? itemId : null,
				procedure_id: module === 'procedure' ? itemId : null,
			};

			const rs = await request('requests/save-request', 'POST', true, regimen);
			setSubmitting(false);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('regimen request completed');
				if (!module || (module && module === '')) {
					history.push('/pharmacy');
				} else {
					if (module === 'patient') {
						history.push(`${location.pathname}#pharmacy`);
					} else {
						history.push(`${location.pathname}#regimen`);
					}
				}
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			setSubmitting(false);
			notifyError('Error while creating new pharmacy request');
		}
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onDrugExpired = (drug, bypass) => {
		const expired =
			drug.batches.length > 0
				? hasExpired(drug.batches[0].expirationDate)
				: true;
		if (!expired || bypass) {
			setValue('drugId', drug.id);
			setSelectedDrug({
				...drug,
				qty: drug.batches.reduce((total, item) => total + item.quantity, 0),
				basePrice: drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
			});
			setGeneric(drug.generic);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						setValue('drugId', drug.id);
						setSelectedDrug({
							...drug,
							qty: drug.batches.reduce(
								(total, item) => total + item.quantity,
								0
							),
							basePrice:
								drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
						});
						setGeneric(drug.generic);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Expiration</h3>
							<p>{`${drug.name} has expired`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		}
	};

	const onDrugSelection = drug => {
		if (
			drug.batches.length === 0 ||
			(drug.batches.length > 0 &&
				drug.batches.reduce((total, item) => total + item.quantity, 0) === 0)
		) {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						onDrugExpired(drug, true);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Stock</h3>
							<p>{`${drug.name} is out of stock`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		} else {
			onDrugExpired(drug, false);
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
							getOptionLabel={option => patientname(option, true)}
							defaultOptions
							name="patient"
							loadOptions={getPatients}
							onChange={val => {
								if (val) {
									setChosenPatient(val);
								} else {
									setChosenPatient(null);
								}

								// reset drug
								setValue('drugId', '');
								setSelectedDrug(null);
								setGeneric(null);
							}}
							placeholder="Search patients"
						/>
					</div>
				)}
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Drug Generic Name</label>
						<Select
							placeholder="Select generic name"
							defaultValue
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => setGeneric(e)}
							value={generic}
							isSearchable={true}
							options={genericDrugs}
							name="generic_name"
						/>
					</div>
					<div className="form-group col-sm-6 relative">
						<label>Drug Name</label>
						{selectedDrug && (
							<div className="posit-top">
								<div className="row">
									<div className="col-sm-12">
										<span
											className={`badge badge-${
												selectedDrug.qty > 0 ? 'info' : 'danger'
											} text-white`}>{`Stock Level: ${selectedDrug.qty}; Base Price: ₦${selectedDrug.basePrice}`}</span>
									</div>
								</div>
							</div>
						)}
						<Select
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							ref={register({ name: 'drugId', required: true })}
							name="drugId"
							options={generic?.drugs || []}
							value={selectedDrug}
							onChange={e => {
								if (e) {
									onDrugSelection(e);
								} else {
									setValue('drugId', '');
									setSelectedDrug(null);
								}
							}}
							placeholder="select a drug"
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-4">
						<label>Dose Quantity</label>
						<input
							type="text"
							className="form-control"
							placeholder="Dose Quantity"
							ref={register({ required: true })}
							name="quantity"
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-4">
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
					<div className="form-group col-sm-4">
						<label>Frequency Type</label>
						<Select
							placeholder="Frequency type"
							ref={register({ name: 'frequencyType', required: true })}
							name="frequencyType"
							value={frequencyType}
							options={[
								{ value: '', label: 'Select frequency' },
								{ value: 'as-needed', label: 'As Needed' },
								{ value: 'at-night', label: 'At Night' },
								{ value: 'immediately', label: 'Immediately' },
								{ value: 'hourly', label: 'Hourly' },
								{ value: 'daily', label: 'Daily' },
								{
									value: 'weekly',
									label: 'Weekly',
								},
								{
									value: 'monthly',
									label: 'Monthly',
								},
								{ value: 'quarterly', label: 'Quarterly' },
								{ value: 'stat', label: 'Stat' },
							]}
							onChange={e => {
								setValue('frequencyType', e.value);
								setFrequencyType(e);
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-4">
						<label>Duration</label>
						<input
							type="number"
							className="form-control"
							placeholder={`(value in ${frequencyType?.value ||
								'daily'}) eg: 3`}
							ref={register({ required: true })}
							name="duration"
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-4">
						<div className="refills">
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
						<label>Number of refills</label>
						<input
							type="number"
							className="form-control"
							placeholder="Number of refills"
							ref={register({ name: 'refills' })}
							name="refills"
							disabled={!refillable}
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-4">
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
					<div className="form-group col-sm-12">
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
							<th></th>
						</tr>
					</thead>
					<tbody>
						{drugsSelected.map((item, i) => {
							return (
								<tr key={i}>
									<td>{item.generic?.name || '--'}</td>
									<td>{item.drug?.name || '--'}</td>
									<td>
										<div className="badge badge-dark">{`${item.quantity} - ${item.frequency}x ${item.frequencyType} for ${item.duration} ${item.frequencyType}`}</div>
									</td>
									<td>
										{item.diagnosis && item.diagnosis.length > 0
											? item.diagnosis
													.map(d => `${d.type}: ${d.description} (${d.code})`)
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
															startEdit(item, i);
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
													onClick={() => onTrash(i)}
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
						value={regimenNote}
						onChange={e => setRegimenNote(e.target.value)}></textarea>
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
