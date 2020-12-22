/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import AssignDropup from './AssignDropup';

import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';

const InPatientCare = () => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [visible, setVisible] = useState(true);
	// const [searchValue, setSearchValue] = useState('');

	// const handleInputChange = e => {
	// 	setSearchValue(e.target.value);
	// };

	const fetchAdmittedPatients = useCallback(async () => {
		try {
			const url = `patient/admissions`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			setAdmittedPatients(rs);
			setLoading(false);
		} catch (error) {
			notifyError('error fetching patients');
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchAdmittedPatients();
	}, [fetchAdmittedPatients]);

	useEffect(() => {
		console.log(admittedPatients);
	}, [admittedPatients]);

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<h6 className="element-header">Patients on Admission</h6>
			<div className="element-box px-0">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>
									<div className="th-inner sortable both">Patient Name</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">File Number</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Gender</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">
										Date of Admission
									</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Admitted By</div>
									<div className="fht-cell"></div>
								</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan="5" className="text-center">
										<img alt="searching" src={searchingGIF} />
									</td>
								</tr>
							) : (
								admittedPatients.map((item, i) => {
									return (
										<tr key={i}>
											<td>{`${item?.patient_name}`}</td>
											<td></td>
											<td></td>
											<td>
												{moment(item?.admission_date).format(
													'DD-MMM-YYYY h:mm A'
												)}
											</td>
											<td>{item?.admitted_by}</td>
											<td className="row-actions text-right">
												<div style={{ color: '#fff' }}>
													<a
														onClick={onModalClick}
														className="btn btn-primary btn-sm">
														<i className="icon-feather-check-square" />
													</a>
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>
			{showModal && (
				<div className="text-right">
					<AssignDropup
						visible={visible}
						onModalClick={onModalClick}
						setVisible={setVisible}
					/>
				</div>
			)}
		</>
	);
};

export default InPatientCare;
