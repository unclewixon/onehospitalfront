/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	formatPatientId,
	parseAvatar,
	getAge,
	patientname,
	confirmAction,
} from '../services/utilities';
import { patientAPI, admissionAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';
import { startBlock, stopBlock } from '../actions/redux-block';
import { formatCurrency } from '../services/utilities';
import { messageService } from '../services/message';
import ViewAlerts from './Modals/ViewAlerts';
import { toggleProfile } from '../actions/user';
import ModalShowTransactions from './Modals/ModalShowTransactions';

const UserItem = ({ icon, label, value }) => {
	return (
		label !== '' && (
			<>
				<th className="pb-50">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14px"
						height="14px"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={`mr-75 feather feather-${icon || 'user'}`}>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
					<span className="font-weight-normal">{label}</span>
				</th>
				<td className="pb-50">{value}</td>
			</>
		)
	);
};

const ProfileBlock = ({ location, history, patient, hasButtons, canAdmit }) => {
	const [alerts, setAlerts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showTransactions, setShowTransactions] = useState(false);
	const [admissionId, setAdmissionId] = useState(null);

	const dispatch = useDispatch();

	const item = useSelector(state => state.user.item);
	const type = useSelector(state => state.user.type);

	const getAlerts = useCallback(async () => {
		try {
			const url = `patient/${patient.id}/alerts`;
			const rs = await request(url, 'GET', true);
			setAlerts(rs);
		} catch (error) {
			notifyError('Error fetching alerts');
		}
	}, [patient]);

	useEffect(() => {
		getAlerts();
	}, [getAlerts]);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			if (message !== '') {
				if (message.text === 'refresh') {
					getAlerts();
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const onEnrollImmunization = async () => {
		try {
			dispatch(startBlock());
			const data = { patient_id: patient.id };
			const url = `${patientAPI}/immunization/enroll`;
			const rs = await request(url, 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess(
					`you have enrolled ${patient.other_names} into immunization`
				);
				dispatch(updatePatient({ ...patient, immunization: rs.records }));
				history.push(`${location.pathname}#immunization-chart`);
			} else {
				notifyError(rs.message);
			}
		} catch (error) {
			dispatch(stopBlock());
			notifyError(error.message || 'Could not add leave request');
		}
	};

	const enrollImmunization = () => {
		confirmAction(
			onEnrollImmunization,
			{},
			'Enroll into immunization?',
			'Are you sure?'
		);
	};

	const dob = patient.date_of_birth
		? moment(patient.date_of_birth, 'YYYY-MM-DD').format('DD-MMM-YYYY')
		: '';

	const showAlerts = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const onStartDischarge = async id => {
		try {
			dispatch(startBlock());
			const url = `${admissionAPI}/${id}/start-discharge`;
			const rs = await request(url, 'PUT', true, {});
			dispatch(stopBlock());
			if (rs.success) {
				const newPatient = { ...patient, admission: rs.admission };
				dispatch(updatePatient(newPatient));
				let info;
				if (item) {
					info = {
						patient: newPatient,
						type,
						item: { ...item, ...rs.admission },
					};
				} else {
					info = { patient: newPatient, type };
				}
				messageService.sendMessage({ ...rs.admission });
				dispatch(toggleProfile(true, info));
				notifySuccess('Patient discharge initiated');
			} else {
				notifyError(rs.message);
			}
		} catch (error) {
			dispatch(stopBlock());
			notifyError(error.message || 'Could not initiate discharge');
		}
	};

	const startDischarge = id => {
		confirmAction(
			onStartDischarge,
			id,
			'Initiate patient discharge?',
			'Are you sure?'
		);
	};

	const onCompleteDischarge = async data => {
		try {
			dispatch(startBlock());
			const url = `${admissionAPI}/${data.id}/complete-discharge`;
			const rs = await request(url, 'PUT', true, { note: data.note });
			dispatch(stopBlock());
			if (rs.success) {
				const newPatient = {
					...patient,
					admission: rs.admission,
					is_admitted: false,
				};
				dispatch(updatePatient(newPatient));
				let info;
				if (item) {
					info = {
						patient: newPatient,
						type,
						item: { ...item, ...rs.admission },
					};
				} else {
					info = { patient: newPatient, type };
				}
				messageService.sendMessage({
					...rs.admission,
					patient: { ...rs.admission.patient, is_admitted: false },
				});
				dispatch(toggleProfile(true, info));
				notifySuccess('Patient discharged');
				closeDischarge();
			} else {
				notifyError(rs.message);
			}
		} catch (error) {
			dispatch(stopBlock());
			notifyError(error.message || 'Could not discharge patient');
		}
	};

	const completeDischarge = data => {
		confirmAction(
			onCompleteDischarge,
			data,
			'Completely discharge patient?',
			'Are you sure?'
		);
	};

	const showTransaction = id => {
		setAdmissionId(id);
		document.body.classList.add('modal-open');
		setShowTransactions(true);
	};

	const closeDischarge = () => {
		setShowTransactions(false);
		document.body.classList.remove('modal-open');
		setAdmissionId(null);
	};

	return (
		<>
			<div className="row profile-block">
				<div className="col-md-7 col-lg-8 col-xl-9 col-12">
					<div className="element-box p-3">
						<div className="card-body">
							<div className="row">
								<div className="d-flex justify-content-between flex-column col-xl-6 col-21">
									<div className="d-flex justify-content-start">
										<span
											className="b-avatar badge-light-danger rounded"
											style={{ width: '104px', height: '104px' }}>
											<span className="b-avatar-img">
												<img
													src={parseAvatar(patient?.profile_pic)}
													alt="avatar"
												/>
											</span>
										</span>
										<div className="d-flex flex-column ml-1">
											<div className="mb-1">
												<h4 className="mb-0">
													{patientname(patient)}{' '}
													{patient.is_admitted && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
												</h4>
												<span className="card-text">{patient?.email}</span>
											</div>

											<div className="d-flex flex-wrap mt-3">
												{hasButtons && (
													<a className="btn btn-primary mr-1">Edit</a>
												)}
												{canAdmit && (
													<>
														{!patient?.is_admitted ? (
															!patient.admission && (
																<Tooltip title="Admit">
																	<Link
																		to={`${location.pathname}#start-admission`}
																		className="btn btn-primary btn-sm mr-1">
																		<i className="os-icon os-icon-ui-22"></i>
																		<span>Admit</span>
																	</Link>
																</Tooltip>
															)
														) : (
															<>
																{patient?.admission?.start_discharge ? (
																	<Tooltip title="Complete Discharge">
																		<button
																			className="btn btn-warning btn-sm mr-1"
																			onClick={() =>
																				showTransaction(patient?.admission?.id)
																			}>
																			<i className="fa fa-hospital-o"></i>
																			<span style={{ marginLeft: '4px' }}>
																				Finish Discharge
																			</span>
																		</button>
																	</Tooltip>
																) : (
																	<Tooltip title="Discharge">
																		<button
																			className="btn btn-danger btn-sm mr-1"
																			onClick={() =>
																				startDischarge(patient?.admission?.id)
																			}>
																			<i className="fa fa-hospital-o"></i>
																			<span style={{ marginLeft: '4px' }}>
																				Discharge
																			</span>
																		</button>
																	</Tooltip>
																)}
															</>
														)}
													</>
												)}
												<Tooltip title="Alerts">
													<a
														className={`${
															alerts.length > 0 ? 'text-danger' : 'text-success'
														} relative`}
														style={{ fontSize: '20px', padding: '0 4px' }}
														onClick={() => showAlerts()}>
														<i className="fa fa-exclamation-triangle" />
														<span
															className={`alert-badge ${
																alerts.length > 0
																	? 'text-danger'
																	: 'text-success'
															}`}>
															{alerts.length}
														</span>
													</a>
												</Tooltip>
											</div>
										</div>
									</div>
									{hasButtons && (
										<div className="d-flex align-items-center mt-2">
											<div className="d-flex align-items-center mr-2">
												<span className="b-avatar badge-light-primary rounded">
													<span className="b-avatar-custom">
														<i className="icon-feather icon-feather-activity"></i>
													</span>
												</span>
												<div className="ml-1">
													<h5 className="mb-0">0</h5>
													<small>Visits</small>
												</div>
											</div>
											<div className="d-flex align-items-center">
												<span className="b-avatar badge-light-success rounded">
													<span className="b-avatar-custom">
														<i className="icon-feather icon-feather-credit-card"></i>
													</span>
												</span>
												<div className="ml-1">
													<h5 className="mb-0">
														{formatCurrency(patient?.outstanding || 0)}{' '}
													</h5>
													<small>Outstanding Balance</small>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className="col-xl-6 col-12">
									<table className="mt-4 w-100">
										<tbody>
											<tr>
												<UserItem
													icon="user"
													label="Patient ID"
													value={formatPatientId(patient)}
												/>
											</tr>
											<tr>
												<UserItem
													icon="user"
													label="Sex"
													value={patient?.gender}
												/>
											</tr>
											<tr>
												<UserItem
													icon="user"
													label="Phone"
													value={patient?.phone_nuber || '--'}
												/>
											</tr>
											<tr>
												<UserItem
													icon="user"
													label="DOB"
													value={`${dob} (${getAge(patient?.date_of_birth)})`}
												/>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="col-md-5 col-lg-4 col-xl-3 col-12"
					style={{ paddingLeft: 0 }}>
					<div className="element-box border-primary p-3">
						<div className="card-header align-items-center pt-75 pb-25">
							<h5 className="mb-0">Patient Status</h5>
							<div className="mt-1">
								<span className="badge badge-light-primary">
									{patient.hmo?.name || ''}
								</span>
							</div>
						</div>
						{hasButtons && (
							<div className="card-body">
								<div className="design-group">
									<ul className="demo-icons-list">
										{(patient?.immunization === undefined ||
											patient?.immunization.length <= 0) && (
											<span className="b-avatar badge-light-primary rounded shiftright post-box">
												<li>
													<a onClick={enrollImmunization}>
														<i className="picons-thin-icon-thin-0811_medicine_health_injection_ill"></i>
														<span>immunization</span>
													</a>
												</li>
											</span>
										)}
										{!patient.is_admitted && (
											<span className="b-avatar badge-light-primary rounded shiftright post-box">
												<li>
													<Link to={`${location.pathname}#start-admission`}>
														<i className="picons-thin-icon-thin-0821_blood_infusion"></i>
														<span>admission</span>
													</Link>
												</li>
											</span>
										)}
										<span className="b-avatar badge-light-primary rounded shiftright post-box">
											<li>
												<Link to={`${location.pathname}#enroll-ivf`}>
													<i className="picons-thin-icon-thin-0816_microscope_laboratory"></i>
													<span>IVF</span>
												</Link>
											</li>
										</span>
										<span className="b-avatar badge-light-primary rounded shiftright post-box">
											<li>
												<Link to={`${location.pathname}#enroll-antenatal`}>
													<i className="picons-thin-icon-thin-0813_heart_vitals_pulse_rate_health"></i>
													<span>Antenatal</span>
												</Link>
											</li>
										</span>
									</ul>
								</div>
								<button
									type="button"
									className="btn btn-block btn-outline-danger">
									Disable Patient
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{showModal && <ViewAlerts closeModal={closeModal} />}
			{showTransactions && patient && (
				<ModalShowTransactions
					patient={patient}
					admissionId={admissionId}
					completeDischarge={completeDischarge}
					closeModal={() => closeDischarge()}
					isAdmitted={true}
				/>
			)}
		</>
	);
};

export default withRouter(ProfileBlock);
