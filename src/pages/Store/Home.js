import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Inventory = lazy(() => import('./Inventory'));

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	let pageTitle = 'Inventory';
	if (page === 'categories') {
		pageTitle = 'Category';
	} else if (page === 'sub-categories') {
		pageTitle = 'Sub Category';
	} else if (page === 'vendors') {
		pageTitle = 'Vendors';
	}

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">{pageTitle}</h6>
							<div className="row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route path={`${match.url}`} component={Inventory} />
											<Route
												path={`${match.url}/categories`}
												component={Inventory}
											/>
											<Route
												path={`${match.url}/sub-categories`}
												component={Inventory}
											/>
											<Route
												path={`${match.url}/vendors`}
												component={Inventory}
											/>
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
