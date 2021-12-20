import React, { lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const VitalsQueue = lazy(() => import('./VitalsQueue'));
const InPatientCare = lazy(() => import('./InPatientCare'));
const ClinicalTasks = lazy(() => import('./ClinicalTasks'));

const Nurse = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}`} component={VitalsQueue} />
								<Route
									path={`${match.url}/in-patients/admitted`}
									component={InPatientCare}
								/>
								<Route
									path={`${match.url}/in-patients/discharged`}
									component={InPatientCare}
								/>
								<Route
									path={`${match.url}/in-patients/tasks`}
									component={ClinicalTasks}
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

export default withRouter(Nurse);
