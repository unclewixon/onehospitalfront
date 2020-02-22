import {
	LOAD_STAFFS,
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	ADD_STAFF,
} from '../actions/types';

const INITIAL_STATE = {
	staffs: [],
	appraisals: [],
	staff_leave: [],
	duty_rosters: [],
	payrolls: [],
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_STAFFS:
			return { ...state, staffs: action.payload };
		case ADD_STAFF:
			return { ...state, staffs: [action.payload, ...state.staffs] };
		case LOAD_APPRAISALS:
			return { ...state, appraisals: action.payload };
		case LOAD_LEAVE:
			return { ...state, staff_leave: action.payload };
		case LOAD_DUTY_ROSTERS:
			return { ...state, duty_rosters: action.payload };
		case LOAD_PAYROLL:
			return { ...state, payrolls: action.payload };
		default:
			return state;
	}
};

export default user;
