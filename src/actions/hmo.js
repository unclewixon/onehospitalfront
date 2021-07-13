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

export const addHmo = payload => {
	return {
		type: ADD_HMO,
		payload,
	};
};

export const fetchHmo = payload => {
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

export const updateHmo = payload => {
	return {
		type: UPDATE_HMO,
		payload,
	};
};

export const deleteHmo = payload => {
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
