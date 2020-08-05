import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions/user';
import SSRStorage from '../services/storage';
import { TOKEN_COOKIE, USER_RECORD } from '../services/constants';
import { request } from '../services/utilities';

const storage = new SSRStorage();

class Logout extends Component {
	async componentWillMount() {
		const user = await storage.getItem(TOKEN_COOKIE);

		if (user.role.slug === 'doctor') {
			request(`hr/staffs/unset-room/${user.details.id}`, 'GET');
			storage.removeItem('ACTIVE:ROOM');
		}
		storage.removeItem(TOKEN_COOKIE);
		storage.removeItem(USER_RECORD);
		this.props.signOut();
	}

	render() {
		return <Redirect to="/" />;
	}
}

export default connect(null, { signOut })(Logout);
