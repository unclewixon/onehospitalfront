/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {
	updateEncounterData,
	resetEncounterData,
} from '../../../actions/patient';
import {
	consultationAPI,
	defaultEncounter,
	CK_ENCOUNTER,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError, notifySuccess } from '../../../services/notify';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const Consumable = ({
	previous,
	patient,
	closeModal,
	updateAppointment,
	appointment_id,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [instruction, setInstruction] = useState('');
	const [requestNote, setRequestNote] = useState('');
	const [consumableData, setConsumableData] = useState(null);
	const [quantity, setQuantity] = useState('');
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);
	const [appoinment, setAppoinment] = useState(null);

	// appointment
	const [appointmentDate, setAppointmentDate] = useState('');
	const [appointmentReason, setAppointmentReason] = useState('');

	// selected
	const [selectedConsumables, setSelectedConsumables] = useState([]);

	const encounter = useSelector(state => state.patient.encounterData);
	const staff = useSelector(state => state.user.profile.details);

	const dispatch = useDispatch();

	const saveInstruction = useCallback(
		data => {
			setInstruction(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						instruction: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const saveConsumables = useCallback(
		data => {
			setConsumableData(data);
			setRequestNote(data?.requestNote || '');
			setSelectedConsumables(data?.consumables || []);

			dispatch(
				updateEncounterData(
					{
						...encounter,
						consumables: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const saveAppoinment = useCallback(
		data => {
			setAppoinment(data);
			setAppointmentDate(
				data && data.date && data.date !== '' ? new Date(moment(data.date)) : ''
			);
			setAppointmentReason(data?.reason || '');
			dispatch(
				updateEncounterData(
					{
						...encounter,
						nextAppointment: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const fetchConsumables = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/stores?limit=100', 'GET', true);
			setItems(rs.result);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching consumables');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);

		const encounterData =
			data && data.patient_id === patient.id
				? data?.encounter?.instruction
				: null;
		saveInstruction(encounterData || defaultEncounter.instruction);

		const consumbalesData =
			data && data.patient_id === patient.id
				? data?.encounter?.consumables
				: null;

		saveConsumables(consumbalesData);

		const appointmentData =
			data && data.patient_id === patient.id
				? data?.encounter?.nextAppointment
				: null;
		saveAppoinment(appointmentData);
	}, [patient, saveAppoinment, saveConsumables, saveInstruction]);

	useEffect(() => {
		if (!loaded) {
			fetchConsumables();
			retrieveData();
			setLoaded(true);
		}
	}, [fetchConsumables, loaded, retrieveData]);

	const add = () => {
		if (item && item !== '' && quantity !== '') {
			const found = selectedConsumables.find(c => c.item === item);
			if (!found) {
				const i = [...selectedConsumables, { item, quantity }];
				setSelectedConsumables(i);
				saveConsumables({ ...consumableData, consumables: i, requestNote });
				setItem(null);
				setQuantity('');
			}
		} else {
			notifyError('Error, please select item or enter quantity');
		}
	};

	const onTrash = (index, type) => {
		const items = selectedConsumables.filter((test, i) => index !== i);
		setSelectedConsumables(items);
		saveConsumables({ ...consumableData, consumables: items, requestNote });
	};

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());

			const drugsSelected =
				encounter?.investigations?.pharmacyRequest?.drugs || [];
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

			const regimenNote =
				encounter?.investigations?.pharmacyRequest?.regimenNote || '';
			const regimen = {
				requestType: 'drugs',
				items: data,
				patient_id: patient.id,
				request_note: regimenNote,
			};

			const service =
				encounter?.investigations?.procedureRequest?.service || null;
			const procDiagnoses =
				encounter?.investigations?.procedureRequest?.procDiagnoses || null;
			const procedureNote =
				encounter?.investigations?.procedureRequest?.procedureNote || '';
			const bill = encounter?.investigations?.procedureRequest?.bill || 'later';
			const procedureRequest = {
				requestType: 'procedure',
				patient_id: patient.id,
				tests: service ? [{ ...service }] : [],
				request_note: procedureNote,
				urgent: false,
				diagnosis: procDiagnoses,
				bill: bill === 'later' ? -1 : 0,
			};

			const consumables = {
				patient_id: patient.id,
				items: [...selectedConsumables],
				request_note: requestNote,
			};

			const nextAppointment = {
				appointment_date:
					appointmentDate !== ''
						? moment(new Date(appointmentDate)).format('YYYY-MM-DD HH:mm:ss')
						: '',
				description: appointmentReason,
			};

			const encounterData = {
				...encounter,
				instruction,
				consumables: consumableData,
				nextAppointment: appoinment,
			};
			dispatch(updateEncounterData(encounterData, patient.id));

			const values = {
				...encounterData,
				investigations: {
					...encounterData.investigations,
					pharmacyRequest: regimen,
					procedureRequest,
				},
				nextAppointment,
				consumables,
			};
			const url = `${consultationAPI}${patient.id}/save?appointment_id=${appointment_id}`;
			const rs = await request(url, 'POST', true, values);
			if (rs && rs.success) {
				dispatch(stopBlock());
				updateAppointment(rs.appointment);
				notifySuccess('Consultation completed successfully');
				dispatch(resetEncounterData(defaultEncounter));

				storage.removeItem(CK_ENCOUNTER);

				closeModal();
			} else {
				dispatch(stopBlock());
				notifyError('Error, could not save consultation data');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save consultation data');
		}
	};

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			add();
		}
	};

	const checkNextDate = async date => {
		try {
			setAppointmentDate(date);
			dispatch(startBlock());
			const _date = moment(new Date(date));
			const _next = _date.format('YYYY-MM-DD HH:mm:ss');
			const url = `front-desk/appointments/check-date/available?date=${_next}&staff_id=${staff.id}`;
			const rs = await request(url, 'GET', true);
			if (rs && rs.success && rs.available) {
				const data = { ...appoinment, date };
				saveAppoinment(data);
				dispatch(stopBlock());
			} else {
				dispatch(stopBlock());
				const _time = _date.format('DD-MMM-YYYY h:mm A');
				notifyError(`The selected time (${_time}) is not available`);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError('Error, could not check date');
		}
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="form-group col-sm-4">
						<label>Item</label>
						<Select
							placeholder="Select item"
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							name="item"
							options={items}
							value={item}
							onChange={e => setItem(e)}
						/>
					</div>
					<div className="form-group col-sm-4">
						<label>Quantity</label>
						<input
							type="number"
							className="form-control"
							placeholder="Enter quantity"
							name="quantity"
							onKeyDown={handleKeyDown}
							onChange={e => setQuantity(e.target.value)}
							value={quantity}
						/>
					</div>
					<div className="form-group col-sm-2" style={{ position: 'relative' }}>
						<a
							className="btn btn-info btn-sm text-white pointer"
							style={{ margin: '28px 0 0', display: 'block' }}
							onClick={() => add()}>
							<i className="os-icon os-icon-plus-circle" /> Add Consumable
						</a>
					</div>
				</div>
				{selectedConsumables.length > 0 && (
					<div className="row mt-2">
						<div className="col-md-12">
							<div className="rentals-list-w">
								<div className="filter-side">
									<div className="filter-w">
										<div className="filter-body p-2">
											<span className="select2 select2-container select2-container--default">
												<span className="selection">
													<span className="select2-selection select2-selection--multiple">
														<ul className="select2-selection__rendered">
															{selectedConsumables.map((item, i) => {
																return (
																	<li
																		className="select2-selection__choice"
																		key={i}>
																		<span
																			className="select2-selection__choice__remove pointer"
																			role="presentation"
																			onClick={() => onTrash(i)}>
																			×
																		</span>
																		{`${item.item.name} - ${item.quantity}`}
																	</li>
																);
															})}
														</ul>
													</span>
												</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<label>Request Note</label>
						<textarea
							className="form-control"
							name="request_note"
							rows="3"
							placeholder="Enter request note"
							onChange={e => {
								setRequestNote(e.target.value);
								saveConsumables({
									...consumableData,
									requestNote: e.target.value,
								});
							}}
							value={requestNote}></textarea>
					</div>
				</div>
				<div className="mt-4"></div>
				<h5>Schedule Next Appointment</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Appointment Date</label>
							<DatePicker
								dateFormat="dd-MMM-yyyy h:mm aa"
								className="single-daterange form-control"
								selected={appointmentDate}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={15}
								onChange={date => checkNextDate(date)}
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
								onChange={e => {
									const data = { ...appoinment, reason: e.target.value };
									saveAppoinment(data);
								}}
								value={appointmentReason}></textarea>
						</div>
					</div>
				</div>
				<div className="mt-4"></div>
				<h5>Patient Instructions</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Add patient instructions</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={instruction}
								name="complaint_data"
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
									saveInstruction(String(e));
								}}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Finish
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Consumable;
