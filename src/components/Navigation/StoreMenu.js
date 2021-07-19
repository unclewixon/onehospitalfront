import React from 'react';
import { Link } from 'react-router-dom';

const StoreMenu = () => {
	return (
		<li>
			<Link to="/store">
				<div className="icon-w">
					<div className="os-icon os-icon-layers" />
				</div>
				<span>Inventory</span>
			</Link>
		</li>
	);
};

export default StoreMenu;
