/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';

import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request, formatPatientId } from '../../services/utilities';
import AssignBed from './AssignBed';

const InPatientCare = () => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	// const [searchValue, setSearchValue] = useState('');

	// const handleInputChange = e => {
	// 	setSearchValue(e.target.value);
	// };
	const doHide = val => {
		//e.preventDefault();
		setVisible(val);
	};

	const fetchAdmittedPatients = useCallback(async () => {
		try {
			const url = `patient/admissions`;
			const rs = await request(url, 'GET', true);
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

	useEffect(() => {}, [admittedPatients]);

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	return (
		<>
			<h6 className="element-header">Patients on Admission</h6>
			<div className="element-box m-0 p-3">
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
								<th>
									<div className="th-inner sortable both">Room/Floor</div>
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
									console.log(item);
									return (
										<tr key={i}>
											<td>{`${item?.patient_name}`}</td>
											<td>{formatPatientId(item?.patient_id)}</td>
											<td>{item?.patient_gender}</td>
											<td>
												{moment(item?.admission_date).format(
													'DD-MMM-YYYY h:mm A'
												)}
											</td>
											<td>{item?.admitted_by}</td>
											<td className="row-actions text-right">
												{item?.suite ? (
													<Tooltip title="Room/Floor">
														{item?.suite + '/' + item?.floor}
													</Tooltip>
												) : (
													<Tooltip title="Assign Bed">
														<Popover
															title=""
															overlayClassName="select-bed"
															content={
																<AssignBed
																	item={item}
																	admittedPatients={admittedPatients}
																	setAdmittedPatients={admittedPatients =>
																		setAdmittedPatients(admittedPatients)
																	}
																	doHide={doHide}
																/>
															}
															trigger="click"
															visible={visible}
															onVisibleChange={status => setVisible(status)}>
															<a className="primary">
																<i className="os-icon os-icon-layers" />
															</a>
														</Popover>
													</Tooltip>
												)}
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

export default InPatientCare;
