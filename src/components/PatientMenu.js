import React from 'react';

const PatientMenu = () => {
	return (
		<>
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
				<span>General</span>
			</li>
			<li className="has-sub-menu">
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Requests</span>
				</a>
				<div className="sub-menu-w">
					<div className="sub-menu-header">Requests</div>
					<div className="sub-menu-icon">
						<i className="os-icon os-icon-layers"/>
					</div>
					<div className="sub-menu-i">
						<ul className="sub-menu">
							<li>
								<a href="layouts_menu_side_mini.html">Clinical Lab</a>
							</li>
							<li>
								<a href="layouts_menu_side_mini.html">
									Pharmacy (Regimen)
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_full.html">Physiotherapy</a>
							</li>
							<li>
								<a href="layouts_menu_side_full_dark.html">
									Opthalmology
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_transparent.html">
									Dentistry
								</a>
							</li>
							<li>
								<a href="apps_pipeline.html">Imaging</a>
							</li>
							<li>
								<a href="apps_projects.html">Procedure</a>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li className="has-sub-menu">
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Reports</span>
				</a>
				<div className="sub-menu-w">
					<div className="sub-menu-header">Reports</div>
					<div className="sub-menu-icon">
						<i className="os-icon os-icon-layers"/>
					</div>
					<div className="sub-menu-i">
						<ul className="sub-menu">
							<li>
								<a href="layouts_menu_side_mini.html">Visit Summary</a>
							</li>
							<li>
								<a href="layouts_menu_side_mini.html">
									Appointment History
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_full.html">IVF History</a>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li className="sub-header">
				<span>Enroll</span>
			</li>
			<li>
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Antenatal</span>
				</a>
			</li>
			<li>
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Immunization</span>
				</a>
			</li>
			<li>
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>IVF</span>
				</a>
			</li>
		</>
	);
};

export default PatientMenu;