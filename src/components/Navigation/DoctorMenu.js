import React from 'react';

const DoctorMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Layouts</span>
			</li>
			<li className="selected has-sub-menu">
				<a href="index.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layout"/>
					</div>
					<span>Dashboard</span>
				</a>
				<div className="sub-menu-w">
					<div className="sub-menu-header">Dashboard</div>
					<div className="sub-menu-icon">
						<i className="os-icon os-icon-layout"/>
					</div>
					<div className="sub-menu-i">
						<ul className="sub-menu">
							<li>
								<a href="index.html">Dashboard 1</a>
							</li>
							<li>
								<a href="apps_crypto.html">Crypto Dashboard</a>
							</li>
							<li>
								<a href="apps_support_dashboard.html">Dashboard 3</a>
							</li>
							<li>
								<a href="apps_projects.html">Dashboard 4</a>
							</li>
							<li>
								<a href="apps_bank.html">Dashboard 5</a>
							</li>
							<li>
								<a href="layouts_menu_top_image.html">Dashboard 6</a>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li className=" has-sub-menu">
				<a href="layouts_menu_top_image.html">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Menu Styles</span>
				</a>
				<div className="sub-menu-w">
					<div className="sub-menu-header">Menu Styles</div>
					<div className="sub-menu-icon">
						<i className="os-icon os-icon-layers"/>
					</div>
					<div className="sub-menu-i">
						<ul className="sub-menu">
							<li>
								<a href="layouts_menu_side_full.html">
									Side Menu Light
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_full_dark.html">
									Side Menu Dark
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_transparent.html">
									Side Menu Transparent{' '}
									<strong className="badge badge-danger">New</strong>
								</a>
							</li>
							<li>
								<a href="apps_pipeline.html">Side &amp; Top Dark</a>
							</li>
							<li>
								<a href="apps_projects.html">Side &amp; Top</a>
							</li>
							<li>
								<a href="layouts_menu_side_mini.html">Mini Side Menu</a>
							</li>
						</ul>
						<ul className="sub-menu">
							<li>
								<a href="layouts_menu_side_mini_dark.html">
									Mini Menu Dark
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_compact.html">
									Compact Side Menu
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_compact_dark.html">
									Compact Menu Dark
								</a>
							</li>
							<li>
								<a href="layouts_menu_right.html">Right Menu</a>
							</li>
							<li>
								<a href="layouts_menu_top.html">Top Menu Light</a>
							</li>
							<li>
								<a href="layouts_menu_top_dark.html">Top Menu Dark</a>
							</li>
						</ul>
						<ul className="sub-menu">
							<li>
								<a href="layouts_menu_top_image.html">
									Top Menu Image{' '}
									<strong className="badge badge-danger">New</strong>
								</a>
							</li>
							<li>
								<a href="layouts_menu_sub_style_flyout.html">
									Sub Menu Flyout
								</a>
							</li>
							<li>
								<a href="layouts_menu_sub_style_flyout_dark.html">
									Sub Flyout Dark
								</a>
							</li>
							<li>
								<a href="layouts_menu_sub_style_flyout_bright.html">
									Sub Flyout Bright
								</a>
							</li>
							<li>
								<a href="layouts_menu_side_compact_click.html">
									Menu Inside Click
								</a>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</>
	);
};

export default DoctorMenu;
