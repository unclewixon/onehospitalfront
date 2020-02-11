import {
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SET_LEAVE,
	TOGGLE_ADD_TASK,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_CREATE_INVENTORY,
	TOGGLE_EDIT_INVENTORY,
	TOGGLE_UPDATE_QTY,
	TOGGLE_CREATE_INV_CAT,
	TOGGLE_EDIT_INV_CAT,
	TOGGLE_CREATE_ROLE,
} from './types';

export const toggleModal = status => {
	return {
		type: TOGGLE_MODAL,
		payload: status,
	};
};

export const toggleCreateStaff = status => {
	return {
		type: TOGGLE_CREATE_STAFF,
		payload: status,
	};
};

export const toggleShowHistory = status => {
	return {
		type: TOGGLE_SHOW_HISTORY,
		payload: status,
	};
};

export const toggleSetLeave = status => {
	return {
		type: TOGGLE_SET_LEAVE,
		payload: status,
	};
};


export const toggleAddTask = status => {
	return{
		type: TOGGLE_ADD_TASK,
		payload: status,
	}
}

// inventory modals
export const toggleCreateInventory = status => {
	return {
		type: TOGGLE_CREATE_INVENTORY,
		payload: status,
	};
};

export const toggleEditInventory = status => {
	return {
		type: TOGGLE_EDIT_INVENTORY,
		payload: status,
	};
};

export const toggleUpdateQuantity = status => {
	return {
		type: TOGGLE_UPDATE_QTY,
		payload: status,
	};
};

export const toggleCreateInvCategory = status => {
	return {
		type: TOGGLE_CREATE_INV_CAT,
		payload: status,
	};
};

export const toggleEditInvCategory = status => {
	return {
		type: TOGGLE_EDIT_INV_CAT,
		payload: status,
	};
};

export const toggleCreateRole = status => {
	return {
		type: TOGGLE_CREATE_ROLE,
		payload: status,
	};
};

// close modals
export const closeModals = () => {
	return dispatch => {
		dispatch(toggleModal(false));
		dispatch(toggleCreateStaff(false));
		dispatch(toggleShowHistory(false));
		dispatch(toggleAddTask(false))
		dispatch(toggleSetLeave(false));
		dispatch(toggleCreateInventory(false));
		dispatch(toggleEditInventory(false));
		dispatch(toggleUpdateQuantity(false));
		dispatch(toggleCreateInvCategory(false));
		dispatch(toggleEditInvCategory(false));
		dispatch(toggleCreateRole(false));
	};
};

export const createStaff = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateStaff(action));
	};
};

export const showHistory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleShowHistory(action));
	};
};


export const addTask = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true))
		dispatch(toggleAddTask(action))
	}
}

export const setLeave = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleSetLeave(action));
	};
};

// inventory modal toggles
export const createInventory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateInventory(action));
	};
};

export const editInventory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleEditInventory(action));
	};
};

export const updateQuantity = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUpdateQuantity(action));
	};
};

export const createInventoryCat = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateInvCategory(action));
	};
};

export const editInventoryCat = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleEditInvCategory(action));
	};
};

export const createRole = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateRole(action));
	};
};
