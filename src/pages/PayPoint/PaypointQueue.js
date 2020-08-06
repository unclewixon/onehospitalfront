import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Queue from './../../components/Queue';
import PaypointQueueTable from './../../components/Tables/PaypointQueueTable';

const PaypointQueue = ({ staff }) => {
	const department = staff?.details?.department?.name;

	return <PaypointQueueTable />;
};

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(PaypointQueue));
