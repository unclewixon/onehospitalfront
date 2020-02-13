import {
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT
} from "../actions/types";

const INITIAL_STATE = {
  department: [],
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS:
      return { ...state, department: action.payload };
    case CREATE_DEPARTMENT:
      return { ...state, department: [...state.department, action.payload] };
    case UPDATE_DEPARTMENT:
      return { ...state, updated_department: action.payload };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        department: state.department.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default settings;
