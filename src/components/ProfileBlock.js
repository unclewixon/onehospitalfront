/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import background from '../assets/images/b3.jpeg';
import profilepix from '../assets/images/a6.jpeg';
import editIcon from '../assets/medical/edit.png';
import admitIcon from '../assets/medical/admit.png';
import immunizeIcon from '../assets/medical/immunize.png';
import documentIcon from '../assets/medical/document.png';
import { getAge, request } from '../services/utilities';
import patientProfile from '../assets/svg-icons/patientProfile.svg';
import patientProfilePic from '../assets/images/patientprofile.jpg';

import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';

const ProfileBlock = ({ location, history, patient, match, noEdits }) => {
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const enrollImmunization = async () => {
		const result = window.confirm('Enroll into immunization?');
		if (result) {
			try {
				setSubmitting(true);
				const data = { patient_id: patient.id };
				const url = `${patientAPI}/immunization/enroll`;
				const rs = await request(url, 'POST', true, data);
				if (rs.success) {
					setSubmitting(false);
					notifySuccess(
						`you have enrolled ${patient.other_names} into immunization`
					);
					dispatch(updatePatient({ ...patient, immunization: rs.records }));
					history.push(`${location.pathname}#immunization-chart`);
				} else {
					setSubmitting(false);
					notifyError(rs.message);
				}
			} catch (error) {
				setSubmitting(false);
				notifyError(error.message || 'Could not add leave request');
			}
		}
	};

	const enrollAdmission = () => {
		history.push(`${location.pathname}#start-admission`);
	};

	return (
		<div className="element-box mb-0 pt-1 pb-1 p-2 ">
			<div className="d-flex w-100">
				<Link to={`${location.pathname}#dashboard`}>
					<div className="w-100">
						<div className="user-profile compact">
							<div
								className="up-head-w"
								style={{ backgroundImage: `url(${patientProfilePic})` }}>
								<div className="up-main-info">
									<h6 className="up-sub-header">
										<div className="value-pair">
											<div className="label pr-2" style={{ color: 'inherit' }}>
												Patient ID:
											</div>
											<div className="value badge badge-pill badge-light">
												{patient?.fileNumber}
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
								<span className="col-6">{patient?.maritalStatus}</span>
							</div>
						</div>
						<div className="col-6">
							<div className="small row">
								<div className="font-weight-bold col-6">Ethnicity:</div>
								<span className="col-6">{patient?.ethnicity}</span>
							</div>
							<div className="small row">
								<div className="font-weight-bold col-6">Occupation:</div>
								<span className="col-6">{patient?.occupation}</span>
							</div>
							<div className="small row">
								<div className="font-weight-bold col-6">Number of Visits:</div>
								<span className="col-6">{patient?.noOfVisits}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="element-actions d-none d-sm-block justify-content-sm-end mt-1">
				<div>
					<Tooltip title="Admit">
						<a className="btn btn-primary btn-sm mr-2 ml-auto" href="#">
							<i className="os-icon os-icon-ui-22"></i>
							<span>Admit</span>
						</a>
					</Tooltip>
					<Tooltip title="Enroll Antenatal">
						<Link to={`${location.pathname}#enroll-antenatal`}>
							<div className="btn btn-primary btn-sm mr-2" href="#">
								<i className="os-icon os-icon-ui-22"></i>
								<span>Enroll Antenatal</span>
							</div>
						</Link>
					</Tooltip>
					<Tooltip title="Enroll IVF">
						<Link to={`${location.pathname}#enroll-ivf`}>
							<div className="btn btn-primary btn-sm mr-2" href="#">
								<i className="os-icon os-icon-ui-22"></i>
								<span>Enroll IVF</span>
							</div>
						</Link>
					</Tooltip>
					<Tooltip title="Enroll Immunization">
						<a className="btn btn-primary btn-sm mr-2" href="#">
							<i className="os-icon os-icon-ui-22"></i>
							<span>Enroll Immunization</span>
						</a>
					</Tooltip>
					<Tooltip title="Discharge">
						<a className="btn btn-primary btn-sm mr-2" href="#">
							<i className="os-icon os-icon-ui-22"></i>
							<span>Discharge</span>
						</a>
					</Tooltip>
					{/* discharge, enrole antinantal, ivf ,immuncation, admit */}
				</div>
			</div>
		</div>
	);
};

export default withRouter(ProfileBlock);
