import React from 'react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
	return (
		<>
			<li className="sub-header">
				<span>MY ACCOUNT</span>
			</li>
			<li>
				<Link to="/my-account/payslips">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Payslips</span>
				</Link>
			</li>
			<li>
				<Link to="/my-account/duty-roster">
					<div className="icon-w">
						<div className="os-icon icon-feather-calendar" />
					</div>
					<span>Duty Roster</span>
				</Link>
			</li>
			<li>
				<Link to="/my-account/appraisal">
					<div className="icon-w">
						<div className="os-icon os-icon-bar-chart-stats-up" />
					</div>
					<span>Appraisal</span>
				</Link>
			</li>
			<li>
				<Link to="/my-account/leave-request">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Leave Request</span>
				</Link>
			</li>
			<li>
				<Link to="/my-account/requisitions">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Requisitions</span>
				</Link>
			</li>
		</>
	);
};

export default MyAccount;
