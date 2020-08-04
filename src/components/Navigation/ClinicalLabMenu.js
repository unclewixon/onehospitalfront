import React from 'react';
import { Link } from 'react-router-dom';

const ClinicalLabMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Lab & Radiology</span>
			</li>
			<li>
				<Link to="/lab">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default ClinicalLabMenu;
