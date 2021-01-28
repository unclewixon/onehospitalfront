/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';

import patientProfile from '../../assets/svg-icons/patientProfile.svg';
import PatientData from '../PatientData';

const Dashboard = () => {
	const patient = useSelector(state => state.user.patient);

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
			<div className="col-lg-4 col-md-12">
				<div className="user-profile compact">
					<div
						className="up-head-w"
						style={{ backgroundImage: 'url(img/profile_bg1.jpg)' }}>
						<div className="up-main-info">
							<h2 className="up-header">John Mayers</h2>
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
			<div className="col-lg-8 col-md-12">
				<div className="element-box">
					<div className="os-tabs-w">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs smaller">
								<li className="nav-item">
									<a
										className="nav-link active"
										data-toggle="tab"
										href="#visit_summary">
										Visit Summary
									</a>
								</li>
								<li className="nav-item">
									<a
										className="nav-link"
										data-toggle="tab"
										href="#appointment_history">
										Appointment History
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" data-toggle="tab" href="#billings">
										Billings
									</a>
								</li>
							</ul>
						</div>
						<div className="tab-content">
							<div className="tab-pane active" id="visit_summary"></div>
							<div className="tab-pane" id="appointment_history"></div>
							<div className="tab-pane" id="billings"></div>
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

export default Dashboard;
