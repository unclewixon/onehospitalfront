import {
  START_PRELOADING,
  STOP_PRELOADING,
  SIGN_OUT,
  TOGGLE_MODAL,
  TOGGLE_CREATE_STAFF,
  TOGGLE_ADD_TASK,
  TOGGLE_SHOW_HISTORY,
  TOGGLE_SET_LEAVE,
  TOGGLE_CREATE_INVENTORY,
  TOGGLE_EDIT_INVENTORY,
  TOGGLE_UPDATE_QTY,
  TOGGLE_CREATE_INV_CAT,
  TOGGLE_EDIT_INV_CAT,
  TOGGLE_CREATE_ROLE,
  TOGGLE_REGISTER_NEW_PATIENT,
  TOGGLE_CREATE_APPOINTMENT,
  TOGGLE_VIEW_APPOINTMENT_DETAIL
} from "../actions/types";

const INITIAL_STATE = {
  preloading: false,
  isModalOpen: false,
  create_staff: false,
  add_task: false,
  set_leave: false,
  show_history: false,
  create_inventory: false,
  edit_inventory: false,
  update_inventory_qty: false,
  create_inv_cat: false,
  edit_inv_cat: false,
  create_role: false,
  register_new_patient: false,
  create_new_appointment: false,
  view_appointment_detail: false,
};

const general = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_PRELOADING:
      return { ...state, preloading: true };
    case STOP_PRELOADING:
      return { ...state, preloading: false };
    case SIGN_OUT:
      return { ...state, preloading: false };
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: action.payload };
    case TOGGLE_CREATE_STAFF:
      return { ...state, create_staff: action.payload };
    case TOGGLE_ADD_TASK:
      return { ...state, add_task: action.payload };
    case TOGGLE_SHOW_HISTORY:
      return { ...state, show_history: action.payload };
    case TOGGLE_SET_LEAVE:
      return { ...state, set_leave: action.payload };
    case TOGGLE_CREATE_INVENTORY:
      return { ...state, create_inventory: action.payload };
    case TOGGLE_EDIT_INVENTORY:
      return { ...state, edit_inventory: action.payload };
    case TOGGLE_UPDATE_QTY:
      return { ...state, update_inventory_qty: action.payload };
    case TOGGLE_CREATE_INV_CAT:
      return { ...state, create_inv_cat: action.payload };
    case TOGGLE_EDIT_INV_CAT:
      return { ...state, edit_inv_cat: action.payload };
    case TOGGLE_CREATE_ROLE:
      return { ...state, create_role: action.payload };
    case TOGGLE_REGISTER_NEW_PATIENT:
      return { ...state, register_new_patient: action.payload };
    case TOGGLE_CREATE_APPOINTMENT:
      return { ...state, create_new_appointment: action.payload };
    case TOGGLE_VIEW_APPOINTMENT_DETAIL:
      return{...state, view_appointment_detail: action.payload}
    default:
      return state;
  }
};

export default general;
