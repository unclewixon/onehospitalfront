/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Roles from './Roles';
import Lab from "./Laboratory";
import Diagnosis from "./Diagnosis";
import Consultation from "./Consultation";
import RoomMgmt from "./RoomMgmt";
import Departments from "./Departments";
import LeaveCategory from "./LeaveCategory";
import ServicesCategory from "./ServiceCategory";
import NoMatch from './NoMatch';

const Settings = ({ match, location }) => {
	const [toggle, setToggle] = useState(false);
	const page = location.pathname.split('/').pop();
	return (
		<Switch>
			<Route path={`${match.url}/roles`} component={Roles} />
			<Route path={`${match.url}/departments`} component={Departments} />
			<Route path={`${match.url}/consultation`} component={Consultation} />
			<Route path={`${match.url}/diagnosis`} component={Diagnosis} />
			<Route path={`${match.url}/lab-mgt`} component={Lab} />
			<Route path={`${match.url}/room-mgt`} component={RoomMgmt} />
			<Route path={`${match.url}/leave-category`} component={LeaveCategory} />
			<Route path={`${match.url}/services-category`} component={ServicesCategory} />

			<Route component={NoMatch} />
		</Switch>
	);
};

export default Settings;
