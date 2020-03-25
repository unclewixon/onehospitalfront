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
	LOAD_STAFFS,
	ADD_PERMISSION,
	GET_ALL_PERMISSIONS,
	UPDATE_PERMISSION,
	DELETE_PERMISSION,
	ADD_SERVICE_CATEGORY,
	GET_ALL_SERVICE_CATEGORIES,
	UPDATE_SERVICE_CATEGORY,
	DELETE_SERVICE_CATEGORY,
	UPLOAD_SERVICE,
	GET_ALL_SERIVCES,
	UPDATE_SERVICE,
	DOWNLOAD_SERVICE,
	DELETE_SERVICE,
	UPDATE_DIAGNOSIS,
	GET_ALL_DIAGNOSISES,
	DELETE_DIAGNOSIS,
	UPLOAD_DIAGNOSIS,
	ADD_REQUEST_SERVICE,
	GET_ALL_REQUEST_SERVICES,
	UPDATE_REQUEST_SERVICE,
	DELETE_REQUEST_SERVICE,
} from './types';

//Request Service

const add_request_service = payload => {
	return {
		type: ADD_REQUEST_SERVICE,
		payload,
	};
};

const get_all_request_services = payload => {
	return { type: GET_ALL_REQUEST_SERVICES, payload };
};

const update_request_service = (payload, previousData) => {
	return { type: UPDATE_REQUEST_SERVICE, payload, previousData };
};

const delete_request_service = payload => {
	return {
		type: DELETE_REQUEST_SERVICE,
		payload,
	};
};

//department
const create_department = payload => {
	return {
		type: CREATE_DEPARTMENT,
		payload,
	};
};

const get_all_department = payload => {
	return {
		type: GET_ALL_DEPARTMENTS,
		payload,
	};
};

const update_department = (payload, previousData) => {
	return {
		type: UPDATE_DEPARTMENT,
		payload,
		previousData,
	};
};

const delete_department = payload => {
	return {
		type: DELETE_DEPARTMENT,
		payload,
	};
};

//room
const add_room = payload => {
	return {
		type: ADD_ROOM,
		payload,
	};
};

const get_all_room = payload => {
	return {
		type: GET_ALL_ROOMS,
		payload,
	};
};

const update_room = (payload, previousData) => {
	return {
		type: UPDATE_ROOM,
		payload,
		previousData,
	};
};

const delete_room = payload => {
	return {
		type: DELETE_ROOM,
		payload,
	};
};

const add_room_category = payload => {
	return {
		type: ADD_ROOM_CATEGORY,
		payload,
	};
};

const get_all_room_category = payload => {
	return {
		type: GET_ALL_ROOM_CATEGORIES,
		payload,
	};
};

const update_room_category = (payload, previousData) => {
	return {
		type: UPDATE_ROOM_CATEGORY,
		payload,
		previousData,
	};
};

const delete_room_category = payload => {
	return {
		type: DELETE_ROOM_CATEGORY,
		payload,
	};
};

//Lab
const add_lab_test = payload => {
	return {
		type: ADD_LAB_TEST,
		payload,
	};
};

const get_all_lab_tests = payload => {
	return {
		type: GET_ALL_LAB_TESTS,
		payload,
	};
};

const update_lab_test = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST,
		payload,
		previousData,
	};
};

const delete_lab_test = payload => {
	return {
		type: DELETE_LAB_TEST,
		payload,
	};
};

const add_lab_test_category = payload => {
	return {
		type: ADD_LAB_TEST_CATEGORY,
		payload,
	};
};

const get_all_lab_test_categories = payload => {
	return {
		type: GET_ALL_LAB_TEST_CATEGORIES,
		payload,
	};
};

const update_lab_test_category = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST_CATEGORY,
		payload,
		previousData,
	};
};

const delete_lab_test_category = payload => {
	return {
		type: DELETE_LAB_TEST_CATEGORY,
		payload,
	};
};

const add_lab_test_parameter = payload => {
	return {
		type: ADD_LAB_TEST_PARAMETER,
		payload,
	};
};

const get_all_lab_test_parameters = payload => {
	return {
		type: GET_ALL_LAB_TEST_PARAMETERS,
		payload,
	};
};

const update_lab_test_parameter = (payload, previousData) => {
	return {
		type: UPDATE_LAB_TEST_PARAMETER,
		payload,
		previousData,
	};
};

const delete_lab_test_parameter = payload => {
	return {
		type: DELETE_LAB_TEST_PARAMETER,
		payload,
	};
};

//Leave Category
const add_leave_category = payload => {
	return {
		type: ADD_LEAVE_CATEGORY,
		payload,
	};
};

const get_all_leave_category = payload => {
	return {
		type: GET_ALL_LEAVE_CATEGORIES,
		payload,
	};
};

const update_leave_category = (payload, previousData) => {
	return {
		type: UPDATE_LEAVE_CATEGORY,
		payload,
		previousData,
	};
};

const delete_leave_category = payload => {
	return {
		type: DELETE_LEAVE_CATEGORY,
		payload,
	};
};

