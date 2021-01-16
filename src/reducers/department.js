import { LOAD_DEPARTMENTS, UPDATE_DEPARTMENT } from '../actions/types';
import { updateImmutable } from '../services/utilities';

const department = (state = [], action) => {
	switch (action.type) {
		case LOAD_DEPARTMENTS:
			return [...action.payload];
		case UPDATE_DEPARTMENT:
			const departments = updateImmutable(state, action.payload);
			return [...departments];
		default:
			return state;
	}
};

export default department;
