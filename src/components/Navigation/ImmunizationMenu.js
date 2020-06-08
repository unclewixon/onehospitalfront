import React from 'react';
import { Link } from 'react-router-dom';
const ImmunizationMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Immunization</span>
			</li>

			<li>
				<Link to="/immunization">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default ImmunizationMenu;
