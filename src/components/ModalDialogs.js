import React from 'react';
import { connect } from 'react-redux';

import ModalCreateStaff from './ModalCreateStaff';
import ModalEditStaff from './ModalEditStaff';
import ModalAddTask from "./ModalAddTask";
import ModalLeaveHistory from './ModalLeaveHistory';
import ModalCreateInventory from './ModalCreateInventory';
import ModalEditInventory from './ModalEditInventory';
import ModalUpdInventoryQty from './ModalUpdInventoryQty';
import ModalCreateInvCategory from './ModalCreateInvCategory';
import ModalEditInvCategory from './ModalEditInvCategory';
import ModalCreateRole from './ModalCreateRole';
import ModalViewAppraisal from './ModalViewAppraisal';
import ModalPayrollHistory from './ModalPayrollHistory';
import ModalCurrentPayroll from './ModalCurrentPayroll';
import ModalPreparePayroll from './ModalPreparePayroll';
import ModalEditPayroll from './ModalEditPayroll';

const ModalDialogs = ({ create_staff, edit_staff,add_task,  show_history, create_inventory, edit_inventory, update_inventory_qty, create_inv_cat, edit_inv_cat, create_role, view_appraisal, view_payroll_history, current_payroll, prepare_payroll, edit_payroll}) => {
	return (
		<>
			{create_staff && <ModalCreateStaff />}
			{edit_staff && <ModalEditStaff />}
			{add_task && <ModalAddTask />}
			{show_history && <ModalLeaveHistory />}
			{create_inventory && <ModalCreateInventory />}
			{edit_inventory && <ModalEditInventory />}
			{update_inventory_qty && <ModalUpdInventoryQty />}
			{create_inv_cat && <ModalCreateInvCategory />}
			{edit_inv_cat && <ModalEditInvCategory />}
			{create_role && <ModalCreateRole />}
			{view_appraisal && <ModalViewAppraisal />}
			{view_payroll_history && <ModalPayrollHistory />}
			{current_payroll && <ModalCurrentPayroll />}
			{prepare_payroll && <ModalPreparePayroll />}
			{edit_payroll && <ModalEditPayroll />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		create_staff: state.general.create_staff,
		edit_staff: state.general.edit_staff,
		show_history: state.general.show_history,
		add_task: state.general.add_task,
		set_leave: state.general.set_leave,
		create_inventory: state.general.create_inventory,
		edit_inventory: state.general.edit_inventory,
		update_inventory_qty: state.general.update_inventory_qty,
		create_inv_cat: state.general.create_inv_cat,
		edit_inv_cat: state.general.edit_inv_cat,
		create_role: state.general.create_role,
		view_appraisal: state.general.view_appraisal,
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		prepare_payroll: state.general.prepare_payroll,
		edit_payroll: state.general.edit_payroll,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
