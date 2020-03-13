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
	UPDATE_CONSULTATING_ROOM,
	DELETE_CONSULTATING_ROOM,
	GET_ALL_CONSULTATING_ROOMS,
	ADD_PERMISSION,
	GET_ALL_PERMISSIONS,
	UPDATE_PERMISSION,
	DELETE_PERMISSION,
	LOAD_STAFFS,
	ADD_SERVICE_CATEGORY,
	GET_ALL_SERVICE_CATEGORIES,
	DELETE_SERVICE_CATEGORY,
	UPDATE_SERVICE_CATEGORY,
	UPLOAD_SERVICE,
	GET_ALL_SERIVCES,
	UPDATE_SERVICE,
	DELETE_SERVICE,
	UPDATE_DIAGNOSIS,
	GET_ALL_DIAGNOSISES,
	DELETE_DIAGNOSIS,
	UPLOAD_DIAGNOSIS,
} from '../actions/types';

const INITIAL_STATE = {
	departments: [],
	rooms: [],
	room_categories: [],
	lab_tests: [],
	lab_categories: [],
	lab_parameters: [],
	leave_categories: [],
	specializations: [],
	consultating_room: [],
	staff_list: [],
	roles: [],
	permissions: [],
	service_categories: [],
	services: [],
	diagnosis: [],
};

const settings = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_DEPARTMENT:
			return { ...state, departments: [...state.departments, action.payload] };
		case GET_ALL_DEPARTMENTS:
			return { ...state, departments: action.payload };
		case UPDATE_DEPARTMENT:
			return {
				...state,
				departments: [
					...state.departments.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_DEPARTMENT:
			return {
				...state,
				departments: state.departments.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_ROOM:
			return { ...state, rooms: [...state.rooms, action.payload] };
		case GET_ALL_ROOMS:
			return { ...state, rooms: action.payload };
		case UPDATE_ROOM:
			return {
				...state,
				rooms: [
					...state.rooms.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_ROOM:
			return {
				...state,
				rooms: state.rooms.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_ROOM_CATEGORY:
			return {
				...state,
				room_categories: [...state.room_categories, action.payload],
			};
		case GET_ALL_ROOM_CATEGORIES:
			return { ...state, room_categories: action.payload };
		case UPDATE_ROOM_CATEGORY:
			return {
				...state,
				room_categories: [
					...state.room_categories.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_ROOM_CATEGORY:
			return {
				...state,
				room_categories: state.room_categories.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_LAB_TEST:
			return {
				...state,
				lab_tests: [...state.lab_tests, action.payload],
			};
		case GET_ALL_LAB_TESTS:
			return { ...state, lab_tests: action.payload };
		case UPDATE_LAB_TEST:
			return {
				...state,
				lab_tests: [
					...state.lab_tests.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_LAB_TEST:
			return {
				...state,
				lab_tests: state.lab_tests.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_LAB_TEST_CATEGORY:
			return {
				...state,
				lab_categories: [...state.lab_categories, action.payload],
			};
		case GET_ALL_LAB_TEST_CATEGORIES:
			return { ...state, lab_categories: action.payload };
		case UPDATE_LAB_TEST_CATEGORY:
			return {
				...state,
				lab_categories: [
					...state.lab_categories.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_LAB_TEST_CATEGORY:
			return {
				...state,
				lab_categories: state.lab_categories.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_LAB_TEST_PARAMETER:
			return {
				...state,
				lab_parameters: [...state.lab_parameters, action.payload],
			};
		case GET_ALL_LAB_TEST_PARAMETERS:
			return { ...state, lab_parameters: action.payload };
		case UPDATE_LAB_TEST_PARAMETER:
			return {
				...state,
				lab_parameters: [
					...state.lab_parameters.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_LAB_TEST_PARAMETER:
			return {
				...state,
				lab_parameters: state.lab_parameters.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_LEAVE_CATEGORY:
			return {
				...state,
				leave_categories: [...state.leave_categories, action.payload],
			};
		case GET_ALL_LEAVE_CATEGORIES:
			return { ...state, leave_categories: action.payload };
		case UPDATE_LEAVE_CATEGORY:
			return {
				...state,
				leave_categories: [
					...state.leave_categories.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_LEAVE_CATEGORY:
			return {
				...state,
				leave_categories: state.leave_categories.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_SPECIALIZATION:
			return {
				...state,
				specializations: [...state.specializations, action.payload],
			};
		case GET_ALL_SPECIALIZATIONS:
			return { ...state, specializations: action.payload };
		case UPDATE_SPECIALIZATION:
			return {
				...state,
				specializations: [
					...state.specializations.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_SPECIALIZATION:
			return {
				...state,
				specializations: state.specializations.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		// case ADD_CONSULTATING_ROOM:
		//   return {
		//     ...state,
		//     consultating_room: [...state.consultating_room, action.payload]
		//   };
		case GET_ALL_CONSULTATING_ROOMS:
			return { ...state, consultating_room: action.payload };
		case UPDATE_CONSULTATING_ROOM:
			return {
				...state,
				consultating_room: [
					...state.consultating_room.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_CONSULTATING_ROOM:
			return {
				...state,
				consultating_room: state.consultating_room.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case LOAD_STAFFS:
			return { ...state, staff_list: action.payload };
		case ADD_PERMISSION:
			return {
				...state,
				permissions: [...state.permissions, action.payload],
			};
		case GET_ALL_PERMISSIONS:
			return { ...state, permissions: action.payload };
		case UPDATE_PERMISSION:
			return {
				...state,
				permissions: [
					...state.permissions.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_PERMISSION:
			return {
				...state,
				permissions: state.permissions.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_SERVICE_CATEGORY:
			return {
				...state,
				service_categories: [...state.service_categories, action.payload],
			};
		case GET_ALL_SERVICE_CATEGORIES:
			return { ...state, service_categories: action.payload };
		case UPDATE_SERVICE_CATEGORY:
			return {
				...state,
				service_categories: [
					...state.service_categories.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_SERVICE_CATEGORY:
			return {
				...state,
				service_categories: state.service_categories.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case GET_ALL_SERIVCES:
			return { ...state, services: action.payload };
		case UPDATE_SERVICE:
			return {
				...state,
				services: [
					...state.services.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_DIAGNOSIS:
			return {
				...state,
				diagnosis: state.diagnosis.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case GET_ALL_DIAGNOSISES:
			return { ...state, diagnosis: action.payload };
		case UPDATE_DIAGNOSIS:
			return {
				...state,
				diagnosis: [
					...state.diagnosis.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_DIAGNOSIS:
			return {
				...state,
				diagnosis: state.diagnosis.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default settings;
