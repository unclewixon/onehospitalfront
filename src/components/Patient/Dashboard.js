/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';

import PatientData from '../PatientData';

const Dashboard = () => {
	const patient = useSelector(state => state.user.patient);

	return (
		<>
			<div className="col-sm-3">
				<div className="user-profile compact">
					<div className="up-contents">
						<PatientData patient={patient} />
					</div>
				</div>
			</div>
			<div className="col-sm-9">
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
			</div>
		</>
	);
};

export default Dashboard;
