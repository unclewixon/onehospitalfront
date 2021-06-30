/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';

import CreateTask from '../Modals/CreateTask';
import {
	itemRender,
	request,
	confirmAction,
	staffname,
} from '../../services/utilities';
import { allVitalItems, patientAPI } from '../../services/constants';
import TakeReading from '../Modals/TakeReading';
import { readingDone } from '../../actions/patient';
import warning from '../../assets/images/warning.png';
import GiveMedication from '../../components/Modals/GiveMedication';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';

const ClinicalTasks = () => {
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [tasks, setTasks] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [taskItem, setTaskItem] = useState(null);
	const [showMedication, setShowMedication] = useState(false);

	const patient = useSelector(state => state.user.patient);
	const done = useSelector(state => state.patient.reading_done);

	const dispatch = useDispatch();

	useEffect(() => {
		async function doLoadTasks() {
			const rs = await getTasks();
			const { result, ...paginate } = rs;
			setMeta(paginate);
			setTasks(result);
			setLoaded(true);
		}

		if (done) {
			doLoadTasks();
			dispatch(readingDone(null));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, done]);

	useEffect(() => {
		async function doLoadTasks() {
			const rs = await getTasks();
			const { result, ...paginate } = rs;
			setMeta(paginate);
			setTasks(result);
			setLoaded(true);
		}
		if (!loaded) {
			doLoadTasks();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded]);

	const getTasks = async page => {
		const url = `${patientAPI}/admissions/tasks?patient_id=${
			patient.id
		}&page=${page || 1}&limit=12`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const deleteTask = async data => {
		try {
			const url = `${patientAPI}/admissions/tasks/${data.id}/delete-task`;
			await request(url, 'DELETE', true);
			const arr = tasks.filter(tsk => tsk.id !== data.id);
			setTasks(arr);
			notifySuccess('clinical task canceled!');
		} catch (err) {
			console.log(err);
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = (e, data) => {
		e.preventDefault();
		confirmAction(deleteTask, data);
	};

	const createTask = () => {
		document.body.classList.add('modal-open');
		setShowTaskModal(true);
	};

	const takeReading = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTaskItem(item);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowTaskModal(false);
		setShowModal(false);
		setShowMedication(false);
		setTaskItem(null);
	};

	const onNavigatePage = async nextPage => {
		dispatch(startBlock());
		const rs = await getTasks(nextPage);
		const { result, ...paginate } = rs;
		setMeta(paginate);
		setTasks(result);
		dispatch(stopBlock());
	};

	const refreshTasks = async () => {
		const rs = await getTasks();
		const { result, ...paginate } = rs;
		setMeta(paginate);
		setTasks(result);
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
										onClick={onClose}>
										No
									</button>
									<button
										className="btn btn-primary"
										style={{ margin: '10px' }}
										onClick={onclick}>
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

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					<div>
						<form className="form-inline justify-content-sm-end">
							<select className="form-control form-control-sm rounded bright">
								<option value="">Filter by Type</option>
							</select>
						</form>
					</div>
					<a
						className="btn btn-sm btn-secondary text-white ml-3"
						onClick={() => createTask()}>
						Create Task
					</a>
				</div>
				<h6 className="element-header">Clinical Tasks</h6>
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						<table className="table table-bordered table-md table-v2 table-striped">
							<thead>
								<tr>
									<th>Task</th>
									<th>Set By</th>
									<th>Last Finding</th>
									<th>Set On</th>
									<th>Last time attended</th>
									<th>Next due date</th>
									<th>Task Count</th>
									<th>Fulfil Task</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{tasks.map((item, i) => {
									const lastReading =
										item.vitals.length > 0 ? item.vitals[0] : null;
									const vital = allVitalItems.find(v => v.name === item.task);
									return (
										<tr key={i}>
											<td>{item.title}</td>
											<td>{item.createdBy}</td>
											<td>
												{lastReading
													? `${Object.values(lastReading.reading)[0]} `
													: '- '}
												{lastReading && vital ? vital.unit : ''}
											</td>
											<td>
												{moment(item.createdAt).format('DD-MMM-YYYY HH:mm A')}
											</td>
											<td>
												{lastReading
													? moment(lastReading.createdAt).fromNow(true)
													: '-'}{' '}
												{lastReading
													? `by ${staffname(item?.staff?.details)}`
													: ''}
											</td>
											<td>
												{item.nextTime &&
													item.nextTime !== '' &&
													item.nextTime !== 'Invalid date' &&
													item.taskCount > item.tasksCompleted &&
													moment().isAfter(item.nextTime) && (
														<Tooltip title="Task Expired">
															<div className="warning-task">
																<img src={warning} alt="" />
															</div>
														</Tooltip>
													)}
												<span>
													{item.nextTime &&
													item.nextTime !== '' &&
													item.nextTime !== 'Invalid date' &&
													item.taskCount > item.tasksCompleted
														? moment(item.nextTime).fromNow()
														: '-'}
												</span>
											</td>
											<td>{`${item.tasksCompleted}/${item.taskCount}`}</td>
											<td className="row-actions">
												{item.taskCount > item.tasksCompleted &&
													(item.taskType === 'vitals' ? (
														<a
															className="btn btn-primary btn-sm text-white text-uppercase"
															onClick={() => takeReading(item)}>
															Take Reading
														</a>
													) : (
														<a
															className="btn btn-primary btn-sm text-white text-uppercase"
															onClick={() => recordMedication(item)}>
															Take Reading
														</a>
													))}
											</td>
											<td className="row-actions text-center">
												<Tooltip title="Cancel Clinical Task">
													<a
														className="danger"
														onClick={e => confirmDelete(e, item)}>
														<i className="os-icon os-icon-ui-15"></i>
													</a>
												</Tooltip>
											</td>
										</tr>
									);
								})}
								{tasks.length === 0 && loaded && (
									<tr>
										<td colSpan="9" className="text-center">
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
								showTotal={total => `Total ${total} lab results`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
			</div>
			{showTaskModal && (
				<CreateTask
					closeModal={closeModal}
					refreshTasks={() => refreshTasks()}
				/>
			)}
			{showModal && <TakeReading closeModal={closeModal} taskItem={taskItem} />}
			{showMedication && (
				<GiveMedication closeModal={closeModal} taskItem={taskItem} />
			)}
		</div>
	);
};

export default ClinicalTasks;
