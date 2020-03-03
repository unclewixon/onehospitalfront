import axios from 'axios';
import { API_URI } from '../services/constants';
import {
	CREATE_DEPARTMENT,
	GET_ALL_DEPARTMENTS,
	UPDATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	ADD_ROOM,
	GET_ALL_ROOMS,
	UPDATE_ROOM,
	DELETE_ROOM,
	ADD_ROOM_CATEGORY,
	GET_ALL_ROOM_CATEGORIES,
	UPDATE_ROOM_CATEGORY,
	DELETE_ROOM_CATEGORY,
	ADD_LAB_TEST,
	GET_ALL_LAB_TESTS,
	UPDATE_LAB_TEST,
	DELETE_LAB_TEST,
	ADD_LAB_TEST_CATEGORY,
	GET_ALL_LAB_TEST_CATEGORIES,
	UPDATE_LAB_TEST_CATEGORY,
	DELETE_LAB_TEST_CATEGORY,
	ADD_LAB_TEST_PARAMETER,
	GET_ALL_LAB_TEST_PARAMETERS,
	UPDATE_LAB_TEST_PARAMETER,
	DELETE_LAB_TEST_PARAMETER,
	ADD_LEAVE_CATEGORY,
	GET_ALL_LEAVE_CATEGORIES,
	UPDATE_LEAVE_CATEGORY,
	DELETE_LEAVE_CATEGORY,
	ADD_SPECIALIZATION,
	GET_ALL_SPECIALIZATIONS,
	UPDATE_SPECIALIZATION,
	DELETE_SPECIALIZATION,
	ADD_CONSULTATING_ROOM,
	UPDATE_CONSULTATING_ROOM,
	DELETE_CONSULTATING_ROOM,
	GET_ALL_CONSULTATING_ROOMS,
} from './types';

//department
export const create_department = payload => {
	return {
		type: CREATE_DEPARTMENT,
		payload,
	};
};

export const get_all_department = payload => {
	return {
		type: GET_ALL_DEPARTMENTS,
		payload,
	};
};

export const update_department = (payload, previousData) => {
	return {
		type: UPDATE_DEPARTMENT,
		payload,
		previousData,
	};
};

export const delete_department = payload => {
	return {
		type: DELETE_DEPARTMENT,
		payload,
	};
};

//room
export const add_room = payload => {
	return {
		type: ADD_ROOM,
		payload,
	};
};

export const get_all_room = payload => {
	return {
		type: GET_ALL_ROOMS,
		payload,
	};
};

export const update_room = (payload, previousData) => {
	return {
		type: UPDATE_ROOM,
		payload,
		previousData,
	};
};

export const delete_room = payload => {
	return {
		type: DELETE_ROOM,
		payload,
	};
};

export const add_room_category = payload => {
	return {
		type: ADD_ROOM_CATEGORY,
		payload,
	};
};

export const get_all_room_category = payload => {
	return {
		type: GET_ALL_ROOM_CATEGORIES,
		payload,
	};
};

export const update_room_category = (payload, previousData) => {
	return {
		type: UPDATE_ROOM_CATEGORY,
		payload,
		previousData,
	};
};

export const delete_room_category = payload => {
	return {
		type: DELETE_ROOM_CATEGORY,
		payload,
	};
};

//Lab
export const add_lab_test = payload => {
	return {
		type: ADD_LAB_TEST,
		payload,
	};
};

export const get_all_lab_tests = payload => {
	return {
		type: GET_ALL_LAB_TESTS,
		payload,
	};
};

export const update_lab_test = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST,
		payload,
		previousData,
	};
};

export const delete_lab_test = payload => {
	return {
		type: DELETE_LAB_TEST,
		payload,
	};
};

export const add_lab_test_category = payload => {
	return {
		type: ADD_LAB_TEST_CATEGORY,
		payload,
	};
};

export const get_all_lab_test_categories = payload => {
	return {
		type: GET_ALL_LAB_TEST_CATEGORIES,
		payload,
	};
};

export const update_lab_test_category = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST_CATEGORY,
		payload,
		previousData,
	};
};

export const delete_lab_test_category = payload => {
	return {
		type: DELETE_LAB_TEST_CATEGORY,
		payload,
	};
};

export const add_lab_test_parameter = payload => {
	return {
		type: ADD_LAB_TEST_PARAMETER,
		payload,
	};
};

export const get_all_lab_test_parameters = payload => {
	return {
		type: GET_ALL_LAB_TEST_PARAMETERS,
		payload,
	};
};

export const update_lab_test_parameter = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST_PARAMETER,
		payload,
		previousData,
	};
};

