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
	confirmAction,
} from '../services/utilities';
import { patientAPI, admissionAPI, USER_RECORD } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import { formatCurrency } from '../services/utilities';
import { messageService } from '../services/message';
import ViewAlerts from './Modals/ViewAlerts';
import ModalDischargePatient from './Modals/ModalDischargePatient';
import ModalFinishDischarge from './Modals/ModalFinishDischarge';
import PatientForm from './Modals/PatientForm';
import DischargeBlock from './DischargeBlock';
import { setPatientRecord, toggleProfile } from '../actions/user';
import SSRStorage from '../services/storage';

const storage = new SSRStorage();

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
						className={`mr-75 feather feather-${icon || 'user'}`}
					>
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

const ProfileBlock = ({
	location,
	history,
	patient,
	hasButtons,
	canAdmit,
	canDischarge,
}) => {
	const [alerts, setAlerts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [admissionId, setAdmissionId] = useState(null);
	const [amount, setAmount] = useState(null);
	const [admissionDischarge, setAdmissionDischarge] = useState(false);
	const [nicuDischarge, setNicuDischarge] = useState(false);
	const [nicuId, setNicuId] = useState(null);
	const [dischargeType, setDischargeType] = useState('');
	const [admissionFinishDischarge, setAdmissionFinishDischarge] =
		useState(false);
	const [nicuFinishDischarge, setNicuFinishDischarge] = useState(false);

	const dispatch = useDispatch();

	const getAlerts = useCallback(async () => {
		try {
			const url = `patient/${patient.id}/alerts`;
			const rs = await request(url, 'GET', true);
			setAlerts(rs);

			const uri = `patient/${patient.id}/outstandings`;
			const res = await request(uri, 'GET', true);
			setAmount(res);
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
				const { type, data } = message.text;

				if (type === 'refresh') {
					getAlerts();
				} else if (type === 'balance') {
					setAmount(data);
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
				messageService.sendMessage({
					type: 'update-patient',
					data: { ...patient, immunization: rs.records },
				});
				dispatch(setPatientRecord({ ...patient, immunization: rs.records }));
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

	const editPatient = () => {
		document.body.classList.add('modal-open');
		setEditModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setEditModal(false);
	};

	const startDischarge = id => {
		setAdmissionId(id);
		document.body.classList.add('modal-open');
		setAdmissionDischarge(true);
		setDischargeType('admission');
	};

	const startNicuDischarge = id => {
		setNicuId(id);
		document.body.classList.add('modal-open');
		setNicuDischarge(true);
		setDischargeType('nicu');
	};

	const onStartDischarge = async (id, param, type) => {
		try {
			dispatch(startBlock());
			const api = type === 'nicu' ? 'nicu' : admissionAPI;
			const url = `${api}/${id}/start-discharge`;
			const rs = await request(url, 'PUT', true, { ...param });
			dispatch(stopBlock());
			if (rs.success) {
				const result = rs.admission;

				const newPatient = {
					...patient,
					admission: type === 'admission' ? result : null,
					nicu: type === 'nicu' ? result : null,
				};
				dispatch(setPatientRecord(newPatient));

				messageService.sendMessage({
					type: 'update-patient',
					data: newPatient,
				});

				const admission = {
					id: result.id,
					start_discharge: result.start_discharge,
					start_discharge_date: result.start_discharge_date,
					start_discharge_by: result.start_discharge_by,
					patient: newPatient,
				};

				messageService.sendMessage({
					type: `${type === 'nicu' ? 'nicu' : 'admission'}-discharge`,
					admission,
				});

				notifySuccess('Patient discharge initiated');
				closeDischarge();
			} else {
				notifyError(rs.message);
			}
		} catch (error) {
			dispatch(stopBlock());
			notifyError(error.message || 'Could not initiate discharge');
		}
	};

	const finishDischarge = id => {
		setAdmissionId(id);
		document.body.classList.add('modal-open');
		setAdmissionFinishDischarge(true);
		setDischargeType('admission');
	};

	const finishNicuDischarge = id => {
		setNicuId(id);
		document.body.classList.add('modal-open');
		setNicuFinishDischarge(true);
		setDischargeType('nicu');
	};

	const onCompleteDischarge = async (id, param, type) => {
		try {
			dispatch(startBlock());
			const api = type === 'nicu' ? 'nicu' : admissionAPI;
			const url = `${api}/${id}/complete-discharge`;
			const rs = await request(url, 'PUT', true, { ...param });
			dispatch(stopBlock());
			if (rs.success) {
				const result = rs.admission;

				const newPatient = {
					...patient,
					admission_id: null,
					nicu_id: null,
					admission: null,
					nicu: null,
				};
				dispatch(setPatientRecord(newPatient));

				messageService.sendMessage({
					type: 'update-patient',
					data: newPatient,
				});

				const admission = {
					id: result.id,
					date_discharged: result.date_discharged,
					dischargedBy: result.dischargedBy,
					status: 1,
					lastChangedBy: result.lastChangedBy,
					patient: newPatient,
				};

				messageService.sendMessage({
					type: `${type === 'nicu' ? 'nicu' : 'admission'}-finish-discharge`,
					admission,
				});

				notifySuccess('Patient discharged');
				closeDischarge();

				storage.removeItem(USER_RECORD);
				dispatch(toggleProfile(false));
			} else {
				notifyError(rs.message);
			}
		} catch (error) {
			dispatch(stopBlock());
			notifyError(error.message || 'Could not discharge patient');
		}
	};

	const closeDischarge = () => {
		setAdmissionDischarge(false);
		setNicuDischarge(false);
		setAdmissionFinishDischarge(false);
		setNicuFinishDischarge(false);
		document.body.classList.remove('modal-open');
		setAdmissionId(null);
		setNicuId(null);
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
											style={{ width: '104px', height: '104px' }}
										>
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
													{(patient.admission_id || patient.nicu_id) && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
												</h4>
												<span className="card-text">{patient?.email}</span>
											</div>

											<div className="d-flex flex-wrap mt-3">
												{hasButtons && (
													<a
														className="btn btn-primary mr-1"
														onClick={editPatient}
													>
														Edit
													</a>
												)}
												{(canAdmit || canDischarge) && (
													<DischargeBlock
														patient={patient}
														startDischarge={startDischarge}
														finishDischarge={finishDischarge}
														startNicuDischarge={startNicuDischarge}
														finishNicuDischarge={finishNicuDischarge}
														location={location}
														canAdmit={canAdmit}
														canDischarge={canDischarge}
													/>
												)}
												<Tooltip title="Alerts">
													<a
														className={`${
															alerts.length > 0 ? 'text-danger' : 'text-success'
														} relative`}
														style={{ fontSize: '20px', padding: '0 4px' }}
														onClick={() => showAlerts()}
													>
														<i className="fa fa-exclamation-triangle" />
														<span
															className={`alert-badge ${
																alerts.length > 0
																	? 'text-danger'
																	: 'text-success'
															}`}
														>
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
														{formatCurrency(amount?.balance || 0)}{' '}
													</h5>
													<small>Balance</small>
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
													value={patient?.phone_number || '--'}
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
					style={{ paddingLeft: 0 }}
				>
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
										{!patient.admission_id && (
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
									className="btn btn-block btn-outline-danger"
								>
									Disable Patient
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{showModal && <ViewAlerts closeModal={closeModal} />}
			{(admissionDischarge || nicuDischarge) && patient && (
				<ModalDischargePatient
					admissionId={admissionId}
					nicuId={nicuId}
					startDischarge={onStartDischarge}
					closeModal={() => closeDischarge()}
					type={dischargeType}
				/>
			)}
			{(admissionFinishDischarge || nicuFinishDischarge) && patient && (
				<ModalFinishDischarge
					patient={patient}
					admissionId={admissionId}
					nicuId={nicuId}
					finishDischarge={onCompleteDischarge}
					closeModal={() => closeDischarge()}
					type={dischargeType}
				/>
			)}
			{editModal && (
				<PatientForm patient={patient} closeModal={() => closeModal()} />
			)}
		</>
	);
};

export default withRouter(ProfileBlock);
