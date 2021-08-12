/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Roles from './Roles';
import Laboratory from './Laboratory';
import Diagnosis from './Diagnosis';
import Consultation from './Consultation';
import RoomMgmt from './RoomMgmt';
import Departments from './Departments';
import LeaveCategory from './LeaveCategory';
import Services from './Services';
import Specialization from './Specialization';
import Appraisal from './Appraisal';
import ConsultingRoom from './ConsultingRoom';
import AntenatalPackage from './AntenatalPackage';
import NicuAccommodation from './NicuAccommodation';
import PaymentMethod from './PaymentMethod';
import Settings from './Settings';

const Home = ({ match, location }) => {
	const [toggle, setToggle] = useState(false);
	const page = location.pathname.split('/').pop();

	const profile = useSelector(state => state.user.profile);
	const role = profile.role ? profile.role.slug : 'it-admin';

	return (
		<div className={`settings-menu ${toggle ? 'compact-menu' : ''}`}>
			{role === 'it-admin' && (
				<div className="ae-side-menu">
					<div className="aem-head">
						<a
							className="ae-side-menu-toggler"
							onClick={() => setToggle(!toggle)}>
							<i className="os-icon os-icon-hamburger-menu-2" />
						</a>
					</div>
					<ul className="ae-main-menu">
						<li className={page === 'settings' ? 'active' : ''}>
							<Link to="/settings">
								<i className="os-icon os-icon-layers" />
								<span>
									Global
									<br />
									Settings
								</span>
							</Link>
						</li>
						<li className={page === 'roles' ? 'active' : ''}>
							<Link to="/settings/roles">
								<i className="os-icon os-icon-layers" />
								<span>Roles</span>
							</Link>
						</li>
						<li className={page === 'departments' ? 'active' : ''}>
							<Link to="/settings/departments">
								<i className="os-icon os-icon-layers" />
								<span>Departments</span>
							</Link>
						</li>
						<li className={page === 'payment-methods' ? 'active' : ''}>
							<Link to="/settings/payment-methods">
								<i className="os-icon os-icon-layers" />
								<span>
									Payment
									<br />
									Methods
								</span>
							</Link>
						</li>
						<li className={page === 'consultation' ? 'active' : ''}>
							<Link to="/settings/consultation">
								<i className="os-icon os-icon-layers" />
								<span>Consultation</span>
							</Link>
						</li>
						<li className={page === 'consulting-room' ? 'active' : ''}>
							<Link to="/settings/consulting-room">
								<i className="os-icon os-icon-layers" />
								<span>
									Consulting
									<br /> Rooms MGT
								</span>
							</Link>
						</li>
						<li className={page === 'diagnosis' ? 'active' : ''}>
							<Link to="/settings/diagnosis">
								<i className="os-icon os-icon-layers" />
								<span>Diagnosis</span>
							</Link>
						</li>
						<li className={page === 'lab-mgt' ? 'active' : ''}>
							<Link to="/settings/lab-mgt">
								<i className="os-icon os-icon-layers" />
								<span>
									Lab Tests <br /> Management
								</span>
							</Link>
						</li>
						<li className={page === 'room-mgt' ? 'active' : ''}>
							<Link to="/settings/room-mgt">
								<i className="os-icon os-icon-layers" />
								<span>Room MGT</span>
							</Link>
						</li>
						<li className={page === 'leave-category' ? 'active' : ''}>
							<Link to="/settings/leave-category">
								<i className="os-icon os-icon-layers" />
								<span>
									Leave
									<br />
									Categories
								</span>
							</Link>
						</li>
						<li className={page === 'services' ? 'active' : ''}>
							<Link to="/settings/services">
								<i className="os-icon os-icon-layers" />
								<span>Services</span>
							</Link>
						</li>
						<li className={page === 'specializations' ? 'active' : ''}>
							<Link to="/settings/specializations">
								<i className="os-icon os-icon-layers" />
								<span>Specializations</span>
							</Link>
						</li>

						<li className={page === 'appraisal' ? 'active' : ''}>
							<Link to="/settings/appraisal">
								<i className="os-icon os-icon-layers" />
								<span>
									Appraisal
									<br /> Indicators
								</span>
							</Link>
						</li>
						<li className={page === 'antenatal-packages' ? 'active' : ''}>
							<Link to="/settings/antenatal-packages">
								<i className="os-icon os-icon-layers" />
								<span>
									Antenatal
									<br />
									Packages
								</span>
							</Link>
						</li>
						<li className={page === 'nicu-accommodations' ? 'active' : ''}>
							<Link to="/settings/nicu-accommodations">
								<i className="os-icon os-icon-layers" />
								<span>
									NICU
									<br />
									Accommodation
								</span>
							</Link>
						</li>
					</ul>
				</div>
			)}
			<Switch>
				<Route path={`${match.url}`} component={Settings} exact />
				<Route path={`${match.url}/roles`} component={Roles} />
				<Route path={`${match.url}/departments`} component={Departments} />
				<Route path={`${match.url}/consultation`} component={Consultation} />
				<Route path={`${match.url}/diagnosis`} component={Diagnosis} />
				<Route path={`${match.url}/lab-mgt`} component={Laboratory} />
				<Route path={`${match.url}/room-mgt`} component={RoomMgmt} />
				<Route path={`${match.url}/leave-category`} component={LeaveCategory} />
				<Route path={`${match.url}/services`} component={Services} />
				<Route path={`${match.url}/appraisal`} component={Appraisal} />
				<Route
					path={`${match.url}/specializations`}
					component={Specialization}
				/>
				<Route
					path={`${match.url}/consulting-room`}
					component={ConsultingRoom}
				/>
				<Route
					path={`${match.url}/antenatal-packages`}
					component={AntenatalPackage}
				/>
				<Route
					path={`${match.url}/nicu-accommodations`}
					component={NicuAccommodation}
				/>
				<Route
					path={`${match.url}/payment-methods`}
					component={PaymentMethod}
				/>
			</Switch>
		</div>
	);
};

export default Home;
