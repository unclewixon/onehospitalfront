import React from 'react';
import { Link } from 'react-router-dom';

const SettingsMenu = () => {
	return (
		<>
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
