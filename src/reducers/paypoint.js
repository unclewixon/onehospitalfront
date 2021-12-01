import { GET_ALL_PENDING_TRANSACTIONS } from '../actions/types';

const INITIAL_STATE = {
	pendingTransactions: [],
};

const paypoint = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL_PENDING_TRANSACTIONS:
			return {
				...state,
				pendingTransactions: action.payload,
			};
		default:
			return state;
	}
};

export default paypoint;
