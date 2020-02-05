import {
	START_PRELOADING,
	STOP_PRELOADING,
	SIGN_OUT,
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_SET_LEAVE,
	TOGGLE_CREATE_INVENTORY,
	TOGGLE_EDIT_INVENTORY,
	TOGGLE_UPDATE_QTY,
	TOGGLE_CREATE_INV_CAT,
	TOGGLE_EDIT_INV_CAT,
} from '../actions/types';

const INITIAL_STATE = {
	preloading: false,
	isModalOpen: false,
	create_staff: false,
	set_leave: false,
	show_history: false,
	create_inventory: false,
	edit_inventory: false,
	update_inventory_qty: false,
	create_inv_cat: false,
	edit_inv_cat: false,
};

const general = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_PRELOADING:
			return { ...state, preloading: true };
		case STOP_PRELOADING:
			return { ...state, preloading: false };
		case SIGN_OUT:
			return { ...state, preloading: false };
		case TOGGLE_MODAL:
			return { ...state, isModalOpen: action.payload };
		case TOGGLE_CREATE_STAFF:
			return { ...state, create_staff: action.payload };
		case TOGGLE_SHOW_HISTORY:
			return { ...state, show_history: action.payload };
		case TOGGLE_SET_LEAVE:
			return { ...state, set_leave: action.payload };
		case TOGGLE_CREATE_INVENTORY:
			return { ...state, create_inventory: action.payload };
		case TOGGLE_EDIT_INVENTORY:
			return { ...state, edit_inventory: action.payload };
		case TOGGLE_UPDATE_QTY:
			return { ...state, update_inventory_qty: action.payload };
		case TOGGLE_CREATE_INV_CAT:
			return { ...state, create_inv_cat: action.payload };
		case TOGGLE_EDIT_INV_CAT:
			return { ...state, edit_inv_cat: action.payload };
		default:
			return state;
	}
};

export default general;
