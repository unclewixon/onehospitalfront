import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import ScrollToTop from './containers/ScrollToTop';
import TopBar from './components/TopBar';
import MainMenu from './components/MainMenu';
import ModalDialogs from './components/ModalDialogs';
import Splash from './components/Splash';

const Login = lazy(() => import('./pages/Login'));
const Doctor = lazy(() => import('./pages/Doctor'));
const NoMatch = lazy(() => import('./pages/NoMatch'));
const FrontDesk = lazy(() => import('./pages/FrontDesk'));
const InPatient = lazy(() => import('./pages/InPatient'));
const Laboratory = lazy(() => import('./pages/Laboratory'));
const PatientProfile = lazy(() => import('./pages/PatientProfile'));
const Pharmacy = lazy(() => import('./pages/Pharmacy'));
const Vitals = lazy(() => import('./pages/Vitals'));
const Staff = lazy(() => import('./pages/Staff'));

class App extends Component {
	componentDidMount() {
		window.document.body.className =
			'menu-position-side menu-side-left with-content-panel';
	}
	
	render() {
		const { loggedIn, preloading, isModalOpen } = this.props;
		return  preloading ? (
			<Splash />
		) : 
		(
			<>
				<ToastContainer autoClose={3500} />
				<Suspense fallback={<Splash />}>
					<ScrollToTop>
						{loggedIn ? (
							<>
								<div className="all-wrapper with-side-panel solid-bg-all">
									<div className="layout-w">
										{/* user role determines main menu */}
										<MainMenu role="hr" />
										<div className="content-w">
											{/* user role determines topbar menu */}
											<TopBar role="hr" />
											<Switch>
												<Route path="/dashboard/doctor" component={Doctor} />
												<Route path="/dashboard/front-desk" component={FrontDesk} />
												<Route path="/dashboard/in-patient" component={InPatient} />
												<Route path="/dashboard/lab" component={Laboratory} />
												<Route path="/dashboard/patient/:id" component={PatientProfile} />
												<Route path="/dashboard/pharmacy" component={Pharmacy} />
												<Route path="/dashboard/vitals" component={Vitals} />
												<Route path="/settings/staff" component={Staff} />
												<Route component={NoMatch} />
											</Switch>
										</div>
									</div>
									<ModalDialogs />
								</div>
								{isModalOpen && <div className={`modal-backdrop fade show`}/>}
							</>
						) : (
							<Switch>
								<Route exact path="/" component={Login} />
								<Route component={NoMatch} />
							</Switch>
						)}
					</ScrollToTop>
				</Suspense>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		preloading: state.general.preloading,
		isModalOpen: state.general.isModalOpen,
		loggedIn: state.user.loggedIn,
	};
};

export default withRouter(connect(mapStateToProps)(App));
