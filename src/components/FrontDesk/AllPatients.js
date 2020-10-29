/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
// import DatePicker from 'antd/lib/date-picker';
// import Select from 'react-select';
import Tooltip from 'antd/lib/tooltip';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import moment from 'moment';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
// import { loadAllPatients } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
// import waiting from '../../assets/images/waiting.gif';
import ModalPatientDetails from '../../components/Modals/ModalPatientDetails';
import { toggleProfile } from '../../actions/user';

// const { RangePicker } = DatePicker;

const AllPatients = () => {
	const dispatch = useDispatch();
	const activeRequest = null;

	const [loaded, setLoaded] = useState(false);
	const [allPatients, setAllPatients] = useState(null);
	// const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	// const [filtering, setFiltering] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const fetchPatients = useCallback(async () => {
		try {
			// const url = name ? `patient/find?query=${name}` : `patient/list`;
			const url = `patient/list`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			setAllPatients(rs);
			// dispatch(loadAllPatients(rs));
			setLoaded(true);
		} catch (error) {
			notifyError('error fetching patients');
			setLoaded(true);
		}
	}, []);

	const searchEntries = e => {
		e.preventDefault();
		const url = `patient/find?q=${searchValue}`;
		console.log(url);
		request(url, 'GET', true)
			.then(data => {
				console.log(data);
				setAllPatients(data);
				// dispatch(loadAllPatients(data));
			})
			.catch(error => {
				notifyError(`error fetching patients ${error}`);
				setLoaded(false);
			});
	};

	useEffect(() => {
		fetchPatients();
	}, [fetchPatients]);

	return (
		<div>
			<div className="element-box px-0">
				<form className="row search_form" onSubmit={searchEntries}>
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
									<div className="th-inner sortable both">Patient Name</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">File Number</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Phone Number</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Dat of Birth</div>
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
								allPatients.map((data, i) => {
									return (
										<tr className="" key={i}>
											<td>{i + 1}</td>
											<td>{`${data?.surname} ${data?.other_names}`}</td>
											<td>{data?.fileNumber}</td>
											<td>{data?.phoneNumber}</td>
											<td>
												{moment(data?.date_of_birth).format('DD/MM/YYYY')}
											</td>
											<td className="row-actions text-right">
												<Tooltip title="View Request">
													<a onClick={() => showProfile(data)}>
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
												<Tooltip title="Print Request">
													<a className="ml-2">
														<i className="icon-feather-printer" />
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
			{activeRequest && (
				<ModalPatientDetails
					activeRequest={activeRequest}
					showModal={showModal}
					onModalClick={onModalClick}
				/>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// patient: state.user.patient,
		allPatients: state.patient.allPatients,
	};
};

export default withRouter(connect(mapStateToProps)(AllPatients));
