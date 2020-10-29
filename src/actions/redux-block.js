import { REQUEST_START, REQUEST_STOP } from './types';

export const startBlock = () => {
	return dispatch => {
		dispatch({ type: REQUEST_START });
	};
};

export const stopBlock = () => {
	return dispatch => {
		dispatch({ type: REQUEST_STOP });
	};
};
