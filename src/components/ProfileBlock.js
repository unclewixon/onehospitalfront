/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	formatPatientId,
	parseAvatar,
	getAge,
	patientname,
} from '../services/utilities';
import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';
import { startBlock, stopBlock } from '../actions/redux-block';
import ExtraBlock from './ExtraBlock';
import { formatCurrency } from '../services/utilities';
import { messageService } from '../services/message';
import ViewAlerts from './Modals/ViewAlerts';

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

const ProfileBlock = ({ location, history, patient, noButtons, extraData }) => {
	const [alerts, setAlerts] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

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

	const enrollImmunization = async () => {
		const result = window.confirm('Enroll into immunization?');
		if (result) {
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
		}
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
													{patient.isAdmitted && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
												</h4>
												<span className="card-text">{patient?.email}</span>
											</div>

											<div className="d-flex flex-wrap mt-3">
												{!noButtons && <a className="btn btn-primary">Edit</a>}
												{!noButtons && (
													<Tooltip
														title={patient?.isAdmitted ? 'Discharge' : 'Admit'}>
														{!patient?.isAdmitted ? (
															<Link
																to={`${location.pathname}#start-admission`}
																className="btn btn-primary btn-sm ml-2">
																<i className="os-icon os-icon-ui-22"></i>
																<span>Admit</span>
															</Link>
														) : (
															<button className="btn btn-danger btn-sm ml-2">
																<i className="fa fa-hospital-o"></i>
																<span style={{ marginLeft: '4px' }}>
																	Discharge
																</span>
															</button>
														)}
													</Tooltip>
												)}
												<Tooltip title="Alerts">
													<a
														className={`${
															alerts.length > 0 ? 'text-danger' : 'text-success'
														} relative ml-2`}
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
									{!noButtons && (
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
													value={formatPatientId(patient?.id)}
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
						{!noButtons && (
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
										{!patient.isAdmitted && (
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
			{extraData && <ExtraBlock data={extraData} />}
			{showModal && <ViewAlerts closeModal={closeModal} />}
		</>
	);
};

export default withRouter(ProfileBlock);
