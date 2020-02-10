import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HmoList from './HmoList';
import CategoryList from './CategoryList';
import NoMatch from './NoMatch';

const Hmo = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/list`} component={HmoList} />
			<Route path={`${match.url}/categories`} component={CategoryList} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Hmo;