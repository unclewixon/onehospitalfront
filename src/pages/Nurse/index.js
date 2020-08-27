/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';

import Splash from '../../components/Splash';
import { connect } from 'react-redux';

const NurseHome = lazy(() => import('./NurseHome'));
const InPatientCare = lazy(() => import('./InPatientCare'));

class Nurse extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match } = this.props;

		return (
			<div className="row p-4">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="row">
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={`${match.url}`} component={NurseHome} />
									<Route
										exact
										path={`${match.url}/in-patients/care`}
										component={InPatientCare}
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

export default withRouter(connect(mapStatetoProps)(Nurse));
