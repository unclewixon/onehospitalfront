import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StaffList from './StaffList';
import Payroll from './Payroll';
import LeaveMgt from './LeaveMgt';
import Roster from './Roster';
import NoMatch from './NoMatch';

const Staff = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/list`} component={StaffList} />
			<Route path={`${match.url}/payroll`} component={Payroll} />
			<Route path={`${match.url}/leave-mgt`} component={LeaveMgt} />
			<Route path={`${match.url}/roster`} component={Roster} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Staff;