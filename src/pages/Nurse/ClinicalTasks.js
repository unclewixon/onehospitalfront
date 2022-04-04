/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';

import { notifySuccess, notifyError } from '../../services/notify';
import {
	itemRender,
	request,
	confirmAction,
	patientname,
	formatDate,
} from '../../services/utilities';
import { patientAPI, allVitalItems } from '../../services/constants';
import TakeReading from '../../components/Modals/TakeReading';
import { readingDone } from '../../actions/patient';
import warning from '../../assets/images/warning.png';
import GiveMedication from '../../components/Modals/GiveMedication';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { toggleProfile } from '../../actions/user';
import CreateChart from '../../components/Patient/Modals/CreateChart';
import Admitted from '../../components/Admitted';
import NicuAdmitted from '../../components/NicuAdmitted';

const ClinicalTasks = () => {
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [tasks, setTasks] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showMedication, setShowMedication] = useState(false);
	const [taskItem, setTaskItem] = useState(null);
	const [showChartModal, setShowChartModal] = useState(false);

	const done = useSelector(state => state.patient.reading_done);

	const dispatch = useDispatch();

	const getTasks = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const url = `${patientAPI}/admissions/tasks?page=${page || 1}&limit=12`;
				const rs = await request(url, 'GET', true);
				const { result, ...paginate } = rs;
				setMeta(paginate);
				setTasks(result);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('could not fetch tasks');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			getTasks();
			setLoaded(true);
		}

		if (done) {
			getTasks();
			dispatch(readingDone(null));
		}
	}, [dispatch, done, getTasks, loaded]);

	const deleteTask = async data => {
		try {
			const url = `${patientAPI}/admissions/tasks/${data.id}/delete-task`;
			await request(url, 'DELETE', true);
			const arr = tasks.filter(tsk => tsk.id !== data.id);
			setTasks(arr);
			notifySuccess(`clinical task canceled!`);
		} catch (err) {
			console.log(err);
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = (e, data) => {
		e.preventDefault();
		confirmAction(deleteTask, data);
	};

	const onNavigatePage = async nextPage => {
		await getTasks(nextPage);
	};

	const takeReading = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTaskItem(item);
	};

	const recordFluid = item => {
		console.log(item);
		document.body.classList.add('modal-open');
		setShowChartModal(true);
		setTaskItem(item);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowMedication(false);
		setShowChartModal(false);
		setTaskItem(null);
	};

	const recordMedication = item => {
		if (
			item.request_status === null ||
			(item.request_status !== null && item.request_status === 1)
		) {
			document.body.classList.add('modal-open');
			setTaskItem(item);
			setShowMedication(true);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const onclick = async () => {
						document.body.classList.add('modal-open');
						setTaskItem(item);
						setShowMedication(true);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Medication</h3>
							<p>
								This medication has not been filled by the pharmacy. Do you want
								to continue?
							</p>
							<div>
								<div>
									<button
										className="btn btn-danger"
										style={{ margin: '10px' }}
										onClick={onClose}
									>
										No
									</button>
									<button
										className="btn btn-primary"
										style={{ margin: '10px' }}
										onClick={onclick}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					);
				},
			});
		}
	};

	const showProfile = patient => {
		if (patient && patient.is_active) {
			const info = { patient, type: 'patient' };
			dispatch(toggleProfile(true, info));
		}
	};

	return (
		<div className="element-wrapper">
			<h6 className="element-header">Clinical Tasks</h6>
			<div className="element-box p-3 m-0 mt-3">
				<div className="table table-responsive">
					<table id="table" className="table table-theme v-middle table-hover">
						<thead>
							<tr>
								<th>Patient</th>
								<th>Bed/Ward</th>
								<th>Task</th>
								<th>Set On</th>
								<th>Last Read</th>
								<th>Next Due</th>
								<th>Read Count</th>
								<th>Last Reading</th>
								<th>Take Reading</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((item, i) => {
								const lastReading =
									item.vitals.length > 0 ? item.vitals[0] : null;
								const vital = allVitalItems.find(v => v.name === item.task);
								const room = item.admission?.room;
								return (
									<tr key={i}>
										<td width="120px">
											<a onClick={() => showProfile(item.patient)}>
												{patientname(item.patient)}
											</a>{' '}
											{item.admission && (
												<Tooltip
													title={<Admitted room={item?.admission?.room} />}
												>
													<i className="fa fa-hospital-o text-danger" />
												</Tooltip>
											)}
											{item.patient.nicu_id && (
												<Tooltip
													title={<NicuAdmitted room={item?.nicu?.room} />}
												>
													<i className="fa fa-hospital-o text-danger" />
												</Tooltip>
											)}
										</td>
										<td>
											{room
												? `${room?.category?.name}, Room ${room?.name}`
												: '--'}
										</td>
										<td>{item.title}</td>
										<td style={{ width: '120px' }}>
											{formatDate(item.createdAt, 'DD-MMM-YYYY HH:mm A')}
										</td>
										<td>
											{lastReading ? (
												<>
													{lastReading.readingType === 'Fluid Chart'
														? `vol: ${Object.values(lastReading.reading)[1]}ml`
														: `${Object.values(lastReading.reading)[0]} ${
																vital ? vital.unit : ''
														  }`}
												</>
											) : (
												''
											)}
										</td>
										<td>
											{item.nextTime &&
												item.nextTime !== '' &&
												item.taskCount > item.tasksCompleted &&
												moment().isAfter(item.nextTime) && (
													<div className="warning-task">
														<img src={warning} alt="" />
													</div>
												)}
											<span>
												{item.nextTime &&
												item.nextTime !== '' &&
												item.taskCount > item.tasksCompleted
													? moment(item.nextTime).fromNow()
													: ''}
											</span>
										</td>
										<td>{`${item.tasksCompleted} / ${item.taskCount}`}</td>
										<td>
											{lastReading
												? moment(lastReading.createdAt).fromNow()
												: '-'}{' '}
											{lastReading ? `by ${lastReading.createdBy}` : ''}
										</td>
										<td className="row-actions">
											{item.taskCount > item.tasksCompleted && (
												<>
													{item.taskType === 'vitals' && (
														<a
															className="btn btn-primary btn-sm text-white text-uppercase"
															onClick={() => takeReading(item)}
														>
															Take Reading
														</a>
													)}
													{item.taskType === 'fluid' && (
														<a
															className="btn btn-primary btn-sm text-white text-uppercase"
															onClick={() => recordFluid(item)}
														>
															Take Reading
														</a>
													)}
													{item.taskType === 'regimen' && (
														<a
															className="btn btn-primary btn-sm text-white text-uppercase"
															onClick={() => recordMedication(item)}
														>
															Take Reading
														</a>
													)}
												</>
											)}
										</td>
										<td className="row-actions text-center">
											{item.taskCount > item.tasksCompleted && (
												<Tooltip title="Cancel Clinical Task">
													<a
														className="danger"
														onClick={e => confirmDelete(e, item)}
													>
														<i className="os-icon os-icon-ui-15"></i>
													</a>
												</Tooltip>
											)}
										</td>
									</tr>
								);
							})}
							{tasks.length === 0 && loaded && (
								<tr>
									<td colSpan="10" className="text-center">
										No tasks created
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} tasks`}
							itemRender={itemRender}
							onChange={current => onNavigatePage(current)}
							showSizeChanger={false}
						/>
					</div>
				)}
			</div>
			{showModal && <TakeReading closeModal={closeModal} taskItem={taskItem} />}
			{showMedication && (
				<GiveMedication closeModal={closeModal} taskItem={taskItem} />
			)}
			{showChartModal && (
				<CreateChart closeModal={closeModal} taskItem={taskItem} />
			)}
		</div>
	);
};

export default ClinicalTasks;
