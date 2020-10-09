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
import { toggleProfile } from '../../actions/user';

// const { RangePicker } = DatePicker;

// const customStyle = {
// 	control: (provided, state) => ({
// 		...provided,
// 		minHeight: '24px !important',
// 		height: '2rem',
// 		width: '12rem',
// 	}),
// };

const AllInPatients = ({ allInPatients }) => {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const activeRequest = null;
	// const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	// const [filtering, setFiltering] = useState(false);
	// const [patientName, setPatientName] = useState('');

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	// const dateChange = e => {
	// 	// let date = e.map(d => {
	// 	// 	return moment(d._d).format('YYYY-MM-DD');
	// 	// });
	// };

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const fetchPatients = useCallback(
		async name => {
			try {
				const url = name ? `patient/find?query=${name}` : `patient/list`;
				const rs = await request(url, 'GET', true);
				dispatch(loadAllPatients(rs));
				setLoaded(false);
			} catch (error) {
				notifyError('error fetching patients');
				setLoaded(false);
			}
		},
		[dispatch]
	);

	// const filterEntries = () => {
	// 	setFiltering(true);
	// 	fetchPatients();
	// };

	useEffect(() => {
		fetchPatients();
	}, [fetchPatients]);

	const formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>{`${data?.surname} ${data?.other_names}`}</td>
				<td>{data?.fileNumber}</td>
				<td>{data?.phoneNumber}</td>
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
	};

	const table = () =>
		allInPatients
			? allInPatients.map((patient, i) => {
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
			{/* <form className="row">
				<div className="form-group col-md-6">
					<label>From - To</label>
					<RangePicker onChange={e => dateChange(e)} />
				</div>
				<div className="form-group col-md-4">
					<label className="mr-2 " htmlFor="id">
						Patient
					</label>
					<Select
						styles={customStyle}
						id="patientId"
						isSearchable={true}
						name="patientId"
						// options={filteredOptions}
						// onChange={e => setPatientName(e.target.value)}
					/>
				</div>
				<div className="form-group col-md-2 mt-4">
					<div
						className="btn btn-sm btn-primary btn-upper text-white filter-btn"
						onClick={() => {
							filterEntries();
						}}>
						<i className="os-icon os-icon-ui-37" />
						<span>
							{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
						</span>
					</div>
				</div>
			</form> */}
			<div className="element-box px-0">
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
										<div className="th-inner sortable both">
											Date of Admission
										</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Phone Number</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner "></div>
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
