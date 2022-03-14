import React from 'react';
import { Link } from 'react-router-dom';
const AccountingMenu = () => {
	return <>
		<li>
			<Link to="/hr/payroll">
				<div className="icon-w">
					<div className="os-icon os-icon-layers" />
				</div>
				<span>Payroll</span>
			</Link>
		</li>
	</>;
};

export default AccountingMenu;
