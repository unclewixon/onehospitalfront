import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Dashboard = lazy(() => import('./Dashboard'));
const LabDetail = lazy(() => import('./LabDetail'));
const EnrolLab = lazy(() => import('./EnrolLab'));

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
											Dashboard
										</Link>
										<Link
											to={`${match.path}/enrol-labour`}
											className={`mx-2 btn btn-primary btn-sm  ${
												page === 'enrol-labour' ? 'btn-outline-primary' : ''
											}`}>
											Enroll
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
														path={`${match.url}/detail/:id`}
														component={LabDetail}
													/>
													<Route
														path={`${match.url}/enrol-labour`}
														component={EnrolLab}
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
