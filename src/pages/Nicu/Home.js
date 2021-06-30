import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Nicu = lazy(() => import('./NicuPatients'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">Dashboard</h6>
							<div className="element-content row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route exact path={`${match.url}`} component={Nicu} />
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
