import React from 'react';
import { Link } from 'react-router-dom';

const PatientMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Staff Mgt</span>
			</li>
			<li>
				<Link to="/settings/staff/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Staff List</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Payroll</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/leave-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Leave Mgt</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/roster">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Duty Roster</span>
				</Link>
			</li>
		</>
	);
};

export default PatientMenu;
