/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
// import DatePicker from 'antd/lib/date-picker';
// import Select from 'react-select';
import Tooltip from 'antd/lib/tooltip';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { request } from '../../services/utilities';
import { loadAllPatients } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
// import waiting from '../../assets/images/waiting.gif';
import ModalPatientDetails from '../../components/Modals/ModalPatientDetails';
// import { toggleProfile } from '../../actions/user';
import moment from 'moment';

// const { RangePicker } = DatePicker;

// const customStyle = {
// 	control: (provided, state) => ({
// 		...provided,
// 		minHeight: '24px !important',
// 		height: '2rem',
// 		width: '12rem',
// 	}),
// };

const AllInPatients = () => {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const [admittedPatients, setAdmittedPatients] = useState(null);
	const activeRequest = null;
	// const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	// const [filtering, setFiltering] = useState(false);
	// const [patientName, setPatientName] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	// const showProfile = patient => {
	// 	const info = { patient, type: 'patient' };
	// 	dispatch(toggleProfile(true, info));
	// };

	const fetchPatients = useCallback(async () => {
		try {
			const url = `patient/admissions`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			setAdmittedPatients(rs);
			// dispatch(loadAllPatients(rs));
			setLoaded(false);
		} catch (error) {
			notifyError('error fetching patients');
			setLoaded(false);
		}
	}, [dispatch]);

	const searchEntries = e => {
		e.preventDefault();
		const url = `patient/admissions?patient_name=${searchValue}`;
		console.log(url);
		request(url, 'GET', true)
			.then(data => {
				console.log(data);
				setAdmittedPatients(data);
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

	const formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>{`${data?.patient_name} `}</td>
				<td>{}</td>
				<td>{}</td>
				<td>{}</td>
				<td>{moment(data?.admission_date).format('DD/MM/YYYY')}</td>
				<td>{data?.admitted_by}</td>
				{/* <td className="row-actions text-right">
					<Tooltip title="View Request">
						<a onClick={() => showProfile(data)}>
							<i className="os-icon os-icon-documents-03" />
						</a>
					</Tooltip>
				</td> */}
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
		<div>
			{activeRequest ? (
				<ModalPatientDetails
					activeRequest={activeRequest}
					showModal={showModal}
					onModalClick={onModalClick}
				/>
			) : null}
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
					{
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
										<div className="th-inner sortable both">Suite</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Admission Date</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Admitted By</div>
										<div className="fht-cell"></div>
									</th>
								</tr>
							</thead>
							<tbody>
								{loaded ? (
									<tr>
										<td colSpan="6" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								) : (
									<>{table()}</>
								)}
							</tbody>
						</table>
					}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// patient: state.user.patient,
		allInPatients: state.patient.allInPatients,
	};
};

export default withRouter(connect(mapStateToProps)(AllInPatients));
