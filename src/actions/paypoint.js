import {
	CREATE_VOUCHER,
	DELETE_VOUCHER,
	LOAD_VOUCHER,
	UPDATE_VOUCHER,
} from './types';

export const createVoucherData = data => {
	return {
		type: CREATE_VOUCHER,
		payload: data,
	};
};

export const loadVoucher = data => {
	return {
		type: LOAD_VOUCHER,
		payload: data,
	};
};

export const updateVoucher = data => {
	return {
		type: UPDATE_VOUCHER,
		payload: data,
	};
};

export const deleteVoucher = data => {
	return {
		type: DELETE_VOUCHER,
		payload: data,
	};
};
