import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Roles from './Roles';
import Lab from "./Laboratory";
import Diagnosis from "./Diagnosis"
import Consultation from "./Consultation"
import NoMatch from './NoMatch';

const Settings = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/roles`} component={Roles} />
			<Route path={`${match.url}/departments`} component={Roles} />
			<Route path={`${match.url}/consultation`} component={Consultation} />
			<Route path={`${match.url}/diagnosis`} component={Diagnosis} />
			<Route path={`${match.url}/lab-mgt`} component={Lab} />
			<Route path={`${match.url}/room-mgt`} component={Roles} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Settings;