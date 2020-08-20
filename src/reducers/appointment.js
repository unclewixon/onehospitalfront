import {
	LOAD_APPOINTMENTS,
	ADD_APPOINTMENT,
	UPDATE_APPOINTMENT,
} from '../actions/types';

const INITIAL_STATE = {
	list: [],
};

const appointment = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_APPOINTMENTS:
			return { ...state, list: action.payload };
		case ADD_APPOINTMENT:
			return { ...state, list: [...state.list, action.payload] };
		case UPDATE_APPOINTMENT:
			const found = state.list.find(a => a.id === action.payload.id);
			if (found) {
				const index = state.list.findIndex(a => a.id === action.payload.id);

				return {
					...state,
					list: [
						...state.list.slice(0, index),
						{ ...found, ...action.payload },
						...state.list.slice(index + 1),
					],
				};
			}

			return state;
		default:
			return state;
	}
};

export default appointment;
