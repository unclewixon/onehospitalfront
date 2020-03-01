import {
  ADD_HMO,
  GET_ALL_HMOS,
  UPDATE_HMO,
  DELETE_HMO
} from "../actions/types";

const INITIAL_STATE = {
  hmo_list: []
};

const hmo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_HMO:
      return { ...state, hmo_list: [...state.hmo_list, action.payload] };
    case GET_ALL_HMOS:
      return { ...state, hmo_list: action.payload };
    case UPDATE_HMO:
      return {
        ...state,
        hmo_list: [
          ...state.hmo_list.filter(
            deletedItem => deletedItem.id !== action.previousData.id
          ),
          action.payload
        ]
      };
    case DELETE_HMO:
      return {
        ...state,
        hmo_list: state.hmo_list.filter(
          deletedItem => deletedItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default hmo;
