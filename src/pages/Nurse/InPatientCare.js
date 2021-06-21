/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { notifyError } from '../../services/notify';
import { request, formatPatientId, itemRender } from '../../services/utilities';
import AssignBed from './AssignBed';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { searchAPI } from '../../services/constants';
import { toggleProfile } from '../../actions/user';
import TableLoading from '../../components/TableLoading';
import ProfilePopup from '../../components/Patient/ProfilePopup';

const { RangePicker } = DatePicker;

const limit = 24;

const InPatientCare = () => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(false);
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
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const fetchPatients = async page => {
		try {
			const p = page || 1;
			const url = `patient/admissions?page=${p}&limit=${limit}&patient_id=${patient ||
				''}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const arr = [...result];
			setAdmittedPatients(arr);
			setFiltering(false);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('error fetching patients');
			dispatch(stopBlock());
			setFiltering(false);
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const url = `patient/admissions?page=1&limit=${limit}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				const arr = [...result];
				setAdmittedPatients(arr);
				setLoaded(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				setLoaded(false);
				dispatch(stopBlock());
			}
		};

		if (!loaded || patient === '') {
			fetch();
		}
	}, [dispatch, loaded, patient]);

	useEffect(() => {}, [admittedPatients]);

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchPatients();
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchPatients(nextPage);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const showAdmission = (patient, admission) => {
		const info = { patient, type: 'admission', item: admission };
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
		<>
			<h6 className="element-header">Patients on Admission</h6>
			<div className="element-box m-0 p-3">
				<div className="col-md-12 p-4">
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
								onClick={e => doFilter(e)}>
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

				<div className="table-responsive">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>
											<div>Patient Name</div>
										</th>
										<th>
											<div>Reason</div>
										</th>
										<th>
											<div>Date of Admission</div>
										</th>
										<th>
											<div>Admitted By</div>
										</th>
										<th>
											<div>Room/Floor</div>
										</th>
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
															title={<ProfilePopup patient={item?.patient} />}>
															<a
																className="cursor"
																onClick={() => showProfile(item?.patient)}>
																{`${item?.patient_name} [${formatPatientId(
																	item?.patient_id
																)}]`}
															</a>
														</Tooltip>
													</p>
												</td>
												<td>{item?.reason}</td>
												<td>
													{moment(item?.admission_date).format(
														'DD-MMM-YYYY h:mm A'
													)}
												</td>
												<td>{item?.admitted_by}</td>
												<td>
													{item?.suite ? (
														<Tooltip title="Room/Floor">
															{`${item?.suite} / ${item?.floor}`}
														</Tooltip>
													) : (
														'-'
													)}
												</td>
												<td className="row-actions">
													{!item.suite && (
														<Tooltip title="Assign Bed">
															<a
																onClick={() => assignBed(item)}
																className="primary">
																<i className="fa fa-bed" />
															</a>
														</Tooltip>
													)}
													<Tooltip title="Admission">
														<a
															onClick={() => showAdmission(item.patient, item)}>
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
		</>
	);
};

export default InPatientCare;
