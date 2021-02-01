/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
// import Queue from '../../components/Queue';
import { connect } from 'react-redux';

const NewProcedure = lazy(() => import('./NewProcedureRequest'));
const AllProcedure = lazy(() => import('./AllProcedure'));
const ProcedureDashboard = lazy(() => import('./ProcedureDasboard'));

class Procedure extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();

		// const department = staff?.details?.department?.name;

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Procedure</h6>
								<div className="row mt-2 mb-4">
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/' ? 'btn-outline-primary' : ''
										}`}
										to="/procedure">
										Dashboard
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/all-requests' ? 'btn-outline-primary' : ''
										}`}
										to="/procedure/all-requests">
										All Requests
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/new-request' ? 'btn-outline-primary' : ''
										}`}
										to="/procedure/new-request">
										New Procedure Request
									</Link>
								</div>

								<div className="row">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}/`}
												component={ProcedureDashboard}
											/>
											<Route
												exact
												path={`${match.url}/all-requests`}
												component={AllProcedure}
											/>
											<Route
												exact
												path={`${match.url}/new-request`}
												component={NewProcedure}
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
		);
	}
}

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(Procedure));
