import React, { Suspense, lazy } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const LabourMgt = lazy(() => import('./LabourPatients'));
const EnrollPatient = lazy(() => import('./EnrollmentForm'));

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	let pageTitle = 'Dashboard';
	if (page === 'enroll-patient') {
		pageTitle = 'Enroll Patient';
	}

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<Link
									to={match.path}
									className={`mx-2 btn btn-primary btn-sm  ${
										page === 'labour-mgt' ? 'btn-outline-primary' : ''
									}`}
								>
									Dashboard
								</Link>
								<Link
									to={`${match.path}/enroll-patient`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'enroll-patient' ? 'btn-outline-primary' : ''
									}`}
								>
									Enroll Patient
								</Link>
							</div>
							<h6 className="element-header">{pageTitle}</h6>
							<div className="element-content row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}`}
												component={LabourMgt}
											/>
											<Route
												exact
												path={`${match.url}/enroll-patient`}
												component={EnrollPatient}
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
