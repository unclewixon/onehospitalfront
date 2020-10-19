import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';
import waiting from '../../assets/images/waiting.gif';
import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { notifySuccess, notifyError } from '../../services/notify';
import { diagnosisAPI } from '../../services/constants';
import { request, groupBy } from '../../services/utilities';

const defaultValues = {
	genericName: '',
	drugId: '',
	quantity: '',
	anotherFacility: false,
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	regimenNote: '',
	diagnosis: '',
};

const PrescriptionForm = ({
	patient,
	allPatients,
	patientsLoading,
	history,
	module,
	location,
}) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, getValues } = useForm({
		defaultValues,
	});
	const [submitting, setSubmitting] = useState(false);
	const [inventories, setInventories] = useState([]);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [editing, setEditing] = useState(false);
	const [prescription, setPrescription] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [genName, setGenName] = useState(null);
	const [diagnosisType, setDiagnosisType] = useState('icd10');
	const [selectedDrug, setSelectedDrug] = useState(null);

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};
	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (${option.icd10Code || option.procedureCode})`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=${diagnosisType}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getServiceUnit = useCallback(async () => {
		try {
			const res = await request('inventory/categories', 'GET', true);
			if (res && res.length > 0) {
				const selectCat = res.find(cat => cat.name === 'Pharmacy');

				const url = `inventory/stocks-by-category/${selectCat.id}`;
				const rs = await request(url, 'GET', true);
				setInventories(rs);
			}
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	}, []);

	useEffect(() => {
		getServiceUnit();
	}, [getServiceUnit]);

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
				label: drug.name,
		  }))
		: [];

	const onFormSubmit = (data, e) => {
		const drug = inventories.find(drug => drug.id === data.drugId);
		console.log(drug);
		let newDrug = [
			...drugsSelected,
			{
				...data,
				drugName: drug?.name || '',
				drugCost: drug?.sales_price || 0.0,
			},
		];
		setDrugsSelected(newDrug);
		setEditing(false);
		setSelectedDrug(null);
		reset(defaultValues);
	};

	const onTrash = index => {
		const newPharm = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected(newPharm);
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

	const saveTableData = async e => {
		try {
			e.preventDefault();

			setSubmitting(true);
			let patient_id = '';
			if (chosenPatient) {
				patient_id = chosenPatient.value;
			} else {
				patient_id = patient && patient.id ? patient.id : '';
			}
			if (!patient_id) {
				notifyError('No patient has been selected');
			}

			const data = drugsSelected.map((request, i) => ({
				id: i + 1,
				drug_generic_name: request.genericName,
				drug_name: request.drugName,
				drug_cost: request.drugCost ? request.drugCost.replace(',', '') : 0.0,
				drug_id: request.drugId,
				dose_quantity: request.quantity,
				refills: request.refills,
				frequency: request.frequency,
				frequencyType: request.frequencyType,
				duration: request.duration,
				regimenNote: request.regimenNote,
				diagnosis: request.diagnosis,
				prescription: request.prescription ? 1 : 0,
			}));

			await request('patient/save-request', 'POST', true, {
				requestType: 'pharmacy',
				requestBody: data,
				patient_id,
			});
			setSubmitting(false);
			notifySuccess('pharmacy request done');
			if (module !== 'patient') {
				history.push('/pharmacy');
			} else {
				history.push(`${location.pathname}#pharmacy`);
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
		setValue('drugId', e.value);
		const drug = inventories.find(drug => drug.id === e.value);
		setSelectedDrug(drug);
	};

	return (
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
							onChange={val => {
								setChosenPatient(val);
								setValue('genericName', '');
								setGenName(null);

								// reset drug
								setValue('drugId', '');
								setSelectedDrug(null);
							}}
							options={allPatients}
							value={chosenPatient}
						/>
					</div>
				) : null}

				<div className="row">
					<div className="form-group col-sm-12">
						<label>Drug Generic Name</label>
						<Select
							key={`unique_key__${getValues('genericName')}`}
							placeholder="Choose a drug generic name"
							name="genericName"
							ref={register({ name: 'genericName', required: true })}
							onChange={e => {
								setValue('genericName', e.value);
								setGenName(e.value);

								// reset drug
								setValue('drugId', '');
								setSelectedDrug(null);
							}}
							options={genericNameOptions}
							required
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
							key={`unique_key__${getValues('drugId')}`}
							placeholder="Choose a drug name"
							ref={register({ name: 'drugId', required: true })}
							name="drugId"
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
							key={`unique_key__${getValues('frequencyType')}`}
							placeholder="Frequency type"
							ref={register({ name: 'frequencyType', required: true })}
							name="frequencyType"
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
							name="regimenNote"
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
											checked={diagnosisType === 'icd10'}
											onChange={() => setDiagnosisType('icd10')}
										/>{' '}
										ICD10
									</label>
									<label className="ml-2">
										<input
											type="radio"
											checked={diagnosisType === 'icpc2'}
											onChange={() => setDiagnosisType('icpc2')}
										/>{' '}
										ICPC-2
									</label>
								</div>
							</div>
						</div>
						<h6>Diagnosis Data</h6>
						<AsyncSelect
							required
							key={`unique_key__`}
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							name="diagnosis"
							ref={register({ name: 'diagnosis', required: true })}
							loadOptions={getOptions}
							onChange={e => {
								setValue('diagnosis', e);
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
											? `${request.diagnosis.description} (${request.diagnosis
													.icd10Code || request.diagnosis.procedureCode})`
											: '-'}
									</td>
									<td style={{ display: 'flex', width: '64px' }}>
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
									</td>
								</tr>
							);
						})}
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
	);
};

export default withRouter(PrescriptionForm);
