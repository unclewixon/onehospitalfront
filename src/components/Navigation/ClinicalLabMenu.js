import React from 'react';
import { Link } from 'react-router-dom';

const ClinicalLabMenu = () => {
	return (
		<>
			<li>
				<Link to="/lab">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/lab/new-request">
					<div className="icon-w">
						<div className="os-icon os-icon-plus-circle" />
					</div>
					<span>New Lab Request</span>
				</Link>
			</li>
		</>
	);
};

export default ClinicalLabMenu;
