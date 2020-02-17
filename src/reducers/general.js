import {
	START_PRELOADING,
	STOP_PRELOADING,
	SIGN_OUT,
	TOGGLE_IS_MODAL,
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_EDIT_STAFF,
	TOGGLE_CREATE_INVENTORY,
	TOGGLE_EDIT_INVENTORY,
	TOGGLE_UPDATE_QTY,
	TOGGLE_VIEW_APPRAISAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_PREPARE_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	TOGGLE_TOGGLE_PROFILE,
} from '../actions/types';

const INITIAL_STATE = {
	preloading: false,
	is_modal_open: false,
	is_modal: false,
	create_staff: false,
	set_leave: false,
	show_history: false,
	create_inventory: false,
	edit_inventory: false,
	update_inventory_qty: false,
	view_appraisal: false,
	view_payroll_history: false,
	current_payroll: false,
	prepare_payroll: false,
	edit_payroll: false,
	is_profile_open: false,
};

const general = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_PRELOADING:
			return { ...state, preloading: true };
		case STOP_PRELOADING:
			return { ...state, preloading: false };
		case SIGN_OUT:
			return { ...state, preloading: false };
		case TOGGLE_IS_MODAL:
			return { ...state, is_modal: action.payload };
		case TOGGLE_TOGGLE_PROFILE:
			return { ...state, is_profile_open: action.payload };
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
		case TOGGLE_UPDATE_QTY:
			return { ...state, update_inventory_qty: action.payload };
		case TOGGLE_VIEW_APPRAISAL:
			return { ...state, view_appraisal: action.payload };
		case TOGGLE_VIEW_PAYROLL_HISTORY:
			return { ...state, view_payroll_history: action.payload };
		case TOGGLE_VIEW_CURRENT_PAYROLL:
			return { ...state, current_payroll: action.payload };
		case TOGGLE_PREPARE_PAYROLL:
			return { ...state, prepare_payroll: action.payload };
		case TOGGLE_EDIT_PAYROLL:
			return { ...state, edit_payroll: action.payload };
		default:
			return state;
	}
};

export default general;
