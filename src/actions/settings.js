import axios from "axios";

import {
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT
} from "./types";

import { notifySuccess, notifyError } from "../services/notify";

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
        notifySuccess("Departement deleted", "success");
        return dispatch(delete_department(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