export const delete_lab_test_parameter = payload => {
	return {
		type: DELETE_LAB_TEST_PARAMETER,
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
export const add_specialziation = payload => {
	return {
		type: ADD_SPECIALIZATION,
		payload,
	};
};

export const get_all_specializations = payload => {
	return {
		type: GET_ALL_SPECIALIZATIONS,
		payload,
	};
};

export const update_specialization = (payload, previousData) => {
	return {
		type: UPDATE_SPECIALIZATION,
		payload,
		previousData,
	};
};

export const delete_specialization = payload => {
	return {
		type: DELETE_SPECIALIZATION,
		payload,
	};
};

//Consultating Room
export const add_consultating_room = payload => {
	return {
		type: ADD_CONSULTATING_ROOM,
		payload,
	};
};

export const get_all_consultating_rooms = payload => {
	return {
		type: GET_ALL_CONSULTATING_ROOMS,
		payload,
	};
};

export const update_consultating_room = (payload, previousData) => {
	return {
		type: UPDATE_CONSULTATING_ROOM,
		payload,
		previousData,
	};
};

export const delete_consultating_room = payload => {
	return {
		type: DELETE_CONSULTATING_ROOM,
		payload,
	};
};

//department
export const createDepartment = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/departments`, {
				name: data.name,
				description: data.description,
			})
			.then(response => {
				return dispatch(create_department(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllDepartments = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/departments`)
			.then(response => {
				return dispatch(get_all_department(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateDepartment = data => {
	return dispatch => {
		return axios
			.put(`${API_URI}/departments/${data.id}`, {
				name: data.name,
				description: data.description,
			})
			.then(response => {
				return dispatch(update_department(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteDepartment = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/departments/${data.id}`, {
				name: data.name,
				description: data.description,
			})
			.then(response => {
				return dispatch(delete_department(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

//room
export const addRoom = data => {
	console.log(data, 'from action');
	return dispatch => {
		return axios
			.post(`${API_URI}/rooms`, {
				name: data.name,
				status: data.status,
				floor: data.floor,
				category: data.category,
			})
			.then(response => {
				return dispatch(add_room(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllRooms = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/rooms`)
			.then(response => {
				return dispatch(get_all_room(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateRoom = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/rooms/${data.id}/update`, {
				name: data.name,
				status: data.status,
				floor: data.status,
				category: data.category,
			})
			.then(response => {
				return dispatch(update_room(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteRoom = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/rooms/${data.id}`)
			.then(response => {
				return dispatch(delete_room(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const addRoomCategory = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/rooms/categories`, {
				name: data.name,
				price: data.price,
				discount: data.discount,
			})
			.then(response => {
				return dispatch(add_room_category(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllRoomCategories = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/rooms/categories`)
			.then(response => {
				return dispatch(get_all_room_category(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateRoomCategory = data => {
	console.log(data);
	return dispatch => {
		return axios
			.patch(`${API_URI}/rooms/categories/${data.id}/update`, {
				name: data.name,
				price: data.price,
				discount: data.discount,
			})
			.then(response => {
				return dispatch(update_room_category(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteRoomCategory = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/rooms/categories/${data.id}`)
			.then(response => {
				return dispatch(delete_room_category(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

//Lab
export const addLabTest = data => {
	console.log(data);
	return dispatch => {
		return axios
			.post(`${API_URI}/lab-tests/categories`, {
				name: data.name,
				price: data.name,
				lab_category_id: data.category,
				test_type: data.testType,
				parameters: data.parameters,
			})
			.then(response => {
				return dispatch(add_lab_test(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllLabTests = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/lab-tests/categories`)
			.then(response => {
				return dispatch(get_all_lab_tests(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateLabTest = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/lab-tests/${data.id}/update`, {
				name: data.name,

				category: data.category,
				price: data.price,
				testType: data.testType,
			})
			.then(response => {
				return dispatch(update_lab_test(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteLabTest = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/lab-tests/${data.id}`)
			.then(response => {
				return dispatch(delete_lab_test(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const addLabTestCategory = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/lab-tests/categories`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(add_lab_test_category(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllLabTestCategories = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/lab-tests/categories`)
			.then(response => {
				return dispatch(get_all_lab_test_categories(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateLabTestCategory = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/lab-tests/categories/${data.id}/update`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(update_lab_test_category(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteLabTestCategory = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/lab-tests/categories/${data.id}`)
			.then(response => {
				return dispatch(delete_lab_test_category(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const addLabTestParameter = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/lab-tests/parameters`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(add_lab_test_parameter(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllLabTestParameters = () => {
	return dispatch => {
		return axios
			.get(`${API_URI}/lab-tests/parameters`)
			.then(response => {
				return dispatch(get_all_lab_test_parameters(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateLabTestParameter = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/lab-tests/parameters/${data.id}/update`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(update_lab_test_parameter(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteLabTestParameters = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/lab-tests/parameters/${data.id}`)
			.then(response => {
				return dispatch(delete_lab_test_parameter(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

//Leave Category
export const addLeaveCategory = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/leave-category`, {
				name: data.name,
				duration: data.name,
			})
			.then(response => {
				return dispatch(add_leave_category(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllLeaveCategory = data => {
	return dispatch => {
		return axios
			.get(`${API_URI}/leave-category`)
			.then(response => {
				return dispatch(get_all_leave_category(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateLeaveCategory = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/leave-category/${data.id}/update`, {
				name: data.name,
				duration: data.duration,
			})
			.then(response => {
				return dispatch(update_leave_category(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteLeaveCategory = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/leave-category/${data.id}`)
			.then(response => {
				return dispatch(delete_leave_category(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

//Specialization
export const addSpecialization = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/specializations`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(add_specialziation(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllSpecialization = data => {
	return dispatch => {
		return axios
			.get(`${API_URI}/specializations`)
			.then(response => {
				return dispatch(get_all_specializations(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateSpecialization = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/specializations/${data.id}/update`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(update_specialization(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteSpecialization = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/specializations/${data.id}`)
			.then(response => {
				return dispatch(delete_specialization(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

//Consultating Room
export const addConsultatingRoom = data => {
	return dispatch => {
		return axios
			.post(`${API_URI}/consulting-rooms`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(add_consultating_room(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const getAllConsultatingRooms = data => {
	return dispatch => {
		return axios
			.get(`${API_URI}/consulting-rooms`)
			.then(response => {
				return dispatch(get_all_consultating_rooms(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateConsultatingRoom = data => {
	return dispatch => {
		return axios
			.patch(`${API_URI}/consulting-rooms/${data.id}/update`, {
				name: data.name,
			})
			.then(response => {
				return dispatch(update_consultating_room(response.data, data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteConsultatingRoom = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/consulting-rooms/${data.id}`)
			.then(response => {
				return dispatch(delete_consultating_room(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};
