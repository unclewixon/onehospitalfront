/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
const NewLab = lazy(() => import('./NewLab'));
const ClinicalLab = lazy(() => import('./ClinicalLab'));
const AllRequest = lazy(() => import('./AllRequest'));
const LabRecentRequest = lazy(() => import('./LabRecentRequest'));
const LabFilledRequest = lazy(() => import('./LabFilledRequest'));


class Clinical extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match } = this.props;

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}/`} component={ClinicalLab} />
								<Route
									exact
									path={`${match.url}/lab-request`}
									component={NewLab}
								/>
								<Route
									exact
									path={`${match.url}/all-request`}
									component={AllRequest}
								/>
								<Route
									exact
									path={`${match.url}/recent-request`}
									component={LabRecentRequest}
								/>
								<Route
									exact
									path={`${match.url}/filled-request`}
									component={LabFilledRequest}
								/>
								<Route component={NoMatch} />
							</Switch>
						</Suspense>
					</div>
				</div>
				<div className="content-panel compact">
					<Queue />
				</div>
			</div>
		);
	}
}

export default withRouter(Clinical);
