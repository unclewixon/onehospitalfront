/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import patientProfile from '../../assets/svg-icons/patientProfile.svg';
import patientProfilePic from '../../assets/images/patientprofile.jpg';
import { withRouter } from 'react-router-dom';
import { formatPatientId } from '../../services/utilities';
import VisitSummaryTable from './VisitSummaryTable';
import BillingTable from './BillingTable';
import AppointmentHistoryTable from './AppointmentHistoryTable';
import PatientActions from '../PatientActions';
import { patientAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { updatePatient } from '../../actions/patient';
import { request } from '../../services/utilities';
import { useDispatch } from 'react-redux';

const Dashboard = ({ location, history }) => {
	const patient = useSelector(state => state.user.patient);
	const [tab, setTab] = useState('visitSummary');
	const [isAdmitted, setisAdmitted] = useState(false);
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
				console.log('rs', rs);
				if (rs.success) {
					setSubmitting(false);
					notifySuccess(
						`you have enrolled ${patient.other_names} into immunization`
					);
					dispatch(updatePatient(rs.patient));
					history.push(`${location.pathname}#immunization-chart`);
				} else {
					setSubmitting(false);
					notifyError(rs.message);
					console.error(rs.message);
				}
			} catch (error) {
				setSubmitting(false);
				console.log(error.message);
				notifyError(error.message || 'Could not add leave request');
			}
		}
	};
	return (
		<>
			{/* <div className="col-sm-3">
				<div className="user-profile compact">
					<div className="up-contents">
						<PatientData patient={patient} />
					</div>
				</div>
			</div> */}
			{/*  */}
			<div className="col-lg-3 col-md-12">
				<div className="user-profile compact">
					<div
						className="up-head-w"
						style={{
							backgroundImage: `url(${
								patient?.profile_pic ? patient?.profile_pic : patientProfilePic
							})`,
						}}>
						<div className="up-main-info">
							<h2 className="up-header">{`${patient?.surname} ${patient?.other_names}`}</h2>
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
					<div className="up-controls">
						<div className="row">
							<div className="col-sm-6">
								<div className="value-pair">
									<div className="label">Status:</div>
									<div className="value badge badge-pill badge-success">
										Online
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="up-contents">
						<div className="m-b">
							<div className="row">
								<div className="col-sm-12 b-b">
									<div className="el-tablo centered padded-v">
										<div className="value">{patient?.maritalStatus}</div>
										<div className="label">Marital Status</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-5 px-0">
									<div className="el-tablo padded-v pr-0">
										<div className="value customfont">{patient?.gender}</div>
										<div className="label">Gender</div>
									</div>
								</div>
								<div className="col-sm-6 b-b">
									<div className="el-tablo padded-v">
										<div className="">{formatPatientId(patient?.id)}</div>
										<div className="label">Patient ID</div>
									</div>
								</div>
							</div>
							<table className="table" cellpadding="0" cellspacing="0">
								<tbody>
									<tr className="small">
										<th scope="row" className="font-weight-bold px-0">
											Email
										</th>

										<td>{patient?.email}</td>
									</tr>

									<tr className="small">
										<td className="font-weight-bold px-0">Phone Number</td>
										<td>{patient?.phoneNumber}</td>
									</tr>
									{/* <tr className="small">
										<td className="font-weight-bold">
											Contact Address
										</td>
										<td>{patient?.address}</td>
									</tr> */}
									<tr className="small">
										<td className="font-weight-bold px-0">Marital Status</td>
										<td>{patient?.maritalStatus}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold px-0">Ethnicity</td>
										<td>{patient?.ethnicity}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold px-0">Occupation</td>
										<td>{patient?.occupation}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold px-0">Number of Visits</td>
										<td>{patient?.noOfVisits}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/*  */}
			<div className="col-lg-9 col-md-12">
				<div className="element-actions d-none d-sm-block">
					<PatientActions
						location={location}
						enrollImmunization={enrollImmunization}
						isAdmitted={isAdmitted}
					/>
				</div>

				<div className="element-box mt-2">
					<div className="os-tabs-w">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs smaller">
								<li className="nav-item">
									<a
										className={
											tab === 'visitSummary' ? 'nav-link active' : 'nav-link'
										}
										onClick={() => setTab('visitSummary')}>
										Visit Summary
									</a>
								</li>
								<li className="nav-item">
									<a
										className={
											tab === 'appointment' ? 'nav-link active' : 'nav-link'
										}
										onClick={() => setTab('appointment')}>
										Appointment History
									</a>
								</li>
								<li className="nav-item">
									<a
										className={
											tab === 'billing' ? 'nav-link active' : 'nav-link'
										}
										onClick={() => setTab('billing')}>
										Billings
									</a>
								</li>
							</ul>
						</div>
						<div className="tab-content">
							{tab === 'visitSummary' && <VisitSummaryTable />}
							{tab === 'appointment' && <AppointmentHistoryTable />}
							{tab === 'billing' && <BillingTable />}
						</div>
					</div>
				</div>
			</div>

			{/* <div className="col-lg-9 col-md-12">
				<div className="element-wrapper">
					<div className="element-box">
						<table className="table table-padded">
							<tbody>
								<tr>
									<td className="font-weight-bold">File Number</td>
									<td>{patient?.fileNumber}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Email Address</td>
									<td>{patient?.email}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Phone Number</td>
									<td>{patient?.phoneNumber}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Contact Address</td>
									<td>{patient?.address}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Marital Status</td>
									<td>{patient?.maritalStatus}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Ethnicity</td>
									<td>{patient?.ethnicity}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Occupation</td>
									<td>{patient?.occupation}</td>
								</tr>
								<tr>
									<td className="font-weight-bold">Number of Visits</td>
									<td>{patient?.noOfVisits}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default withRouter(Dashboard);
