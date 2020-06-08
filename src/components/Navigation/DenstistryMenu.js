import React from 'react';
import { Link } from 'react-router-dom';

const DenstistryMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Dentistry</span>
			</li>

			<li>
				<Link to="/dentistry">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default DenstistryMenu;
