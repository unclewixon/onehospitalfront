import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Lab from './Lab';
import Consultation from './Consultation';
import RoomMgmt from './RoomMgmt';
import Diagnosis from './Diagnosis';

const Role = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/lab`} component={Lab} />
			<Route path={`${match.url}/consultaion`} component={Consultation} />
			<Route path={`${match.url}/room-mgt`} component={RoomMgmt} />
			<Route path={`${match.url}/diagnosis`} component={Diagnosis} />
			{/* <Route component={NoMatch} /> */}
		</Switch>
	);
};

export default Role;