import React from 'react';
import { Link } from 'react-router-dom';

const SettingsMenu = ({ role }) => {
	return (
		<>
			<li className="sub-header">
				<span>CONFIGURATIONS</span>
			</li>
			<li>
				<Link
					to={
						role === 'lab-attendant' ||
						role === 'lab-officer' ||
						role === 'lab-supervisor' ||
						role === 'lab-hod'
							? '/settings/lab-mgt'
							: '/settings'
					}>
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Settings</span>
				</Link>
			</li>
		</>
	);
};

export default SettingsMenu;
