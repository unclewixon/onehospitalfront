import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AllTransaction = lazy(() => import('./AllTransaction'));
const PendingTransactions = lazy(() => import('./PendingTransactions'));

const Transactions = ({ match }) => {
	return (
		<Suspense fallback={<Splash />}>
			<Switch>
				<Route exact path={match.path} component={PendingTransactions} />
				<Route path={`${match.url}/all`} component={AllTransaction} />

				<Route component={NoMatch} />
			</Switch>
		</Suspense>
	);
};

export default withRouter(Transactions);
