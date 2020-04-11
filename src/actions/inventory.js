import axios from 'axios';
import { API_URI } from '../services/constants';
import {
	LOAD_INV_CATEGORIES,
	ADD_INV_CATEGORY,
	UPDATE_INV_CATEGORY,
	LOAD_INVENTORIES,
	ADD_INVENTORY,
	LOAD_SUB_CATEGORIES,
	ADD_SUB_CATEGORY,
	UPDATE_SUB_CATEGORY,
	UPDATE_INVENTORY,
	ADD_CAFETERIA_CATEGORY,
	GET_ALL_CAFETERIA_CATEGORY,
	UPDATE_CAFETERIA_CATEGORY,
	DELETE_CAFETERIA_CATEGORY,
	ADD_CAFETERIA_ITEM,
	GET_ALL_CAFETERIA_ITEMS,
	UPDATE_CAFETERIA_ITEM,
	DELETE_CAFETERIA_ITEM,
	FILTER_CAFETERIA_ITEM,
	ADD_CAFETERIA_INV_CATEGORY,
	GET_ALL_CAFETERIA_INV_CATEGORY,
	UPDATE_CAFETERIA_INV_CATEGORY,
	DELETE_CAFETERIA_INV_CATEGORY,
	ADD_CAFETERIA_INVENTORY,
	GET_ALL_CAFETERIA_INVENTORY,
	UPDATE_CAFETERIA_INVENTORY,
	DELETE_CAFETERIA_INVENTORY,
} from './types';

// categories
export const loadInvCategories = data => {
	return {
		type: LOAD_INV_CATEGORIES,
		payload: data,
	};
};

export const addInvCategory = data => {
	return {
		type: ADD_INV_CATEGORY,
		payload: data,
	};
};

export const updateInvCategory = category => {
	return {
		type: UPDATE_INV_CATEGORY,
		payload: category,
	};
};

// inventory
export const loadInventories = data => {
	return {
		type: LOAD_INVENTORIES,
		payload: data,
	};
};

export const addInventory = data => {
	return {
		type: ADD_INVENTORY,
		payload: data,
	};
};

export const updateInventory = data => {
	return {
		type: UPDATE_INVENTORY,
		payload: data,
	};
};

// load sub cateogry
export const loadInvSubCategories = data => {
	return {
		type: LOAD_SUB_CATEGORIES,
		payload: data,
	};
};

export const addInvSubCategory = data => {
	return {
		type: ADD_SUB_CATEGORY,
		payload: data,
	};
};

export const updateInvSubCategory = data => {
	return {
		type: UPDATE_SUB_CATEGORY,
		payload: data,
	};
};

//cafeteria

const add_cafeteria_category = payload => {
	return {
		type: ADD_CAFETERIA_CATEGORY,
		payload,
	};
};

const get_all_cafeteria_categorys = payload => {
	return {
		type: GET_ALL_CAFETERIA_CATEGORY,
		payload,
	};
};

const update_cafeteria_category = (payload, previousData) => {
	return {
		type: UPDATE_CAFETERIA_CATEGORY,
		payload,
		previousData,
	};
};

const delete_cafeteria_category = payload => {
	return {
		type: DELETE_CAFETERIA_CATEGORY,
		payload,
	};
};

const add_cafeteria_item = payload => {
	return {
		type: ADD_CAFETERIA_ITEM,
		payload,
	};
};

const get_all_cafeteria_items = payload => {
	return {
		type: GET_ALL_CAFETERIA_ITEMS,
		payload,
	};
};

const update_cafeteria_item = (payload, previousData) => {
	return {
		type: UPDATE_CAFETERIA_ITEM,
		payload,
		previousData,
	};
};

const delete_cafeteria_item = payload => {
	return {
		type: DELETE_CAFETERIA_ITEM,
		payload,
	};
};

const filter_cafeteria_item = payload => {
	return {
		type: FILTER_CAFETERIA_ITEM,
		payload,
	};
};

const add_cafeteria_inv_category = payload => {
	return {
		type: ADD_CAFETERIA_INV_CATEGORY,
		payload,
	};
};

