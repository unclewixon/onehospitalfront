import {
	LOAD_CATEGORIES,
	NEW_CATEGORY,
	UPDATE_CATEGORY,
	LOAD_INVENTORIES,
	NEW_INVENTORY,
} from '../actions/types';

const INITIAL_STATE = {
	inventories: [],
	categories: [],
	sub_categories: [],
};

const inventory = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_INVENTORIES:
			return { ...state, inventories: action.payload };
		case NEW_INVENTORY:
			return { ...state, inventories: [...state.inventories, action.payload] };
		case LOAD_CATEGORIES:
			return { ...state, categories: action.payload };
		case NEW_CATEGORY:
			return { ...state, categories: [...state.categories, action.payload] };
		case UPDATE_CATEGORY:
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
		default:
			return state;
	}
};

export default inventory;
