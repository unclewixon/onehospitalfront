import {
	GET_ALL_CAFETERIA_ITEMS,
	ADD_CAFETERIA_ITEM,
	DELETE_CAFETERIA_ITEM,
	UPDATE_CAFETERIA_ITEM,
	GET_ALL_CAFETERIA_INVENTORY,
	ADD_CAFETERIA_INVENTORY,
	UPDATE_CAFETERIA_INVENTORY,
	DELETE_CAFETERIA_INVENTORY,
} from '../actions/types';

const initState = {
	item: [],
	cafeteriaItemCategory: [],
	cafeteriaInvCategory: [],
	cafeteriaInventory: [],
	cafeteriaItems: [],
};

const cafeteria = (state = initState, action) => {
	let cafeteria;
	switch (action.type) {
		case GET_ALL_CAFETERIA_ITEMS:
			cafeteria = { ...state, cafeteriaItems: action.payload };
			return cafeteria;
		case ADD_CAFETERIA_ITEM:
			return {
				...state,
				cafeteriaItems: [action.payload, ...state.cafeteriaItems],
			};
		case UPDATE_CAFETERIA_ITEM:
			cafeteria = state.cafeteriaItems.map(item => {
				if (item.item_code === action.payload.item_code) {
					return action.payload;
				}
				return item;
			});
			return { ...state, cafeteriaItems: cafeteria };
		case DELETE_CAFETERIA_ITEM:
			cafeteria = state.cafeteriaItems.filter(
				item => item.id !== action.payload.id
			);
			return {
				...state,
				cafeteriaItems: cafeteria,
			};
		case GET_ALL_CAFETERIA_INVENTORY:
			cafeteria = { ...state, cafeteriaInventory: action.payload };
			return cafeteria;
		case ADD_CAFETERIA_INVENTORY:
			return {
				...state,
				cafeteriaInventory: [action.payload, ...state.cafeteriaInventory],
			};
		case UPDATE_CAFETERIA_INVENTORY:
			cafeteria = state.cafeteriaInventory.map(item => {
				if (item.stock_code === action.payload.stock_code) {
					return action.payload;
				}
				return item;
			});
			return { ...state, cafeteriaInventory: cafeteria };
		case DELETE_CAFETERIA_INVENTORY:
			cafeteria = state.cafeteriaInventory.filter(
				item => item.id !== action.payload.id
			);
			return {
				...state,
				cafeteriaInventory: cafeteria,
			};
		default:
			return state;
	}
};

export default cafeteria;
