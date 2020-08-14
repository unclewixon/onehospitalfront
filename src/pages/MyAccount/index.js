/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AccountProfile = lazy(() => import('./Profile/index'));

const MyAccount = ({ match, staff }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route exact path={`${match.url}/`} component={AccountProfile} />
						<Route
							exact
							path={`${match.url}/`}
							// component={NewLab}
						/>
						<Route
							exact
							path={`${match.url}/all-request`}
							// component={AllRequest}
						/>
						<Route
							exact
							path={`${match.url}/recent-request`}
							// component={LabRecentRequest}
						/>
						<Route
							exact
							path={`${match.url}/filled-request`}
							// component={LabFilledRequest}
						/>
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
			<div className="content-panel"></div>
		</div>
	);
};

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(MyAccount));
