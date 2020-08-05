import React from 'react';
import { Link } from 'react-router-dom';
import MyAccount from './MyAccount';

const FrontDeskMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>MY TASKS</span>
			</li>
			<li>
				<Link to="/front-desk">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Home</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-appointments">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Appointments</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-patients">
					<div className="icon-w">
						<div className="os-icon os-icon-cv-2" />
					</div>
					<span>Patients</span>
				</Link>
			</li>
			<MyAccount />
		</>
	);
};

export default FrontDeskMenu;
