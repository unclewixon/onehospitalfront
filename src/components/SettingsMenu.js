import React from 'react';
import { Link } from 'react-router-dom';

const SettingsMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Settings Mgt</span>
			</li>
			<li>
				<Link to="/settings/roles">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Roles</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/departments">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Departments</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/diagnosis">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Diagnosis</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/lab-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Laboratory</span>
				</Link>
			</li>
			<li>
				<Link to="/settings/room-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Room Management</span>
				</Link>
			</li>
		</>
	);
};

export default SettingsMenu;
