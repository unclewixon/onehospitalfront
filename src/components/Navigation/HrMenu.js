import React from 'react';
import { Link } from 'react-router-dom';

const HrMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>HR & Payroll</span>
			</li>
			<li>
				<Link to="/hr/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Staff List</span>
				</Link>
			</li>
			<li>
				<Link to="/hr/appraisal">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Appraisal</span>
				</Link>
			</li>
			<li>
				<Link to="/hr/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Payroll</span>
				</Link>
			</li>
			<li>
				<Link to="/hr/leave-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Leave Mgt</span>
				</Link>
			</li>
			<li>
				<Link to="/hr/roster">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Duty Roster</span>
				</Link>
			</li>
		</>
	);
};

export default HrMenu;