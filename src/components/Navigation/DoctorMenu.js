import React from 'react';
import { Link } from 'react-router-dom';

const DoctorMenu = () => {
	return (
		<>
			<li>
				<Link to="/doctor">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Home</span>
				</Link>
			</li>
			<li>
				<Link to="/doctor/appointments">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Appointment History</span>
				</Link>
			</li>
		</>
	);
};

export default DoctorMenu;
