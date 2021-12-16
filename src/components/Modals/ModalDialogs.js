import React from 'react';
import { connect } from 'react-redux';

import ModalAddTask from './ModalAddTask';
import ModalLeaveHistory from './ModalLeaveHistory';
import ModalViewAppraisal from './ModalViewAppraisal';
import ModalPayrollHistory from './ModalPayrollHistory';
import ModalCurrentPayroll from './ModalCurrentPayroll';
import ModalEditPayroll from './ModalEditPayroll';
import ModalCreateLabMeasurement from './ModalCreateLabMeasurement';
import ModalCreateRiskAssessment from './ModalCreateRiskAssessment';
import ModalCreateRecordDelivery from './ModalCreateRecordDelivery';
import ModalCreateRecordVital from './ModalCreateRecordVital';
import ModalCreateClinicalTask from './ModalCreateClinicalTask';
import ModalLineAppraisal from './ModalLineAppraisal';
import ModalStaffAppraisal from './ModalStaffAppraisal';
import ModalLabourMeasurementDetail from './ModalLabourMeasurementDetail';

const ModalDialogs = ({
	add_task,
	show_history,
	view_appraisal,
	view_payroll_history,
	current_payroll,
	edit_payroll,
	create_labour_measurement,
	create_record_delivery,
	create_risk_assessment,
	create_record_vital,
	create_clinical_task,
	line_appraisal,
	staff_appraisal,
	view_labour_measurement,
}) => {
	return (
		<>
			{add_task && <ModalAddTask />}
			{show_history && <ModalLeaveHistory />}
			{view_appraisal && <ModalViewAppraisal />}
			{view_payroll_history && <ModalPayrollHistory />}
			{current_payroll && <ModalCurrentPayroll />}
			{edit_payroll && <ModalEditPayroll />}
			{create_labour_measurement && <ModalCreateLabMeasurement />}
			{create_risk_assessment && <ModalCreateRiskAssessment />}
			{create_record_delivery && <ModalCreateRecordDelivery />}
			{create_record_vital && <ModalCreateRecordVital />}
			{create_clinical_task && <ModalCreateClinicalTask />}
			{line_appraisal && <ModalLineAppraisal />}
			{staff_appraisal && <ModalStaffAppraisal />}
			{view_labour_measurement && <ModalLabourMeasurementDetail />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		show_history: state.general.show_history,
		add_task: state.general.add_task,
		view_appraisal: state.general.view_appraisal,
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		edit_payroll: state.general.edit_payroll,
		create_labour_measurement: state.general.create_labour_measurement,
		create_record_delivery: state.general.create_record_delivery,
		create_risk_assessment: state.general.create_risk_assessment,
		create_record_vital: state.general.create_record_vital,
		create_clinical_task: state.general.create_clinical_task,
		line_appraisal: state.general.line_appraisal,
		staff_appraisal: state.general.staff_appraisal,
		view_labour_measurement: state.general.view_labour_measurement,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
