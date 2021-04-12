import React, { useState, useEffect } from 'react';
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
import { request, groupBy, hasExpired } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	genericName: '',
	drugId: '',
	dose: '',
	frequency: '',
	taskCount: '',
};

const category_id = 1;

const CreateRegimenTask = ({ closeModal, setMedicalTask }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});
	const [inventories, setInventories] = useState([]);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [editing, setEditing] = useState(false);
	const [genName, setGenName] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [loading, setLoading] = useState(true);
	const [startTime, setStartTime] = useState('');
	const [immediately, setImmediately] = useState(false);
	const [requestPharmacy, setRequestPharmacy] = useState(false);

	const patient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const getServiceUnit = async hmoId => {
		try {
			dispatch(startBlock());
			const url = `inventory/stocks-by-category/${category_id}/${hmoId}`;
			const rs = await request(url, 'GET', true);
			setInventories(rs);
			setLoading(false);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching drugs');
			setLoading(false);
			dispatch(stopBlock());
		}
	};

	useEffect(() => {
		const fetch = () => {
			getServiceUnit(patient.hmo.id);
		};

		if (loading && patient) {
			fetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, patient]);

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
		const duration = getTiming(data.frequency);
		const frequecy = parseInt(data.frequency.replace(/\D+/g, ''), 10);
		const hourly = 24 / frequecy;
		const daily = frequecy === 1 ? 1 : hourly;
		let newDrug = [
			...drugsSelected,
			{
				...data,
				drug,
				drugName: drug?.name || '',
				drugCost: drug?.sales_price || 0.0,
				hmoId: drug.hmo.id,
				hmoPrice: drug?.hmoPrice || 0.0,
				duration,
				startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
				requestPharmacy: requestPharmacy ? 1 : 0,
				interval: duration !== '' ? daily : frequecy,
				intervalType: duration !== '' && frequecy === 1 ? 'days' : 'hours',
				taskNumber:
					duration !== ''
						? parseInt(data.taskCount) * frequecy
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
	};

	const getTiming = frequency => {
		return frequency.indexOf('daily') !== -1 ? 'day(s)' : '';
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
		setStartTime(new Date(request.startTime));
		setRequestPharmacy(request.requestPharmacy === 1);
		setEditing(true);
	};

	const saveTableData = async e => {
		e.preventDefault();

		let patient_id = patient.id;
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
							<div className="row">
								<div className="col-sm-12">
									<div className="element-box mb-3">
										<form
											onSubmit={handleSubmit(onFormSubmit)}
											autoComplete="off">
											<div className="row">
												<div className="form-group col-sm-12">
													<label>Drug Generic Name</label>
													<Select
														placeholder="Choose a drug generic name"
														name="genericName"
														ref={register({
															name: 'genericName',
															required: true,
														})}
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
												<div className="form-group col-sm-12">
													<label>Drug Name</label>
													{selectedDrug && (
														<div className="posit-top">
															<div className="row">
																<div className="col-sm-12">
																	<span
																		className={`badge badge-${
																			selectedDrug.quantity > 0
																				? 'info'
																				: 'danger'
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
														onChange={e => onDrugSelection(e)}
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
														placeholder=""
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
													<button
														onClick={handleSubmit}
														className="btn btn-primary">
														Done
													</button>
												)}
												<div className="set-pharmacy">
													<label className="form-check-label">
														<input
															className="form-check-input mt-0"
															name="set_pharmacy"
															type="checkbox"
															onClick={() =>
																setRequestPharmacy(!requestPharmacy)
															}
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
														<th nowrap="nowrap" className="text-center">
															Action
														</th>
													</tr>
												</thead>
												<tbody>
													{drugsSelected.map((request, index) => {
														const hourly =
															request.duration !== ''
																? ` for ${request.taskCount} ${request.duration}`
																: '';
														return (
															<tr key={index}>
																<td>{`${request.dose}dose of ${request.drugName} ${request.frequency}${hourly}`}</td>
																<td>
																	{moment(request.startTime).format(
																		'YYYY-MM-DD h:mm a'
																	)}
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
				</div>
			</div>
		</div>
	);
};

export default CreateRegimenTask;
