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
	LOAD_SERVICES,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DELETE_SERVICE,
	LOAD_SERVICES_CATEGORIES,
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
	services: [],
	service_categories: [],
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

		// lab tests
		case GET_ALL_LAB_TESTS:
			const tests = state.lab_tests.filter(
				t => t.hmo.id !== action.payload.hmo.id
			);
			return { ...state, lab_tests: [...tests, action.payload] };
		case ADD_LAB_TEST:
			const htest = state.lab_tests.find(
				t => t.hmo.id === action.payload.hmo.id
			);

			if (htest) {
				const newTest = {
					hmo: htest.hmo,
					result: [...htest.result, action.payload],
				};

				const tests = state.lab_tests.filter(
					t => t.hmo.id !== action.payload.hmo.id
				);
				return { ...state, lab_tests: [...tests, newTest] };
			}

			return state;
		case UPDATE_LAB_TEST:
			const utest = state.lab_tests.find(
				t => t.hmo.id === action.payload.hmo.id
			);

			if (utest) {
				const lab_tests = updateImmutable(utest.result, action.payload);
				const newTest = { hmo: utest.hmo, result: [...lab_tests] };

				const tests = state.lab_tests.filter(
					t => t.hmo.id !== action.payload.hmo.id
				);
				return { ...state, lab_tests: [...tests, newTest] };
			}

			return state;
		case DELETE_LAB_TEST:
			const test = state.lab_tests.find(
				t => t.hmo.id === action.payload.hmo.id
			);

			if (test) {
				const newTest = {
					hmo: test.hmo,
					result: [...test.result.filter(r => r.id !== action.payload.id)],
				};

				const tests = state.lab_tests.filter(
					t => t.hmo.id !== action.payload.hmo.id
				);
				return { ...state, lab_tests: [...tests, newTest] };
			}

			return state;

		case LOAD_SERVICES_CATEGORIES:
			return { ...state, service_categories: action.payload };

		// services
		case LOAD_SERVICES:
			const services = state.services.filter(
				s => s.hmo.id !== action.payload.hmo.id
			);

			return { ...state, services: [...services, action.payload] };
		case ADD_SERVICE:
			const service = state.services.find(
				s => s.hmo.id === action.payload.hmo.id
			);

			if (service) {
				const newService = {
					hmo: service.hmo,
					result: [...service.result, action.payload],
				};

				const services = state.services.filter(
					s => s.hmo.id !== action.payload.hmo.id
				);

				return { ...state, services: [...services, newService] };
			}

			return state;
		case UPDATE_SERVICE:
			const uservice = state.services.find(
				s => s.hmo.id === action.payload.hmo.id
			);

			if (uservice) {
				const services = updateImmutable(uservice.result, action.payload);
				const newService = { hmo: uservice.hmo, result: [...services] };

				const uservices = state.services.filter(
					s => s.hmo.id !== action.payload.hmo.id
				);

				return { ...state, services: [...uservices, newService] };
			}

			return state;
		case DELETE_SERVICE:
			const dservice = state.services.find(
				s => s.hmo.id === action.payload.hmo.id
			);

			if (dservice) {
				const newService = {
					hmo: dservice.hmo,
					result: [...dservice.result.filter(r => r.id !== action.payload.id)],
				};

				const dservices = state.services.filter(
					s => s.hmo.id !== action.payload.hmo.id
				);

				return { ...state, services: [...dservices, newService] };
			}

			return state;
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

		// specialization
		case ADD_SPECIALIZATION:
			return {
				...state,
				specializations: [...state.specializations, action.payload],
			};
		case GET_ALL_SPECIALIZATIONS:
			return { ...state, specializations: action.payload };
		case UPDATE_SPECIALIZATION:
			const specializations = updateImmutable(
				state.specializations,
				action.payload
			);

			return { ...state, specializations };
		case DELETE_SPECIALIZATION:
			return {
				...state,
				specializations: state.specializations.filter(
					s => s.id !== parseInt(action.payload.id, 10)
				),
			};

		// staff
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
