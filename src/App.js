import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import ScrollToTop from './containers/ScrollToTop';
import TopBar from './components/TopBar';
import MainMenu from './components/Navigation/MainMenu';
import ModalDialogs from './components/Modals/ModalDialogs';
import Splash from './components/Splash';
import SlidingPane from './components/SlidingPane';
import SSRStorage from './services/storage';
import { FULLSCREEN_COOKIE, MODE_COOKIE } from './services/constants';
import { toggleProfile } from './actions/user';

const Login = lazy(() => import('./pages/Login'));
const Doctor = lazy(() => import('./pages/HR/Doctor'));
const NoMatch = lazy(() => import('./pages/NoMatch'));
const FrontDesk = lazy(() => import('./pages/FrontDesk/index'));
const InPatient = lazy(() => import('./pages/InPatient'));
const PatientProfile = lazy(() => import('./pages/PatientProfile'));
const Pharmacy = lazy(() => import('./pages/Inventory/Pharmacy'));
const Pharmacy2 = lazy(() => import('./pages/Pharmacy'));
const Vitals = lazy(() => import('./pages/Vitals'));
const Staff = lazy(() => import('./pages/HR/index'));
const Inventory = lazy(() => import('./pages/Inventory/index'));
const Settings = lazy(() => import('./pages/Settings'));
const StaffProfile = lazy(() => import('./pages/StaffProfile'));
const Hmo = lazy(() => import('./pages/Hmo'));
const ClinicalLab = lazy(() => import('./pages/ClinicalLab'));
const PayPoint = lazy(() => import('./pages/PayPoint/index'));
const Radiology = lazy(() => import('./pages/Radiology/index'));
const Antennatal = lazy(() => import('./pages/Antennatal/index'));
const IVF = lazy(() => import('./pages/IVF'));
const Nicu = lazy(() => import('./pages/Nicu'));
const LabMgt = lazy(() => import('./pages/LabourMgt/index'));
const Cafeteria = lazy(() => import('./pages/Cafeteria'));
const Logout = lazy(() => import('./pages/Logout'));

const storage = new SSRStorage();

class App extends Component {
	async componentDidMount() {
		const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);
		const theme_mode = await storage.getItem(MODE_COOKIE);

		window.document.body.className = `menu-position-side menu-side-left ${
			fullscreen ? 'full-screen' : ''
		} with-content-panel ${theme_mode ? 'color-scheme-dark' : ''}`;
	}

	render() {
		const {
			loggedIn,
			preloading,
			is_modal_open,
			isStaffOpen,
			isPatientOpen,
			theme_mode,
			profile,
		} = this.props;
		return preloading ? (
			<Splash />
		) : (
			<>
				<ToastContainer autoClose={3500} />
				<Suspense fallback={<Splash />}>
					<ScrollToTop>
						{loggedIn ? (
							<>
								<div className="all-wrapper with-side-panel solid-bg-all">
									<div className="layout-w">
										{/* user role determines main menu */}
										<MainMenu
											role={profile.role.slug}
											theme_mode={theme_mode}
										/>
										<div className="content-w">
											{/* user role determines topbar menu */}
											<TopBar role={profile.role.slug} />
											<Switch>
												<Route path="/doctor" component={Doctor} />
												<Route path="/front-desk" component={FrontDesk} />
												<Route path="/in-patient" component={InPatient} />
												<Route path="/pharmacy" component={Pharmacy} />
												<Route path="/pharmacy2" component={Pharmacy2} />
												<Route path="/radiology" component={Radiology} />
												<Route path="/antennatal" component={Antennatal} />
												<Route path="/ivf" component={IVF} />
												<Route path="/nicu" component={Nicu} />
												<Route path="/vitals" component={Vitals} />
												<Route path="/hr" component={Staff} />
												<Route path="/inventory" component={Inventory} />
												<Route path="/settings" component={Settings} />
												<Route path="/hmo" component={Hmo} />
												<Route path="/lab" component={ClinicalLab} />
												<Route path="/labour-mgt" component={LabMgt} />
												<Route path="/cafeteria" component={Cafeteria} />
												<Route path="/billing-paypoint" component={PayPoint} />
												<Route path="/logout" component={Logout} />
												<Route component={NoMatch} />
											</Switch>
										</div>
									</div>
									<SlidingPane isOpen={isStaffOpen}>
										<StaffProfile />
									</SlidingPane>
									<SlidingPane isOpen={isPatientOpen}>
										<PatientProfile />
									</SlidingPane>
									<ModalDialogs />
								</div>
								{is_modal_open && (
									<div className={`modal-backdrop fade show`} />
								)}
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
		is_modal_open: state.general.is_modal_open,
		loggedIn: state.user.loggedIn,
		profile: state.user.profile,
		isStaffOpen: state.user.isStaffOpen,
		isPatientOpen: state.user.isPatientOpen,
		theme_mode: state.user.theme_mode,
		fullscreen: state.user.fullscreen,
	};
};

export default withRouter(connect(mapStateToProps, { toggleProfile })(App));
