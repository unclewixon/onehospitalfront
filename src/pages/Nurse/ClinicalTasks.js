/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import { itemRender, request } from '../../services/utilities';
import { patientAPI, allVitalItems } from '../../services/constants';
import TakeReading from '../../components/Modals/TakeReading';
import { readingDone } from '../../actions/patient';
import warning from '../../assets/images/warning.png';
import GiveMedication from '../../components/Modals/GiveMedication';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { toggleProfile } from '../../actions/user';

const ClinicalTasks = () => {
	const [meta, setMeta] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showMedication, setShowMedication] = useState(false);
	const [taskItem, setTaskItem] = useState(null);

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
	}, [loaded]);

	const getTasks = async page => {
		const url = `${patientAPI}/admissions/tasks?page=${page || 1}&limit=12`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onNavigatePage = async nextPage => {
		startBlock();
		const rs = await getTasks(nextPage);
		const { result, ...paginate } = rs;
		setMeta(paginate);
		setTasks(result);
		stopBlock();
	};

	const takeReading = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTaskItem(item);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowMedication(false);
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

	const showProfile = patient => {
		if (patient) {
			const info = { patient, type: 'patient' };
			dispatch(toggleProfile(true, info));
		}
	};

	return (
		<>
			<h6 className="element-header">Clinical Tasks</h6>
			<div className="element-box p-3 m-0 mt-3">
				<div className="table table-responsive">
					<table id="table" className="table table-theme v-middle table-hover">
						<thead>
							<tr>
								<th>
									<div className="th-inner sortable both">Patient</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Bed/Ward</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Task</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Read Count</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Set On</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Last Read</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Next Due</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Count</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Take Reading</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner"></div>
									<div className="fht-cell"></div>
								</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((item, i) => {
								const lastReading =
									item.vitals.length > 0 ? item.vitals[0] : null;
								const vital = allVitalItems.find(v => v.name === item.task);
								return (
									<tr key={i}>
										<td>
											<a onClick={() => showProfile(item.patient)}>
												{item.patient_name}
											</a>
										</td>
										<td>{item.admission?.room?.name || '-'}</td>
										<td>{item.title}</td>
										<td>{item.tasksCompleted}</td>
										<td>
											{moment(item.createdAt).format('DD-MMM-YYYY HH:mm A')}
										</td>
										<td>
											{lastReading
												? `${Object.values(lastReading.reading)[0]} `
												: '- '}
											{lastReading && vital ? vital.unit : ''}
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
										<td>{item.taskCount}</td>
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
											<a className="danger">
												<i className="os-icon os-icon-ui-15"></i>
											</a>
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
						/>
					</div>
				)}
			</div>
			{showModal && <TakeReading closeModal={closeModal} taskItem={taskItem} />}
			{showMedication && (
				<GiveMedication closeModal={closeModal} taskItem={taskItem} />
			)}
		</>
	);
};

export default ClinicalTasks;
