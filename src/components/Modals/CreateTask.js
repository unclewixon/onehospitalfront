/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import Tooltip from 'antd/lib/tooltip';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';
import { admissionAPI, vitalItems } from '../../services/constants';
import { formatDate, request } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import CreateRegimenTask from './CreateRegimenTask';

const allOptions = [
	{ label: 'minutes', value: 'minutes' },
	{ label: 'hours', value: 'hours' },
	{ label: 'days', value: 'days' },
	{ label: 'weeks', value: 'weeks' },
	{ label: 'months', value: 'months' },
];

const CreateTask = ({ closeModal, refreshTasks }) => {
	const [submitting, setSubmitting] = useState(false);
	const [options, setOptions] = useState([]);
	const [clinicalTasks, setClinicalTasks] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const setTask = type => {
		const q = clinicalTasks.find(t => t.name === type);
		if (!q) {
			setClinicalTasks([
				...clinicalTasks,
				{
					name: type,
					title: type,
					interval: '',
					intervalType: '',
					taskCount: '',
					startTime: '',
				},
			]);
		} else {
			removeTask(type);
		}
	};

	const setMedicalTask = tasks => {
		let medications = [];
		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
			medications = [
				...medications,
				{ name: `regimen-${i + 1}`, title: 'Medication', ...task },
			];
		}
		const allTasks = [...clinicalTasks, ...medications];
		setClinicalTasks([...allTasks]);
	};

	const removeTask = type => {
		const q = clinicalTasks.find(t => t.name === type);
		if (q) {
			setClinicalTasks([...clinicalTasks.filter(t => t.name !== type)]);
		}
	};

	const update = (allTasks, task, type, value) => {
		const item = allTasks.find(d => d.name === task);
		if (item) {
			const idx = allTasks.findIndex(d => d.name === task);
			const updateTasks = [
				...allTasks.slice(0, idx),
				{ ...item, [type]: value },
				...allTasks.slice(idx + 1),
			];

			return updateTasks;
		}

		return [];
	};

	const onChange = (e, type, task, hasData) => {
		const value = hasData ? e.value : e.target.value;
		const allTasks = update(clinicalTasks, task, type, value);
		setClinicalTasks([...allTasks]);
	};

	const onChangeDate = (e, type, task) => {
		const allTasks = update(clinicalTasks, task, type, e);
		setClinicalTasks([...allTasks]);
	};

	const save = async () => {
		try {
			const checkEmpty = clinicalTasks.find(
				c =>
					c.title !== 'Medication' &&
					(c.interval === '' ||
						c.intervalType === '' ||
						c.taskCount === '' ||
						c.startTime === '')
			);
			if (checkEmpty && checkEmpty.length > 0) {
				notifyError('Error, empty fields found!');
				return;
			}

			const regimens = clinicalTasks
				.filter(c => c.title === 'Medication' && c.requestPharmacy === 1)
				.map((item, i) => ({
					id: i + 1,
					generic: item.generic,
					drug: item.drug,
					dose_quantity: item.dose,
					refills: 0,
					frequency: item.frequency.replace(/\D+/g, ''),
					frequencyType: item.duration !== '' ? 'daily' : 'hourly',
					duration: item.taskCount,
					requestPharmacy: item.requestPharmacy,
				}));

			const prescription = {
				requestType: 'drugs',
				items: regimens,
				patient_id: patient.id,
			};

			dispatch(startBlock());
			setSubmitting(true);
			const data = { tasks: clinicalTasks, prescription };
			const url = `${admissionAPI}/create-task/${patient.id}`;
			await request(url, 'POST', true, data);
			refreshTasks();
			notifySuccess('clinical tasks created!');
			setSubmitting(false);
			dispatch(stopBlock());
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error while trying to create clinical task');
			dispatch(stopBlock());
		}
	};

	const createMedication = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeCreateRegimen = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content text-center">
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Create Task</h4>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<div className="element-box-tp mb-3">
										<div className="el-buttons-list">
											{[...vitalItems, 'Medication', 'Fluid Chart'].map(
												(vital, i) => {
													const item = clinicalTasks.find(
														t => t.name === vital
													);
													return (
														<a
															className={`btn btn-white btn-sm mr-2 ${
																item ? 'toggled' : ''
															}`}
															key={i}
															onClick={() =>
																vital === 'Medication'
																	? createMedication()
																	: setTask(vital)
															}
														>
															<i className="os-icon os-icon-delivery-box-2" />
															<span>{vital}</span>
														</a>
													);
												}
											)}
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-4">
									<table className="table table-bordered table-sm table-v2 table-striped">
										<tbody>
											{clinicalTasks.map((item, i) => {
												const hourly = ` for ${item.taskCount} ${
													item.duration !== '' ? item.duration : 'times'
												}`;
												return item.title === 'Medication' ? (
													<tr key={i}>
														<td>{item.title}</td>
														<td colSpan="3">
															<label className="alert m-0">{`${item.dose}dose of ${item.drug.name} ${item.frequency}${hourly}`}</label>
															{item.requestPharmacy === 1 && (
																<span className="badge">
																	<i className="os-icon os-icon-alert-circle"></i>{' '}
																	request from pharmacy
																</span>
															)}
														</td>
														<td>
															<label className="alert m-0">
																Start Time:{' '}
																{formatDate(
																	item.startTime,
																	'DD-MMM-YYYY h:mm a'
																)}
															</label>
														</td>
														<td className="row-actions">
															<Tooltip title="Remove Task">
																<a
																	className="danger"
																	onClick={() => removeTask(item.name)}
																>
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
														</td>
													</tr>
												) : (
													<tr key={i}>
														<td>{item.title}</td>
														<td>
															<label>Every</label>
															<input
																className="form-control"
																placeholder="e.g: 3"
																name="interval"
																value={item.interval || ''}
																onChange={e => {
																	onChange(e, 'interval', item.name);
																}}
															/>
														</td>
														<td style={{ width: '180px' }}>
															<label>Interval</label>
															<Select
																name="intervalType"
																options={allOptions}
																value={options[i] || ''}
																onChange={e => {
																	setOptions([
																		...options.filter((o, j) => i !== j),
																		e,
																	]);
																	onChange(e, 'intervalType', item.name, true);
																}}
															/>
														</td>
														<td>
															<label>Task Count</label>
															<input
																className="form-control"
																placeholder="e.g: 4"
																name="taskCount"
																value={item.taskCount || ''}
																onChange={e => {
																	onChange(e, 'taskCount', item.name);
																}}
															/>
														</td>
														<td>
															<label>Start Time</label>
															<DatePicker
																selected={item.startTime}
																onChange={date =>
																	onChangeDate(date, 'startTime', item.name)
																}
																peekNextMonth
																showMonthDropdown
																showYearDropdown
																showTimeSelect
																dropdownMode="select"
																dateFormat="dd-MM-yyyy HH:mm"
																className="single-daterange form-control"
																placeholderText="Select start time"
																minDate={new Date()}
																name="startTime"
															/>
														</td>
														<td className="row-actions">
															<Tooltip title="Remove Task">
																<a
																	className="danger"
																	onClick={() => removeTask(item.name)}
																>
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div className="col-md-12 mt-4">
									{clinicalTasks.length > 0 && (
										<button
											onClick={() => save()}
											className="btn btn-primary"
											disabled={submitting}
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									)}
									<button
										onClick={() => closeModal()}
										className="btn btn-secondary ml-3"
										disabled={submitting}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<CreateRegimenTask
					closeModal={closeCreateRegimen}
					setMedicalTask={setMedicalTask}
				/>
			)}
		</div>
	);
};

export default CreateTask;
