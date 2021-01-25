/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { toggleProfile } from '../../actions/user';
import { loadPatients } from '../../actions/patient';

const AllPatients = () => {
	const [loaded, setLoaded] = useState(false);
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

	const fetchPatients = useCallback(async () => {
		try {
			const url = 'patient/list';
			const rs = await request(url, 'GET', true);
			dispatch(loadPatients(rs));
			setLoaded(true);
		} catch (error) {
			notifyError('error fetching patients');
			setLoaded(true);
		}
	}, [dispatch]);

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
		fetchPatients();
	}, [fetchPatients]);

	return (
		<>
			<div className="element-box">
				<div className="table-responsive">
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
											<td>{`${data?.surname} ${data?.other_names}`}</td>
											<td>{data?.fileNumber}</td>
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
				</div>
			</div>
		</>
	);
};

export default withRouter(AllPatients);