//Specialization
const add_specialziation = payload => {
	return {
		type: ADD_SPECIALIZATION,
		payload,
	};
};

const get_all_specializations = payload => {
	return {
		type: GET_ALL_SPECIALIZATIONS,
		payload,
	};
};

const update_specialization = (payload, previousData) => {
	return {
		type: UPDATE_SPECIALIZATION,
		payload,
		previousData,
	};
};

const delete_specialization = payload => {
	return {
		type: DELETE_SPECIALIZATION,
		payload,
	};
};

//Consultating Room
const add_consultating_room = payload => {
	return {
		type: ADD_CONSULTATING_ROOM,
		payload,
	};
};

const get_all_consultating_rooms = payload => {
	return {
		type: GET_ALL_CONSULTATING_ROOMS,
		payload,
	};
};

const update_consultating_room = (payload, previousData) => {
	return {
		type: UPDATE_CONSULTATING_ROOM,
		payload,
		previousData,
	};
};

const delete_consultating_room = payload => {
	return {
		type: DELETE_CONSULTATING_ROOM,
		payload,
	};
};

const get_all_staff = payload => {
	return {
		type: LOAD_STAFFS,
		payload,
	};
};

//Permission
const add_permission = payload => {
	return {
		type: ADD_PERMISSION,
		payload,
	};
};

export const get_all_permissions = payload => {
	return {
		type: GET_ALL_PERMISSIONS,
		payload,
	};
};

const update_permission = (payload, previousData) => {
	return {
		type: UPDATE_PERMISSION,
		payload,
		previousData,
	};
};

const delete_permission = payload => {
	return {
		type: DELETE_PERMISSION,
		payload,
	};
};

//Service Category
const add_service_category = payload => {
	return {
		type: ADD_SERVICE_CATEGORY,
		payload,
	};
};

export const get_all_service_categories = payload => {
	return {
		type: GET_ALL_SERVICE_CATEGORIES,
		payload,
	};
};

const update_service_category = (payload, previousData) => {
	return {
		type: UPDATE_SERVICE_CATEGORY,
		payload,
		previousData,
	};
};

const delete_service_category = payload => {
	return {
		type: DELETE_SERVICE_CATEGORY,
		payload,
	};
};

//Service
const upload_service = payload => {
	return {
		type: UPLOAD_SERVICE,
		payload,
	};
};

export const get_all_services = payload => {
	return {
		type: GET_ALL_SERIVCES,
		payload,
	};
};

const update_service = (payload, previousData) => {
	return {
		type: UPDATE_SERVICE,
		payload,
		previousData,
	};
};

const delete_service = payload => {
	return {
		type: DELETE_SERVICE,
		payload,
	};
};

//Diagnosis
const upload_diagnosis = payload => {
	return {
		type: UPDATE_DIAGNOSIS,
		payload,
	};
};

export const get_all_diagnosis = payload => {
	return {
		type: GET_ALL_DIAGNOSISES,
		payload,
	};
};

const update_diagnosis = (payload, previousData) => {
	return {
		type: UPLOAD_DIAGNOSIS,
		payload,
		previousData,
	};
};

const delete_diagnosis = payload => {
	return {
		type: DELETE_DIAGNOSIS,
		payload,
	};
};

