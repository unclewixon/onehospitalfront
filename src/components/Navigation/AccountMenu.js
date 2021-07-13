import React from 'react';
import { Link } from 'react-router-dom';

const AccountMenu = () => {
	return (
		<>
			<li>
				<Link to="/account/reports/trial-balance">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Reports</span>
				</Link>
			</li>
			<li>
				<Link to="/account/journal-entry">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Journal Entry</span>
				</Link>
			</li>
			<li>
				<Link to="/account/setup/coa/category">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Set up</span>
				</Link>
			</li>
		</>
	);
};

export default AccountMenu;
