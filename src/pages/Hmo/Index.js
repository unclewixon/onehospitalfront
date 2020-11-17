import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HmoList from './HmoList';
import Tarrifs from '../../components/Tarrifs';
import DashboardIndex from './DashboardIndex';
import NoMatch from '../NoMatch';

const Hmo = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/dashboard`} component={DashboardIndex} />
			<Route path={`${match.url}/list`} component={HmoList} />
			<Route path={`${match.url}/tariffs`} component={Tarrifs} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Hmo;
