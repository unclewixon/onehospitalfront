/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import Queue from '../../components/Queue';
const AllTransaction = lazy(() => import('./AllTransaction'));
const Dashboard = lazy(() => import('./Dashboard'));
export class DashboardIndex extends Component {
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<>
				<div className="content-i">
					<div className="content-box">
						<div className="row">
							<div className="col-sm-12">
								<div className="element-wrapper">
									<h6 className="element-header">Hmo Dashboard</h6>
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
											to={`${match.path}/all-transaction`}
											className={`mr-2 btn btn-primary btn-sm  ${
												page === 'all-transaction' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											All transactions
										</Link>
									</div>

									<div className="row">
										<div className="col-sm-12">
											<div className="element-box">
												<Suspense fallback={<Splash />}>
													<Switch>
														<Route
															exact
															path={`${match.url}/`}
															component={Dashboard}
														/>
														<Route
															path={`${match.url}/all-transaction`}
															component={AllTransaction}
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
						<Queue />
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(DashboardIndex);
