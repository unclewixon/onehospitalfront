/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
import { connect } from 'react-redux';

const NewDentistry = lazy(() => import('./NewDentistryRequest'));
const AllDentistry = lazy(() => import('./AllDentistry'));
const DentistryDashboard = lazy(() => import('./DentistryDasboard'));

class Dentistry extends Component {
	state = {};

	handleEdit = () => {
		alert('I am to See Details this guy');
	};
	render() {
		const { match, location, staff } = this.props;
		const page = location.pathname.split('/').pop();

		const department = staff?.details?.department?.name;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry">
										Dashboard
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/all-requests' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry/all-requests">
										All Requests
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/new-request' ? 'btn-outline-primary' : ''
										}`}
										to="/dentistry/new-request">
										New Dentistry Request
									</Link>
								</div>
								<h6 className="element-header">Dentistry</h6>

								<div className="row">
									<div className="col-md-12">
										<div className="element-box">
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
					</div>
				</div>
				<div className="content-panel compact">
					<Queue department={department} />
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(Dentistry));
