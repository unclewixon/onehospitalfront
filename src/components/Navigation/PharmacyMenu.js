import React from 'react';
import { Link } from 'react-router-dom';

const PharmacyMenu = () => {
	return (
		<>
			<li>
				<Link to="/pharmacy">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/pharmacy/new-request">
					<div className="icon-w">
						<div className="os-icon os-icon-plus-circle" />
					</div>
					<span>New Request</span>
				</Link>
			</li>
			<li>
				<Link to="/pharmacy/billing">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Pay Point</span>
				</Link>
			</li>
		</>
	);
};

export default PharmacyMenu;
