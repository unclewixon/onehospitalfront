import React from 'react';
import { Link } from 'react-router-dom';

const HMOMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>HMO Mgt</span>
			</li>
			<li>
				<Link to="/hmo/dashboard">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/hmo/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>List of HMOs</span>
				</Link>
			</li>
			<li>
				<Link to="/hmo/bulk-upload">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Upload HMO</span>
				</Link>
			</li>
		</>
	);
};

export default HMOMenu;
