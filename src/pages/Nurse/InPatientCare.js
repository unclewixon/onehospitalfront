/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import AssignDropup from './AssignDropup';
import Tooltip from 'antd/lib/tooltip';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import documentIcon from '../../assets/medical/document.png';

const InPatientCare = () => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [visible, setVisible] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

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

	const searchEntries = e => {
		e.preventDefault();
		const url = `patient/admissions?q=${searchValue}`;
		request(url, 'GET', true)
			.then(data => {
				setAdmittedPatients(data);
				// dispatch(loadAllPatients(data));
			})
			.catch(error => {
				notifyError(`error fetching patients ${error}`);
				setLoading(false);
			});
	};

	return (
		<>
			<h6 className="element-header">Patients on Admission</h6>

			<div class="controls-above-table">
				<form class="form-inline justify-content-sm-end">
					<input
						class="form-control form-control-sm rounded bright"
						style={{ paddingLeft: '30px' }}
						placeholder="Search"
						name="search"
						onChange={handleInputChange}
						value={searchValue}
					/>
				</form>
			</div>
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
										<tr className="" data-index="0" data-id="20" key={i}>
											<td>{i + 1}</td>
											<td>{`${item?.patient_name}`}</td>
											<td>{`${item?.patient_filenumber}`}</td>
											<td>{`${item?.patient_gender} `}</td>
											<td>
												{moment(item?.admission_date).format('DD/MM/YYYY')}
											</td>
											<td>{item?.admitted_by}</td>
											<td className="row-actions">
												<Tooltip title="Assign Bed">
													<div style={{ color: '#fff' }}>
														<a onClick={onModalClick}>
															<img
																style={{ width: '10%', height: '10%' }}
																src={documentIcon}
																alt=""
															/>
														</a>
													</div>
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
