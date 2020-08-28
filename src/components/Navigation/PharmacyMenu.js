import React from 'react';
import { Link } from 'react-router-dom';
const PharmacyMenu = () => {
	return (
		<>
			<li>
				<Link to="/pharmacy2">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/pharmacy2/opd-patients">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Immunization</span>
				</Link>
			</li>
		</>
	);
};

export default PharmacyMenu;
