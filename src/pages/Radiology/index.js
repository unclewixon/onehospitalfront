/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Link, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';

const OpenRequest = lazy(() => import('./OpenRequest'));
const ScheduledRequests = lazy(() => import('./ScheduledRequests'));
const AppraisalList = lazy(() => import('./AppraisalList'));
const AwaitingList = lazy(() => import('./AwaitingList'));
const SearchScan = lazy(() => import('./SearchScan'));
const NewRadiology = lazy(() => import('./NewRadiology'));
const RecentRequest = lazy(() => import('./RecentRequest'));

class index extends Component {
	render() {
		const { location, match } = this.props;
		const page = location.pathname.split('/').pop();

		console.log(match.path);
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Radiology</h6>
								<div className="row mt-2 mb-4">
									<Link
										to={`${match.path}/`}
										className={`btn btn-primary btn-sm my-1 ${
											page === '' ? 'btn-outline-primary' : ''
										}`}>
										Open Request
									</Link>

									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'scheduled-request' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/scheduled-request`}>
										Schedule Request
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'appraisal-list' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/appraisal-list`}>
										Appraisal List
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'awaiting-list' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/awaiting-list`}>
										Awaiting List
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'search-scan' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/search-scan`}>
										Search Scan
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'recent-request' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/recent-request`}>
										Recent Request
									</Link>
									<Link
										className={`btn btn-primary btn-sm my-1  ml-0 ${
											page === 'new-radiology' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/new-radiology`}>
										New Request
									</Link>
								</div>
								<Suspense fallback={<Splash />}>
									<Switch>
										<Route
											exact
											path={`${match.path}/`}
											component={OpenRequest}
										/>
										<Route
											exact
											path={`${match.path}/awaiting-list`}
											component={AwaitingList}
										/>

										<Route
											exact
											path={`${match.path}/appraisal-list`}
											component={AppraisalList}
										/>
										<Route
											exact
											path={`${match.path}/new-radiology`}
											component={NewRadiology}
										/>

										<Route
											exact
											path={`${match.path}/scheduled-request`}
											component={ScheduledRequests}
										/>
										<Route
											exact
											path={`${match.path}/search-scan`}
											component={SearchScan}
										/>
										<Route
											exact
											path={`${match.path}/recent-request`}
											component={RecentRequest}
										/>

										<Route component={NoMatch} />
									</Switch>
								</Suspense>
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

export default withRouter(index);
