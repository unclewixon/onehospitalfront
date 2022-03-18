import {
	DELETE_TRANSACTION,
	LOAD_TRANSACTIONS,
	UPDATE_TRANSACTION,
	ADD_TRANSACTION,
} from '../actions/types';
import { updateImmutable } from '../services/utilities';

const INITIAL_STATE = {
	transactions: [],
};

const transaction = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_TRANSACTIONS:
			return { ...state, transactions: action.payload };
		case ADD_TRANSACTION:
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case UPDATE_TRANSACTION:
			const transactions = updateImmutable(state.transactions, action.payload);
			return {
				...state,
				transactions,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter(
					transaction => transaction.id !== action.payload.id
				),
			};

		default:
			return state;
	}
};

export default transaction;
