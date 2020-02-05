import React from 'react';
import { connect } from 'react-redux';

import ModalCreateStaff from './ModalCreateStaff';
import ModalSetLeave from './ModalSetLeave';
import ModalLeaveHistory from './ModalLeaveHistory';

const ModalDialogs = ({ create_staff, set_leave, show_history }) => {
	return (
		<>
			{create_staff && <ModalCreateStaff />}
			{set_leave && <ModalSetLeave />}
			{show_history && <ModalLeaveHistory />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		create_staff: state.general.create_staff,
		show_history: state.general.show_history,
		set_leave: state.general.set_leave,
	};
};

export default connect(mapStateToProps)(ModalDialogs);
