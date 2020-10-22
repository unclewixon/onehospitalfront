/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AllTransaction = lazy(() => import('./AllTransaction'));
const Dashboard = lazy(() => import('./Dashboard'));

class DashboardIndex extends Component {
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="element-wrapper">
						<h6 className="element-header">HMO Transactions</h6>
						<div className="row mt-2 mb-4">
							<Link
								to={`${match.path}/`}
								className={`mx-2 btn btn-primary btn-sm  ${
									page !== '' ? 'btn-outline-primary' : ''
								}`}>
								{' '}
								Pending Transactions
							</Link>
							<Link
								to={`${match.path}/all-transaction`}
								className={`mr-2 btn btn-primary btn-sm  ${
									page !== 'all-transaction' ? 'btn-outline-primary' : ''
								}`}>
								{' '}
								All transactions
							</Link>
						</div>

						<div className="element-box p-3 m-0">
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={`${match.url}/`} component={Dashboard} />
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
		);
	}
}

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(DashboardIndex));
