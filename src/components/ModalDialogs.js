import React from 'react';
import { connect } from 'react-redux';

import ModalCreateStaff from './ModalCreateStaff';
import ModalSetLeave from './ModalSetLeave';
import ModalLeaveHistory from './ModalLeaveHistory';
import ModalCreateInventory from './ModalCreateInventory';
import ModalEditInventory from './ModalEditInventory';
import ModalUpdInventoryQty from './ModalUpdInventoryQty';
import ModalCreateInvCategory from './ModalCreateInvCategory';
import ModalEditInvCategory from './ModalEditInvCategory';

const ModalDialogs = ({ create_staff, set_leave, show_history, create_inventory, edit_inventory, update_inventory_qty, create_inv_cat, edit_inv_cat }) => {
	return (
		<>
			{create_staff && <ModalCreateStaff />}
			{set_leave && <ModalSetLeave />}
			{show_history && <ModalLeaveHistory />}
			{create_inventory && <ModalCreateInventory />}
			{edit_inventory && <ModalEditInventory />}
			{update_inventory_qty && <ModalUpdInventoryQty />}
			{create_inv_cat && <ModalCreateInvCategory />}
			{edit_inv_cat && <ModalEditInvCategory />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		create_staff: state.general.create_staff,
		show_history: state.general.show_history,
		set_leave: state.general.set_leave,
		create_inventory: state.general.create_inventory,
		edit_inventory: state.general.edit_inventory,
		update_inventory_qty: state.general.update_inventory_qty,
		create_inv_cat: state.general.create_inv_cat,
		edit_inv_cat: state.general.edit_inv_cat,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
