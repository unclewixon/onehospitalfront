import axios from 'axios';
import { API_URI, transactionsAPI } from '../services/constants';

import {
	LOAD_TODAY_TRANSACTION,
	LOAD_RECENT_TRANSACTION,
	DELETE_TRANSACTION,
	UPDATE_TRANSACTION,
	ADD_TRANSACTION,
} from './types';

export const loadTodayTransaction = data => {
	return {
		type: LOAD_TODAY_TRANSACTION,
		payload: data,
	};
};

export const loadTransaction = data => {
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

export const delete_transaction = data => {
	return {
		type: DELETE_TRANSACTION,
		payload: data,
	};
};

export const deleteTransaction = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/${transactionsAPI}/${data.id}?id=${data.id}`)
				.then(response => {
					dispatch(delete_transaction(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};
