import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Cafeteria = lazy(() => import('./Cafeteria'));

class index extends Component {
	render() {
		const { match } = this.props;
		return (
			<div>
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route exact path={`${match.url}/`} component={Cafeteria} />
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
		);
	}
}

export default withRouter(index);
