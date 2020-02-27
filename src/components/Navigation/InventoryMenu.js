import React from 'react';
import { Link } from 'react-router-dom';

const InventoryMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Inventory Mgt</span>
			</li>
			<li>
				<Link to="/inventory/categories">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Categories</span>
				</Link>
			</li>
			<li>
				<Link to="/inventory/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Inventory List</span>
				</Link>
			</li>
		</>
	);
};

export default InventoryMenu;
