/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from '../../components/Splash';
import NoMatch from '../NoMatch';

const Cafeteria = lazy(() => import('./Cafeteria'));
const Inventory = lazy(() => import('./Inventory'));
const Requisitions = lazy(() => import('./Requisitions'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}`} component={Cafeteria} />
								<Route
									exact
									path={`${match.url}/transactions`}
									component={Cafeteria}
								/>
								<Route
									exact
									path={`${match.url}/showcase`}
									component={Cafeteria}
								/>
								<Route path={`${match.url}/inventory`} component={Inventory} />
								<Route
									path={`${match.url}/requisitions`}
									component={Requisitions}
								/>
								<Route path={`${match.url}/food-items`} component={Cafeteria} />
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
