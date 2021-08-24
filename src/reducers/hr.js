import {
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	LOAD_UNPAID_PAYROLL,
	LOAD_PAYROLL_HISTORY,
	ADD_PERFORMANCE_PERIOD,
	LOAD_PERFORMANCE_PERIOD,
	SET_PERFORMANCE_PERIOD,
} from '../actions/types';

const INITIAL_STATE = {
	appraisals: [],
	staff_leave: [],
	duty_rosters: [],
	payrolls: [],
	unpaid_payrolls: [],
	history_payrolls: [],
	performancePeriods: [],
	performancePeriod: {},
};

const hr = (state = INITIAL_STATE, action) => {
	switch (action.type) {
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
		case LOAD_PERFORMANCE_PERIOD:
			return { ...state, performancePeriods: action.payload };
		case ADD_PERFORMANCE_PERIOD:
			return {
				...state,
				performancePeriods: [...state.performancePeriods, action.payload],
			};
		case SET_PERFORMANCE_PERIOD:
			return {
				...state,
				performancePeriod: action.payload,
			};
		default:
			return state;
	}
};

export default hr;
