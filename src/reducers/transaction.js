import {
	LOAD_TODAY_TRANSACTION,
	DELETE_TRANSACTION,
	LOAD_RECENT_TRANSACTION,
} from '../actions/types';

const INITIAL_STATE = {
	todayTransaction: [],
	reviewTransaction: [],
};

const transaction = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_TODAY_TRANSACTION:
			return { ...state, todayTransaction: action.payload };
		case LOAD_RECENT_TRANSACTION:
			return { ...state, reviewTransaction: action.payload };
		case DELETE_TRANSACTION:
			return {
				...state,
				todayTransaction: state.todayTransaction.filter(
					transaction => transaction.q_id !== action.payload.q_id
				),
				reviewTransaction: state.reviewTransaction.filter(
					transaction => transaction.q_id !== action.payload.q_id
				),
			};

		default:
			return state;
	}
};

export default transaction;
