import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import Queue from '../../components/Queue';

const Dashboard = lazy(() => import('./Dashboard'));
const LabDetail = lazy(() => import('./LabDetail'));
class index extends Component {
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
									</div>
									<h6 className="element-header">Labour Management</h6>
									<div className="row">
										<div className="col-sm-12">
											<Suspense fallback={<Splash />}>
												<Switch>
													<Route
														exact
														path={`${match.url}/`}
														component={Dashboard}
													/>
													<Route
														path={`${match.url}/detail`}
														component={LabDetail}
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
					{/* <div className="content-panel compact">
						<Queue />
					</div> */}
				</div>
			</>
		);
	}
}

export default connect(null, null)(withRouter(index));
