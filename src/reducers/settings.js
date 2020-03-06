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
  ADD_PERMISSION,
  GET_ALL_PERMISSIONS,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
  LOAD_STAFFS
} from "../actions/types";

const INITIAL_STATE = {
  department: [],
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
  permissions: []
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return { ...state, department: [...state.department, action.payload] };
    case GET_ALL_DEPARTMENTS:
      return { ...state, department: action.payload };
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        department: [
          ...state.department.filter(
            deletedItem => deletedItem.id !== action.previousData.id
          ),
          action.payload
        ]
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        department: state.department.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
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
          action.payload
        ]
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_ROOM_CATEGORY:
      return {
        ...state,
        room_categories: [...state.room_categories, action.payload]
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
          action.payload
        ]
      };
    case DELETE_ROOM_CATEGORY:
      return {
        ...state,
        room_categories: state.room_categories.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_LAB_TEST:
      return {
        ...state,
        lab_tests: [...state.lab_tests, action.payload]
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
          action.payload
        ]
      };
    case DELETE_LAB_TEST:
      return {
        ...state,
        lab_tests: state.lab_tests.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_LAB_TEST_CATEGORY:
      return {
        ...state,
        lab_categories: [...state.lab_categories, action.payload]
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
          action.payload
        ]
      };
    case DELETE_LAB_TEST_CATEGORY:
      return {
        ...state,
        lab_categories: state.lab_categories.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_LAB_TEST_PARAMETER:
      return {
        ...state,
        lab_parameters: [...state.lab_parameters, action.payload]
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
          action.payload
        ]
      };
    case DELETE_LAB_TEST_PARAMETER:
      return {
        ...state,
        lab_parameters: state.lab_parameters.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_LEAVE_CATEGORY:
      return {
        ...state,
        leave_categories: [...state.leave_categories, action.payload]
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
          action.payload
        ]
      };
    case DELETE_LEAVE_CATEGORY:
      return {
        ...state,
        leave_categories: state.leave_categories.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case ADD_SPECIALIZATION:
      return {
        ...state,
        specializations: [...state.specializations, action.payload]
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
          action.payload
        ]
      };
    case DELETE_SPECIALIZATION:
      return {
        ...state,
        specializations: state.specializations.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
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
          action.payload
        ]
      };
    case DELETE_CONSULTATING_ROOM:
      return {
        ...state,
        consultating_room: state.consultating_room.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    case LOAD_STAFFS:
      return { ...state, staff_list: action.payload };
    case ADD_PERMISSION:
      return {
        ...state,
        permissions: [...state.permissions, action.payload]
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
          action.payload
        ]
      };
    case DELETE_PERMISSION:
      return {
        ...state,
        permissions: state.permissions.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default settings;
