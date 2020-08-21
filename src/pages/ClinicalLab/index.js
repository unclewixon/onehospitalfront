/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
import { connect } from 'react-redux';

const NewLab = lazy(() => import('./NewLab'));
const ClinicalLab = lazy(() => import('./ClinicalLab'));
const AllRequest = lazy(() => import('./AllRequest'));
const LabRecentRequest = lazy(() => import('./LabRecentRequest'));
const LabFilledRequest = lazy(() => import('./LabFilledRequest'));
const OPDPatientsLabRequest = lazy(() => import('./OPDPatients'));

class Clinical extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match, staff } = this.props;

		const department = staff?.details?.department?.name;

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
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
												path={`${match.url}/new`}
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
											<Route
												exact
												path={`${match.url}/opd-patients`}
												component={OPDPatientsLabRequest}
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
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(Clinical));
