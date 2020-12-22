/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';

import Splash from '../../components/Splash';

const NurseHome = lazy(() => import('./NurseHome'));
const InPatientCare = lazy(() => import('./InPatientCare'));
const ClinicalTasks = lazy(() => import('./ClinicalTasks'));

const Nurse = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={`${match.url}`} component={NurseHome} />
									<Route
										path={`${match.url}/in-patients/care`}
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
		</div>
	);
};

export default withRouter(Nurse);
