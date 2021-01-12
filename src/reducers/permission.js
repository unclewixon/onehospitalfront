import { LOAD_PERMISSIONS } from '../actions/types';

const permission = (state = [], action) => {
	switch (action.type) {
		case LOAD_PERMISSIONS:
			return [...action.payload];
		default:
			return state;
	}
};

export default permission;
