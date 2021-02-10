/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';

const AllRequest = lazy(() => import('./AllRequest'));
const ScheduledRequests = lazy(() => import('./ScheduledRequests'));
const AppraisalList = lazy(() => import('./AppraisalList'));
const AwaitingList = lazy(() => import('./AwaitingList'));
const SearchScan = lazy(() => import('./SearchScan'));
const NewRadiology = lazy(() => import('./NewRadiology'));

const Dashboard = lazy(() => import('./Dashboard'));

class index extends Component {
	render() {
		const { location, match, staff } = this.props;
		const page = location.pathname.split('/').pop();

		const department = staff?.details?.department?.name;
		let pageTitle = 'Dashboard';
		if (page === 'all-request') {
			pageTitle = 'All Request';
		} else if (page === 'new-radiology') {
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

									{/* <Link
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
									</Link> */}

									<Link
										className={`btn btn-primary btn-sm my-1 ${
											page === 'new-radiology' ? 'btn-outline-primary' : ''
										}`}
										to={`${match.path}/new-radiology`}>
										New Request
									</Link>
								</div>
								<h6 className="element-header">{pageTitle}</h6>
								<Suspense fallback={<Splash />}>
									<Switch>
										<Route
											exact
											path={`${match.path}/`}
											component={Dashboard}
										/>

										<Route
											exact
											path={`${match.path}/all-request`}
											component={AllRequest}
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

										<Route component={NoMatch} />
									</Switch>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
				{/* removed based on task requirement DO NOT UNCOMMENT */}
				{/* <div className="content-panel compact">
					<Queue department={department} />
				</div> */}
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
