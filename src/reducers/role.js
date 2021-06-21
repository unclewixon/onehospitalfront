import { LOAD_ROLES, UPDATE_ROLE, ADD_ROLE } from '../actions/types';
import { updateImmutable } from '../services/utilities';

const INITIAL_STATE = {
	roles: [],
};

const role = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_ROLES:
			return { ...state, roles: action.payload };
		case ADD_ROLE:
			return { ...state, roles: [...state.roles, action.payload] };
		case UPDATE_ROLE:
			const roles = updateImmutable(state.roles, action.payload);
			return { ...state, roles: [...roles] };
		default:
			return state;
	}
};

export default role;
