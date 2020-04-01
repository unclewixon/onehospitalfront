import React from 'react';
import { Link } from 'react-router-dom';

const CafeteriaMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Cafeteria</span>
			</li>
			<li>
				<Link to="/cafeteria">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/cafeteria/inventory">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Inventory</span>
				</Link>
			</li>
			<li>
				<Link to="/cafeteria/items/">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Item</span>
				</Link>
			</li>
		</>
	);
};

export default CafeteriaMenu;
