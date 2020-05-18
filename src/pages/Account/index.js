import React, { Component, lazy, Suspense } from 'react';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Reports = lazy(() => import('./Reports'));
const Journal = lazy(() => import('./Journal'));
const AccountSetup = lazy(() => import('./AccountSetup'));
export class index extends Component {
	render() {
		const { match } = this.props;
		console.log(match.url);
		return (
			<div>
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route
							exact
							path={`${match.url}/reports/trial-balance`}
							component={Reports}
						/>
						<Route
							exact
							path={`${match.url}/journal-entry`}
							component={Journal}
						/>
						<Route path={`${match.url}/setup`} component={AccountSetup} />
						<Route path={`${match.url}/`} component={Reports} />
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
		);
	}
}

export default withRouter(index);
