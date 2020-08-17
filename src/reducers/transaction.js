import {
	LOAD_TODAY_TRANSACTION,
	DELETE_TRANSACTION,
	LOAD_RECENT_TRANSACTION,
	UPDATE_TRANSACTION,
	ADD_TRANSACTION,
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
		case ADD_TRANSACTION:
			return {
				...state,
				reviewTransaction: [...state.reviewTransaction, action.payload],
			};
		case UPDATE_TRANSACTION:
			const reviewTransactions = state.reviewTransaction;
			reviewTransactions.forEach(function(value, i) {
				if (value.id === action.payload.id) {
					reviewTransactions.splice(i, 1);
				}
			});
			return {
				...state,
				reviewTransaction: [...reviewTransactions, action.payload],
			};
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
