import {
	ADD_CAFETERIA_ITEM,
	GET_ALL_CAFETERIA_ITEMS,
	DELETE_CAFETERIA_ITEM,
	FILTER_CAFETERIA_ITEM,
} from '../actions/types';

const initState = {
	items: [
		{
			id: 1,
			title: 'Winter body',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 110,
			img: Item1,
		},
		{
			id: 2,
			title: 'Adidas',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 80,
			img: Item2,
		},
		{
			id: 3,
			title: 'Vans',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 120,
			img: Item3,
		},
		{
			id: 4,
			title: 'White',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 260,
			img: Item4,
		},
		{
			id: 5,
			title: 'Cropped-sho',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 160,
			img: Item5,
		},
		{
			id: 6,
			title: 'Blues',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 90,
			img: Item6,
		},
	],
	addedItems: [],
	total: 0,
};

const cafeteriaReducer = (state = initState, action) => {
	if (action.type === ADD_CAFETERIA_ITEM) {
		let addedItem = state.items.find(item => item.id === action.id);
		//check if the action id exists in the addedItems
		let existed_item = state.addedItems.find(item => action.id === item.id);
		if (existed_item) {
			addedItem.quantity += 1;
			return {
				...state,
				total: state.total + addedItem.price,
			};
		} else {
			addedItem.quantity = 1;
			//calculating the total
			let newTotal = state.total + addedItem.price;

			return {
				...state,
				addedItems: [...state.addedItems, addedItem],
				total: newTotal,
			};
		}
	} else {
		return state;
	}
};
