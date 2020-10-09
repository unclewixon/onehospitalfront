import React from 'react';
import { Link } from 'react-router-dom';

const FrontDeskMenu = () => {
	return (
		<>
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
			<li>
				<Link to="/front-desk/all-in-patients">
					<div className="icon-w">
						<div className="icon-feather-folder-plus" />
					</div>
					<span>In Patients</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-notifications">
					<div className="icon-w">
						<div className="icon-feather-bell" />
					</div>
					<span>Notifications</span>
				</Link>
			</li>
		</>
	);
};

export default FrontDeskMenu;
