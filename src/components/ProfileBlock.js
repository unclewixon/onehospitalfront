/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { request, formatPatientId } from '../services/utilities';
import patientProfile from '../assets/svg-icons/patientProfile.svg';
import patientProfilePic from '../assets/images/patientprofile.jpg';

import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';
import PatientActions from './PatientActions';
import { startBlock, stopBlock } from '../actions/redux-block';

const ProfileBlock = ({ location, history, patient, noButtons }) => {
	const dispatch = useDispatch();

	const enrollImmunization = async () => {
		const result = window.confirm('Enroll into immunization?');
		if (result) {
			try {
				dispatch(startBlock());
				const data = { patient_id: patient.id };
				const url = `${patientAPI}/immunization/enroll`;
				const rs = await request(url, 'POST', true, data);
				if (rs.success) {
					dispatch(stopBlock());
					notifySuccess(
						`you have enrolled ${patient.other_names} into immunization`
					);
					dispatch(updatePatient({ ...patient, immunization: rs.records }));
					history.push(`${location.pathname}#immunization-chart`);
				} else {
					dispatch(stopBlock());
					notifyError(rs.message);
				}
			} catch (error) {
				dispatch(stopBlock());
				notifyError(error.message || 'Could not add leave request');
			}
		}
	};

	return (
		<div className="element-box mb-0 pt-1 pb-1 p-2 ">
			<div className="d-flex w-100">
				<Link to={`${location.pathname}#dashboard`}>
					<div className="w-100">
						<div className="user-profile compact">
							<div
								className="up-head-w"
								style={{
									backgroundImage: `url(${
										patient?.profile_pic
											? patient.profile_pic
											: patientProfilePic
									})`,
								}}>
								<div className="up-main-info">
									<h6 className="up-sub-header">
										<div className="value-pair">
											<div className="label pr-2" style={{ color: 'inherit' }}>
												Patient ID:
											</div>
											<div className="value badge badge-pill badge-light">
												{formatPatientId(patient?.id)}
											</div>
										</div>
									</h6>
								</div>
								<img
									className="decor"
									src={patientProfile}
									alt="patient profile svg"
								/>
							</div>
						</div>
					</div>{' '}
				</Link>
				<div className="mx-3" style={{ width: '100%' }}>
					<h5 className="mt-2">{`${patient?.surname} ${patient?.other_names}`}</h5>
					<div className="row col-12">
						<div className="col-6">
							<div className="small row">
								<div className="font-weight-bold col-6">Email:</div>

								<span className="col-6">{patient?.email}</span>
							</div>

							<div className="small row">
								<div className="font-weight-bold col-6">Phone Number:</div>
								<span className="col-6">{patient?.phoneNumber}</span>
							</div>
							<div className="small row">
								<div className="font-weight-bold col-6">Marital Status:</div>
								<span className="col-6">{patient?.maritalStatus || ''}</span>
							</div>
						</div>
						<div className="col-6">
							<div className="small row">
								<div className="font-weight-bold col-6">Ethnicity:</div>
								<span className="col-6">{patient?.ethnicity || ''}</span>
							</div>
							<div className="small row">
								<div className="font-weight-bold col-6">Occupation:</div>
								<span className="col-6">{patient?.occupation || ''}</span>
							</div>
							<div className="small row">
								<div className="font-weight-bold col-6">Number of Visits:</div>
								<span className="col-6">{patient?.noOfVisits || ''}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="element-actions d-none d-sm-block justify-content-sm-end mt-1">
				{!noButtons && (
					<PatientActions
						location={location}
						enrollImmunization={enrollImmunization}
						isAdmitted={patient.isAdmitted}
					/>
				)}
			</div>
		</div>
	);
};

export default withRouter(ProfileBlock);
