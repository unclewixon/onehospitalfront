import React, { Component, lazy, Suspense } from 'react';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Cafeteria = lazy(() => import('./Cafeteria'));
const Inventory = lazy(() => import('./Inventory'));
const CafeteriaItems = lazy(() => import('../../components/CafeteriaItems'));
const CafeteriaCategory = lazy(() =>
	import('../../components/CafeteriaCategory')
);
export class index extends Component {
	render() {
		const { match } = this.props;
		return (
			<div>
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route exact path={`${match.url}/`} component={Cafeteria} />
						<Route
							exact
							path={`${match.url}/items/category`}
							component={CafeteriaCategory}
						/>
						<Route
							exact
							path={`${match.url}/items`}
							component={CafeteriaItems}
						/>
						<Route
							exact
							path={`${match.url}/inventory`}
							component={Inventory}
						/>
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
		);
	}
}

export default withRouter(index);
