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
					<Link to={`${location.pathname}#vitals`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Vitals</span>
					</Link>
				</li>
				<li className="sub-header">
					<span>Encounters</span>
				</li>
				<li>
					<Link to={`${location.pathname}#visit-entry`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>New Vist Entry</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#anc-visit-entry`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>New Antenatal Visit Entry</span>
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
					<Link to={`${location.pathname}#physio`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Physiotherapy</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#opthalmology`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Opthalmology</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#dentistry`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Dentistry</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#imaging`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Imaging</span>
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
					<span>Reports</span>
				</li>
				<li>
					<Link to={`${location.pathname}#visit-summary`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Visit Summary</span>
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
					<Link to={`${location.pathname}#appointment-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Appointment History</span>
					</Link>
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
			</ul>
		</div>
	);
};

export default withRouter(PatientMenu);
