/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';

import avatar1 from '../assets/images/avatar1.jpg';

class MainMenu extends Component {
	componentDidMount() {
		var menu_timer;
		$(this.refs.menu_activated_on_hover).on(
			'mouseenter',
			'ul.main-menu > li.has-sub-menu',
			function() {
				var $elem = $(this);
				clearTimeout(menu_timer);
				$elem
					.closest('ul')
					.addClass('has-active')
					.find('> li')
					.removeClass('active');
				$elem.addClass('active');
			}
		);

		$(this.refs.menu_activated_on_hover).on(
			'mouseleave',
			'ul.main-menu > li.has-sub-menu',
			function() {
				var $elem = $(this);
				menu_timer = setTimeout(function() {
					$elem
						.removeClass('active')
						.closest('ul')
						.removeClass('has-active');
				}, 30);
			}
		);
	}

	render() {
		const { role } = this.props;
		return (
			<div className="menu-w color-scheme-light color-style-transparent menu-position-side menu-side-left sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link" ref="menu_activated_on_hover">
				<div className="logo-w">
					<Link className="logo" to="/">
						<div className="logo-element"></div>
						<div className="logo-label">Deda Hospital</div>
					</Link>
				</div>
				<div className="logged-user-w avatar-inline">
					<div className="logged-user-i">
						<div className="avatar-w">
							<img alt="" src={avatar1} />
						</div>
						<div className="logged-user-info-w">
							<div className="logged-user-name">Maria Gomez</div>
							<div className="logged-user-role">{capitalize(role)}</div>
						</div>
					</div>
				</div>
				{/* <div className="menu-actions">
					<div className="messages-notifications os-dropdown-trigger os-dropdown-position-right">
						<i className="os-icon os-icon-mail-14"></i>
						<div className="new-messages-count">12</div>
					</div>
					<div className="messages-notifications os-dropdown-trigger os-dropdown-position-right">
						<i className="os-icon os-icon-zap"></i>
						<div className="new-messages-count">4</div>
					</div>
				</div> */}
				<h1 className="menu-page-header">Page Header</h1>
				<ul className="main-menu">
					{role === 'patient' && (
						<>
							<li className="sub-header">
								<span>Encounter</span>
							</li>
							<li>
								<a href="index.html">
									<div className="icon-w">
										<div className="os-icon os-icon-layout"></div>
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
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>Requests</span>
								</a>
								<div className="sub-menu-w">
									<div className="sub-menu-header">Requests</div>
									<div className="sub-menu-icon">
										<i className="os-icon os-icon-layers"></i>
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
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>Reports</span>
								</a>
								<div className="sub-menu-w">
									<div className="sub-menu-header">Reports</div>
									<div className="sub-menu-icon">
										<i className="os-icon os-icon-layers"></i>
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
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>Antenatal</span>
								</a>
							</li>
							<li>
								<a href="layouts_menu_top_image.html">
									<div className="icon-w">
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>Immunization</span>
								</a>
							</li>
							<li>
								<a href="layouts_menu_top_image.html">
									<div className="icon-w">
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>IVF</span>
								</a>
							</li>
						</>
					)}
					{role === 'doctor' && (
						<>
							<li className="sub-header">
								<span>Layouts</span>
							</li>
							<li className="selected has-sub-menu">
								<a href="index.html">
									<div className="icon-w">
										<div className="os-icon os-icon-layout"></div>
									</div>
									<span>Dashboard</span>
								</a>
								<div className="sub-menu-w">
									<div className="sub-menu-header">Dashboard</div>
									<div className="sub-menu-icon">
										<i className="os-icon os-icon-layout"></i>
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
										<div className="os-icon os-icon-layers"></div>
									</div>
									<span>Menu Styles</span>
								</a>
								<div className="sub-menu-w">
									<div className="sub-menu-header">Menu Styles</div>
									<div className="sub-menu-icon">
										<i className="os-icon os-icon-layers"></i>
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
					)}
				</ul>
			</div>
		);
	}
}

export default MainMenu;
