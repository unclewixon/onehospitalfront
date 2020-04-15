/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
const NewPhysiotherapy = lazy(() => import('./NewPhysiotherapyRequest'));
const RecentPhysiotherapy = lazy(() => import('./RecentPhysiotherapy'));
const AllPhysiotherapy = lazy(() => import('./AllPhysiotherapy'));
const PhysiotherapyDashboard = lazy(() => import('./PhysiotherapyDasboard'));

class Physiotherapy extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Physiotherapy</h6>
								<div className="row mt-2 mb-4">
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/' ? 'btn-outline-primary' : ''
										}`}
										to="/physiotherapy">
										Dashboard
									</Link>
									<Link
										to={`/physiotherapy/recent`}
										className={`mr-2 btn btn-primary btn-sm ${
											page === '/recent' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										Recent Appointments
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/all-patients' ? 'btn-outline-primary' : ''
										}`}
										to="/physiotherapy/all-patients">
										All Physio Patients
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/new-request' ? 'btn-outline-primary' : ''
										}`}
										to="/physiotherapy/new-request">
										Physiotherapy Request
									</Link>
								</div>

								<div className="row">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}/`}
												component={PhysiotherapyDashboard}
											/>
											{/* <Route
												exact
												path={`${match.url}/`}
												component={NewPhysiotherapy}
											/> */}
											<Route
												exact
												path={`${match.url}/all-patients`}
												component={AllPhysiotherapy}
											/>
											<Route
												exact
												path={`${match.url}/recent`}
												component={RecentPhysiotherapy}
											/>
											<Route
												exact
												path={`${match.url}/new-request`}
												component={NewPhysiotherapy}
											/>
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content-panel compact">
					<Queue />
				</div>
			</div>
		);
	}
}

export default withRouter(Physiotherapy);
