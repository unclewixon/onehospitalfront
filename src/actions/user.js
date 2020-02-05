import * as types from './types';

export const loginUser = user => {
	return {
		type: types.SET_PROFILE,
		payload: user,
		status: true,
	};
};

export const signOut = () => {
	return {
		type: types.SIGN_OUT,
	};
};
