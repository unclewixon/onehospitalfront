/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import Queue from '../components/Queue';
import SaleSummary from '../components/SaleSummary';
import { connect } from 'react-redux';

import NoMatch from './NoMatch';
import Splash from '../components/Splash';

const Overall = lazy(() => import('../components/Overall'));
const PharmRecentRequest = lazy(() =>
	import('../components/PharmRecentRequest')
);
const PharmAllRequest = lazy(() => import('../components/PharmAllRequest'));
const PharmFillRequest = lazy(() => import('../components/PharmFillRequest'));
const PharmNewRequest = lazy(() => import('../components/PharmNewRequest'));
export class Pharmacy extends Component {
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
								<h6 className="element-header">Pharmacy</h6>
								<div className="row mt-2 mb-4">
									<Link
										to={`${match.path}/`}
										className={`mx-2 btn btn-primary btn-sm  ${
											page === '' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										Dashboard
									</Link>
									<Link
										to={`${match.path}/all-request`}
										className={`mr-2 btn btn-primary btn-sm  ${
											page === 'all-request' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										All Request
									</Link>
									<Link
										to={`${match.path}/new-request`}
										className={`mr-2 btn btn-primary btn-sm  ${
											page === 'new-request' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										New Request
									</Link>
								</div>

								<div className="row">
									<div className="col-sm-12">
										<Suspense fallback={<Splash />}>
											<Switch>
												<Route
													exact
													path={`${match.url}/`}
													component={PharmRecentRequest}
												/>
												<Route
													path={`${match.url}/all-request`}
													component={PharmAllRequest}
												/>
												<Route
													path={`${match.url}/new-request`}
													component={PharmNewRequest}
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

export default withRouter(connect(mapStatetoProps)(Pharmacy));
