/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
const NewDentistry = lazy(() => import('./NewDentistryRequest'));
const RecentDentistry = lazy(() => import('./RecentDentistry'));
const AllDentistry = lazy(() => import('./AllDentistry'));
const DentistryDashboard = lazy(() => import('./DentistryDasboard'));

class Dentistry extends Component {
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
								<h6 className="element-header">Dentistry</h6>
								<div className="row mt-2 mb-4">
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry">
										Dashboard
									</Link>
									<Link
										to={`/dentistry/recent`}
										className={`mr-2 btn btn-primary btn-sm ${
											page === '/recent' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										Recent Requests
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/all-requests' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry/all-requests">
										All Dentistry Requests
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/new-request' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry/new-request">
										Dentistry Request
									</Link>
								</div>

								<div className="row">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}/`}
												component={DentistryDashboard}
											/>
											{/* <Route
												exact
												path={`${match.url}/`}
												component={NewPhysiotherapy}
											/> */}
											<Route
												exact
												path={`${match.url}/all-requests`}
												component={AllDentistry}
											/>
											<Route
												exact
												path={`${match.url}/recent`}
												component={RecentDentistry}
											/>
											<Route
												exact
												path={`${match.url}/new-request`}
												component={NewDentistry}
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

export default withRouter(Dentistry);
