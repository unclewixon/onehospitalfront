/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import searchingGIF from '../../assets/images/searching.gif';
import AssignDropup from './AssignDropup';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
// import { useDispatch } from 'react-redux';
import moment from 'moment';

const InPatientCare = () => {
	// const dispatch = useDispatch();
	// const [loaded, setLoaded] = useState(false);
	const [admittedPatients, setAdmittedPatients] = useState(null);

	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [visible, setVisible] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	// handle input  change
	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	const fetchAdmittedPatients = useCallback(async () => {
		try {
			const url = `patient/admissions`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			setAdmittedPatients(rs);
			// dispatch(loadAllPatients(rs));
			// setLoaded(false);
		} catch (error) {
			notifyError('error fetching patients');
			// setLoaded(false);
		}
	}, []);

	useEffect(() => {
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

	const formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>{`${data?.patient_name} `}</td>
				<td>{}</td>
				<td>{}</td>
				<td>{moment(data?.admission_date).format('DD/MM/YYYY')}</td>
				<td>{data?.admitted_by}</td>
				<td className="row-actions text-right">
					<div style={{ color: '#fff' }}>
						<a onClick={onModalClick} className="btn btn-success btn-sm">
							<span>Assign Bed</span>
						</a>
					</div>
				</td>
			</tr>
		);
	};

	const table = () =>
		admittedPatients
			? admittedPatients.map((patient, i) => {
					return formRow(patient, i);
			  })
			: [];

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">List of Patients in care</h6>
							{showModal ? (
								<div className="text-right">
									<AssignDropup
										visible={visible}
										onModalClick={onModalClick}
										setVisible={setVisible}
									/>
								</div>
							) : null}
							<div className="element-box px-0">
								<form className="row search_form">
									<div className="form-group col-md-3 mt-4 text-right">
										<div className="input-group mb-2 mr-sm-2 mb-sm-0">
											<label className="search_label">Search: </label>{' '}
											<input
												className="form-control search_input"
												placeholder=""
												type="text"
												name="search"
												onChange={handleInputChange}
												value={searchValue}
											/>
										</div>
									</div>
								</form>
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
														Patient Name
													</div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner sortable both">
														File Number
													</div>
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
													<div className="th-inner sortable both">
														Admitted By
													</div>
													<div className="fht-cell"></div>
												</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr>
													<td colSpan="7" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : (
												<>{table()}</>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InPatientCare;
