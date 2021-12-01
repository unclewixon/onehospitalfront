import { GET_ALL_PENDING_TRANSACTIONS } from './types';

export const getAllPendingTransactions = data => {
	return {
		type: GET_ALL_PENDING_TRANSACTIONS,
		payload: data,
	};
};
