/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Roles from './Roles';
import Lab from './Laboratory';
import Diagnosis from './Diagnosis';
import Consultation from './Consultation';
import RoomMgmt from './RoomMgmt';
import Departments from './Departments';
import LeaveCategory from './LeaveCategory';
import ServicesCategory from './ServiceCategory';
import Specialization from './Specialization';
import ConsultatingRoom from './ConsultatingRoom';

const Settings = ({ match, location }) => {
	const [toggle, setToggle] = useState(false);
	const page = location.pathname.split('/').pop();

	return (
		<div className={`settings-menu ${toggle ? 'compact-menu' : ''}`}>
			<div className="ae-side-menu">
				<div className="aem-head">
					<a
						className="ae-side-menu-toggler"
						onClick={() => setToggle(!toggle)}>
						<i className="os-icon os-icon-hamburger-menu-2" />
					</a>
				</div>
				<ul className="ae-main-menu">
					<li className={page === 'roles' ? 'active' : ''}>
						<Link to="/settings/roles">
							<i className="os-icon os-icon-hierarchy-structure-2" />
							<span>Roles</span>
						</Link>
					</li>
					<li className={page === 'departments' ? 'active' : ''}>
						<Link to="/settings/departments">
							<i className="os-icon os-icon-folder-plus" />
							<span>Departments</span>
						</Link>
					</li>
					<li className={page === 'consulting-room' ? 'active' : ''}>
						<Link to="/settings/consulting-room">
							<i className="os-icon os-icon-documents-03" />
							<span>
								Consulting
								<br /> Rooms MGT
							</span>
						</Link>
					</li>
					<li className={page === 'diagnosis' ? 'active' : ''}>
						<Link to="/settings/diagnosis">
							<i className="os-icon os-icon-search" />
							<span>Diagnosis</span>
						</Link>
					</li>
					<li className={page === 'lab-mgt' ? 'active' : ''}>
						<Link to="/settings/lab-mgt">
							<i className="os-icon os-icon-ui-44" />
							<span>
								Lab Tests <br /> Management
							</span>
						</Link>
					</li>
					<li className={page === 'room-mgt' ? 'active' : ''}>
						<Link to="/settings/room-mgt">
							<i className="os-icon os-icon-home" />
							<span>Room MGT</span>
						</Link>
					</li>
					<li className={page === 'leave-category' ? 'active' : ''}>
						<Link to="/settings/leave-category">
							<i className="os-icon os-icon-map" />
							<span>
								Leave
								<br />
								Categories
							</span>
						</Link>
					</li>
					<li className={page === 'services-category' ? 'active' : ''}>
						<Link to="/settings/services-category">
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
				</ul>
			</div>
			<Switch>
				<Route path={`${match.url}/roles`} component={Roles} />
				<Route path={`${match.url}/departments`} component={Departments} />
				<Route path={`${match.url}/consultation`} component={Consultation} />
				<Route path={`${match.url}/diagnosis`} component={Diagnosis} />
				<Route path={`${match.url}/lab-mgt`} component={Lab} />
				<Route path={`${match.url}/room-mgt`} component={RoomMgmt} />
				<Route path={`${match.url}/leave-category`} component={LeaveCategory} />
				<Route
					path={`${match.url}/services-category`}
					component={ServicesCategory}
				/>
				<Route
					path={`${match.url}/specializations`}
					component={Specialization}
				/>
				<Route
					path={`${match.url}/consulting-room`}
					component={ConsultatingRoom}
				/>

				<Route component={Roles} />
			</Switch>
		</div>
	);
};

export default Settings;
