import React from 'react';
import { connect } from 'react-redux';

import ModalAddTask from './ModalAddTask';
import ModalLeaveHistory from './ModalLeaveHistory';
import ModalCreateInventory from './ModalCreateInventory';
import ModalEditInventory from './ModalEditInventory';
import ModalUpdInventoryQty from './ModalUpdInventoryQty';
import ModalViewAppraisal from './ModalViewAppraisal';
import ModalPayrollHistory from './ModalPayrollHistory';
import ModalCurrentPayroll from './ModalCurrentPayroll';
import ModalEditPayroll from './ModalEditPayroll';
import ModalUploadHmo from './ModalUploadHmo';
import ModalCreateLabMeasurement from './ModalCreateLabMeasurement';
import ModalCreateRiskAssessment from './ModalCreateRiskAssessment';
import ModalCreateRecordDelivery from './ModalCreateRecordDelivery';
import ModalCreateRecordVital from './ModalCreateRecordVital';
import ModalCreateClinicalTask from './ModalCreateClinicalTask';
import AddCafeteriaFile from './AddCafeteriaFile';
import ModalLineAppraisal from './ModalLineAppraisal';
import ModalStaffAppraisal from './ModalStaffAppraisal';
import ModalLabourMeasurementDetail from './ModalLabourMeasurementDetail';
import ModalCreateAccount from './ModalCreateAccount';
import ModalEditAccount from './ModalEditAccount';

const ModalDialogs = ({
	add_task,
	show_history,
	create_inventory,
	edit_inventory,
	update_inventory_qty,
	view_appraisal,
	view_payroll_history,
	current_payroll,
	edit_payroll,
	create_labour_measurement,
	create_record_delivery,
	create_risk_assessment,
	create_record_vital,
	upload_hmo,
	create_clinical_task,
	add_cafeteria_file,
	line_appraisal,
	staff_appraisal,
	view_labour_measurement,
	create_account,
	edit_account,
}) => {
	return (
		<>
			{add_task && <ModalAddTask />}
			{show_history && <ModalLeaveHistory />}
			{create_inventory && <ModalCreateInventory />}
			{edit_inventory && <ModalEditInventory />}
			{update_inventory_qty && <ModalUpdInventoryQty />}
			{view_appraisal && <ModalViewAppraisal />}
			{view_payroll_history && <ModalPayrollHistory />}
			{current_payroll && <ModalCurrentPayroll />}
			{edit_payroll && <ModalEditPayroll />}
			{create_labour_measurement && <ModalCreateLabMeasurement />}
			{create_risk_assessment && <ModalCreateRiskAssessment />}
			{create_record_delivery && <ModalCreateRecordDelivery />}
			{create_record_vital && <ModalCreateRecordVital />}
			{upload_hmo && <ModalUploadHmo />}
			{create_clinical_task && <ModalCreateClinicalTask />}
			{add_cafeteria_file && <AddCafeteriaFile />}
			{line_appraisal && <ModalLineAppraisal />}
			{staff_appraisal && <ModalStaffAppraisal />}
			{view_labour_measurement && <ModalLabourMeasurementDetail />}
			{create_account && <ModalCreateAccount />}
			{edit_account && <ModalEditAccount />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		show_history: state.general.show_history,
		add_task: state.general.add_task,
		create_inventory: state.general.create_inventory,
		edit_inventory: state.general.edit_inventory,
		update_inventory_qty: state.general.update_inventory_qty,
		view_appraisal: state.general.view_appraisal,
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		edit_payroll: state.general.edit_payroll,
		create_labour_measurement: state.general.create_labour_measurement,
		create_record_delivery: state.general.create_record_delivery,
		create_risk_assessment: state.general.create_risk_assessment,
		create_record_vital: state.general.create_record_vital,
		upload_hmo: state.general.upload_hmo,
		upload_hmo_tariff: state.general.upload_hmo_tariff,
		create_clinical_task: state.general.create_clinical_task,
		add_cafeteria_file: state.general.add_cafeteria_file,
		line_appraisal: state.general.line_appraisal,
		staff_appraisal: state.general.staff_appraisal,
		view_labour_measurement: state.general.view_labour_measurement,
		create_account: state.general.create_account,
		edit_account: state.general.edit_account,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
