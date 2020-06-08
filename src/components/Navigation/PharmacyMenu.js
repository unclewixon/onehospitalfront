import React from 'react';
import { Link } from 'react-router-dom';
const PharmacyMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Pharmacy</span>
			</li>

			<li>
				<Link to="/pharmacy2">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default PharmacyMenu;
