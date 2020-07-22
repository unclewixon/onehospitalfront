import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';

const Antennatal = lazy(() => import('./Antennatal'));
const Enrollment = lazy(() => import('./Enrollment'));
const AllEnrollment = lazy(() => import('./AllEnrollment'));
export class index extends Component {
	render() {
		const { match, staff } = this.props;
		const department = staff?.profile?.details?.department?.name;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}/`} component={Antennatal} />
								<Route
									exact
									path={`${match.url}/enrol`}
									component={Enrollment}
								/>
								<Route
									exact
									path={`${match.url}/all-enrol`}
									component={AllEnrollment}
								/>

								<Route component={NoMatch} />
							</Switch>
						</Suspense>
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

export default withRouter(connect(mapStatetoProps)(index));
