/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AllRequest = lazy(() => import('./AllRequest'));
const NewRadiology = lazy(() => import('./NewRadiology'));
const Dashboard = lazy(() => import('./Dashboard'));

class index extends Component {
	render() {
		const { location, match } = this.props;
		const page = location.pathname.split('/').pop();

		let pageTitle = 'Dashboard';
		if (page === 'all-request') {
			pageTitle = 'All Request';
		} else if (page === 'new-request') {
			pageTitle = 'New Radiology Request';
		}

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<Link
										to={`${match.path}/`}
										className={`btn btn-primary btn-sm my-1 ${
											page === '' ? 'btn-outline-primary' : ''
										}`}>
										Dashboard
									</Link>
									<Link
										to={`${match.path}/all-request`}
										className={`btn btn-primary btn-sm my-1 ${
											page === 'all-request' ? 'btn-outline-primary' : ''
										}`}>
										All Request
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'new-request' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/new-request`}>
										New Request
									</Link>
								</div>
								<h6 className="element-header">{pageTitle}</h6>
								<Suspense fallback={<Splash />}>
									<Switch>
										<Route exact path={`${match.path}`} component={Dashboard} />
										<Route
											exact
											path={`${match.path}/all-request`}
											component={AllRequest}
										/>
										<Route
											exact
											path={`${match.path}/new-request`}
											component={NewRadiology}
										/>
										<Route component={NoMatch} />
									</Switch>
								</Suspense>
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

export default withRouter(connect(mapStatetoProps)(index));
