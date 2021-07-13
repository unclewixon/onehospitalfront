import {
	ADD_HMO,
	FETCH_ALL_HMOS_DATA,
	FETCH_HMO_TARIFF,
	UPDATE_HMO,
	UPLOAD_HMO,
	DELETE_HMO,
	LOAD_HMO_TRANSACTION,
} from '../actions/types';

const INITIAL_STATE = {
	hmo_list: [],
	hmo_tariff: [],
	hmo_upload_progress: 0,
	hmo_transactions: [],
};

const hmo = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_HMO:
			return { ...state, hmo_list: [...state.hmo_list, action.payload] };
		case FETCH_ALL_HMOS_DATA:
			return { ...state, hmo_list: action.payload };
		case LOAD_HMO_TRANSACTION:
			return { ...state, hmo_transactions: action.payload };
		case FETCH_HMO_TARIFF:
			return { ...state, hmo_tariff: action.payload };
		case UPDATE_HMO:
			const found = state.hmo_list.find(a => a.id === action.payload.id);
			if (found) {
				const index = state.hmo_list.findIndex(a => a.id === action.payload.id);

				return {
					...state,
					hmo_list: [
						...state.hmo_list.slice(0, index),
						{ ...found, ...action.payload },
						...state.hmo_list.slice(index + 1),
					],
				};
			}

			return state;
		case UPLOAD_HMO:
			return { ...state, hmo_upload_progress: action.payload };
		case DELETE_HMO:
			return {
				...state,
				hmo_list: state.hmo_list.filter(item => item.id !== action.payload.id),
			};
		default:
			return state;
	}
};

export default hmo;
