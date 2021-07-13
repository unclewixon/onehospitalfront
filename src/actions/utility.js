import { LOAD_BANKS, LOAD_COUNTRIES, LOAD_PAYMENT_METHODS } from './types';

export const loadBanks = data => {
	return {
		type: LOAD_BANKS,
		payload: data,
	};
};

export const loadCountries = data => {
	return {
		type: LOAD_COUNTRIES,
		payload: data,
	};
};

export const loadPaymentMethods = data => {
	return {
		type: LOAD_PAYMENT_METHODS,
		payload: data,
	};
};
