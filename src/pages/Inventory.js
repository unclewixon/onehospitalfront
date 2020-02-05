import React from 'react';
import { Switch, Route } from 'react-router-dom';

import InventoryList from './InventoryList';
import CategoryList from './CategoryList';
import NoMatch from './NoMatch';

const Inventory = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/list`} component={InventoryList} />
			<Route path={`${match.url}/categories`} component={CategoryList} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Inventory;