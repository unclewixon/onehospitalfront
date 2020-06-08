import React from 'react';
import { Link } from 'react-router-dom';

const PayPointMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Pay Point</span>
			</li>
			<li>
				<Link to="/billing-paypoint">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default PayPointMenu;
