import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { ReactComponent as PlusIcon } from '../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { notifyError } from '../../services/notify';
import { request, hasExpired, formatDate } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	drugId: '',
	dose: '',
	frequency: '',
	taskCount: '',
};

const CreateRegimenTask = ({ closeModal, setMedicalTask }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});
	const [loaded, setLoaded] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [editing, setEditing] = useState(false);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [startTime, setStartTime] = useState('');
	const [immediately, setImmediately] = useState(false);
	const [requestPharmacy, setRequestPharmacy] = useState(false);

	const [generic, setGeneric] = useState(null);
	const [frequencyType, setFrequencyType] = useState(null);

	const patient = useSelector(state => state.user.patient);

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

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			setLoaded(true);
		}
	}, [loadGenericDrugs, loaded]);

	const onFormSubmit = (data, e) => {
		const duration = getTiming(data.frequency);
		const frequency = parseInt(data.frequency.replace(/\D+/g, ''), 10);
		const hourly = 24 / frequency;
		const daily = frequency === 1 ? 1 : hourly;
		const newDrug = [
			...drugsSelected,
			{
				...data,
				drug: selectedDrug,
				generic,
				ftype: frequencyType,
				duration,
				startTime:
					startTime !== ''
						? moment(startTime).format('YYYY-MM-DD HH:mm:ss')
						: moment().format('YYYY-MM-DD HH:mm:ss'),
				requestPharmacy: requestPharmacy ? 1 : 0,
				interval: duration !== '' ? daily : frequency,
				intervalType: duration !== '' && frequency === 1 ? 'days' : 'hours',
				taskNumber:
					duration !== ''
						? parseInt(data.taskCount) * frequency
						: data.taskCount,
			},
		];
		setDrugsSelected(newDrug);
		setEditing(false);
		setSelectedDrug(null);
		reset(defaultValues);
		setStartTime('');

		setImmediately(false);
		setRequestPharmacy(false);

		setGeneric(null);
		setFrequencyType(null);
	};

	const getTiming = frequency => {
		return frequency.indexOf('daily') !== -1 ? 'day(s)' : '';
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
		setStartTime(new Date(item.startTime));
		setRequestPharmacy(item.requestPharmacy === 1);
		setEditing(true);
	};

	const saveTableData = async e => {
		e.preventDefault();
		const patient_id = patient.id;
		if (!patient_id) {
			notifyError('No patient has been selected');
			return;
		}
		if (drugsSelected.length === 0) {
			notifyError('No drugs has been selected');
			return;
		}
		setMedicalTask(drugsSelected);
		closeModal();
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
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '760px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Medication</h4>
						<div className="element-box p-2">
							<form onSubmit={handleSubmit(onFormSubmit)}>
								<div className="row">
									<div className="form-group col-sm-12">
										<label>Drug Generic Name</label>
										<Select
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
								</div>
								<div className="row">
									<div className="form-group col-sm-12">
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
									<div className="form-group col-sm-6">
										<label>Dose</label>
										<input
											type="number"
											className="form-control"
											placeholder="Dose"
											ref={register({ required: true })}
											name="dose"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-6">
										<label>Frequency</label>
										<Select
											placeholder="Frequency"
											ref={register({
												name: 'frequency',
												required: true,
											})}
											name="frequency"
											value={frequencyType}
											options={[
												{ value: '', label: 'Select frequency' },
												{ value: '1 x daily', label: '1 x daily' },
												{ value: '2 x daily', label: '2 x daily' },
												{
													value: '3 x daily',
													label: '3 x daily',
												},
												{
													value: '4 x daily',
													label: '4 x daily',
												},
												{
													value: 'Every 4 hours',
													label: 'Every 4 hours',
												},
												{
													value: 'Every 3 hours',
													label: 'Every 3 hours',
												},
												{
													value: 'Every 2 hours',
													label: 'Every 2 hours',
												},
												{ value: 'Every 1 hour', label: 'Every 1 hour' },
											]}
											onChange={e => {
												setValue('frequency', e.value);
												setFrequencyType(e);
											}}
										/>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>
											For{' '}
											<span className="text-muted">
												# number of times to give medication
											</span>
										</label>
										<input
											type="number"
											className="form-control"
											placeholder="count"
											ref={register({ required: true })}
											name="taskCount"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-6 relative">
										<label>Start task on</label>
										<div className="set-immediately">
											<label className="form-check-label">
												<input
													className="form-check-input mt-0"
													name="immediately"
													type="checkbox"
													onClick={() => {
														setImmediately(!immediately);
														setStartTime(new Date());
													}}
												/>{' '}
												Immediately
											</label>
										</div>
										<DatePicker
											selected={startTime}
											onChange={date => setStartTime(date)}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											showTimeSelect
											dropdownMode="select"
											dateFormat="dd-MM-yyyy HH:mm"
											className="single-daterange form-control"
											placeholderText="Select start time"
											minDate={new Date()}
											name="startDate"
										/>
									</div>
								</div>
								<div className="row relative">
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
									<div className="set-pharmacy">
										<label className="form-check-label">
											<input
												className="form-check-input mt-0"
												name="set_pharmacy"
												type="checkbox"
												onClick={() => setRequestPharmacy(!requestPharmacy)}
											/>{' '}
											Request from Pharmacy
										</label>
									</div>
								</div>
							</form>

							<div>
								<Table>
									<thead>
										<tr>
											<th>Prescription</th>
											<th>Start at</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{drugsSelected.map((item, i) => {
											const hourly = ` for ${item.taskCount} ${
												item.duration !== '' ? item.duration : 'times'
											}`;
											return (
												<tr key={i}>
													<td>{`${item.dose}dose of ${item.drug.name} ${item.frequency}${hourly}`}</td>
													<td>
														{formatDate(item.startTime, 'DD-MMM-YYYY h:mm a')}
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
							{drugsSelected.length > 0 && (
								<div>
									<button
										onClick={saveTableData}
										className="btn btn-primary mt-4">
										<span> Save</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateRegimenTask;
