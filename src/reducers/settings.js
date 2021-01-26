import {
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
	LOAD_STAFFS,
	ADD_REQUEST_SERVICE,
	GET_ALL_REQUEST_SERVICES,
	UPDATE_REQUEST_SERVICE,
	DELETE_REQUEST_SERVICE,
	ADD_LAB_GROUP,
	UPDATE_LAB_GROUP,
	DELETE_LAB_GROUP,
	GET_ALL_LAB_GROUPS,
} from '../actions/types';
import { updateImmutable } from '../services/utilities';

const INITIAL_STATE = {
	rooms: [],
	room_categories: [],
	lab_tests: [],
	lab_categories: [],
	lab_parameters: [],
	lab_groups: [],
	leave_categories: [],
	specializations: [],
	staff_list: [],
	roles: [],
	request_services: [],
};

const settings = (state = INITIAL_STATE, action) => {
	switch (action.type) {
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
					item => item.id !== action.payload.id
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
			const lab_tests = updateImmutable(state.lab_tests, action.payload);
			return { ...state, lab_tests: [...lab_tests] };
		case DELETE_LAB_TEST:
			return {
				...state,
				lab_tests: state.lab_tests.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case ADD_LAB_GROUP:
			return {
				...state,
				lab_groups: [...state.lab_groups, action.payload],
			};
		case GET_ALL_LAB_GROUPS:
			return { ...state, lab_groups: action.payload };
		case UPDATE_LAB_GROUP:
			return {
				...state,
				lab_groups: [
					...state.lab_groups.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_LAB_GROUP:
			return {
				...state,
				lab_groups: state.lab_groups.filter(
					item => item.id !== action.payload.id
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
			const categories = updateImmutable(state.lab_categories, action.payload);
			return { ...state, lab_categories: [...categories] };
		case DELETE_LAB_TEST_CATEGORY:
			return {
				...state,
				lab_categories: state.lab_categories.filter(
					item => item.id !== action.payload.id
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
		case LOAD_STAFFS:
			return { ...state, staff_list: action.payload };
		case ADD_REQUEST_SERVICE:
			return {
				...state,
				request_services: [...state.request_services, action.payload],
			};

		case GET_ALL_REQUEST_SERVICES:
			return { ...state, request_services: action.payload };
		case UPDATE_REQUEST_SERVICE:
			return {
				...state,
				request_services: [
					...state.request_services.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_REQUEST_SERVICE:
			return {
				...state,
				request_services: state.request_services.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default settings;
