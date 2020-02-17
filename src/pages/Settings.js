import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Roles from './Roles';
import NoMatch from './NoMatch';

const Settings = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/roles`} component={Roles} />
			<Route path={`${match.url}/departments`} component={Roles} />
			<Route path={`${match.url}/consultation`} component={Roles} />
			<Route path={`${match.url}/diagnosis`} component={Roles} />
			<Route path={`${match.url}/lab-mgt`} component={Roles} />
			<Route path={`${match.url}/room-mgt`} component={Roles} />
			<Route path={`${match.url}/leave-category`} component={Roles} />
			<Route path={`${match.url}/services-category`} component={Roles} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Settings;