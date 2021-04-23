/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	formatPatientId,
	parseAvatar,
	getAge,
} from '../services/utilities';
import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';
import { startBlock, stopBlock } from '../actions/redux-block';
import ExtraBlock from './ExtraBlock';

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
	const dispatch = useDispatch();

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
												<h4 className="mb-0">{`${patient?.other_names} ${patient?.surname}`}</h4>
												<span className="card-text">{patient?.email}</span>
											</div>
											{!noButtons && (
												<div className="d-flex flex-wrap">
													<a className="btn btn-primary">Edit</a>
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
															<a className="btn btn-danger btn-sm ml-2">
																<i className="os-icon os-icon-ui-23"></i>
																<span>Discharge</span>
															</a>
														)}
													</Tooltip>
												</div>
											)}
										</div>
									</div>
									<div className="d-flex align-items-center mt-4">
										<Tooltip title="Enroll Antenatal">
											<Link
												to={`${location.pathname}#enroll-antenatal`}
												className="btn btn-primary btn-sm mr-1">
												<i className="os-icon os-icon-ui-22"></i>
												<span>Enroll Antenatal</span>
											</Link>
										</Tooltip>
										<Tooltip title="Enroll IVF">
											<Link
												to={`${location.pathname}#enroll-ivf`}
												className="btn btn-primary btn-sm mr-1">
												<i className="os-icon os-icon-ui-22"></i>
												<span>Enroll IVF</span>
											</Link>
										</Tooltip>
										{(patient?.immunization === undefined ||
											patient?.immunization.length <= 0) && (
											<Tooltip title="Enroll Immunization">
												<button
													className="btn btn-primary btn-sm"
													onClick={enrollImmunization}>
													<i className="os-icon os-icon-ui-22"></i>
													<span>Enroll Immunization</span>
												</button>
											</Tooltip>
										)}
									</div>
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
											{/* <tr>
												<UserItem
													icon="user"
													label="Insurance Status"
													value={patient.hmo?.name || ''}
												/>
											</tr>
											<tr>
												<UserItem icon="user" label="" value="" />
											</tr> */}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-5 col-lg-4 col-xl-3 col-12">
					<div className="element-box border-primary p-3">
						<div className="card-header align-items-center pt-75 pb-25">
							<h5 className="mb-0">Insurance Status</h5>
							<div className="mt-1">
								<span className="badge badge-light-primary">
									{patient.hmo?.name || ''}
								</span>
							</div>
						</div>
						<div className="card-body">
							<ul className="list-unstyled my-1">
								{/* <li>
									<span className="align-middle">5 Users</span>
								</li>
								<li className="my-25">
									<span className="align-middle">10 GB storage</span>
								</li>
								<li>
									<span className="align-middle">Basic Support</span>
								</li> */}
							</ul>
							{!noButtons && (
								<button
									type="button"
									className="btn btn-block btn-outline-danger">
									Disable Patient
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{extraData && <ExtraBlock data={extraData} />}
		</>
	);
};

export default withRouter(ProfileBlock);
