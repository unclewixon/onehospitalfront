import React from 'react';
import { Link } from 'react-router-dom';
const RadiologyMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Radiology</span>
			</li>

			<li>
				<Link to="/radiology">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default RadiologyMenu;
