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
			console.log(action, 'from reducer');
			return { ...state, hmo_tariff: action.payload };
		case UPDATE_HMO:
			return {
				...state,
				hmo_list: [
					...state.hmo_list.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case UPLOAD_HMO:
			return { ...state, hmo_upload_progress: action.payload };
		case DELETE_HMO:
			console.log(action.payload);
			return {
				...state,
				hmo_list: state.hmo_list.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default hmo;
