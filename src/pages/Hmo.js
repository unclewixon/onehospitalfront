import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HmoList from './HmoList';
import HmoBulkUpload from '../components/HmoBulkUpload';
import NoMatch from './NoMatch';
import AllTransaction from './Hmo/AllTransaction';
import DashboardIndex from './Hmo/DashboardIndex';

const Hmo = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/dashboard`} component={DashboardIndex} />

			<Route path={`${match.url}/list`} component={HmoList} />
			<Route path={`${match.url}/bulk-upload`} component={HmoBulkUpload} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Hmo;
