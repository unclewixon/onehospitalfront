/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import patientProfile from '../../assets/svg-icons/patientProfile.svg';
import {
	formatPatientId,
	parseAvatar,
	request,
} from '../../services/utilities';
import VisitSummaryTable from './VisitSummaryTable';
import VisitNotesTable from './VisitNotesTable';
import BillingTable from './BillingTable';
import AppointmentHistory from './AppointmentHistory';
import PatientActions from '../PatientActions';
import { patientAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { updatePatient } from '../../actions/patient';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Dashboard = ({ location, history }) => {
	const [tab, setTab] = useState('visitNotes');
	const patient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const enrollImmunization = async () => {
		const result = window.confirm('Enroll into immunization?');
		if (result) {
			try {
				dispatch(startBlock());
				const data = { patient_id: patient.id };
				const url = `${patientAPI}/immunization/enroll`;
				const rs = await request(url, 'POST', true, data);
				console.log('rs', rs);
				dispatch(stopBlock());
				if (rs.success) {
					notifySuccess(
						`you have enrolled ${patient.other_names} into immunization`
					);
					dispatch(updatePatient(rs.patient));
					history.push(`${location.pathname}#immunization-chart`);
				} else {
					notifyError(rs.message);
					console.error(rs.message);
				}
			} catch (error) {
				dispatch(stopBlock());
				console.log(error.message);
				notifyError(error.message || 'Could not add leave request');
			}
		}
	};

	return (
		<>
			<div className="col-lg-3 col-md-12">
				<div className="user-profile compact">
					<div
						className="up-head-w"
						style={{
							backgroundImage: `url(${parseAvatar(patient?.profile_pic)})`,
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
					{patient?.isAdmitted && (
						<div className="up-controls">
							<div className="row">
								<div className="col-sm-12">
									<div className="value-pair">
										<div className="label">Status:</div>
										<div className="value badge badge-pill badge-danger ml-2">
											Admitted
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					<div className="up-contents">
						<div className="m-b">
							<div className="row">
								<div className="col-sm-12 b-b">
									<div className="el-tablo centered padded-v">
										<div className="label">Marital Status</div>
										<div className="value">{patient?.maritalStatus}</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-5 px-0">
									<div className="el-tablo padded-v pr-0">
										<div className="label">Gender</div>
										<div className="value customfont">{patient?.gender}</div>
									</div>
								</div>
								<div className="col-sm-6 b-b">
									<div className="el-tablo padded-v">
										<div className="label">Patient ID</div>
										<div className="">{formatPatientId(patient?.id)}</div>
									</div>
								</div>
							</div>
							<table className="table" cellPadding="0" cellSpacing="0">
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

			<div className="col-lg-9 col-md-12">
				<div className="element-actions d-none d-sm-block">
					<PatientActions
						location={location}
						enrollImmunization={enrollImmunization}
						isAdmitted={patient?.isAdmitted}
					/>
				</div>

				<div className="element-box mt-2">
					<div className="os-tabs-w">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs smaller">
								<li className="nav-item">
									<a
										className={
											tab === 'visitNotes' ? 'nav-link active' : 'nav-link'
										}
										onClick={() => setTab('visitNotes')}>
										Visit Notes
									</a>
								</li>
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
							{tab === 'visitNotes' && <VisitNotesTable />}
							{tab === 'visitSummary' && <VisitSummaryTable />}
							{tab === 'appointment' && <AppointmentHistory />}
							{tab === 'billing' && <BillingTable />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(Dashboard);
