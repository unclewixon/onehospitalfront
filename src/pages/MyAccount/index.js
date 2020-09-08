/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AccountProfile = lazy(() => import('./Profile/index'));
const Payslip = lazy(() => import('./Payslip'));
const DutyRooster = lazy(() =>
	import('../../components/StaffBlock/DutyRooster')
);
const ExcuseDuty = lazy(() => import('../../components/StaffBlock/ExcuseDuty'));
const CreateAppraisal = lazy(() =>
	import('../../components/StaffBlock/CreateAppraisal')
);
const LeaveRequest = lazy(() =>
	import('../../components/StaffBlock/LeaveRequest')
);
const Appraisal = lazy(() => import('../../components/StaffBlock/Appraisal'));
// const StaffDetail = lazy(() => import('../../components/StaffBlock/StaffDetail'));
const CreateLeave = lazy(() => import('../../components/CreateLeave'));
const CreateExcuseDuty = lazy(() =>
	import('../../components/CreateExcuseDuty')
);
const LineAppraisal = lazy(() =>
	import('../../components/StaffBlock/LineAppraisal')
);
const StaffAppraisal = lazy(() =>
	import('../../components/StaffBlock/StaffAppraisal')
);

const MyAccount = ({ match, staff }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route exact path={`${match.url}/`} component={AccountProfile} />
						<Route
							exact
							path={`${match.url}/appraisal`}
							component={Appraisal}
						/>
						<Route
							exact
							path={`${match.url}/duty-roster`}
							component={DutyRooster}
						/>
						<Route
							exact
							path={`${match.url}/excuse-duty`}
							component={ExcuseDuty}
						/>
						<Route
							exact
							path={`${match.url}/excuse-duty/new`}
							component={CreateExcuseDuty}
						/>
						<Route
							exact
							path={`${match.url}/leave-request`}
							component={LeaveRequest}
						/>
						<Route
							exact
							path={`${match.url}/leave-request/new`}
							component={CreateLeave}
						/>
						<Route
							exact
							path={`${match.url}/excuse-duty/create-excuse-duty`}
							component={CreateExcuseDuty}
						/>
						<Route
							exact
							path={`${match.url}/appraisal/line-appraisal`}
							component={LineAppraisal}
						/>
						<Route
							exact
							path={`${match.url}/appraisal/staff-appraisal`}
							component={StaffAppraisal}
						/>
						<Route
							exact
							path={`${match.url}/appraisal/create-appraisal`}
							component={CreateAppraisal}
						/>
						<Route exact path={`${match.url}/payslips`} component={Payslip} />
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
		</div>
	);
};

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(MyAccount));
