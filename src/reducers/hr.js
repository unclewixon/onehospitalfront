import {
	LOAD_STAFFS,
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	ADD_STAFF,
	LOAD_UNPAID_PAYROLL,
	LOAD_PAYROLL_HISTORY,
} from '../actions/types';

const INITIAL_STATE = {
	staffs: [],
	appraisals: [],
	staff_leave: [],
	duty_rosters: [],
	payrolls: [],
	unpaid_payrolls: [],
	history_payrolls: [],
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
		case LOAD_UNPAID_PAYROLL:
			return { ...state, unpaid_payrolls: action.payload };
		case LOAD_PAYROLL_HISTORY:
			return { ...state, history_payrolls: action.payload };
		default:
			return state;
	}
};

export default user;
