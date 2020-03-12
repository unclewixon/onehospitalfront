/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';

import PatientData from '../PatientData';

const Dashboard = () => {
	const patient = useSelector((state) => state.user.patient);

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
					<div className="element-box">&nbsp;</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
