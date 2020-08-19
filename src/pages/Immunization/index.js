import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
// import Queue from '../../components/Queue';
import { connect } from 'react-redux';
const Dashboard = lazy(() => import('./Dashboard'));
const AllImmunization = lazy(() => import('./AllImmunization'));
const CreateImmunization = lazy(() =>
	import('../../components/Patient/CreateImmunization')
);
export class index extends Component {
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		// const department = staff?.details?.department?.name;
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
											to={`${match.path}/all-immunization`}
											className={`mr-2 btn btn-primary btn-sm  ${
												page === 'all-immunization' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											All Immunization
										</Link>

										<Link
											to={`${match.path}/new-immunization`}
											className={`mr-2 btn btn-primary btn-sm ${
												page === 'new-immunization' ? 'btn-outline-primary' : ''
											}`}>
											{' '}
											New Enrol
										</Link>
									</div>
									<h6 className="element-header">Immunization</h6>

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
															path={`${match.url}/all-immunization`}
															component={AllImmunization}
														/>

														<Route
															path={`${match.url}/new-immunization`}
															component={CreateImmunization}
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
					{/* <div className="content-panel compact">
						<Queue department={department} />
					</div> */}
				</div>
			</>
		);
	}
}

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(index));
