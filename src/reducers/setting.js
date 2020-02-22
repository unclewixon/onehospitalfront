import { CREATE_DEPARTMENT, GET_ALL_DEPARTMENTS } from '../actions/types';

const INITIAL_STATE = {
	departments: [],
	rooms: [],
	room_categories: [],
	lab_tests: [],
	lab_categories: [],
	lab_parameters: [],
	leave_categories: [],
};

const setting = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_DEPARTMENT:
			return { ...state, departments: [...state.departments, action.payload] };
		case GET_ALL_DEPARTMENTS:
			return { ...state, departments: action.payload };
		default:
			return state;
	}
};

export default setting;
