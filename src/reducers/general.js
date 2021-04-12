import {
	TOGGLE_PRELOADING,
	SIGN_OUT,
	TOGGLE_IS_MODAL,
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_EDIT_STAFF,
	TOGGLE_CREATE_INVENTORY,
	TOGGLE_EDIT_INVENTORY,
	TOGGLE_UPDATE_QTY,
	TOGGLE_REGISTER_NEW_PATIENT,
	TOGGLE_VIEW_APPRAISAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_PREPARE_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	TOGGLE_VIEW_PAYPOINT,
	TOGGLE_CREATE_VOUCHER,
	TOGGLE_UPLOAD_HMO,
	TOGGLE_UPLOAD_HMO_TARIFF,
	TOGGLE_CREATE_LABOUR_MEASUREMENT,
	TOGGLE_CREATE_RISK_ASSESSMENT,
	TOGGLE_CREATE_RECORD_VITAL,
	TOGGLE_CREATE_RECORD_DELIVERY,
	TOGGLE_CREATE_CLINICAL_TASK,
	TOGGLE_ADD_CAFETERIA_FILE,
	TOGGLE_UPLOAD_RADIOLOGY,
	TOGGLE_APPROVE_TRANSACTION,
	TOGGLE_APPROVE_HMO_TRANSACTION,
	TOGGLE_APPLY_VOUCHER,
	TOGGLE_ANTENATAL_DETAIL,
	TOGGLE_ANTENATAL_ASSESSMENT_DETAIL,
	TOGGLE_LINE_APPRAISAL,
	TOGGLE_STAFF_APPRAISAL,
	TOGGLE_LABOUR_MEASURMENT_DETAIL,
	TOGGLE_ADD_ACCOUNT,
	TOGGLE_EDIT_ACCOUNT,
	ADD_STAFF_FOR_APPRAISAL,
	SET_IS_STAFF_APPRAISAL,
} from '../actions/types';

const INITIAL_STATE = {
	preloading: true,
	is_modal_open: false,
	is_modal: false,
	create_staff: false,
	set_leave: false,
	show_history: false,
	create_inventory: false,
	edit_inventory: false,
	update_inventory_qty: false,
	register_new_patient: false,
	view_appraisal: false,
	view_payroll_history: false,
	current_payroll: false,
	prepare_payroll: false,
	edit_payroll: false,
	approve_hmo_transaction: false,
	view_paypoint: false,
	create_voucher: false,
	apply_voucher: false,
	create_labour_measurement: false,
	create_risk_assessment: false,
	create_record_delivery: false,
	create_record_vital: false,
	add_cafeteria_file: false,
	payroll_id: null,
	payroll_staff: null,
	upload_diagnosis: false,
	upload_radiology: false,
	upload_hmo: false,
	upload_hmo_tariff: false,
	create_clinical_task: false,
	edit_service: { status: false, data: null },
	antenatal_detail: false,
	antenatal_id: null,
	antenatal_assessment_detail: false,
	antenatal_visit: null,
	line_appraisal: false,
	staff_appraisal: false,
	staff: null,
	labourMeasurementDetail: null,
	view_labour_measurement: false,
	create_account: false,
	accountChart: null,
	edit_account: false,
	staffForApraisal: null,
	isStaffAppraisal: false,
	isAntenatalOpen: false,
};

