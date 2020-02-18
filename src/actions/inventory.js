import {
	LOAD_CATEGORIES,
	NEW_CATEGORY,
	UPDATE_CATEGORY,
	LOAD_INVENTORIES,
	NEW_INVENTORY,
} from './types';

export const loadCategories = categories => {
	return {
		type: LOAD_CATEGORIES,
		payload: categories,
	};
};

export const addCategory = category => {
	return {
		type: NEW_CATEGORY,
		payload: category,
	};
};

export const updateCategory = category => {
	return {
		type: UPDATE_CATEGORY,
		payload: category,
	};
};

export const loadInventories = items => {
	return {
		type: LOAD_INVENTORIES,
		payload: items,
	};
};

export const addInventory = item => {
	return {
		type: NEW_INVENTORY,
		payload: item,
	};
};
