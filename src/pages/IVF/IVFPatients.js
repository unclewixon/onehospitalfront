/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { notifyError } from '../../services/notify';
import { request, itemRender, patientname } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { searchAPI } from '../../services/constants';
import { toggleProfile } from '../../actions/user';
import TableLoading from '../../components/TableLoading';
import ProfilePopup from '../../components/Patient/ProfilePopup';
import { staffname } from '../../services/utilities';

const { RangePicker } = DatePicker;

const limit = 12;

const IvfPatients = () => {
	const [ivfPatients, setIvfPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: limit,
		totalPages: 0,
	});
	const [patient, setPatient] = useState('');

	const dispatch = useDispatch();

	const fetchIvfPatients = useCallback(
		async (page, patientId, sDate, eDate) => {
			try {
				const p = page || 1;
				const url = `ivf?page=${p}&limit=${limit}&patient_id=${patientId ||
					''}&startDate=${sDate || ''}&endDate=${eDate || ''}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				const arr = [...result];
				setIvfPatients(arr);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (loading) {
			fetchIvfPatients();
			setLoading(false);
		}
	}, [loading, fetchIvfPatients]);

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
		fetchIvfPatients(1, patient, startDate, endDate);
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchIvfPatients(nextPage, patient, startDate, endDate);
	};

	const showProfile = patient => {
		if (patient.is_active) {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
		}
	};

	const openIVF = (patient, ivf) => {
		const info = { patient, type: 'ivf', item: ivf };
		dispatch(toggleProfile(true, info));
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	return (
		<>
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
										<th>ID</th>
										<th>Patient Name</th>
										<th>Date of Enrollment</th>
										<th>Enrolled By</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{ivfPatients.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.serial_code}</td>
												<td>
													<p className="item-title text-color m-0">
														<Tooltip
															title={<ProfilePopup patient={item.wife} />}>
															<a
																className="cursor"
																onClick={() => showProfile(item.wife)}>
																{patientname(item.wife, true)}
															</a>
														</Tooltip>
													</p>
												</td>
												<td>
													{moment(item.createdAt).format('DD-MMM-YYYY h:mm A')}
												</td>
												<td>{staffname(item.staff)}</td>
												<td>
													{item.status === 0 ? (
														<span className="badge badge-secondary">Open</span>
													) : (
														<span className="badge badge-success">Closed</span>
													)}
												</td>
												<td className="row-actions">
													<Tooltip title="Open IVF">
														<a onClick={() => openIVF(item.wife, item)}>
															<i className="os-icon os-icon-user-male-circle2" />
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})}
									{ivfPatients.length === 0 && (
										<tr>
											<td colSpan="7" className="text-center">
												No patients found
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
		</>
	);
};

export default IvfPatients;
