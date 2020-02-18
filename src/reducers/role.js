import { LOAD_ROLES, NEW_ROLE, UPDATE_ROLE } from '../actions/types';

const INITIAL_STATE = {
	roles: [],
};

const role = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_ROLES:
			return { ...state, roles: action.payload };
		case NEW_ROLE:
			return { ...state, roles: [...state.roles, action.payload] };
		case UPDATE_ROLE:
			const roles = state.roles;
			const role = roles.find(r => r.id === action.payload.id);
			if (role) {
				const idx = roles.findIndex(r => r.id === action.payload.id);
				return {
					...state,
					roles: [
						...state.roles.slice(0, idx),
						{ ...role, ...action.payload },
						...state.roles.slice(idx + 1),
					],
				};
			}
			return state;
		default:
			return state;
	}
};

export default role;
