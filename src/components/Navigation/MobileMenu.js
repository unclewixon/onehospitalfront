/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar1.jpg';

class MobileMenu extends Component {
	render() {
		return (
			<div className="menu-mobile menu-activated-on-click color-scheme-dark">
				<div className="mm-logo-buttons-w">
					<a className="mm-logo" href="index.html">
						<img src={logo} alt="" />
						<span>Clean Admin</span>
					</a>
					<div className="mm-buttons">
						<div className="content-panel-open">
							<div className="os-icon os-icon-grid-circles"/>
						</div>
						<div className="mobile-menu-trigger">
							<div className="os-icon os-icon-hamburger-menu-1"/>
						</div>
					</div>
				</div>
				<div className="menu-and-user">
					<div className="logged-user-w">
						<div className="avatar-w">
							<img alt="" src={avatar} />
						</div>
						<div className="logged-user-info-w">
							<div className="logged-user-name">Maria Gomez</div>
							<div className="logged-user-role">Administrator</div>
						</div>
					</div>
					<ul className="main-menu">
						<li className="has-sub-menu">
							<a href="index.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layout"/>
								</div>
								<span>Dashboard</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="index.html">Dashboard 1</a>
								</li>
								<li>
									<a href="apps_crypto.html">
										Crypto Dashboard{' '}
										<strong className="badge badge-danger">Hot</strong>
									</a>
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
						</li>
						<li className="has-sub-menu">
							<a href="layouts_menu_top_image.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layers"/>
								</div>
								<span>Menu Styles</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="layouts_menu_side_full.html">Side Menu Light</a>
								</li>
								<li>
									<a href="layouts_menu_side_full_dark.html">Side Menu Dark</a>
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
								<li>
									<a href="layouts_menu_side_mini_dark.html">Mini Menu Dark</a>
								</li>
								<li>
									<a href="layouts_menu_side_compact.html">Compact Side Menu</a>
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
						</li>
						<li className="has-sub-menu">
							<a href="apps_bank.html">
								<div className="icon-w">
									<div className="os-icon os-icon-package"/>
								</div>
								<span>Applications</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="apps_email.html">Email Application</a>
								</li>
								<li>
									<a href="apps_support_dashboard.html">Support Dashboard</a>
								</li>
								<li>
									<a href="apps_support_index.html">Tickets Index</a>
								</li>
								<li>
									<a href="apps_crypto.html">
										Crypto Dashboard{' '}
										<strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="apps_projects.html">Projects List</a>
								</li>
								<li>
									<a href="apps_bank.html">
										Banking <strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="apps_full_chat.html">Chat Application</a>
								</li>
								<li>
									<a href="apps_todo.html">
										To Do Application{' '}
										<strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="misc_chat.html">Popup Chat</a>
								</li>
								<li>
									<a href="apps_pipeline.html">CRM Pipeline</a>
								</li>
								<li>
									<a href="rentals_index_grid.html">
										Property Listing{' '}
										<strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="misc_calendar.html">Calendar</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-file-text"/>
								</div>
								<span>Pages</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="misc_invoice.html">Invoice</a>
								</li>
								<li>
									<a href="rentals_index_grid.html">
										Property Listing{' '}
										<strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="misc_charts.html">Charts</a>
								</li>
								<li>
									<a href="auth_login.html">Login</a>
								</li>
								<li>
									<a href="auth_register.html">Register</a>
								</li>
								<li>
									<a href="auth_lock.html">Lock Screen</a>
								</li>
								<li>
									<a href="misc_pricing_plans.html">Pricing Plans</a>
								</li>
								<li>
									<a href="misc_error_404.html">Error 404</a>
								</li>
								<li>
									<a href="misc_error_500.html">Error 500</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-life-buoy"/>
								</div>
								<span>UI Kit</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="uikit_modals.html">
										Modals <strong className="badge badge-danger">New</strong>
									</a>
								</li>
								<li>
									<a href="uikit_alerts.html">Alerts</a>
								</li>
								<li>
									<a href="uikit_grid.html">Grid</a>
								</li>
								<li>
									<a href="uikit_progress.html">Progress</a>
								</li>
								<li>
									<a href="uikit_popovers.html">Popover</a>
								</li>
								<li>
									<a href="uikit_tooltips.html">Tooltips</a>
								</li>
								<li>
									<a href="uikit_buttons.html">Buttons</a>
								</li>
								<li>
									<a href="uikit_dropdowns.html">Dropdowns</a>
								</li>
								<li>
									<a href="uikit_typography.html">Typography</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-mail"/>
								</div>
								<span>Emails</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="emails_welcome.html">Welcome Email</a>
								</li>
								<li>
									<a href="emails_order.html">Order Confirmation</a>
								</li>
								<li>
									<a href="emails_payment_due.html">Payment Due</a>
								</li>
								<li>
									<a href="emails_forgot.html">Forgot Password</a>
								</li>
								<li>
									<a href="emails_activate.html">Activate Account</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-users"/>
								</div>
								<span>Users</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="users_profile_big.html">Big Profile</a>
								</li>
								<li>
									<a href="users_profile_small.html">Compact Profile</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-edit-32"/>
								</div>
								<span>Forms</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="forms_regular.html">Regular Forms</a>
								</li>
								<li>
									<a href="forms_validation.html">Form Validation</a>
								</li>
								<li>
									<a href="forms_wizard.html">Form Wizard</a>
								</li>
								<li>
									<a href="forms_uploads.html">File Uploads</a>
								</li>
								<li>
									<a href="forms_wisiwig.html">Wisiwig Editor</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-grid"/>
								</div>
								<span>Tables</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="tables_regular.html">Regular Tables</a>
								</li>
								<li>
									<a href="tables_datatables.html">Data Tables</a>
								</li>
								<li>
									<a href="tables_editable.html">Editable Tables</a>
								</li>
							</ul>
						</li>
						<li className="has-sub-menu">
							<a href="#">
								<div className="icon-w">
									<div className="os-icon os-icon-zap"/>
								</div>
								<span>Icons</span>
							</a>
							<ul className="sub-menu">
								<li>
									<a href="icon_fonts_simple_line_icons.html">
										Simple Line Icons
									</a>
								</li>
								<li>
									<a href="icon_fonts_feather.html">Feather Icons</a>
								</li>
								<li>
									<a href="icon_fonts_themefy.html">Themefy Icons</a>
								</li>
								<li>
									<a href="icon_fonts_picons_thin.html">Picons Thin</a>
								</li>
								<li>
									<a href="icon_fonts_dripicons.html">Dripicons</a>
								</li>
								<li>
									<a href="icon_fonts_eightyshades.html">Eightyshades</a>
								</li>
								<li>
									<a href="icon_fonts_entypo.html">Entypo</a>
								</li>
								<li>
									<a href="icon_fonts_font_awesome.html">Font Awesome</a>
								</li>
								<li>
									<a href="icon_fonts_foundation_icon_font.html">
										Foundation Icon Font
									</a>
								</li>
								<li>
									<a href="icon_fonts_metrize_icons.html">Metrize Icons</a>
								</li>
								<li>
									<a href="icon_fonts_picons_social.html">Picons Social</a>
								</li>
								<li>
									<a href="icon_fonts_batch_icons.html">Batch Icons</a>
								</li>
								<li>
									<a href="icon_fonts_dashicons.html">Dashicons</a>
								</li>
								<li>
									<a href="icon_fonts_typicons.html">Typicons</a>
								</li>
								<li>
									<a href="icon_fonts_weather_icons.html">Weather Icons</a>
								</li>
								<li>
									<a href="icon_fonts_light_admin.html">Light Admin</a>
								</li>
							</ul>
						</li>
					</ul>
					<div className="mobile-menu-magic">
						<h4>Light Admin</h4>
						<p>Clean Bootstrap 4 Template</p>
						<div className="btn-w">
							<a
								className="btn btn-white btn-rounded"
								href="https://themeforest.net/item/light-admin-clean-bootstrap-dashboard-html-template/19760124?ref=Osetin"
								target="_blank"
							>
								Purchase Now
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileMenu;
