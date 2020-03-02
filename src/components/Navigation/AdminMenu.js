import React from 'react';
import { Link } from 'react-router-dom';

import HrMenu from './HrMenu';
import InventoryMenu from './InventoryMenu';

const AdminMenu = () => {
	return (
		<>
			{/* <HrMenu /> */}
			<li className="sub-header">
				<span>Configurations</span>
			</li>
			<li>
				<Link to="/settings/roles">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Settings</span>
				</Link>
			</li>
			{/* <InventoryMenu /> */}
		</>
	);
};

export default AdminMenu;
