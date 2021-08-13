import axios from 'axios';
import { API_URI } from '../services/constants';
import {
	ADD_LAB_TEST,
	SET_LAB_TESTS,
	UPDATE_LAB_TEST,
	DELETE_LAB_TEST,
	ADD_LAB_TEST_CATEGORY,
	GET_ALL_LAB_TEST_CATEGORIES,
	UPDATE_LAB_TEST_CATEGORY,
	DELETE_LAB_TEST_CATEGORY,
	ADD_LEAVE_CATEGORY,
	GET_ALL_LEAVE_CATEGORIES,
	UPDATE_LEAVE_CATEGORY,
	DELETE_LEAVE_CATEGORY,
	ADD_SPECIALIZATION,
	GET_ALL_SPECIALIZATIONS,
	UPDATE_SPECIALIZATION,
	DELETE_SPECIALIZATION,
	LOAD_STAFFS,
	GET_ALL_REQUEST_SERVICES,
	LOAD_SERVICES,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DELETE_SERVICE,
	LOAD_SERVICES_CATEGORIES,
	RESET_SERVICES,
} from './types';

//Request Service
export const get_all_request_services = payload => {
	return { type: GET_ALL_REQUEST_SERVICES, payload };
};

//Services
export const loadServiceCategories = payload => {
	return {
		type: LOAD_SERVICES_CATEGORIES,
		payload,
	};
};

export const loadServices = payload => {
	return {
		type: LOAD_SERVICES,
		payload,
	};
};

export const addService = payload => {
	return {
		type: ADD_SERVICE,
		payload,
	};
};

export const updateService = payload => {
	return {
		type: UPDATE_SERVICE,
		payload,
	};
};

export const deleteService = payload => {
	return {
		type: DELETE_SERVICE,
		payload,
	};
};

export const resetService = () => {
	return {
		type: RESET_SERVICES,
	};
};

//Lab
export const setLabTests = payload => {
	return {
		type: SET_LAB_TESTS,
		payload,
	};
};

export const addLabTest = payload => {
	return {
		type: ADD_LAB_TEST,
		payload,
	};
};

export const updateLabTest = payload => {
	return {
		type: UPDATE_LAB_TEST,
		payload,
	};
};

export const deleteLabTest = payload => {
	return {
		type: DELETE_LAB_TEST,
		payload,
	};
};

export const addLabCategory = payload => {
	return {
		type: ADD_LAB_TEST_CATEGORY,
		payload,
	};
};

export const getLabCategories = payload => {
	return {
		type: GET_ALL_LAB_TEST_CATEGORIES,
		payload,
	};
};

export const updateLabCategory = payload => {
	return {
		type: UPDATE_LAB_TEST_CATEGORY,
		payload,
	};
};

export const deleteLabCategory = payload => {
	return {
		type: DELETE_LAB_TEST_CATEGORY,
		payload,
	};
};

//Leave Category
export const add_leave_category = payload => {
	return {
		type: ADD_LEAVE_CATEGORY,
		payload,
	};
};

export const get_all_leave_category = payload => {
	return {
		type: GET_ALL_LEAVE_CATEGORIES,
		payload,
	};
};

export const update_leave_category = (payload, previousData) => {
	return {
		type: UPDATE_LEAVE_CATEGORY,
		payload,
		previousData,
	};
};

export const delete_leave_category = payload => {
	return {
		type: DELETE_LEAVE_CATEGORY,
		payload,
	};
};

//Specialization
export const addSpecialization = payload => {
	return {
		type: ADD_SPECIALIZATION,
		payload,
	};
};

export const loadSpecializations = payload => {
	return {
		type: GET_ALL_SPECIALIZATIONS,
		payload,
	};
};

export const updateSpecialization = payload => {
	return {
		type: UPDATE_SPECIALIZATION,
		payload,
	};
};

export const deleteSpecialization = payload => {
	return {
		type: DELETE_SPECIALIZATION,
		payload,
	};
};

export const get_all_staff = payload => {
	return {
		type: LOAD_STAFFS,
		payload,
	};
};

//Leave Category
export const addLeaveCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/leave-category`, {
					name: data.name,
					duration: data.duration,
				})
				.then(response => {
					dispatch(add_leave_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllLeaveCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/leave-category`)
				.then(response => {
					dispatch(get_all_leave_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateLeaveCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/leave-category/${data.id}/update`, {
					name: data.name,
					duration: data.duration,
				})
				.then(response => {
					dispatch(update_leave_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteLeaveCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/leave-category/${data.id}`)
				.then(response => {
					dispatch(delete_leave_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//GET ALL STAFF
export const getAllStaff = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/hr/staffs`)
				.then(response => {
					dispatch(get_all_staff(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllRequestServices = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/request-types`)
				.then(response => {
					dispatch(get_all_request_services(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};
