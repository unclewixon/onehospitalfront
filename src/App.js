import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './views/Login';
import Doctor from './views/Doctor';
import NoMatch from './views/NoMatch';
import FrontDesk from './views/FrontDesk';
import InPatient from './views/InPatient';
import Laboratory from './views/Laboratory';
import PatientProfile from './views/PatientProfile';
import Pharmacy from './views/Pharmacy';
import Vitals from './views/Vitals';
import ScrollToTop from './containers/ScrollToTop';

class App extends Component {
	render() {
		return (
			<ScrollToTop>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/dashboard/doctor" component={Doctor} />
					<Route path="/dashboard/front-desk" component={FrontDesk} />
					<Route path="/dashboard/in-patient" component={InPatient} />
					<Route path="/dashboard/lab" component={Laboratory} />
					<Route path="/dashboard/patient/:id" component={PatientProfile} />
					<Route path="/dashboard/pharmacy" component={Pharmacy} />
					<Route path="/dashboard/vitals" component={Vitals} />
					<Route component={NoMatch} />
				</Switch>
			</ScrollToTop>
		);
	}
}

export default App;