const general = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_IS_STAFF_APPRAISAL:
			return { ...state, isStaffAppraisal: action.payload };
		case TOGGLE_PRELOADING:
			return { ...state, preloading: action.payload };
		case ADD_STAFF_FOR_APPRAISAL:
			return { ...state, staffForApraisal: action.payload };
		case SIGN_OUT:
			return { ...state, ...INITIAL_STATE, preloading: false };
		case TOGGLE_IS_MODAL:
			return { ...state, is_modal: action.payload };
		case TOGGLE_MODAL:
			return { ...state, is_modal_open: action.payload };
		case TOGGLE_CREATE_STAFF:
			return {
				...state,
				create_staff: action.payload.status,
				staff: action.payload.staff,
			};
		case TOGGLE_EDIT_STAFF:
			return { ...state, edit_staff: action.payload };
		case TOGGLE_SHOW_HISTORY:
			return { ...state, show_history: action.payload };
		case TOGGLE_CREATE_INVENTORY:
			return { ...state, create_inventory: action.payload };
		case TOGGLE_EDIT_INVENTORY:
			return { ...state, edit_inventory: action.payload };
		case TOGGLE_APPROVE_TRANSACTION:
			return { ...state, approve_transaction: action.payload };
		case TOGGLE_APPROVE_HMO_TRANSACTION:
			return { ...state, approve_hmo_transaction: action.payload };
		case TOGGLE_UPDATE_QTY:
			return { ...state, update_inventory_qty: action.payload };
		case TOGGLE_REGISTER_NEW_PATIENT:
			return { ...state, register_new_patient: action.payload };
		case TOGGLE_VIEW_APPRAISAL:
			return { ...state, view_appraisal: action.payload };
		case TOGGLE_VIEW_PAYROLL_HISTORY:
			return {
				...state,
				view_payroll_history: action.payload,
				payroll_staff: action.staff,
			};
		case TOGGLE_VIEW_CURRENT_PAYROLL:
			return {
				...state,
				current_payroll: action.payload,
				payroll_id: action.id,
			};
		case TOGGLE_PREPARE_PAYROLL:
			return { ...state, prepare_payroll: action.payload };
		case TOGGLE_EDIT_PAYROLL:
			return { ...state, edit_payroll: action.payload, payroll_id: action.id };
		case TOGGLE_VIEW_PAYPOINT:
			return { ...state, view_paypoint: action.payload };
		case TOGGLE_CREATE_LABOUR_MEASUREMENT:
			return { ...state, create_labour_measurement: action.payload };
		case TOGGLE_CREATE_RISK_ASSESSMENT:
			return { ...state, create_risk_assessment: action.payload };
		case TOGGLE_CREATE_RECORD_DELIVERY:
			return { ...state, create_record_delivery: action.payload };
		case TOGGLE_CREATE_RECORD_VITAL:
			return { ...state, create_record_vital: action.payload };
		case TOGGLE_CREATE_VOUCHER:
			return { ...state, create_voucher: action.payload };
		case TOGGLE_APPLY_VOUCHER:
			return { ...state, apply_voucher: action.payload };
		case TOGGLE_CREATE_CLINICAL_TASK:
			return { ...state, create_clinical_task: action.payload };
		case TOGGLE_UPLOAD_RADIOLOGY:
			return { ...state, upload_radiology: action.payload };
		case TOGGLE_UPLOAD_HMO:
			return { ...state, upload_hmo: action.payload };
		case TOGGLE_UPLOAD_HMO_TARIFF:
			return { ...state, upload_hmo_tariff: action.payload };

		case TOGGLE_ADD_CAFETERIA_FILE:
			return { ...state, add_cafeteria_file: action.payload };
		case TOGGLE_ANTENATAL_DETAIL:
			return {
				...state,
				// antenatal_detail: action.payload,
				antenatal_id: action.id,
				isAntenatalOpen: action.payload,
			};
		case TOGGLE_ANTENATAL_ASSESSMENT_DETAIL:
			return {
				...state,
				antenatal_assessment_detail: action.payload,
				antenatal_visit: action.data,
			};
		case TOGGLE_LINE_APPRAISAL:
			return {
				...state,
				line_appraisal: action.payload,
			};
		case TOGGLE_STAFF_APPRAISAL:
			return {
				...state,
				staff: action.data,
				staff_appraisal: action.payload,
			};
		case TOGGLE_LABOUR_MEASURMENT_DETAIL:
			return {
				...state,
				labourMeasurementDetail: action.data,
				view_labour_measurement: action.payload,
			};

		case TOGGLE_ADD_ACCOUNT:
			return {
				...state,
				create_account: action.payload,
			};
		case TOGGLE_EDIT_ACCOUNT:
			return {
				...state,
				edit_account: action.payload,
				accountChart: action.data,
			};
		default:
			return state;
	}
};

export default general;
