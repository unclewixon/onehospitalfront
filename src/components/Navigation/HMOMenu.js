import React from 'react';
import { Link } from 'react-router-dom';

const HMOMenu = () => {
	return (
		<>
			<li>
				<Link to="/hmo">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>List of HMOs</span>
				</Link>
			</li>
			<li>
				<Link to="/hmo/tariffs">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>HMO Tariffs</span>
				</Link>
			</li>
			<li>
				<Link to="/hmo/transactions">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Transactions</span>
				</Link>
			</li>
		</>
	);
};

export default HMOMenu;
