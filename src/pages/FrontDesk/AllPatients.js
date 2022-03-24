/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';

import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	request,
	formatPatientId,
	itemRender,
	formatCurrency,
	patientname,
	formatDate,
	updateImmutable,
	confirmAction,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { toggleProfile } from '../../actions/user';
// import { hmoAPI } from '../../services/constants';
import TableLoading from '../../components/TableLoading';
import waiting from '../../assets/images/waiting.gif';
import { messageService } from '../../services/message';
import Admitted from '../../components/Admitted';
import NicuAdmitted from '../../components/NicuAdmitted';

const { RangePicker } = DatePicker;

const pageLimit = 12;
const statuses = [
	{ label: 'All', value: '' },
	{ label: 'Enabled', value: 1 },
	{ label: 'Disabled', value: 0 },
];

const AllPatients = () => {
	const [loaded, setLoaded] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: pageLimit,
		totalPages: 0,
	});
	const [searchValue, setSearchValue] = useState('');
	const [status, setStatus] = useState('');
	const [patients, setPatients] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [hmo, setHmo] = useState('');
	// const [hmos, setHmos] = useState([]);

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const fetchPatients = useCallback(
		async (page, q) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const search = q || '';
				const url = `patient/list?page=${p}&limit=${pageLimit}&q=${search}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setPatients(result);
				setLoaded(true);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('error fetching patients');
				setLoaded(true);
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, endDate, hmo, startDate, status]
	);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'new-patient') {
				setPatients([data, ...patients]);
			} else if (type === 'update-patient') {
				const newPatients = updateImmutable(patients, data);
				setPatients(newPatients);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const onNavigatePage = async nextPage => {
		await fetchPatients(nextPage, searchValue);
	};

	const doFilter = e => {
		if (e) e.preventDefault();
		setFiltering(true);
		fetchPatients(1, searchValue);
	};

	useEffect(() => {
		if (!loaded) {
			fetchPatients();
			setLoaded(true);
		}
	}, [fetchPatients, loaded]);

	const confirmEnable = data => {
		confirmAction(
			enable,
			data,
			'You want to enable this patient profile?',
			'Are you sure?'
		);
	};

	const enable = async id => {
		try {
			dispatch(startBlock());
			const url = `patient/${id}/enable`;
			const rs = await request(url, 'POST', true);
			dispatch(stopBlock());
			if (rs.success) {
				const patient = rs.patient;
				const newPatients = updateImmutable(patients, {
					id: patient.id,
					is_active: patient.is_active,
				});
				setPatients(newPatients);
			} else {
				notifyError(rs.message || 'could not enable patient');
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError(e.message || 'could not enable patient');
		}
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-3">
						<label>From - To</label>
						<RangePicker onChange={e => dateChange(e)} />
					</div>
					<div className="form-group col-md-3">
						<label className="mr-2 " htmlFor="id">
							Search
						</label>
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							onChange={e => setSearchValue(e.target.value)}
							placeholder="search for patient: emr id, name, phone number, email"
						/>
					</div>
					<div className="form-group col-md-3">
						<label className="mr-2" htmlFor="id">
							Status
						</label>
						<select
							style={{ height: '32px' }}
							id="status"
							className="form-control"
							name="status"
							onChange={e => setStatus(e.target.value)}
						>
							{statuses.map((status, i) => {
								return (
									<option key={i} value={status.value}>
										{status.label}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group col mt-4">
						<div
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							onClick={doFilter}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</div>
					</div>
				</form>
			</div>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date Registered</th>
										<th>Patient Name</th>
										<th>Patient ID</th>
										<th>Phone Number</th>
										<th>Scheme</th>
										<th>Balance</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{patients.map((data, i) => {
										return (
											<tr key={i}>
												<td>
													{formatDate(data.createdAt, 'D-MMM-YYYY h:mma')}
												</td>
												<td>
													{patientname(data)}{' '}
													{data.admission && (
														<Tooltip
															title={<Admitted room={data?.admission?.room} />}
														>
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
													{data.nicu_id && (
														<Tooltip
															title={<NicuAdmitted room={data?.nicu?.room} />}
														>
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
													{data.is_out_patient && (
														<span className="badge badge-secondary">OPD</span>
													)}
												</td>
												<td>{formatPatientId(data)}</td>
												<td>{data.phone_number || '--'}</td>
												<td>{data.hmo.name}</td>
												<td>{formatCurrency(data.outstanding || 0)}</td>
												<td className="row-actions">
													{!data.is_out_patient && data.is_active && (
														<Tooltip title="View Patient">
															<a onClick={() => showProfile(data)}>
																<i className="os-icon os-icon-user-male-circle2" />
															</a>
														</Tooltip>
													)}
													{(user.role.slug === 'it-admin' ||
														(user.role.slug === 'doctor' &&
															user.username === 'sunday.onuh')) &&
														!data.is_active && (
															<>
																<Tooltip title="Enable Patient">
																	<a onClick={() => confirmEnable(data.id)}>
																		<i className="os-icon os-icon-check-circle text-danger" />
																	</a>
																</Tooltip>
																<Tooltip title="View Patient">
																	<a onClick={() => showProfile(data)}>
																		<i className="os-icon os-icon-user-male-circle2" />
																	</a>
																</Tooltip>
															</>
														)}
												</td>
											</tr>
										);
									})}
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
		</>
	);
};

export default AllPatients;
