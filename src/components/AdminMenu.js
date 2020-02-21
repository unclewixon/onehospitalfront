import React from 'react';

import HrMenu from './HrMenu';
import SettingsMenu from './SettingsMenu';
import InventoryMenu from './InventoryMenu';

const AdminMenu = () => {
	return (
		<>
			<HrMenu />
			<SettingsMenu />
			<InventoryMenu />
		</>
	);
};

export default AdminMenu;
