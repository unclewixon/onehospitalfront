import {
	GET_ALL_CAFETERIA_ITEMS,
	ADD_CAFETERIA_ITEM,
	UPDATE_CAFETERIA_ITEM,
	DELETE_CAFETERIA_ITEM,
	GET_ALL_CAFETERIA_CATEGORY,
	ADD_CAFETERIA_CATEGORY,
	UPDATE_CAFETERIA_CATEGORY,
	DELETE_CAFETERIA_CATEGORY,
	GET_ALL_CAFETERIA_INVENTORY,
	ADD_CAFETERIA_INVENTORY,
	UPDATE_CAFETERIA_INVENTORY,
	DELETE_CAFETERIA_INVENTORY,
	ADD_CAFETERIA_INV_CATEGORY,
	GET_ALL_CAFETERIA_INV_CATEGORY,
	UPDATE_CAFETERIA_INV_CATEGORY,
	DELETE_CAFETERIA_INV_CATEGORY,
} from './types';

export const getAllCafeteriaItem = items => {
	return {
		type: GET_ALL_CAFETERIA_ITEMS,
		payload: items,
	};
};

export const addCafeteriaItem = items => {
	return {
		type: ADD_CAFETERIA_ITEM,
		payload: items,
	};
};

export const updateCafeteriaItem = itemsId => {
	return {
		type: UPDATE_CAFETERIA_ITEM,
		payload: itemsId,
	};
};

export const deleteCafeteriaItem = itemsId => {
	return {
		type: DELETE_CAFETERIA_ITEM,
		payload: itemsId,
	};
};

export const getAllCafeteriaCategory = items => {
	return {
		type: GET_ALL_CAFETERIA_CATEGORY,
		payload: items,
	};
};

export const addCafeteriaCategory = items => {
	return {
		type: ADD_CAFETERIA_CATEGORY,
		payload: items,
	};
};

export const updateCafeteriaCategory = itemsId => {
	return {
		type: UPDATE_CAFETERIA_CATEGORY,
		payload: itemsId,
	};
};

export const deleteCafeteriaCategory = itemsId => {
	return {
		type: DELETE_CAFETERIA_CATEGORY,
		payload: itemsId,
	};
};

export const getAllCafeteriaInventory = data => {
	return {
		type: GET_ALL_CAFETERIA_INVENTORY,
		payload: data,
	};
};

export const addCafeteriaInventory = data => {
	return {
		type: ADD_CAFETERIA_INVENTORY,
		payload: data,
	};
};

export const updateCafeteriaInventory = data => {
	return {
		type: UPDATE_CAFETERIA_INVENTORY,
		payload: data,
	};
};

export const deleteCafeteriaInventory = data => {
	return {
		type: DELETE_CAFETERIA_INVENTORY,
		payload: data,
	};
};

export const getAllCafeteriaInvCategory = data => {
	return {
		type: GET_ALL_CAFETERIA_INV_CATEGORY,
		payload: data,
	};
};

export const addCafeteriaInvCategory = data => {
	return {
		type: ADD_CAFETERIA_INV_CATEGORY,
		payload: data,
	};
};

export const updateCafeteriaInvCategory = data => {
	return {
		type: UPDATE_CAFETERIA_INV_CATEGORY,
		payload: data,
	};
};

export const deleteCafeteriaInvCategory = data => {
	return {
		type: DELETE_CAFETERIA_INV_CATEGORY,
		payload: data,
	};
};
