import { REQUEST_START, REQUEST_STOP } from '../actions/types';

const reduxBlock = (state = [], action) => {
	switch (action.type) {
		case REQUEST_START:
		case REQUEST_STOP:
		default:
			return [...state, action.type];
	}
};

export default reduxBlock;
