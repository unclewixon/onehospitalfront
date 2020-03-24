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
