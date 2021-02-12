import React from 'react';
import { Link } from 'react-router-dom';

const RadiologyMenu = () => {
	return (
		<>
			<li>
				<Link to="/radiology">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/radiology/new-request">
					<div className="icon-w">
						<div className="os-icon os-icon-plus-circle" />
					</div>
					<span>New Radiology</span>
				</Link>
			</li>
		</>
	);
};

export default RadiologyMenu;
