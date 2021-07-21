/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { loadPatients } from '../../actions/patient';
import {
	request,
	formatPatientId,
	itemRender,
	formatCurrency,
	patientname,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { toggleProfile } from '../../actions/user';
import TableLoading from '../../components/TableLoading';
import waiting from '../../assets/images/waiting.gif';

const { RangePicker } = DatePicker;

const pageLimit = 24;
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

	const dispatch = useDispatch();

	const patients = useSelector(state => state.patient.patients);

	const dateChange = e => {
		let date = e.map(d => {
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
				const url = `patient/list?page=${p}&limit=${pageLimit}&q=${q ||
					''}&startDate=${startDate}&endDate=${endDate}&status=${status}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				dispatch(loadPatients(result));
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
		[dispatch, endDate, startDate, status]
	);

	const onNavigatePage = async nextPage => {
		await fetchPatients(nextPage);
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
							onChange={e => setStatus(e.target.value)}>
							{statuses.map((status, i) => {
								return (
									<option key={i} value={status.value}>
										{status.label}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group col-md-3 mt-4">
						<div
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							onClick={doFilter}>
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
										<th>Patient Name</th>
										<th>Patient ID</th>
										<th>Phone Number</th>
										<th>Date of Birth</th>
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
													{patientname(data)}{' '}
													{data.isAdmitted && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
												</td>
												<td>{formatPatientId(data)}</td>
												<td>{data.phone_number || '--'}</td>
												<td>
													{moment(data.date_of_birth).format('DD-MMM-YYYY')}
												</td>
												<td>{data.hmo.name}</td>
												<td>{formatCurrency(data.outstanding || 0)}</td>
												<td className="row-actions text-right">
													<Tooltip title="View Patient">
														<a onClick={() => showProfile(data)}>
															<i className="os-icon os-icon-user-male-circle2" />
														</a>
													</Tooltip>
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
