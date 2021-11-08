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
	CK_CONSUMABLE,
	CK_COMPLAINTS,
	CK_REVIEW_OF_SYSTEMS,
	CK_HX_FORMS,
	CK_PAST_HISTORY,
	CK_ALLERGIES,
	CK_PAST_ALLERGIES,
	CK_PHYSICAL_EXAM,
	CK_INVESTIGATIONS,
	CK_INVESTIGATION_LAB,
	CK_INVESTIGATION_SCAN,
	CK_INVESTIGATION_REGIMEN,
	CK_INVESTIGATION_PROCEDURE,
	CK_ITEM_OTHERS,
	CK_TREATMENT_PLAN,
	CK_DIAGNOSIS,
	CK_PAST_DIAGNOSIS,
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
	const [quantity, setQuantity] = useState('');
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);
	const [others, setOthers] = useState(null);

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
			storage.setLocalStorage(CK_CONSUMABLE, data);

			dispatch(
				updateEncounterData({
					...encounter,
					instruction: data,
				})
			);
		},
		[dispatch, encounter]
	);

	const saveOthers = useCallback(
		data => {
			setOthers(data);
			setSelectedConsumables(data.consumables || []);
			setRequestNote(data.requestNote || '');
			if (data.date && data.date !== '') {
				setAppointmentDate(new Date(moment(data.date)));
			}
			setAppointmentReason(data.reason || '');

			storage.setLocalStorage(CK_ITEM_OTHERS, data);

			const consumables = {
				patient_id: patient.id,
				items: data.consumables || [],
				request_note: data.requestNote || '',
			};

			const nextAppointment = {
				appointment_date:
					data.date && data.date !== '' ? new Date(moment(data.date)) : '',
				description: data.reason || '',
			};

			dispatch(
				updateEncounterData({
					...encounter,
					consumables,
					nextAppointment,
				})
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
		const data = await storage.getItem(CK_CONSUMABLE);
		saveInstruction(data || encounter.instruction);

		const datum = await storage.getItem(CK_ITEM_OTHERS);
		if (datum) {
			saveOthers(datum);
		}
	}, [encounter, saveOthers, saveInstruction]);

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
				setItem(null);
				setQuantity('');

				const data = { ...others, consumables: i };
				saveOthers(data);
			}
		} else {
			notifyError('Error, please select item or enter quantity');
		}
	};

	const onTrash = (index, type) => {
		const items = selectedConsumables.filter((test, i) => index !== i);
		setSelectedConsumables(items);
		const data = { ...others, consumables: items };
		saveOthers(data);
	};

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
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
				consumables,
				nextAppointment,
			};
			dispatch(updateEncounterData(encounterData));

			const url = `${consultationAPI}${patient.id}/save?appointment_id=${appointment_id}`;
			const rs = await request(url, 'POST', true, encounterData);
			if (rs && rs.success) {
				dispatch(stopBlock());
				updateAppointment(rs.appointment);
				notifySuccess('Consultation completed successfully');
				dispatch(resetEncounterData(defaultEncounter));

				storage.removeItem(CK_COMPLAINTS);
				storage.removeItem(CK_REVIEW_OF_SYSTEMS);
				storage.removeItem(CK_HX_FORMS);
				storage.removeItem(CK_PAST_HISTORY);
				storage.removeItem(CK_ALLERGIES);
				storage.removeItem(CK_PAST_ALLERGIES);
				storage.removeItem(CK_PHYSICAL_EXAM);
				storage.removeItem(CK_INVESTIGATIONS);
				storage.removeItem(CK_INVESTIGATION_LAB);
				storage.removeItem(CK_INVESTIGATION_SCAN);
				storage.removeItem(CK_INVESTIGATION_REGIMEN);
				storage.removeItem(CK_INVESTIGATION_PROCEDURE);
				storage.removeItem(CK_TREATMENT_PLAN);
				storage.removeItem(CK_CONSUMABLE);
				storage.removeItem(CK_ITEM_OTHERS);
				storage.removeItem(CK_DIAGNOSIS);
				storage.removeItem(CK_PAST_DIAGNOSIS);

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
				const data = { ...others, date };
				saveOthers(data);
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
								const data = { ...others, requestNote: e.target.value };
								saveOthers(data);
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
									const data = { ...others, reason: e.target.value };
									saveOthers(data);
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
