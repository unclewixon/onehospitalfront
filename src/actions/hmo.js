import axios from 'axios';

import {
	ADD_HMO,
	FETCH_ALL_HMOS_DATA,
	UPDATE_HMO,
	DELETE_HMO,
	UPLOAD_HMO,
	FETCH_HMO_TARIFF,
	LOAD_HMO_TRANSACTION,
} from './types';
import { API_URI, hmoAPI } from '../services/constants';
import { request } from '../services/utilities';

export const add_hmo = payload => {
	return {
		type: ADD_HMO,
		payload,
	};
};

export const fetch_all_hmos_data = payload => {
	return {
		type: FETCH_ALL_HMOS_DATA,
		payload,
	};
};

export const fetch_hmo_tariff = payload => {
	return {
		type: FETCH_HMO_TARIFF,
		payload,
	};
};

export const update_hmo = (payload, previousData) => {
	return {
		type: UPDATE_HMO,
		payload,
		previousData,
	};
};

export const delete_hmo = payload => {
	return {
		type: DELETE_HMO,
		payload,
	};
};

const upload_hmo_progress = payload => {
	return {
		type: UPLOAD_HMO,
		payload,
	};
};

export const loadHmoTransaction = payload => {
	return {
		type: LOAD_HMO_TRANSACTION,
		payload,
	};
};

export const addHmo = data => {
	return async dispatch => {
		try {
			const rs = await request(hmoAPI, 'POST', true, data);
			return dispatch(add_hmo(rs));
		} catch (error) {
			return error;
		}
	};
};

export const getAllHmos = data => {
	return async dispatch => {
		try {
			const rs = await request(hmoAPI, 'GET', true);
			dispatch(fetch_all_hmos_data(rs));
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	};
};

export const fetchHmoTariff = data => {
	console.log(data);
	return async dispatch => {
		try {
			const url = `${hmoAPI}/${data || 1}/tariff?listType=services`;
			const rs = await request(url, 'GET', true);
			return rs;
		} catch (error) {
			return error;
		}
	};
};

export const updateHmo = (editedData, previousData) => {
	return async dispatch => {
		const url = `${hmoAPI}/${previousData.id}/update`;
		try {
			const rs = await request(url, 'PATCH', true, editedData);
			return dispatch(update_hmo(rs, previousData));
		} catch (error) {
			return error;
		}
	};
};

export const uploadHmo = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/${hmoAPI}/upload`, data, {
					onUploadProgress: progress => {
						const { loaded, total } = progress;
						dispatch(upload_hmo_progress(Math.round((loaded / total) * 100)));
					},
				})
				.then(rs => {
					// adispatch(upload_hmo(rs.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject(error)({ success: false });
				});
		});
	};
};

export const uploadHmoTariff = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/${hmoAPI}/upload-tariff`, data, {
					onUploadProgress: progress => {
						const { loaded, total } = progress;
						dispatch(upload_hmo_progress(Math.round((loaded / total) * 100)));
					},
				})
				.then(rs => {
					return resolve({ success: true });
				})
				.catch(error => {
					return reject(error)({ success: false });
				});
		});
	};
};

export const deleteHmo = data => {
	return async dispatch => {
		try {
			console.log(data);
			const url = `${hmoAPI}/${data.id}`;
			await request(url, 'DELETE', true);
			dispatch(delete_hmo(data));
			return true;
		} catch (error) {
			return error;
		}
	};
};
