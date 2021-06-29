import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { updateEncounterData } from '../../../actions/patient';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { request, groupBy, hasExpired } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as PlusIcon } from '../../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import {
	serviceAPI,
	diagnosisAPI,
	CK_TREATMENT_PLAN,
} from '../../../services/constants';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const defaultValues = {
	genericName: '',
	drugId: '',
	quantity: '',
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	regimen_instruction: '',
};

const category_id = 1;
const categories = [{ id: 19, name: 'General Surgery' }];

const PlanForm = ({ previous, next, patient }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});

	const [loaded, setLoaded] = useState(false);
	const [treatmentPlan, setTreatmentPlan] = useState('');
	const [inventories, setInventories] = useState([]);
	const [services, setServices] = useState([]);
	const [genName, setGenName] = useState(null);
	const [editing, setEditing] = useState(false);
	const [regimenNote, setRegimenNote] = useState('');

	// selected items
	const [frequencyType, setFrequencyType] = useState(null);
	const [refillable, setRefillable] = useState(false);
	const [chosenDrug, setChosenDrug] = useState(null);
	const [chosenGeneric, setChosenGeneric] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [drugsSelected, setDrugsSelected] = useState([]);

	// appointment
	const [appointmentDate, setAppointmentDate] = useState('');
	const [appointmentReason, setAppointmentReason] = useState('');

	// procedure
	const [service, setService] = useState(null);
	const [diagnoses, setDiagnoses] = useState([]);
	const [bill, setBill] = useState('later');
	const [procedureNote, setProcedureNote] = useState('');
	const [category, setCategory] = useState(null);

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const getServiceUnit = useCallback(
		async hmoId => {
			try {
				dispatch(startBlock());

				const url = `inventory/stocks-by-category/${category_id}/${hmoId}`;
				const rs = await request(url, 'GET', true);
				setInventories(rs);

				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('Error fetching drugs');
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_TREATMENT_PLAN);
		setTreatmentPlan(data || encounter.treatmentPlan);
	}, [encounter]);

	useEffect(() => {
		if (!loaded) {
			getServiceUnit(patient.hmo.id);
			retrieveData();
			setLoaded(true);
		}
	}, [getServiceUnit, loaded, patient, retrieveData]);

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

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

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

	const getProcedures = async (hmoId, categoryId) => {
		try {
			dispatch(startBlock());

			const url = `${serviceAPI}/category/${categoryId}?hmo_id=${hmoId}`;
			const rs = await request(url, 'GET', true);
			setServices(rs);

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching procedures');
			dispatch(stopBlock());
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (Icd${option.diagnosisType}: ${option.icd10Code ||
			option.procedureCode})`;

	const getOptions = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = () => {
		const data = drugsSelected.map((request, i) => ({
			id: i + 1,
			drug_generic_name: request.genericName,
			drug_name: request.drugName,
			drug_cost: request.drugCost,
			drug_hmo_id: request.hmoId,
			drug_hmo_cost: request.hmoPrice,
			drug_id: request.drugId,
			dose_quantity: request.quantity,
			refills: request.refills && request.refills !== '' ? request.refills : 0,
			frequency: request.frequency,
			frequencyType: request.frequencyType,
			duration: request.duration,
			regimenInstruction: request.regimen_instruction,
			diagnosis: request.diagnosis || [],
			prescription: request.prescription ? 'Yes' : 'No',
		}));

		const pharmacyRequest = {
			requestType: 'pharmacy',
			items: data,
			patient_id: patient.id,
			request_note: regimenNote,
		};

		const procedureRequest = {
			requestType: 'procedure',
			patient_id: patient.id,
			tests: service ? [{ id: service.id }] : [],
			request_note: procedureNote,
			urgent: false,
			diagnosis: diagnoses || [],
			bill,
		};

		const nextAppointment = {
			appointment_date: appointmentDate,
			description: appointmentReason,
		};

		dispatch(
			updateEncounterData({
				...encounter,
				investigations: {
					...encounter.investigations,
					pharmacyRequest,
					procedureRequest,
				},
				nextAppointment,
				treatmentPlan,
			})
		);
		dispatch(next);
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
									storage.setItem(CK_TREATMENT_PLAN, String(e));
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
				</div>
				<div className="row">
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
							onChange={e => setRegimenNote(e.target.value)}
							value={regimenNote}></textarea>
					</div>
				</div>
			</form>
			<div className="mt-4"></div>
			<h5>Schedule Next Appointment</h5>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label>Appontment Date</label>
						<DatePicker
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							selected={appointmentDate}
							onChange={date => {
								setAppointmentDate(date);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<div className="form-group">
						<label>Description/Reason</label>
						<textarea
							placeholder="Enter description"
							name="appointment_desc"
							className="form-control"
							cols="3"
							onChange={e => setAppointmentReason(e.target.value)}
							value={appointmentReason}></textarea>
					</div>
				</div>
			</div>
			<div className="mt-4"></div>
			<h5>Procedure</h5>
			<div className="row">
				<div className="form-group col-sm-6">
					<label>Category</label>
					<Select
						name="category"
						placeholder="Select Category"
						options={categories}
						value={category}
						getOptionValue={option => option.id}
						getOptionLabel={option => option.name}
						onChange={e => {
							setCategory(e);
							getProcedures(patient.hmo.id, e.id);
						}}
					/>
				</div>
				<div className="form-group col-sm-6">
					<label>Procedure</label>
					<Select
						name="service_request"
						placeholder="Select Procedure"
						options={services}
						value={service}
						getOptionValue={option => option.id}
						getOptionLabel={option => option.name}
						onChange={e => setService(e)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-12">
					<label>Primary diagnoses</label>
					<AsyncSelect
						required
						getOptionValue={getOptionValues}
						getOptionLabel={getOptionLabels}
						defaultOptions
						isMulti
						name="diagnosis"
						loadOptions={getOptions}
						value={diagnoses}
						onChange={e => {
							setDiagnoses(e);
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
						onChange={e => setProcedureNote(e.target.value)}
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
									onChange={() => setBill('now')}
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
									onChange={() => setBill('later')}
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
