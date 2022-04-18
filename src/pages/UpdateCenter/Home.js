import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
const CallCenter = lazy(() => import('./UpdateCenter'));

const Home = ({ match }) => {
	return (
		<Suspense fallback={<Splash />}>
			<Switch>
				<Route path={`/update-center/page-one`} component={CallCenter} />
				<Route path={`/update-center/page-two`} component={CallCenter} />
				<Route path={`/update-center/page-three`} component={CallCenter} />

				<Route component={NoMatch} />
			</Switch>
		</Suspense>
	);
};

export default Home;
