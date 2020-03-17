import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions/user';
import SSRStorage from '../services/storage';
import { TOKEN_COOKIE, USER_RECORD } from '../services/constants';

const storage = new SSRStorage();

class Logout extends Component {
	componentWillMount() {
		storage.removeItem(TOKEN_COOKIE);
		storage.removeItem(USER_RECORD);
		this.props.signOut();
	}

	render() {
		return <Redirect to="/" />;
	}
}

export default connect(null, { signOut })(Logout);
