import React from 'react';

const PatientMenu = () => {
	return (
		<div className="menu-w selected-menu-color-light menu-activated-on-hover menu-has-selected-link color-scheme-dark color-style-bright sub-menu-color-bright menu-position-side menu-side-left menu-layout-compact sub-menu-style-over" style={{height:'100vh'}}>
			<ul className="main-menu">
				<li className="sub-header">
					<span>Encounter</span>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Start Encounter</span>
					</a>
				</li>
				<li className="sub-header">
					<span>Requests</span>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Clinical Lab</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Pharmacy (Regimen)</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Physiotherapy</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Opthalmology</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Dentistry</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Imaging</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Procedure</span>
					</a>
				</li>
				<li className="sub-header">
					<span>Reports</span>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Visit Summary</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>Appointment History</span>
					</a>
				</li>
				<li>
					<a href="index.html">
						<div className="icon-w">
							<div className="os-icon os-icon-layout"/>
						</div>
						<span>IVF History</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default PatientMenu;