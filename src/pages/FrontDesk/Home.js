import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Appointments = lazy(() => import('./Appointments'));
const FrontDesk = lazy(() => import('./FrontDesk'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route
									exact
									path={`/front-desk/appointments/queue`}
									component={Appointments}
								/>
								<Route
									exact
									path={`${match.url}/appointments/history`}
									component={Appointments}
								/>
								<Route path={`${match.url}/patients`} component={FrontDesk} />
								<Route path={`${match.url}/admitted`} component={FrontDesk} />
								<Route
									path={`${match.url}/insurance-transactions`}
									component={FrontDesk}
								/>
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
