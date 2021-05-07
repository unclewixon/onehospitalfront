import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';
import ReduxBlockUi from 'react-block-ui/redux';
import { AbilityBuilder } from '@casl/ability';

import ScrollToTop from './containers/ScrollToTop';
import TopBar from './components/TopBar';
import MainMenu from './components/Navigation/MainMenu';
import ModalDialogs from './components/Modals/ModalDialogs';
import Splash from './components/Splash';
import SlidingPane from './components/SlidingPane';
import SSRStorage from './services/storage';
import { FULLSCREEN_COOKIE, MODE_COOKIE } from './services/constants';
import { toggleProfile } from './actions/user';
import { request } from './services/utilities';
import ability from './services/ability';
import { AbilityContext } from './components/common/Can';

import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import PatientProfile from './pages/PatientProfile';
import ProcedureProfile from './pages/ProcedureProfile';
import AntennatalProfile from './pages/AntennatalProfile';

const FrontDesk = lazy(() => import('./pages/FrontDesk/Home'));
const Speech = lazy(() => import('./pages/FrontDesk/Speech'));
const Nurse = lazy(() => import('./pages/Nurse/Home'));
const Pharmacy = lazy(() => import('./pages/Pharmacy/Index'));
const Procedure = lazy(() => import('./pages/Procedure/Home'));
const Staff = lazy(() => import('./pages/HR/index'));
const Inventory = lazy(() => import('./pages/Inventory/index'));
const Settings = lazy(() => import('./pages/Settings'));
const StaffProfile = lazy(() => import('./pages/StaffProfile'));
const Hmo = lazy(() => import('./pages/Hmo/Index'));
const ClinicalLab = lazy(() => import('./pages/ClinicalLab/Home'));
const PayPoint = lazy(() => import('./pages/PayPoint/index'));
const Radiology = lazy(() => import('./pages/Radiology/Home'));
const Antennatal = lazy(() => import('./pages/Antennatal/Home'));
const IVF = lazy(() => import('./pages/IVF'));
const Nicu = lazy(() => import('./pages/Nicu/Nicu'));
const LabourMgt = lazy(() => import('./pages/LabourMgt/Home'));
const Cafeteria = lazy(() => import('./pages/Cafeteria/index'));
const Account = lazy(() => import('./pages/Account/index'));
const MyAccount = lazy(() => import('./pages/MyAccount/index'));
const Doctor = lazy(() => import('./pages/Doctor/Home'));
const Logout = lazy(() => import('./pages/Logout'));

const storage = new SSRStorage();

class App extends Component {
	async componentDidMount() {
		const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);
		const theme_mode = await storage.getItem(MODE_COOKIE);
		// get user permissions
		const permissions = await storage.getItem('permissions');
		// casal/ability
		const { can, rules } = new AbilityBuilder();
		// set user permissions
		can(permissions, 'all');
		// update user permission
		ability.update(rules);

		const { location } = this.props;

		const isLogin = location.pathname === '/';
		window.document.body.className = `menu-position-side menu-side-left${
			fullscreen || isLogin ? ' full-screen' : ''
		} with-content-panel${theme_mode ? ' color-scheme-dark' : ''}`;
	}

	render() {
		const {
			loggedIn,
			preloading,
			is_modal_open,
			isStaffOpen,
			isPatientOpen,
			isProcedureOpen,
			isAntenatalOpen,
			theme_mode,
			menu_mode,
			profile,
		} = this.props;

		return preloading ? (
			<Splash />
		) : (
			<>
				<ToastContainer autoClose={3500} />
				<ScrollToTop>
					{loggedIn ? (
						<AbilityContext.Provider value={ability}>
							<ReduxBlockUi block="REQUEST_START" unblock="REQUEST_STOP">
								<div className="all-wrapper with-side-panel solid-bg-all">
									<Suspense fallback={<Splash />}>
										<div className="layout-w">
											{/* user role determines main menu */}
											<MainMenu
												role={profile.role ? profile.role.slug : 'admin'}
												theme_mode={theme_mode}
												menu_mode={menu_mode}
											/>
											<div
												className="content-w content-w-l-18"
												id="main-content">
												{/* user role determines topbar menu */}
												<TopBar
													role={profile.role ? profile.role.slug : 'admin'}
												/>
												<SWRConfig
													value={{
														fetcher: url =>
															request(url, 'get', true).then(res => res),
														refreshInterval: 15 * 60 * 1000,
														shouldRetryOnError: false,
														revalidateOnFocus: false,
														errorRetryInterval: 0,
														errorRetryCount: 2,
													}}>
													<Switch>
														<Route path="/doctor" component={Doctor} />
														<Route path="/front-desk" component={FrontDesk} />
														<Route path="/speech" component={Speech} />
														<Route path="/nurse" component={Nurse} />
														<Route path="/pharmacy" component={Pharmacy} />
														<Route path="/procedure" component={Procedure} />
														<Route path="/radiology" component={Radiology} />
														<Route path="/antenatal" component={Antennatal} />
														<Route path="/ivf" component={IVF} />
														<Route path="/nicu" component={Nicu} />
														<Route path="/hr" component={Staff} />
														<Route path="/inventory" component={Inventory} />
														<Route path="/settings" component={Settings} />
														<Route path="/hmo" component={Hmo} />
														<Route path="/lab" component={ClinicalLab} />
														<Route path="/labour-mgt" component={LabourMgt} />
														<Route path="/cafeteria" component={Cafeteria} />
														<Route path="/paypoint" component={PayPoint} />
														<Route path="/account" component={Account} />
														<Route path="/logout" component={Logout} />
														{/* remove path later */}
														<Route path="/my-account" component={MyAccount} />
														<Route component={NoMatch} />
													</Switch>
												</SWRConfig>
											</div>
										</div>
										<SlidingPane isOpen={isStaffOpen}>
											<StaffProfile />
										</SlidingPane>
										<SlidingPane isOpen={isPatientOpen}>
											<PatientProfile />
										</SlidingPane>
										<SlidingPane isOpen={isProcedureOpen}>
											<ProcedureProfile />
										</SlidingPane>
										<SlidingPane isOpen={isAntenatalOpen}>
											<AntennatalProfile />
										</SlidingPane>
										<ModalDialogs />
									</Suspense>
								</div>
							</ReduxBlockUi>
							{is_modal_open && <div className={`modal-backdrop fade show`} />}
						</AbilityContext.Provider>
					) : (
						<Switch>
							<Route exact path="/" component={Login} />
							<Route component={NoMatch} />
						</Switch>
					)}
				</ScrollToTop>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		preloading: state.general?.preloading,
		is_modal_open: state.general?.is_modal_open,
		loggedIn: state.user?.loggedIn,
		profile: state.user?.profile,
		isStaffOpen: state.user?.isStaffOpen,
		isPatientOpen: state.user?.isPatientOpen,
		isProcedureOpen: state.user?.isProcedureOpen,
		isAntenatalOpen: state.user?.isAntenatalOpen,
		theme_mode: state.user?.theme_mode,
		menu_mode: state.user?.menu_mode,
		fullscreen: state.user?.fullscreen,
	};
};

export default withRouter(connect(mapStateToProps, { toggleProfile })(App));
