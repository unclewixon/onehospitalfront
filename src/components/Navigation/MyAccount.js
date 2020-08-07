import React from 'react';
import { Link } from 'react-router-dom';
import { Can } from '../common/Can';

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
				<Link to="/my-account/duty-roaster">
					<div className="icon-w">
						<div className="os-icon icon-feather-calendar" />
					</div>
					<span>Duty Roaster</span>
				</Link>
			</li>
			<li>
				<Link to="/my/appraisal">
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
			<Can I="excuse-duty" on="all">
				<li>
					<Link to="/excuse-duty">
						<div className="icon-w">
							<div className="os-icon os-icon-agenda-1" />
						</div>
						<span>Excuse Duty</span>
					</Link>
				</li>
			</Can>
		</>
	);
};

export default MyAccount;
