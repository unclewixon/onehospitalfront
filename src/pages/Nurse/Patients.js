/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { withRouter } from 'react-router-dom';

import { notifyError } from '../../services/notify';
import {
	request,
	patientname,
	itemRender,
	formatDate,
	updateImmutable,
} from '../../services/utilities';
import AssignBed from './AssignBed';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { searchAPI } from '../../services/constants';
import { toggleProfile } from '../../actions/user';
import TableLoading from '../../components/TableLoading';
import ProfilePopup from '../../components/Patient/ProfilePopup';
import { staffname } from '../../services/utilities';
import { messageService } from '../../services/message';

const { RangePicker } = DatePicker;

const limit = 12;

const Patients = ({ location, filter }) => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: limit,
		totalPages: 0,
	});
	const [patient, setPatient] = useState('');
	const [activePage, setActivePage] = useState('');

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	const fetchPatients = useCallback(
		async (page, patientId, sDate, eDate) => {
			try {
				const p = page || 1;
				const pid = patientId || '';
				const sd = sDate || '';
				const ed = eDate || '';
				const status = filter === 'discharged' ? 1 : 0;
				const url = `patient/admissions?page=${p}&limit=${limit}&patient_id=${pid}&startDate=${sd}&endDate=${ed}&status=${status}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setAdmittedPatients([...result]);
				setFiltering(false);
				setLoading(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				setLoading(false);
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, filter]
	);

	useEffect(() => {
		if (loading) {
			dispatch(startBlock());
			fetchPatients();
		}

		if (page !== activePage) {
			setActivePage(page);
		}
	}, [loading, fetchPatients, dispatch, page, activePage]);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, admission } = message.text;
			if (type === 'admission-discharge') {
				const update = updateImmutable(admittedPatients, admission);
				setAdmittedPatients(update);
			} else if (type === 'admission-finish-discharge') {
				const update = updateImmutable(admittedPatients, admission);
				setAdmittedPatients(update);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchPatients(1, patient, startDate, endDate);
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchPatients(nextPage, patient, startDate, endDate);
	};

	const showProfile = patient => {
		if (patient.is_active) {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
		}
	};

	const showAdmission = (patient, admission) => {
		const info = {
			patient: { ...patient, admission },
			type: 'admission',
			item: admission,
		};
		dispatch(toggleProfile(true, info));
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const assignBed = item => {
		document.body.classList.add('modal-open');
		setSelected(item);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelected(null);
		document.body.classList.remove('modal-open');
	};

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="element-box m-0 mb-4 p-3">
					<div className="col-md-12">
						<form className="row">
							<div className="form-group col-md-3">
								<label htmlFor="patient_id">Patient</label>
								<AsyncSelect
									isClearable
									getOptionValue={getOptionValues}
									getOptionLabel={getOptionLabels}
									defaultOptions
									name="patient_id"
									id="patient_id"
									loadOptions={getOptions}
									onChange={e => {
										console.log(e);
										setPatient(e?.id);
									}}
									placeholder="Search patients"
								/>
							</div>
							<div className="form-group col-md-3">
								<label>Admitted Between - To</label>
								<RangePicker onChange={e => dateChange(e)} />
							</div>
							<div className="form-group col-md-3 mt-4">
								<div
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={e => doFilter(e)}
								>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
										)}
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="element-box m-0 mb-4 p-3">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Patient Name</th>
											<th>Reason</th>
											<th>Date of Admission</th>
											<th>Admitted By</th>
											<th>Room/Floor</th>
											{activePage === 'discharged' && <th>Date Discharged</th>}
											{activePage === 'discharged' && <th>Discharged By</th>}
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{admittedPatients.map((item, i) => {
											return (
												<tr key={i}>
													<td>
														<p className="item-title text-color m-0">
															<Tooltip
																title={<ProfilePopup patient={item.patient} />}
															>
																<a
																	className="cursor"
																	onClick={() =>
																		showProfile({
																			...item.patient,
																			admission: item,
																		})
																	}
																>
																	{patientname(item.patient, true)}
																</a>
															</Tooltip>
														</p>
													</td>
													<td>{item.reason}</td>
													<td>
														{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm A')}
													</td>
													<td>{staffname(item.admitted_by)}</td>
													<td>
														{item.room
															? `Room ${item.room.name} / ${item.room.floor}`
															: '--'}
													</td>
													{activePage === 'discharged' && (
														<td>
															{formatDate(
																item.date_discharged,
																'DD-MMM-YYYY h:mm A'
															)}
														</td>
													)}
													{activePage === 'discharged' && (
														<td>{staffname(item.dischargedBy)}</td>
													)}
													<td>
														{item.status === 0 ? (
															<span
																className={`badge badge-${
																	item.start_discharge ? 'warning' : 'secondary'
																}`}
															>
																{item.start_discharge ? 'Discharging' : 'Open'}
															</span>
														) : (
															<span className="badge badge-success">
																Discharged
															</span>
														)}
													</td>
													<td nowrap="nowrap" className="row-actions">
														{!item.start_discharge &&
															!item.room &&
															user &&
															(user.role.slug === 'nurse' ||
																user.role.slug === 'it-admin') &&
															item.status === 0 && (
																<Tooltip title="Assign Bed">
																	<a
																		onClick={() => assignBed(item)}
																		className="primary"
																	>
																		<i className="fa fa-bed" />
																	</a>
																</Tooltip>
															)}
														<Tooltip title="Admission">
															<a
																onClick={() =>
																	showAdmission(item.patient, item)
																}
															>
																<i className="os-icon os-icon-user-male-circle2" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{admittedPatients.length === 0 && (
											<tr>
												<td colSpan="7" className="text-center">
													No result found
												</td>
											</tr>
										)}
									</tbody>
								</table>

								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} patients`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
				{selected && showModal && (
					<AssignBed
						item={selected}
						patients={admittedPatients}
						updatePatient={patients => setAdmittedPatients(patients)}
						closeModal={() => closeModal()}
					/>
				)}
			</div>
		</div>
	);
};

export default withRouter(Patients);
