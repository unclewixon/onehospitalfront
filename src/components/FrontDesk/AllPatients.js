import React, { useState, useEffect } from 'react';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import { loadAllPatients } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import _ from 'lodash';
import ModalPatientDetails from '../../components/Modals/ModalPatientDetails';
import Select from 'react-select';
import { toggleProfile } from '../../actions/user';

const { RangePicker } = DatePicker;

const customStyle = {
	control: (provided, state) => ({
		...provided,
		minHeight: '24px !important',
		height: '2rem',
		width: '12rem',
	}),
};

const AllPatients = ({ allPatients }) => {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [patientName, setPatientName] = useState('');

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	const fetchPatients = async name => {
		setLoaded(true);
		try {
			const rs = await request(
				name
					? `${API_URI}/patient/find?query=${name}`
					: `${API_URI}/patient/list`,
				'GET',
				true
			);
			dispatch(loadAllPatients(rs));
			return setLoaded(false);
		} catch (error) {
			notifyError('error fetching patients');
			setLoaded(false);
		}
	};

	const filterEntries = () => {
		setFiltering(true);
		fetchPatients();
	};

	useEffect(() => {
		fetchPatients();
	}, []);

	const formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>{`${data?.surname} ${data?.other_names}`}</td>
				<td>{data?.fileNumber}</td>
				<td>{data?.email}</td>
				<td>{data?.phoneNumber}</td>
				<td>{data?.address}</td>
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
		allPatients
			? allPatients.map((patient, i) => {
					return formRow(patient, i);
			  })
			: [];

	return (
		<div>
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="row">
						<div className="col-md-12">
							{activeRequest ? (
								<ModalPatientDetails
									activeRequest={activeRequest}
									showModal={showModal}
									onModalClick={onModalClick}
								/>
							) : null}
							<h6 className="element-header">All Patients:</h6>

							<form className="row">
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker onChange={e => dateChange(e)} />
								</div>
								<div className="form-group col-md-3">
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
								<div className="form-group col-md-3 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={() => {
											filterEntries();
										}}>
										<i className="os-icon os-icon-ui-37" />
										<span>
											{filtering ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Filter'
											)}
										</span>
									</div>
								</div>
							</form>
						</div>
						<div className="col-sm-12">
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
														<div className="th-inner sortable both">Email</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Phone Number
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Contact Address
														</div>
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
					</div>
				</div>
			</div>
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
