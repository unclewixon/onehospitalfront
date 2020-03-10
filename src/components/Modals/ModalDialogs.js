import React from "react";
import { connect } from "react-redux";

import ModalCreateStaff from "./ModalCreateStaff";
import ModalEditStaff from "./ModalEditStaff";
import ModalAddTask from "./ModalAddTask";
import ModalLeaveHistory from "./ModalLeaveHistory";
import ModalCreateInventory from "./ModalCreateInventory";
import ModalEditInventory from "./ModalEditInventory";
import ModalUpdInventoryQty from "./ModalUpdInventoryQty";
import ModalViewAppraisal from "./ModalViewAppraisal";
import ModalPayrollHistory from "./ModalPayrollHistory";
import ModalCurrentPayroll from "./ModalCurrentPayroll";
import ModalPreparePayroll from "./ModalPreparePayroll";
import ModalEditPayroll from "./ModalEditPayroll";
import AppointmentFormModal from "./AppointmentFormModal";
import ModalViewAppointment from "./ModalViewAppointment";
import PatientFormModal from "./PatientFormModal";
import ModalUploadService from "./ModalUploadService";

const ModalDialogs = ({
  create_staff,
  edit_staff,
  add_task,
  show_history,
  create_inventory,
  edit_inventory,
  update_inventory_qty,
  create_inv_cat,
  edit_inv_cat,
  create_role,
  view_appraisal,
  view_payroll_history,
  current_payroll,
  prepare_payroll,
  edit_payroll,
  register_new_patient,
  create_new_appointment,
  view_appointment_detail,
  upload_service
}) => {
  return (
    <>
      {create_staff && <ModalCreateStaff />}
      {edit_staff && <ModalEditStaff />}
      {add_task && <ModalAddTask />}
      {show_history && <ModalLeaveHistory />}
      {create_inventory && <ModalCreateInventory />}
      {edit_inventory && <ModalEditInventory />}
      {update_inventory_qty && <ModalUpdInventoryQty />}
      {view_appraisal && <ModalViewAppraisal />}
      {view_payroll_history && <ModalPayrollHistory />}
      {current_payroll && <ModalCurrentPayroll />}
      {prepare_payroll && <ModalPreparePayroll />}
      {edit_payroll && <ModalEditPayroll />}
      {register_new_patient && <PatientFormModal />}
      {create_new_appointment && <AppointmentFormModal />}
      {view_appointment_detail && <ModalViewAppointment />}
      {upload_service && <ModalUploadService />}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    create_staff: state.general.create_staff,
    edit_staff: state.general.edit_staff,
    show_history: state.general.show_history,
    add_task: state.general.add_task,
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
    upload_service: state.general.upload_service
  };
};

export default connect(mapStateToProps)(ModalDialogs);
