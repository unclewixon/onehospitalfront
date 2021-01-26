/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
// import DatePicker from 'antd/lib/date-picker';
// import Select from 'react-select';
// import Tooltip from 'antd/lib/tooltip';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { request } from '../../services/utilities';
// import { loadAllPatients } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
// import waiting from '../../assets/images/waiting.gif';
import ModalPatientDetails from '../../components/Modals/ModalPatientDetails';
import { toggleProfile } from '../../actions/user';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
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
	const [loaded, setLoaded] = useState(false);
	const [admittedPatients, setAdmittedPatients] = useState(null);
	const activeRequest = null;
	// const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	// const [filtering, setFiltering] = useState(false);
	// const [patientName, setPatientName] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useDispatch();

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient', admitted: true };
		dispatch(toggleProfile(true, info));
	};

	const getProfileInfo = async patient_id => {
		try {
			const url = `patient/show?id=${String(patient_id)}`;
			const rs = await request(url, 'GET', true);
			showProfile(rs);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPatients = useCallback(async () => {
		try {
			const url = `patient/admissions`;
			const rs = await request(url, 'GET', true);
			setAdmittedPatients(rs);
			// dispatch(loadAllPatients(rs));
			setLoaded(false);
		} catch (error) {
			notifyError('error fetching patients');
			setLoaded(false);
		}
	}, []);

	const searchEntries = e => {
		e.preventDefault();
		const url = `patient/admissions?q=${searchValue}`;
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
				<td>{`${data?.patient_name}`}</td>
				<td>{`${data?.patient_filenumber}`}</td>
				<td>{`${data?.patient_gender} `}</td>
				<td>{`${data?.suite} `}</td>
				<td>{moment(data?.admission_date).format('DD/MM/YYYY')}</td>
				<td>{data?.admitted_by}</td>
				<td className="row-actions text-right">
					<Tooltip title="View Request">
						<a onClick={() => getProfileInfo(data.patient_id)}>
							<i className="os-icon os-icon-documents-03" />
						</a>
					</Tooltip>
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
		<div>
			{activeRequest ? (
				<ModalPatientDetails
					activeRequest={activeRequest}
					showModal={showModal}
					onModalClick={onModalClick}
				/>
			) : null}
			<div className="element-box">
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
										<div className="th-inner sortable both">Patient ID</div>
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
