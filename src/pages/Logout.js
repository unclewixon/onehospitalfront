import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions/user';
import SSRStorage from '../services/storage';
import {
	TOKEN_COOKIE,
	USER_RECORD,
	CK_COMPLAINTS,
	CK_REVIEW_OF_SYSTEMS,
	CK_HX_FORMS,
	CK_PAST_HISTORY,
	CK_ALLERGIES,
	CK_PAST_ALLERGIES,
	CK_PHYSICAL_EXAM,
	CK_INVESTIGATIONS,
	CK_INVESTIGATION_LAB,
	CK_INVESTIGATION_SCAN,
	CK_TREATMENT_PLAN,
	CK_CONSUMABLE,
	CK_DIAGNOSIS,
	CK_PAST_DIAGNOSIS,
} from '../services/constants';
import { request } from '../services/utilities';

const storage = new SSRStorage();

class Logout extends Component {
	async componentWillMount() {
		const user = await storage.getItem(TOKEN_COOKIE);

		if (user.role.slug === 'doctor') {
			request(`hr/staffs/unset-room/${user.details.id}`, 'GET', true);
			storage.removeItem('ACTIVE:ROOM');
		}

		storage.removeItem(USER_RECORD);
		storage.removeItem(TOKEN_COOKIE);

		storage.removeItem(CK_COMPLAINTS);
		storage.removeItem(CK_REVIEW_OF_SYSTEMS);
		storage.removeItem(CK_HX_FORMS);
		storage.removeItem(CK_PAST_HISTORY);
		storage.removeItem(CK_ALLERGIES);
		storage.removeItem(CK_PAST_ALLERGIES);
		storage.removeItem(CK_PHYSICAL_EXAM);
		storage.removeItem(CK_INVESTIGATIONS);
		storage.removeItem(CK_INVESTIGATION_LAB);
		storage.removeItem(CK_INVESTIGATION_SCAN);
		storage.removeItem(CK_TREATMENT_PLAN);
		storage.removeItem(CK_CONSUMABLE);
		storage.removeItem(CK_DIAGNOSIS);
		storage.removeItem(CK_PAST_DIAGNOSIS);

		this.props.signOut();
	}

	render() {
		return <Redirect to="/" />;
	}
}

export default connect(null, { signOut })(Logout);
