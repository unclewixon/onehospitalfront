import {
	START_PRELOADING,
	STOP_PRELOADING,
	SIGN_OUT,
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_SET_LEAVE,
} from '../actions/types';

const INITIAL_STATE = {
	preloading: false,
	isModalOpen: false,
	create_staff: false,
	set_leave: false,
	show_history: false,
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
		default:
			return state;
	}
};

export default general;
