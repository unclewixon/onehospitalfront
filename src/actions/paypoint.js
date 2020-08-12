import {
	CREATE_VOUCHER,
	DELETE_VOUCHER,
	LOAD_VOUCHER,
	UPDATE_VOUCHER,
	GET_ALL_PENDING_TRANSACTIONS,
	SHOW_INVOICE,
	SHOW_RECEIPT,
	TRANSACTION_DATA,
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

export const getAllPendingTransactions = data => {
	return {
		type: GET_ALL_PENDING_TRANSACTIONS,
		payload: data,
	};
};

export const showReceiptToPrint = data => {
	return {
		type: SHOW_RECEIPT,
		payload: data,
	};
};

export const showInvoiceToPrint = data => {
	return {
		type: SHOW_INVOICE,
		payload: data,
	};
};

export const getTransactionData = data => {
	return {
		type: TRANSACTION_DATA,
		payload: data,
	};
};
