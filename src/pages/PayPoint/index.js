/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import Queue from '../../components/Queue';
const NewTransaction = lazy(() => import('./NewTransaction'));
const InsuranceBills = lazy(() => import('./InsuranceBills'));
const Dashboard = lazy(() => import('./Dashboard'));
const ReviewTransaction = lazy(() => import('./ReviewTransaction'));
const Voucher = lazy(() => import('./Voucher'));

export class index extends Component {
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
									<div className="element-actions">
										<Link
											to={`${match.path}/`}
											className={`mx-2 btn btn-primary btn-sm  ${
												page === '' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											Dashboard
										</Link>
										<Link
											to={`${match.path}/insurance-bills`}
											className={`mr-2 btn btn-primary btn-sm  ${
												page === 'insurance-bills' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											Insurance
										</Link>
										<Link
											to={`${match.path}/review-transaction`}
											className={`mr-2 btn btn-primary btn-sm  ${
												page === 'review-transaction'
													? 'btn-outline-primary'
													: ''
											}`}>
											{' '}
											Review Transaction
										</Link>
										<Link
											to={`${match.path}/paypoint-voucher`}
											className={`mr-2 btn btn-primary btn-sm  ${
												page === 'paypoint-voucher' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											Paypoint Voucher
										</Link>
										<Link
											to={`${match.path}/new-transaction`}
											className={`mr-2 btn btn-primary btn-sm ${
												page === 'new-transaction' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											New Transaction
										</Link>
									</div>
									<h6 className="element-header">Pay Point</h6>

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
															path={`${match.url}/insurance-bills`}
															component={InsuranceBills}
														/>
														<Route
															path={`${match.url}/review-transaction`}
															component={ReviewTransaction}
														/>
														<Route
															path={`${match.url}/paypoint-voucher`}
															component={Voucher}
														/>

														<Route
															path={`${match.url}/new-transaction`}
															component={NewTransaction}
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
					{/*<div className="content-panel compact">*/}
					{/*	<Queue />*/}
					{/*</div>*/}
				</div>
			</>
		);
	}
}

export default withRouter(index);
