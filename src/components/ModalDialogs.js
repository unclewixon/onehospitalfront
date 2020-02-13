import React from "react";
import { connect } from "react-redux";

import ModalCreateStaff from "./ModalCreateStaff";
import ModalSetLeave from "./ModalSetLeave";
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
import ModalRegisterPatient from "./ModalRegisterPatient";
import ModalCreateAppointment from "./ModalCreateAppointment";
import ModalViewAppointment from "./ModalViewAppointment";

const ModalDialogs = ({ create_staff, set_leave,add_task,  show_history, create_inventory, edit_inventory, update_inventory_qty, create_inv_cat, edit_inv_cat, create_role, view_appraisal, view_payroll_history, current_payroll, prepare_payroll, edit_payroll, register_new_patient, create_new_appointment, view_appointment_detail }) => {
	return (
		<>
			{create_staff && <ModalCreateStaff />}
			{set_leave && <ModalSetLeave />}
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
      {register_new_patient && <ModalRegisterPatient />}
      {create_new_appointment && <ModalCreateAppointment />}
      {view_appointment_detail && <ModalViewAppointment />}
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
    register_new_patient: state.general.register_new_patient,
    create_new_appointment: state.general.create_new_appointment,
    view_appointment_detail: state.general.view_appointment_detail,
		view_appraisal: state.general.view_appraisal,
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		prepare_payroll: state.general.prepare_payroll,
		edit_payroll: state.general.edit_payroll,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
