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
  DELETE_ROOM_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  department: [],
  rooms: [],
  room_categories: []
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return { ...state, department: [...state.department, action.payload] };
    case GET_ALL_DEPARTMENTS:
      return { ...state, department: action.payload };
    case UPDATE_DEPARTMENT:
      return { ...state, updated_department: action.payload };
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
      return { ...state, updated_room: action.payload };
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
      return { ...state, updated_room: action.payload };
    case DELETE_ROOM_CATEGORY:
      return {
        ...state,
        room_categories: state.room_categories.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default settings;
