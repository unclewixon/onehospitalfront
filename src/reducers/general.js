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
	TOGGLE_CREATE_APPOINTMENT,
	TOGGLE_VIEW_APPOINTMENT_DETAIL,
	TOGGLE_VIEW_APPRAISAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_PREPARE_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	TOGGLE_VIEW_PAYPOINT,
	TOGGLE_CREATE_VOUCHER,
	TOGGLE_UPLOAD_SERVICE,
	TOGGLE_UPLOAD_DIAGNOSIS,
	TOGGLE_EDIT_SERIVCE,
	TOGGLE_CREATE_LABOUR_MEASUREMENT,
	TOGGLE_CREATE_RISK_ASSESSMENT,
	TOGGLE_CREATE_RECORD_VITAL,
	TOGGLE_CREATE_RECORD_DELIVERY,
	TOGGLE_OPEN_ENCOUNTER,
	TOGGLE_CREATE_CLINICAL_TASK,
	TOGGLE_APPROVE_TRANSACTION,
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
	create_new_appointment: false,
	view_appointment_detail: false,
	view_appraisal: false,
	view_payroll_history: false,
	current_payroll: false,
	prepare_payroll: false,
	edit_payroll: false,
	view_paypoint: false,
	create_voucher: false,
	create_labour_measurement: false,
	create_risk_assessment: false,
	create_record_delivery: false,
	create_record_vital: false,
	payroll_id: null,
	payroll_staff: null,
	upload_service: false,
	upload_diagnosis: false,
	create_clinical_task: false,
	edit_service: { status: false, data: null },
	openEncounter: false,
	encounterId: null,
};

const general = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_PRELOADING:
			return { ...state, preloading: action.payload };
		case SIGN_OUT:
			return { ...state, ...INITIAL_STATE, preloading: false };
		case TOGGLE_IS_MODAL:
			return { ...state, is_modal: action.payload };
		case TOGGLE_MODAL:
			return { ...state, is_modal_open: action.payload };
		case TOGGLE_CREATE_STAFF:
			return { ...state, create_staff: action.payload };
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
		case TOGGLE_UPDATE_QTY:
			return { ...state, update_inventory_qty: action.payload };
		case TOGGLE_REGISTER_NEW_PATIENT:
			return { ...state, register_new_patient: action.payload };
		case TOGGLE_CREATE_APPOINTMENT:
			return { ...state, create_new_appointment: action.payload };
		case TOGGLE_VIEW_APPOINTMENT_DETAIL:
			return { ...state, view_appointment_detail: action.payload };
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
		case TOGGLE_CREATE_CLINICAL_TASK:
			return { ...state, create_clinical_task: action.payload };
		case TOGGLE_UPLOAD_SERVICE:
			return { ...state, upload_service: action.payload };
		case TOGGLE_UPLOAD_DIAGNOSIS:
			return { ...state, upload_diagnosis: action.payload };
		case TOGGLE_EDIT_SERIVCE:
			return { ...state, edit_service: action.payload };
		case TOGGLE_OPEN_ENCOUNTER:
			return {
				...state,
				openEncounter: action.payload,
				encounterId: action.id,
			};
		default:
			return state;
	}
};

export default general;
