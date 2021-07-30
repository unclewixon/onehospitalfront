import React from 'react';
import { Link } from 'react-router-dom';

const CafeteriaMenu = () => {
	return (
		<>
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
				<Link to="/cafeteria/requisitions">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Requisitions</span>
				</Link>
			</li>
		</>
	);
};

export default CafeteriaMenu;
