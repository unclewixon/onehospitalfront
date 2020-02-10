import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';

import avatar1 from '../assets/images/avatar1.jpg';
import PatientMenu from './PatientMenu';
import HrMenu from './HrMenu';
import DoctorMenu from './DoctorMenu';
import InventoryMenu from './InventoryMenu';
import AdminMenu from './AdminMenu';

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
			<div className="menu-w color-scheme-dark color-style-bright menu-position-side menu-side-left sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link" ref="menu_activated_on_hover">
				<div className="logo-w">
					<Link className="logo" to="/">
						<div className="logo-element"/>
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
					{role === 'patient' && (
						<PatientMenu />
					)}
					{role === 'hr' && (
						<HrMenu />
					)}
					{role === 'doctor' && (
						<DoctorMenu />
					)}
					{role === 'inventory' && (
						<InventoryMenu />
					)}
					{role === 'admin' && (
						<AdminMenu />
					)}
				</ul>
			</div>
		);
	}
}

export default MainMenu;