//department
export const createDepartment = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/departments`, {
					name: data.name,
					hod_id: data.headOfDept,
					description: data.description,
				})
				.then(response => {
					dispatch(create_department(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					reject({ success: false });
				});
		});
	};
};

export const getAllDepartments = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/departments`)
				.then(response => {
					dispatch(get_all_department(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateDepartment = data => {
	console.log(data);
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/departments/${data.id}/update`, {
					name: data.name,
					hod_id: data.headOfDept,
					description: data.description,
				})
				.then(response => {
					console.log(response);
					dispatch(update_department(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					console.log(error);
					return reject({ success: false });
				});
		});
	};
};

export const deleteDepartment = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/departments/${data.id}`, {
					name: data.name,
					description: data.description,
				})
				.then(response => {
					dispatch(delete_department(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//room
export const addRoom = data => {
	console.log(data);
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/rooms`, {
					name: data.name,
					status: data.status,
					floor: data.floor,
					room_category_id: data.category,
				})
				.then(response => {
					dispatch(add_room(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllRooms = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/rooms`)
				.then(response => {
					dispatch(get_all_room(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateRoom = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/rooms/${data.id}/update`, {
					name: data.name,
					status: data.status,
					floor: data.status,
					room_category_id: data.category,
				})
				.then(response => {
					dispatch(update_room(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return resolve({ success: false });
				});
		});
	};
};

export const deleteRoom = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/rooms/${data.id}`)
				.then(response => {
					dispatch(delete_room(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const addRoomCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/rooms/categories`, {
					name: data.name,
					price: data.price,
					discount: data.discount,
				})
				.then(response => {
					dispatch(add_room_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllRoomCategories = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/rooms/categories`)
				.then(response => {
					dispatch(get_all_room_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateRoomCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/rooms/categories/${data.id}/update`, {
					name: data.name,
					price: data.price,
					discount: data.discount,
				})
				.then(response => {
					dispatch(update_room_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteRoomCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/rooms/categories/${data.id}`)
				.then(response => {
					dispatch(delete_room_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Lab
export const addLabTest = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/lab-tests`, {
					name: data.name,
					price: data.name,
					lab_category_id: data.category,
					test_type: data.testType,
					parameters: data.parameters,
				})
				.then(response => {
					dispatch(add_lab_test(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllLabTests = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/lab-tests`)
				.then(response => {
					dispatch(get_all_lab_tests(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateLabTest = data => {
	console.log(data);
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/lab-tests/${data.id}/update`, {
					name: data.name,
					lab_category_id: data.category,
					price: data.price,
					test_type: data.testType,
					parameters: data.parameters,
				})
				.then(response => {
					dispatch(update_lab_test(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteLabTest = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/lab-tests/${data.id}`)
				.then(response => {
					dispatch(delete_lab_test(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return resolve({ success: false });
				});
		});
	};
};

export const addLabTestCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/lab-tests/categories`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_lab_test_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllLabTestCategories = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/lab-tests/categories`)
				.then(response => {
					dispatch(get_all_lab_test_categories(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateLabTestCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/lab-tests/categories/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_lab_test_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteLabTestCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/lab-tests/categories/${data.id}`)
				.then(response => {
					dispatch(delete_lab_test_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const addLabTestParameter = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/lab-tests/parameters`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_lab_test_parameter(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllLabTestParameters = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/lab-tests/parameters`)
				.then(response => {
					dispatch(get_all_lab_test_parameters(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateLabTestParameter = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/lab-tests/parameters/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_lab_test_parameter(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteLabTestParameters = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/lab-tests/parameters/${data.id}`)
				.then(response => {
					dispatch(delete_lab_test_parameter(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
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

//Specialization
export const addSpecialization = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/specializations`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_specialziation(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllSpecialization = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/specializations`)
				.then(response => {
					dispatch(get_all_specializations(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateSpecialization = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/specializations/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_specialization(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteSpecialization = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/specializations/${data.id}`)
				.then(response => {
					dispatch(delete_specialization(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Consultating Room
export const addConsultatingRoom = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/consulting-rooms`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_consultating_room(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllConsultatingRooms = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/consulting-rooms`)
				.then(response => {
					dispatch(get_all_consultating_rooms(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateConsultatingRoom = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/consulting-rooms/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_consultating_room(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteConsultatingRoom = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/consulting-rooms/${data.id}`)
				.then(response => {
					dispatch(delete_consultating_room(data));
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

//Permission
export const addPermission = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/settings/permissions`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_permission(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllPermission = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/settings/permissions`)
				.then(response => {
					dispatch(get_all_permissions(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updatePermission = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/settings/permissions/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_permission(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deletePermission = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/settings/permissions/${data.id}`)
				.then(response => {
					dispatch(delete_permission(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Service Category
export const addServiceCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/services/categories`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_service_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllServiceCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/services/categories`)
				.then(response => {
					dispatch(get_all_service_categories(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateServiceCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/services/categories/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_service_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteServiceCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/services/categories/${data.id}`)
				.then(response => {
					dispatch(delete_service_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Service
export const uploadService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/services/upload-services`, data)
				.then(response => {
					dispatch(upload_service(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/services`)
				.then(response => {
					dispatch(get_all_services(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateService = data => {
	let service_category_id = data.service_category_id
		? data.service_category_id
		: data.Category.id;
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/services/${data.id}/update`, {
					name: data.name,
					tariff: data.tariff,
					service_category_id: service_category_id,
				})
				.then(response => {
					console.log(response);
					dispatch(update_service(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					console.log(error);
					return reject({ success: false });
				});
		});
	};
};

export const deleteService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/services/${data.id}`)
				.then(response => {
					console.log(response.data, 'here');
					dispatch(delete_service(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Diagnosis
export const uploadDiagnosis = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/settings/diagnosis/upload`, data)
				.then(response => {
					dispatch(upload_diagnosis(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllDiagnosises = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/settings/diagnosis`)
				.then(response => {
					dispatch(get_all_diagnosis(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateDiagnosis = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/settings/diagnosis/${data.id}/update`, {
					procedureCode: data.procedureCode,
					icd10Code: data.icd10Code,
					description: data.description,
					codeStatus: data.codeStatus,
				})
				.then(response => {
					dispatch(update_diagnosis(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteDiagnosis = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/diagnosis/${data.id}`)
				.then(response => {
					dispatch(delete_diagnosis(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

//Request service

export const addRequestService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/services/request-services`, {
					name: data.name,
					request_type: data.request_type,
				})
				.then(response => {
					dispatch(add_request_service(response.data));
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
				.get(`${API_URI}/services/request-services`)
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

export const updateRequestService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/request-service/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_request_service(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteRequestService = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/services/categories/${data.id}`)
				.then(response => {
					dispatch(delete_request_service(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};
