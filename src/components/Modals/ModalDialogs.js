import React from 'react';
import { connect } from 'react-redux';

import ModalCreateStaff from './ModalCreateStaff';
import ModalEditStaff from './ModalEditStaff';
import ModalAddTask from './ModalAddTask';
import ModalLeaveHistory from './ModalLeaveHistory';
import ModalCreateInventory from './ModalCreateInventory';
import ModalEditInventory from './ModalEditInventory';
import ModalUpdInventoryQty from './ModalUpdInventoryQty';
import ModalViewAppraisal from './ModalViewAppraisal';
import ModalPayrollHistory from './ModalPayrollHistory';
import ModalCurrentPayroll from './ModalCurrentPayroll';
import ModalPreparePayroll from './ModalPreparePayroll';
import ModalEditPayroll from './ModalEditPayroll';
import AppointmentFormModal from './AppointmentFormModal';
import ModalViewAppointment from './ModalViewAppointment';
import PatientFormModal from './PatientFormModal';
import ModalViewPayPoint from './ModalViewPayPoint';
import ModalUploadService from './ModalUploadService';
import ModalUploadDiagnosis from './ModalUploadDiagnosis';
import ModalUploadHmo from './ModalUploadHmo';
import ModalUploadHmoTariff from './ModalUploadHmoTariff';
import ModalEditService from './ModalEditService';
import ModalCreateLabMeasurement from './ModalCreateLabMeasurement';
import ModalCreateRiskAssessment from './ModalCreateRiskAssessment';
import ModalCreateRecordDelivery from './ModalCreateRecordDelivery';
import ModalCreateRecordVital from './ModalCreateRecordVital';
import OpenEncounter from '../Patient/Modals/OpenEncounter';
import ModalCreateVoucher from './ModalCreateVoucher';
import ModalCreateClinicalTask from './ModalCreateClinicalTask';
import AddCafeteriaFile from './AddCafeteriaFile';
import ModalUploadRadiology from './ModalUploadRadiology';
import ModalApproveTransaction from './ModalApproveTransaction';
import ModalAntenatalDetail from './ModalAntenatalDetail';
import ModalImmunizationDetail from './ModalImmunizationDetail';
import ModalAntenatalAssessmentDetail from './ModalAntenatalAssessmentDetail';

const ModalDialogs = ({
	create_staff,
	edit_staff,
	add_task,
	show_history,
	create_inventory,
	edit_inventory,
	approve_transaction,
	update_inventory_qty,
	view_appraisal,
	view_payroll_history,
	current_payroll,
	prepare_payroll,
	edit_payroll,
	register_new_patient,
	create_new_appointment,
	view_appointment_detail,
	view_paypoint,
	create_labour_measurement,
	create_record_delivery,
	create_risk_assessment,
	create_record_vital,
	upload_service,
	upload_diagnosis,
	upload_hmo,
	upload_hmo_tariff,
	edit_service,
	openEncounter,
	create_voucher,
	create_clinical_task,
	add_cafeteria_file,
	upload_radiology,
	antenatal_detail,
	immunization_detail,
	antenatal_assessment_detail,
}) => {
	return (
		<>
			{create_staff && <ModalCreateStaff />}
			{edit_staff && <ModalEditStaff />}
			{add_task && <ModalAddTask />}
			{show_history && <ModalLeaveHistory />}
			{create_inventory && <ModalCreateInventory />}
			{edit_inventory && <ModalEditInventory />}
			{approve_transaction && <ModalApproveTransaction />}
			{update_inventory_qty && <ModalUpdInventoryQty />}
			{view_appraisal && <ModalViewAppraisal />}
			{view_payroll_history && <ModalPayrollHistory />}
			{current_payroll && <ModalCurrentPayroll />}
			{prepare_payroll && <ModalPreparePayroll />}
			{edit_payroll && <ModalEditPayroll />}
			{register_new_patient && <PatientFormModal />}
			{create_new_appointment && <AppointmentFormModal />}
			{view_appointment_detail && <ModalViewAppointment />}
			{view_paypoint && <ModalViewPayPoint />}
			{create_labour_measurement && <ModalCreateLabMeasurement />}
			{create_risk_assessment && <ModalCreateRiskAssessment />}
			{create_record_delivery && <ModalCreateRecordDelivery />}
			{create_record_vital && <ModalCreateRecordVital />}
			{upload_service && <ModalUploadService />}
			{upload_diagnosis && <ModalUploadDiagnosis />}
			{upload_hmo && <ModalUploadHmo />}
			{upload_hmo_tariff && <ModalUploadHmoTariff />}
			{edit_service.status && <ModalEditService />}
			{create_voucher && <ModalCreateVoucher />}
			{create_clinical_task && <ModalCreateClinicalTask />}
			{openEncounter && <OpenEncounter />}
			{add_cafeteria_file && <AddCafeteriaFile />}
			{upload_radiology && <ModalUploadRadiology />}
			{antenatal_detail && <ModalAntenatalDetail />}
			{immunization_detail && <ModalImmunizationDetail />}
			{antenatal_assessment_detail && <ModalAntenatalAssessmentDetail />}
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
		approve_transaction: state.general.approve_transaction,
		update_inventory_qty: state.general.update_inventory_qty,
		register_new_patient: state.general.register_new_patient,
		create_new_appointment: state.general.create_new_appointment,
		view_appointment_detail: state.general.view_appointment_detail,
		view_appraisal: state.general.view_appraisal,
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		prepare_payroll: state.general.prepare_payroll,
		edit_payroll: state.general.edit_payroll,
		view_paypoint: state.general.view_paypoint,
		create_labour_measurement: state.general.create_labour_measurement,
		create_record_delivery: state.general.create_record_delivery,
		create_risk_assessment: state.general.create_risk_assessment,
		create_record_vital: state.general.create_record_vital,
		upload_service: state.general.upload_service,
		upload_diagnosis: state.general.upload_diagnosis,
		upload_hmo: state.general.upload_hmo,
		upload_hmo_tariff: state.general.upload_hmo_tariff,
		edit_service: state.general.edit_service,
		openEncounter: state.general.openEncounter,
		create_voucher: state.general.create_voucher,
		create_clinical_task: state.general.create_clinical_task,
		add_cafeteria_file: state.general.add_cafeteria_file,
		upload_radiology: state.general.upload_radiology,
		antenatal_detail: state.general.antenatal_detail,
		immunization_detail: state.general.immunization_detail,
		antenatal_assessment_detail: state.general.antenatal_assessment_detail,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
