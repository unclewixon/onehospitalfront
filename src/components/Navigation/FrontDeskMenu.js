import React from 'react';
import { Link } from 'react-router-dom';

const FrontDeskMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>FRONTDESK</span>
			</li>
			<li>
				<Link to="/front-desk">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Dashboard</span>
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
			<li className="sub-header">
				<span>MY ACCOUNT</span>
			</li>
			<li>
				<Link to="/front-desk/profile">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Payslips</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-patients">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Payslips</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-patients">
					<div className="icon-w">
						<div className="os-icon icon-feather-calendar" />
					</div>
					<span>Duty Roaster</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-patients">
					<div className="icon-w">
						<div className="os-icon os-icon-bar-chart-stats-up" />
					</div>
					<span>Appraisal</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/all-patients">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Leave Request</span>
				</Link>
			</li>
		</>
	);
};

export default FrontDeskMenu;
