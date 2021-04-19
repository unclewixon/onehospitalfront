/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';

import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	request,
	formatPatientId,
	itemRender,
	formatCurrency,
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
	const [patients, setPatients] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [status, setStatus] = useState('');

	const dispatch = useDispatch();

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

	const fetchPatients = async (page, q) => {
		try {
			const p = page || 1;
			const url = `patient/list?page=${p}&limit=${pageLimit}&q=${q ||
				''}&startDate=${startDate}&endDate=${endDate}&status=${status}`;
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
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchPatients(nextPage);
	};

	const doFilter = e => {
		if (e) e.preventDefault();
		setFiltering(true);
		fetchPatients(1, searchValue);
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const p = 1;
				const url = `patient/list?page=${p}&limit=${pageLimit}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				setPatients(result);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('error fetching patients');
				setLoaded(true);
				dispatch(stopBlock());
			}
		};

		if (!loaded) {
			fetch();
		}
	}, [dispatch, loaded]);

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
						<label className="mr-2 " htmlFor="id">
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
										<th>
											<div className="th-inner "></div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">Patient Name</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">Patient ID</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">Phone Number</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">
												Date of Birth
											</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">HMO</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner sortable both">Balance</div>
											<div className="fht-cell"></div>
										</th>
										<th>
											<div className="th-inner "></div>
											<div className="fht-cell"></div>
										</th>
									</tr>
								</thead>
								<tbody>
									{patients.map((data, i) => {
										return (
											<tr className="" key={i}>
												<td>{i + 1}</td>
												<td>{`${data?.other_names} ${data?.surname}`}</td>
												<td>{`${formatPatientId(
													data?.id
												)} [${data.folderNumber || '-'}]`}</td>
												<td>{data?.phoneNumber}</td>
												<td>
													{moment(data?.date_of_birth).format('DD-MMM-YYYY')}
												</td>
												<td>{data?.hmo?.name}</td>
												<td>{formatCurrency(data.wallet || 0)}</td>
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

export default withRouter(AllPatients);