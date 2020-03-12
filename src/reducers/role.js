import {
  LOAD_ROLES,
  NEW_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE
} from "../actions/types";

const INITIAL_STATE = {
  roles: []
};

const role = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ROLES:
      return { ...state, roles: action.payload };
    case NEW_ROLE:
      return { ...state, roles: [...state.roles, action.payload] };
    case UPDATE_ROLE:
		return {
			...state,
			roles: [
			  ...state.roles.filter(
				deletedItem => deletedItem.id !== action.previousData.id
			  ),
			  action.payload
			]
		  };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default role;
