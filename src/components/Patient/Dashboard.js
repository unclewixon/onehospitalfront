/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import patientProfile from '../../assets/svg-icons/patientProfile.svg';
import patientProfilePic from '../../assets/images/patientprofile.jpg';
import PatientData from '../PatientData';
import { Link, withRouter } from 'react-router-dom';
import RoleBlock from '../RoleBlock';
import VisitSummaryTable from './VisitSummaryTable';
import BillingTable from './BillingTable';
import AppointmentHistoryTable from './AppointmentHistoryTable';
import PatientActions from '../PatientActions';

const Dashboard = ({ location }) => {
	const patient = useSelector(state => state.user.patient);
	const [tab, setTab] = useState('visitSummary');

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
						style={{ backgroundImage: `url(${patientProfilePic})` }}>
						<div className="up-main-info">
							<h2 className="up-header">{`${patient?.surname} ${patient?.other_names}`}</h2>
							<h6 className="up-sub-header">
								<div className="value-pair">
									<div className="label pr-2" style={{ color: 'inherit' }}>
										File Number:
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
										<div className="value">25</div>
										<div className="label">Products Sold</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6 b-b">
									<div className="el-tablo padded-v">
										<div className="value customfont">25</div>
										<div className="label">Gender</div>
									</div>
								</div>
								<div className="col-sm-6 b-b">
									<div className="el-tablo padded-v">
										<div className="value customfont">315</div>
										<div className="label">File Number</div>
									</div>
								</div>
							</div>
							<table className="table">
								<tbody>
									<tr className="small">
										<th scope="row" className="font-weight-bold">
											Email
										</th>

										<td>{patient?.email}</td>
									</tr>

									<tr className="small">
										<td className="font-weight-bold">Phone Number</td>
										<td>{patient?.phoneNumber}</td>
									</tr>
									{/* <tr className="small">
										<td className="font-weight-bold">
											Contact Address
										</td>
										<td>{patient?.address}</td>
									</tr> */}
									<tr className="small">
										<td className="font-weight-bold">Marital Status</td>
										<td>{patient?.maritalStatus}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold">Ethnicity</td>
										<td>{patient?.ethnicity}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold">Occupation</td>
										<td>{patient?.occupation}</td>
									</tr>
									<tr className="small">
										<td className="font-weight-bold">Number of Visits</td>
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
					<PatientActions location={location} />
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
