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
  DELETE_LEAVE_CATEGORY
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

//Lab
export const add_lab_test = payload => {
  return {
    type: ADD_LAB_TEST,
    payload
  };
};

export const get_all_lab_tests = payload => {
  return {
    type: GET_ALL_LAB_TESTS,
    payload
  };
};

export const update_lab_test = payload => {
  return {
    type: UPDATE_LAB_TEST,
    payload
  };
};

export const delete_lab_test = payload => {
  return {
    type: DELETE_LAB_TEST,
    payload
  };
};

export const add_lab_test_category = payload => {
  return {
    type: ADD_LAB_TEST_CATEGORY,
    payload
  };
};

export const get_all_lab_test_categories = payload => {
  return {
    type: GET_ALL_LAB_TEST_CATEGORIES,
    payload
  };
};

export const update_lab_test_category = payload => {
  return {
    type: UPDATE_LAB_TEST_CATEGORY,
    payload
  };
};

export const delete_lab_test_category = payload => {
  return {
    type: DELETE_LAB_TEST_CATEGORY,
    payload
  };
};

export const add_lab_test_parameter = payload => {
  return {
    type: ADD_LAB_TEST_PARAMETER,
    payload
  };
};

export const get_all_lab_test_parameters = payload => {
  return {
    type: GET_ALL_LAB_TEST_PARAMETERS,
    payload
  };
};

export const update_lab_test_parameter = payload => {
  return {
    type: UPDATE_LAB_TEST_PARAMETER,
    payload
  };
};

export const delete_lab_test_parameter = payload => {
  return {
    type: DELETE_LAB_TEST_PARAMETER,
    payload
  };
};

//Leave Category
export const add_leave_category = payload => {
  return {
    type: ADD_LEAVE_CATEGORY,
    payload
  };
};

export const get_all_leave_category = payload => {
  return {
    type: GET_ALL_LEAVE_CATEGORIES,
    payload
  };
};

export const update_leave_category = payload => {
  return {
    type: UPDATE_LEAVE_CATEGORY,
    payload
  };
};

export const delete_leave_category = payload => {
  return {
    type: DELETE_LEAVE_CATEGORY,
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
  console.log(data);
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

//Lab
export const addLabTest = data => {
  console.log(data);
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/lab-tests`, {
        name: data.name,
        price: data.name,
        lab_category_id: data.category,
        test_type: data.testType,
        parameters: data.parameters
      })
      .then(response => {
        return dispatch(add_lab_test(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllLabTests = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/lab-tests`)
      .then(response => {
        return dispatch(get_all_lab_tests(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateLabTest = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/lab-tests/${data.id}`, {
        name: data.name
      })
      .then(response => {
        return dispatch(update_lab_test(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteLabTest = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/lab-tests/${data.id}`)
      .then(response => {
        return dispatch(delete_lab_test(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addLabTestCategory = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/lab-tests/categories`, {
        name: data.name
      })
      .then(response => {
        return dispatch(add_lab_test_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllLabTestCategories = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/lab-tests/categories`)
      .then(response => {
        return dispatch(get_all_lab_test_categories(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateLabTestCategory = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/lab-tests/categories/${data.id}`, {
        name: data.name
      })
      .then(response => {
        return dispatch(update_lab_test_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteLabTestCategory = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/lab-tests/categories/${data.id}`)
      .then(response => {
        return dispatch(delete_lab_test_category(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addLabTestParameter = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/lab-tests/parameters`, {
        name: data.name
      })
      .then(response => {
        return dispatch(add_lab_test_parameter(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllLabTestParameters = () => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/lab-tests/parameters`)
      .then(response => {
        return dispatch(get_all_lab_test_parameters(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateLabTestParameter = data => {
  return dispatch => {
    return axios
      .put(`http://178.128.36.29:3000/lab-tests/parameters/${data.id}`, {
        name: data.name,
        referenceRange: data.referenceRange
      })
      .then(response => {
        return dispatch(update_lab_test_parameter(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteLabTestParameters = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/lab-tests/parameters/${data.id}`)
      .then(response => {
        return dispatch(delete_lab_test_parameter(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//Leave Category
export const addLeaveCategory = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/leave-category`, {
        name: data.name,
        duration: data.name
      })
      .then(response => {
        return dispatch(add_leave_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllLeaveCategory = data => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/leave-category`)
      .then(response => {
        return dispatch(get_all_leave_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateLeaveCategory = data => {
  return dispatch => {
    return axios
      .patch(`http://178.128.36.29:3000/leave-category`, { name: data.name })
      .then(response => {
        return dispatch(update_leave_category(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteLeaveCategory = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/leave-category/${data.id}`)
      .then(response => {
        return dispatch(delete_leave_category(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