const get_all_cafeteria_inv_categorys = payload => {
	return {
		type: GET_ALL_CAFETERIA_INV_CATEGORY,
		payload,
	};
};

const update_cafeteria_inv_category = (payload, previousData) => {
	return {
		type: UPDATE_CAFETERIA_INV_CATEGORY,
		payload,
		previousData,
	};
};

const delete_cafeteria_inv_category = payload => {
	return {
		type: DELETE_CAFETERIA_INV_CATEGORY,
		payload,
	};
};

const add_cafeteria_inventory = payload => {
	return {
		type: ADD_CAFETERIA_INVENTORY,
		payload,
	};
};

const get_all_cafeteria_inventory = payload => {
	return {
		type: GET_ALL_CAFETERIA_INVENTORY,
		payload,
	};
};

const update_cafeteria_inventory = (payload, previousData) => {
	return {
		type: UPDATE_CAFETERIA_INVENTORY,
		payload,
		previousData,
	};
};

const delete_cafeteria_inventory = payload => {
	return {
		type: DELETE_CAFETERIA_INVENTORY,
		payload,
	};
};

export const addCafeteriaCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/cafeteria/items/categories`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_cafeteria_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllCafeteriaCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/cafeteria/items/categories`)
				.then(response => {
					dispatch(get_all_cafeteria_categorys(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateCafeteriaCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/cafeteria/items/categories/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_cafeteria_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteCafeteriaCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/cafeteria/items/categories/${data.id}`)
				.then(response => {
					dispatch(delete_cafeteria_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const addCafeteriaItem = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/cafeteria/items`, data)
				.then(response => {
					dispatch(add_cafeteria_item(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllCafeteriaItem = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/cafeteria/items/`)
				.then(response => {
					dispatch(get_all_cafeteria_items(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateCafeteriaItem = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/cafeteria/items/${data.id}/update`, data)
				.then(response => {
					let arr = [response.data];
					let formatItem = arr.map(el => {
						return {
							q_category: el.category,
							q_createdAt: el.createdAt,
							q_createdBy: el.createdBy,
							q_description: el.description,
							q_discount_price: el.discount_price,
							q_id: el.id,
							q_isActive: el.isActive,
							q_item_code: el.item_code,
							q_lastChangedBy: null,
							q_name: el.name,
							q_price: el.price,
							q_updateAt: el.updateAt,
						};
					});

					dispatch(update_cafeteria_item(formatItem[0], data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteCafeteriaItem = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/cafeteria/items/${data.q_id}`)
				.then(response => {
					dispatch(delete_cafeteria_item(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const filterCafeteriaItem = data => {
	return dispatch => {
		console.log(data);
		dispatch(filter_cafeteria_item(data));
	};
};

export const addCafeteriaInvCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/cafeteria/inventory/categories`, {
					name: data.name,
				})
				.then(response => {
					dispatch(add_cafeteria_inv_category(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getAllCafeteriaInvCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/cafeteria/inventory/categories`)
				.then(response => {
					dispatch(get_all_cafeteria_inv_categorys(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateCafeteriaInvCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/cafeteria/inventory/categories/${data.id}/update`, {
					name: data.name,
				})
				.then(response => {
					dispatch(update_cafeteria_inv_category(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteCafeteriaInvCategory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/cafeteria/inventory/categories/${data.id}`)
				.then(response => {
					dispatch(delete_cafeteria_inv_category(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const addCafeteriaInventory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/cafeteria/inventories`, data)
				.then(response => {
					dispatch(add_cafeteria_inventory(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};
export const getAllCafeteriaInventory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/cafeteria/inventories`)
				.then(response => {
					dispatch(get_all_cafeteria_inventory(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const updateCafeteriaInventory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.patch(`${API_URI}/cafeteria/inventory/${data.id}/update`, data)
				.then(response => {
					dispatch(update_cafeteria_inventory(response.data, data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const deleteCafeteriaInventory = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API_URI}/cafeteria/inventory/${data.id}`)
				.then(response => {
					dispatch(delete_cafeteria_inventory(data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};
