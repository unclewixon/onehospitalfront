/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import PaypointQueue from './PaypointQueue';

const NewTransaction = lazy(() => import('./NewTransaction'));
const InsuranceBills = lazy(() => import('./InsuranceBills'));
const Dashboard = lazy(() => import('./Dashboard'));
const ReviewTransaction = lazy(() => import('./ReviewTransaction'));
const Voucher = lazy(() => import('./Voucher'));

const index = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							{/*<h6 className="element-header">Pay Point</h6>*/}
							<div className="row">
								<div className="col-sm-12">
									<div className="element-box p-3 m-0">
										<Suspense fallback={<Splash />}>
											<Switch>
												<Route
													exact
													path={`${match.url}`}
													component={Dashboard}
												/>
												<Route
													exact
													path={`${match.url}/upcoming-bills`}
													component={PaypointQueue}
												/>
												<Route
													path={`${match.url}/insurance-bills`}
													component={InsuranceBills}
												/>
												<Route
													path={`${match.url}/transaction-history`}
													component={ReviewTransaction}
												/>
												<Route
													path={`${match.url}/vouchers`}
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
		</div>
	);
};

export default withRouter(index);
