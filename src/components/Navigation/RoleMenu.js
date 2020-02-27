import React from 'react';
import { Link } from 'react-router-dom';

const Consultation = () => {
	return (
		<>
			<li className="sub-header">
				<span>Role</span>
			</li>
			<li>
				<Link to="/settings/staff/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Lab</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Consultation</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/leave-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Room Mgt</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/staff/roster">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Diagnosis</span>
				</Link>
			</li>
		</>
	);
};

export default Consultation;
