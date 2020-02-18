import axios from "axios";

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
} from "./types";

//department
export const create_department = payload => {
  return {
    type: CREATE_DEPARTMENT,
    payload
  };
};

export const get_all_department = payload => {
  return {
    type: GET_ALL_DEPARTMENTS,
    payload
  };
};

export const update_department = payload => {
  return {
    type: UPDATE_DEPARTMENT,
    payload
  };
};

export const delete_department = payload => {
  return {
    type: DELETE_DEPARTMENT,
    payload
  };
};

//room
export const add_room = payload => {
  return {
    type: ADD_ROOM,
    payload
  };
};

export const get_all_room = payload => {
  return {
    type: GET_ALL_ROOMS,
    payload
  };
};

export const update_room = payload => {
  return {
    type: UPDATE_ROOM,
    payload
  };
};

export const delete_room = payload => {
  return {
    type: DELETE_ROOM,
    payload
  };
};

export const add_room_category = payload => {
  return {
    type: ADD_ROOM_CATEGORY,
    payload
  };
};

export const get_all_room_category = payload => {
  return {
    type: GET_ALL_ROOM_CATEGORIES,
    payload
  };
};

export const update_room_category = payload => {
  return {
    type: UPDATE_ROOM_CATEGORY,
    payload
  };
};

export const delete_room_category = payload => {
  return {
    type: DELETE_ROOM_CATEGORY,
    payload
  };
};

//department
export const createDepartment = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/departments`, {
        name: data.name,
        description: data.description
      })
      .then(response => {
        return dispatch(create_department(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllDepartments = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/departments`)
      .then(response => {
        return dispatch(get_all_department(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateDepartment = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/departments/${data.id}`, {
        name: data.name,
        description: data.description
      })
      .then(response => {
        return dispatch(update_department(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteDepartment = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/departments/${data.id}`, {
        name: data.name,
        description: data.description
      })
      .then(response => {
        return dispatch(delete_department(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//room
export const addRoom = data => {
    console.log(data)
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/rooms`, {
        name: data.name,
        status: data.status,
        floor: data.floor,
        room_category_id: data.room_category_id
      })
      .then(response => {
        return dispatch(add_room(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllRooms = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/rooms`)
      .then(response => {
        return dispatch(get_all_room(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateRoom = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/rooms/${data.id}`, {
        name: data.name,
        status: data.status,
        room_category_id: data.room_category_id
      })
      .then(response => {
        return dispatch(update_room(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteRoom = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/rooms/${data.id}`)
      .then(response => {
        return dispatch(delete_room(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addRoomCategory = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/rooms/categories`, {
        name: data.name,
        price: data.price,
        discount: data.discount
      })
      .then(response => {
        return dispatch(add_room_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllRoomCategories = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/rooms/categories`)
      .then(response => {
        return dispatch(get_all_room_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateRoomCategory = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/rooms/categories/${data.id}`, {
        name: data.name,
        price: data.price,
        discount: data.discount
      })
      .then(response => {
        return dispatch(update_room_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteRoomCategory = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/rooms/categories/${data.id}`)
      .then(response => {
        return dispatch(delete_room_category(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
