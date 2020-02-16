import { ADD_HMO, GET_ALL_HMOS, UPDATE_HMO, DELETE_HMO } from "./types";
import axios from "axios";

export const add_hmo = payload => {
  return {
    type: ADD_HMO,
    payload
  };
};

export const get_all_hmo = payload => {
  return {
    type: GET_ALL_HMOS,
    payload
  };
};

export const update_hmo = payload => {
  return {
    type: UPDATE_HMO,
    payload
  };
};

export const delete_hmo = payload => {
  return {
    type: DELETE_HMO,
    payload
  };
};

export const addHmo = data => {
  return dispatch => {
    return axios
      .post(`http://178.128.36.29:3000/hmos`, data)
      .then(response => {
        return dispatch(add_hmo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAllHmos = data => {
  return dispatch => {
    return axios
      .get(`http://178.128.36.29:3000/hmos`, {})
      .then(response => {
        return dispatch(get_all_hmo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateHmo = data => {
  return dispatch => {
    return axios
      .patch(`http://178.128.36.29:3000/hmos/${data.id}`, {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        logo: data.logo
      })
      .then(response => {
        return dispatch(update_hmo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteHmo = data => {
  return dispatch => {
    return axios
      .delete(`http://178.128.36.29:3000/hmos/${data.id}`)
      .then(response => {
        console.log(response.data);
        return dispatch(delete_hmo(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
