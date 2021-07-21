import {
	LOAD_RECENT_TRANSACTION,
	DELETE_TRANSACTION,
	UPDATE_TRANSACTION,
	ADD_TRANSACTION,
} from './types';

export const loadTransactions = data => {
	return {
		type: LOAD_RECENT_TRANSACTION,
		payload: data,
	};
};

export const addTransaction = data => {
	return {
		type: ADD_TRANSACTION,
		payload: data,
	};
};

export const updateTransaction = data => {
	return {
		type: UPDATE_TRANSACTION,
		payload: data,
	};
};

export const deleteTransaction = data => {
	return {
		type: DELETE_TRANSACTION,
		payload: data,
	};
};
