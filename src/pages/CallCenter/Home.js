import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
const CallCenter = lazy(() => import('./CallCenter'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route path={`/call-center/groups`} component={CallCenter} />
								<Route path={`/call-center/tasks`} component={CallCenter} />
								<Route path={`/call-center/chart`} component={CallCenter} />
								<Route component={NoMatch} />
							</Switch>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
