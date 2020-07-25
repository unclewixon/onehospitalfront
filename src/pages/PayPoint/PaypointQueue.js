import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Queue from './../../components/Queue';

const PaypointQueue = ({ staff }) => {
	const department = staff?.details?.department?.name;

	return <Queue department={department} />;
};

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(PaypointQueue));
