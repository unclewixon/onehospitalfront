import React from 'react';
import { Link } from 'react-router-dom';

const SettingsMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Configurations</span>
			</li>
			<li>
				<Link to="/settings/roles">
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
