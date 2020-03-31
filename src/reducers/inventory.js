import {
	LOAD_INV_CATEGORIES,
	ADD_INV_CATEGORY,
	UPDATE_INV_CATEGORY,
	LOAD_INVENTORIES,
	ADD_INVENTORY,
	LOAD_SUB_CATEGORIES,
	ADD_SUB_CATEGORY,
	UPDATE_SUB_CATEGORY,
	TOGGLE_UPDATE_QTY,
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
} from '../actions/types';

const INITIAL_STATE = {
	inventories: [],
	item: [],
	categories: [],
	sub_categories: [],
	cafeteriaCategories: [],
	cafeteriaItems: [],
	filteredCafeteriaItems: [],
};

const inventory = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_UPDATE_QTY:
			return { ...state, item: action.payload };
		case LOAD_INVENTORIES:
			return { ...state, inventories: action.payload };
		case ADD_INVENTORY:
			return { ...state, inventories: [...state.inventories, action.payload] };
		case LOAD_INV_CATEGORIES:
			return { ...state, categories: action.payload };
		case ADD_INV_CATEGORY:
			return { ...state, categories: [...state.categories, action.payload] };
		case UPDATE_INVENTORY:
			const inventories = state.inventories;
			const inventory = inventories.find(c => c.id === action.payload.id);
			if (inventory) {
				const idx = inventories.findIndex(c => c.id === action.payload.id);
				return {
					...state,
					inventories: [
						...state.inventories.slice(0, idx),
						{ ...inventory, ...action.payload },
						...state.inventories.slice(idx + 1),
					],
				};
			}
			return state;
		case UPDATE_INV_CATEGORY:
			const categories = state.categories;
			const category = categories.find(c => c.id === action.payload.id);
			if (category) {
				const idx = categories.findIndex(c => c.id === action.payload.id);
				return {
					...state,
					categories: [
						...state.categories.slice(0, idx),
						{ ...category, ...action.payload },
						...state.categories.slice(idx + 1),
					],
				};
			}
			return state;
		case LOAD_SUB_CATEGORIES:
			return { ...state, sub_categories: action.payload };
		case ADD_SUB_CATEGORY:
			return {
				...state,
				sub_categories: [...state.sub_categories, action.payload],
			};
		case UPDATE_SUB_CATEGORY:
			const sub_categories = state.sub_categories;
			const sub_category = sub_categories.find(c => c.id === action.payload.id);
			if (sub_category) {
				const idx = sub_categories.findIndex(c => c.id === action.payload.id);
				return {
					...state,
					sub_categories: [
						...state.sub_categories.slice(0, idx),
						{ ...sub_category, ...action.payload },
						...state.sub_categories.slice(idx + 1),
					],
				};
			}
			return state;
		case ADD_CAFETERIA_CATEGORY:
			return {
				...state,
				cafeteriaCategory: [...state.cafeteriaCategory, action.payload],
			};
		case GET_ALL_CAFETERIA_CATEGORY:
			return { ...state, cafeteriaCategory: action.payload };
		case UPDATE_CAFETERIA_CATEGORY:
			return {
				...state,
				cafeteriaCategory: [
					...state.cafeteriaCategory.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_CAFETERIA_CATEGORY:
			return {
				...state,
				cafeteriaCategory: state.cafeteriaCategory.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};

		case ADD_CAFETERIA_ITEM:
			return {
				...state,
				cafeteriaItems: [...state.cafeteriaItems, action.payload],
			};
		case GET_ALL_CAFETERIA_ITEMS:
			return { ...state, cafeteriaItems: action.payload };
		case UPDATE_CAFETERIA_ITEM:
			return {
				...state,
				cafeteriaItems: [
					...state.cafeteriaItems.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};

		case DELETE_CAFETERIA_ITEM:
			return {
				...state,
				cafeteriaItems: state.cafeteriaItems.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};

		case FILTER_CAFETERIA_ITEM:
			return {
				...state,
				filteredCafeteriaItems: state.cafeteriaItems.filter(
					deletedItem =>
						deletedItem.category.id === action.payload.category ||
						deletedItem.name === action.payload.item
				),
			};
		default:
			return state;
	}
};

export default inventory;
