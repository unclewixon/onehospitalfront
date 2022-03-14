import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Payroll from './Payroll';
import NoMatch from '../NoMatch';

const Home = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/payroll`} component={Payroll} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Home;
