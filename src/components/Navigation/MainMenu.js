/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';
import { connect } from 'react-redux';

import avatar1 from '../../assets/images/avatar1.jpg';
import HrMenu from './HrMenu';
// import DoctorMenu from './DoctorMenu';
import InventoryMenu from './InventoryMenu';
import SettingsMenu from './SettingsMenu';
import FrontDeskMenu from './FrontDeskMenu';
import HMOMenu from './HMOMenu';
import DoctorMenu from './DoctorMenu';
import CafeteriaMenu from './CafeteriaMenu';
import { fullname } from '../../services/utilities';
import Account from './Account';

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
		const { role, theme_mode, profile } = this.props;
		return (
			<div
				className={`menu-w color-scheme-dark ${
					theme_mode ? '' : 'color-style-bright'
				} menu-position-side menu-side-left menu-layout-full sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link ${
					role !== 'admins' ? '' : 'menu-layout-compact'
				}`}
				ref="menu_activated_on_hover">
				<div className="logo-w">
					<a className="logo">
						<div className="logo-element" />
						<div className="logo-label">Deda Hospital</div>
					</a>
				</div>
				<div className="logged-user-w avatar-inline">
					<div className="logged-user-i">
						<div className="avatar-w">
							<img alt="" src={avatar1} />
						</div>
						<div className="logged-user-info-w">
							<div className="logged-user-name">
								{fullname(profile.details)}
							</div>
							<div className="logged-user-role">{capitalize(role)}</div>
						</div>
					</div>
				</div>
				{/* <div className="menu-actions">
					<div className="messages-notifications os-dropdown-trigger os-dropdown-position-right">
						<i className="os-icon os-icon-mail-14"/>
						<div className="new-messages-count">12</div>
					</div>
					<div className="messages-notifications os-dropdown-trigger os-dropdown-position-right">
						<i className="os-icon os-icon-zap"/>
						<div className="new-messages-count">4</div>
					</div>
				</div> */}
				<h1 className="menu-page-header">Page Header</h1>
				<ul className="main-menu">
					{(role === 'front-desk' || role === 'admin') && <FrontDeskMenu />}
					{(role === 'hr' || role === 'admin') && <HrMenu />}
					{role === 'doctor' || (role === 'admin' && <DoctorMenu />)}
					{(role === 'inventory' || role === 'admin') && <InventoryMenu />}
					{(role === 'cafeteria' || role === 'admin') && <CafeteriaMenu />}
					{(role === 'hmo' || role === 'admin') && <HMOMenu />}
					{(role === 'account' || role === 'admin') && <Account />}
					{role === 'admin' && <SettingsMenu />}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(MainMenu);
