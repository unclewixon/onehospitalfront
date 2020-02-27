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

export const update_hmo = (payload, previousData) => {
  return {
    type: UPDATE_HMO,
    payload,
    previousData
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

export const updateHmo = (EditedData, previousData) => {
  console.log(previousData.id, EditedData)
  return dispatch => {
    return axios
      .patch(`http://178.128.36.29:3000/hmos/${previousData.id}/update`, 
       EditedData
      )
      .then(response => {
       
        return dispatch(update_hmo(response.data, previousData));
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
