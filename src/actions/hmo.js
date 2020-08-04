import {
	ADD_HMO,
	FETCH_ALL_HMOS_DATA,
	UPDATE_HMO,
	DELETE_HMO,
	UPLOAD_HMO,
	FETCH_HMO_TARIFF,
	LOAD_HMO_TRANSACTION,
} from './types';
import axios from 'axios';
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
	// console.log(data);
	return dispatch => {
		return axios
			.post(`${API_URI}/${hmoAPI}`, data)
			.then(response => {
				// console.log(response);
				return dispatch(add_hmo(response.data));
			})
			.catch(error => {
				// console.log(error);
				return error;
			});
	};
};

export const getAllHmos = data => {
	return async dispatch => {
		try {
			const rs = await request(`${hmoAPI}`, 'GET', true);
			console.log(rs, 'get All hmo');
			dispatch(fetch_all_hmos_data(rs));
			return { success: true };
		} catch (e) {
			return { success: false };
		}
	};
};

export const fetchHmoTariff = data => {
	console.log(data);
	return dispatch => {
		return axios
			.get(`${API_URI}/${hmoAPI}/${data}/tariff?listType=services`, {})
			.then(response => {
				console.log(response.data, 'Hmo tariff');
				return dispatch(fetch_hmo_tariff(response.data));
			})
			.catch(error => {
				return error;
			});
	};
};

export const updateHmo = (EditedData, previousData) => {
	console.log(previousData.id, EditedData);
	return dispatch => {
		return axios
			.patch(`${API_URI}/${hmoAPI}/${previousData.id}/update`, EditedData)
			.then(response => {
				return dispatch(update_hmo(response.data, previousData));
			})
			.catch(error => {
				return error;
			});
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
				.then(response => {
					// adispatch(upload_hmo(response.data));
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
				.then(response => {
					return resolve({ success: true });
				})
				.catch(error => {
					return reject(error)({ success: false });
				});
		});
	};
};

export const deleteHmo = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/${hmoAPI}/${data.id}`)
			.then(response => {
				console.log(response.data);
				return dispatch(delete_hmo(data));
			})
			.catch(error => {
				return error;
			});
	};
};
