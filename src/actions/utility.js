import { LOAD_BANKS, LOAD_COUNTRIES } from './types';

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
