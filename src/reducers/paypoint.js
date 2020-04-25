import {
	CREATE_VOUCHER,
	LOAD_BANKS,
	LOAD_COUNTRIES,
	LOAD_INVENTORIES,
	LOAD_VOUCHER,
	UPDATE_aVoucher,
	UPDATE_VOUCHER,
} from '../actions/types';

const INITIAL_STATE = {
	voucher: [],
};

const reformatInput = payload => {
	return {
		q_id: payload.id,
		q_isActive: payload.isActive,
		q_createdAt: payload.createdAt,
		q_updateAt: payload.updateAt,
		q_createdBy: payload.createdBy,
		q_lastChangedBy: payload.lastChangedBy,
		q_voucher_no: payload.voucher_no,
		q_amount: payload.amount,
		q_duration: payload.duration,
		q_patientId: payload.patient.id,
		surname: payload.patient.surname,
		other_names: payload.patient.other_names,
	};
};

const paypoint = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_VOUCHER:
			return { ...state, voucher: action.payload };
		case CREATE_VOUCHER:
			return {
				...state,
				voucher: [...state.voucher, action.payload],
			};
		case UPDATE_VOUCHER:
			let formatted = reformatInput(action.payload);
			const voucher = state.voucher;
			const aVoucher = voucher.find(c => c.q_id === formatted.q_id);
			if (aVoucher) {
				const idx = voucher.findIndex(c => c.q_id === formatted.q_id);
				return {
					...state,
					voucher: [
						...state.voucher.slice(0, idx),
						{ ...aVoucher, ...formatted },
						...state.voucher.slice(idx + 1),
					],
				};
			}
			return state;
		default:
			return state;
	}
};

export default paypoint;
