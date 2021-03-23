/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, formatPatientId, itemRender } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { toggleProfile } from '../../actions/user';
import { loadPatients } from '../../actions/patient';

const AllPatients = () => {
	const [loaded, setLoaded] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState(null);
	const [patient, setPatient] = useState('');
	// const [searchValue, setSearchValue] = useState('');

	const dispatch = useDispatch();

	// const handleInputChange = e => {
	// 	setSearchValue(e.target.value);
	// };

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const patients = useSelector(state => state.patient.patients);

	const fetchPatients = async page => {
		try {
			const p = page || 1;
			const url = `patient/list?page=${p}&limit=24&patient_id=${patient ||
				''}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const arr = [...result];
			console.log(arr);
			dispatch(loadPatients(arr));
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

	// const searchEntries = async e => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = `patient/find?q=${searchValue}`;
	// 		const data = await request(url, 'GET', true);
	// 		console.log(data);
	// 		setAllPatients(data);
	// 	} catch (error) {
	// 		notifyError(`error fetching patients ${error}`);
	// 		setLoaded(false);
	// 	}
	// };

	useEffect(() => {
		const fetch = async () => {
			try {
				const p = 1;
				const url = `patient/list?page=${p}&limit=24`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				const arr = [...result];
				dispatch(loadPatients(arr));
				setLoaded(true);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('error fetching patients');
				setLoaded(true);
				dispatch(stopBlock());
			}
		};

		if (!loaded || patient === '') {
			fetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded, patient]);
	return (
		<>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>
									<div className="th-inner "></div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">
										Patient here Name
									</div>
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
									<div className="th-inner sortable both">Date of Birth</div>
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
							{!loaded ? (
								<tr>
									<td colSpan="6" className="text-center">
										<img alt="searching" src={searchingGIF} />
									</td>
								</tr>
							) : (
								patients.map((data, i) => {
									return (
										<tr className="" key={i}>
											<td>{i + 1}</td>
											<td>{`${data?.other_names} ${data?.surname}`}</td>
											<td>{formatPatientId(data?.id)}</td>
											<td>{data?.phoneNumber}</td>
											<td>
												{moment(data?.date_of_birth).format('DD-MMM-YYYY')}
											</td>
											<td>{data?.hmo?.name}</td>
											<td></td>
											<td className="row-actions text-right">
												<Tooltip title="View Request">
													<a onClick={() => showProfile(data)}>
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
											</td>
										</tr>
									);
								})
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
				</div>
			</div>
		</>
	);
};

export default withRouter(AllPatients);
