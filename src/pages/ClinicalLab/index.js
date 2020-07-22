/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
import { connect } from 'react-redux';

const NewLab = lazy(() => import('./NewLab'));
const ClinicalLab = lazy(() => import('./ClinicalLab'));
const AllRequest = lazy(() => import('./AllRequest'));
const LabRecentRequest = lazy(() => import('./LabRecentRequest'));
const LabFilledRequest = lazy(() => import('./LabFilledRequest'));

class Clinical extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match, location, staff } = this.props;
		const page = location.pathname.split('/').pop();

		const department = staff?.details?.department?.name;

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Clinincal Lab</h6>
								<div className="row mt-2 mb-4">
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/' ? 'btn-outline-primary' : ''
										}`}
										to="/lab">
										Dashboard
									</Link>
									<Link
										to={`/lab/filled-request`}
										className={`mr-2 btn btn-primary btn-sm ${
											page === '/filled-request' ? 'btn-outline-primary' : ''
										}`}>
										{' '}
										Filled Request
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/all-request' ? 'btn-outline-primary' : ''
										}`}
										to="/lab/all-request">
										All Request
									</Link>
									<Link
										className={`mr-2 btn btn-primary btn-sm  ${
											page === '/lab-request' ? 'btn-outline-primary' : ''
										}`}
										to="/lab/lab-request">
										New Lab Request
									</Link>
								</div>

								<div className="row">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}/`}
												component={ClinicalLab}
											/>
											<Route
												exact
												path={`${match.url}/lab-request`}
												component={NewLab}
											/>
											<Route
												exact
												path={`${match.url}/all-request`}
												component={AllRequest}
											/>
											<Route
												exact
												path={`${match.url}/recent-request`}
												component={LabRecentRequest}
											/>
											<Route
												exact
												path={`${match.url}/filled-request`}
												component={LabFilledRequest}
											/>
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content-panel compact">
					<Queue department={department} />
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		staff: state.user.staff,
	};
};

export default withRouter(connect(mapStatetoProps)(Clinical));
