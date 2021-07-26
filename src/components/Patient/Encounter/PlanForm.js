import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import { Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { updateEncounterData } from '../../../actions/patient';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import {
	request,
	hasExpired,
	formatCurrency,
} from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as PlusIcon } from '../../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import {
	diagnosisAPI,
	CK_TREATMENT_PLAN,
	CK_INVESTIGATION_REGIMEN,
	CK_INVESTIGATION_PROCEDURE,
} from '../../../services/constants';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const defaultValues = {
	drugId: '',
	quantity: '',
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	regimen_instruction: '',
	diagnosis: [],
};

const PlanForm = ({ previous, next, patient }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});

	const [loaded, setLoaded] = useState(false);
	const [procedureData, setProcedureData] = useState(null);
	const [regimenData, setRegimenData] = useState(null);
	const [treatmentPlan, setTreatmentPlan] = useState('');
	const [editing, setEditing] = useState(false);
	const [regimenNote, setRegimenNote] = useState('');

	// selected items
	const [frequencyType, setFrequencyType] = useState(null);
	const [refillable, setRefillable] = useState(false);
	const [generic, setGeneric] = useState(null);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);

	// procedure
	const [service, setService] = useState(null);
	const [procDiagnoses, setProcDiagnoses] = useState([]);
	const [bill, setBill] = useState('later');
	const [procedureNote, setProcedureNote] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

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

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_TREATMENT_PLAN);
		setTreatmentPlan(data || encounter.treatmentPlan);

		const regimenData = await storage.getItem(CK_INVESTIGATION_REGIMEN);
		console.log(regimenData);
		if (regimenData) {
			setDrugsSelected(regimenData.drugs);
			setRegimenNote(regimenData.regimenNote);
		}

		const proc = await storage.getItem(CK_INVESTIGATION_PROCEDURE);
		if (proc) {
			setBill(proc?.bill || 'later');
			setProcedureNote(proc?.procedureNote || '');
			setService(proc?.service);
			setProcDiagnoses(proc?.procDiagnoses || []);
		}
	}, [encounter]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			retrieveData();
			setLoaded(true);
		}
	}, [loadGenericDrugs, loaded, retrieveData]);

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

	const getDrugOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `inventory/drugs?q=${q}&generic_id=${generic?.id || ''}`;
		const res = await request(url, 'GET', true);
		return res.result || [];
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

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

		const datum = { ...regimenData, regimenNote, drugs: newDrug };
		setRegimenData(datum);
		storage.setLocalStorage(CK_INVESTIGATION_REGIMEN, datum);
	};

	const onTrash = index => {
		const newPharm = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected(newPharm);
		const datum = { ...regimenData, regimenNote, drugs: newPharm };
		setRegimenData(datum);
		storage.setLocalStorage(CK_INVESTIGATION_REGIMEN, datum);
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

	const onSubmit = () => {
		const data = drugsSelected.map((item, i) => ({
			id: i + 1,
			generic: item.generic,
			drug: item.drug,
			hmo_id: patient.hmo.id,
			dose_quantity: item.quantity,
			refills: item.refills && item.refills !== '' ? item.refills : 0,
			frequency: item.frequency,
			frequencyType: item.frequencyType,
			duration: item.duration,
			regimenInstruction: item.regimen_instruction,
			diagnosis: item.drugDiagnoses,
			prescription: item.prescription ? 'Yes' : 'No',
		}));

		const regimen = {
			requestType: 'drugs',
			items: data,
			patient_id: patient.id,
			request_note: regimenNote,
		};

		const procedureRequest = {
			requestType: 'procedure',
			patient_id: patient.id,
			tests: [{ ...service }],
			request_note: procedureNote,
			urgent: false,
			diagnosis: procDiagnoses,
			bill: bill === 'later' ? -1 : 0,
		};

		dispatch(
			updateEncounterData({
				...encounter,
				investigations: {
					...encounter.investigations,
					pharmacyRequest: regimen,
					procedureRequest,
				},
				treatmentPlan,
			})
		);
		dispatch(next);
	};

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/category/procedure?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Treatment Plan</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={treatmentPlan}
								name="treatmentPlan"
								autoFocus={true}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
											'codeView',
										],
									],
								}}
								onChange={e => {
									setTreatmentPlan(String(e));
									storage.setLocalStorage(CK_TREATMENT_PLAN, String(e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="mt-4"></div>
				<h5>Add Medication</h5>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Drug Generic Name</label>
						<Select
							isClearable
							placeholder="Select generic name"
							defaultValue
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								setGeneric(e);
							}}
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
											} text-white`}>{`Stock Level: ${
											selectedDrug.qty
										}; Base Price: ${formatCurrency(
											selectedDrug.basePrice
										)}`}</span>
									</div>
								</div>
							</div>
						)}
						<AsyncSelect
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							ref={register({ name: 'drugId', required: true })}
							name="drugId"
							loadOptions={getDrugOptions}
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
					<div className="form-group col-sm-3">
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
					<div className="form-group col-sm-3">
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
					<div className="form-group col-sm-3">
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
					<div className="form-group col-sm-3">
						<label>Duration</label>
						<input
							type="number"
							className="form-control"
							placeholder={`(value in ${frequencyType}) eg: 7`}
							ref={register({ required: true })}
							name="duration"
							onChange={onHandleInputChange}
						/>
					</div>
				</div>
				<div className="row">
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
					<div className="form-group col-sm-4">
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

				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
							<Table>
								<thead>
									<tr>
										<th>Generic Name</th>
										<th>Drug Name</th>
										<th>Summary</th>
										<th>Diagnosis</th>
										<th nowrap="nowrap" className="text-left">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{drugsSelected.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.generic?.name || '--'}</td>
												<td>{item.drug?.name || '--'}</td>
												<td>
													<div className="badge badge-dark">{`${item.quantity} - ${item.frequency}x ${item.frequencyType} for ${item.duration} days`}</div>
												</td>
												<td>
													{item.diagnosis && item.diagnosis.length > 0
														? item.diagnosis
																.map(
																	d => `${d.type}: ${d.description} (${d.code})`
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
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-12">
						<label>Regimen Note</label>
						<textarea
							className="form-control"
							name="regimen_note"
							rows="3"
							placeholder="Regimen note"
							onChange={e => {
								setRegimenNote(e.target.value);
								const data = { ...regimenData, regimenNote: e.target.value };
								setRegimenData(data);
								storage.setLocalStorage(CK_INVESTIGATION_REGIMEN, data);
							}}
							value={regimenNote}></textarea>
					</div>
				</div>
			</form>
			<div className="mt-4"></div>
			<h5>Procedure</h5>
			<div className="row">
				<div className="form-group col-sm-12 relative">
					<label>Procedure</label>
					{service && (
						<div className="posit-top">
							<div className="row">
								<div className="col-sm-12">
									<span
										className={`badge badge-${
											service ? 'info' : 'danger'
										} text-white`}>{`Base Price: ${formatCurrency(
										service?.serviceCost?.tariff || 0
									)}`}</span>
								</div>
							</div>
						</div>
					)}
					<AsyncSelect
						getOptionValue={option => option.id}
						getOptionLabel={option => option.name}
						defaultOptions
						name="service_request"
						loadOptions={getServices}
						value={service}
						onChange={e => {
							setService(e);
							const data = { ...procedureData, service: e };
							setProcedureData(data);
							storage.setLocalStorage(CK_INVESTIGATION_PROCEDURE, data);
						}}
						placeholder="Select Procedure"
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
						loadOptions={getOptions}
						onChange={e => {
							setProcDiagnoses(e);
							const data = { ...procedureData, procDiagnoses: e };
							setProcedureData(data);
							storage.setLocalStorage(CK_INVESTIGATION_PROCEDURE, data);
						}}
						placeholder="Search for diagnosis"
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-12">
					<label>Request Note</label>
					<textarea
						className="form-control"
						name="request_note"
						rows="3"
						placeholder="Enter request note"
						onChange={e => {
							setProcedureNote(e.target.value);
							const data = { ...procedureData, procedureNote: e.target.value };
							setProcedureData(data);
							storage.setLocalStorage(CK_INVESTIGATION_PROCEDURE, data);
						}}
						value={procedureNote}></textarea>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="row">
						<div className="form-group col-sm-3">
							<div className="d-flex">
								<input
									className="form-control"
									type="radio"
									name="bill"
									value="now"
									checked={bill === 'now'}
									onChange={() => {
										setBill('now');
										const data = { ...procedureData, bill: 'now' };
										setProcedureData(data);
										storage.setLocalStorage(CK_INVESTIGATION_PROCEDURE, data);
									}}
								/>
								<label className="mx-1">Bill now</label>
							</div>
						</div>
						<div className="form-group col-sm-3">
							<div className="d-flex">
								<input
									className="form-control"
									type="radio"
									name="bill"
									value="later"
									checked={bill === 'later'}
									onChange={() => {
										setBill('later');
										const data = { ...procedureData, bill: 'later' };
										setProcedureData(data);
										storage.setLocalStorage(CK_INVESTIGATION_PROCEDURE, data);
									}}
								/>
								<label className="mx-1">Bill later </label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={() => onSubmit()}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlanForm;
