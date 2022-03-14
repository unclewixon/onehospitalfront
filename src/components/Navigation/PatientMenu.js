import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const PatientMenu = ({ location }) => {
	return (
		<div className="menu-w selected-menu-color-light menu-activated-on-hover menu-has-selected-link color-scheme-dark color-style-bright sub-menu-color-bright menu-position-side menu-side-left menu-layout-compact sub-menu-style-over">
			<ul className="main-menu">
				<li>
					<Link to={`${location.pathname}#dashboard`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Dashboard</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#encounters`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Encounters</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#vitals#Blood Pressure`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Vitals</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#allergens`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Allergens</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#problem-list`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Problem List</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#immunization-chart`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Immunization Chart</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#clinical-tasks`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Clinical Tasks</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#documents`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Documents</span>
					</Link>
				</li>

				<li className="sub-header">
					<span>Requests</span>
				</li>
				<li>
					<Link to={`${location.pathname}#lab`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Clinical Lab</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#pharmacy`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Pharmacy (Regimen)</span>
					</Link>
				</li>

				<li>
					<Link to={`${location.pathname}#radiology`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Radiology</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#procedure`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Procedure</span>
					</Link>
				</li>
				<li className="sub-header">
					<span>History</span>
				</li>
				<li>
					<Link to={`${location.pathname}#anc-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Antenatal History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#ivf-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>IVF History</span>
					</Link>
				</li>
				<li className="sub-header">
					<span>Reports</span>
				</li>
				<li>
					<Link to={`${location.pathname}#excuse-duty`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Excuse Duty</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(PatientMenu);
