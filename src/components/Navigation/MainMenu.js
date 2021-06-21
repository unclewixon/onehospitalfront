/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';
import { connect } from 'react-redux';

import HrMenu from './HrMenu';
import InventoryMenu from './InventoryMenu';
import FrontDeskMenu from './FrontDeskMenu';
import HMOMenu from './HMOMenu';
import DoctorMenu from './DoctorMenu';
import CafeteriaMenu from './CafeteriaMenu';
import ClinicalLabMenu from './ClinicalLabMenu';
import { fullname, parseAvatar } from '../../services/utilities';
import Account from './Account';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import ProcedureMenu from './ProcedureMenu';
import MyAccount from './MyAccount';
import NurseMenu from './NurseMenu';
import AdminMenu from './AdminMenu';
import SettingsMenu from './SettingsMenu';

class MainMenu extends Component {
	menu_ref = null;
	menu_list = null;

	state = {
		menuHeight: 1,
		clientHeight: 0,
	};

	componentDidMount() {
		$(this.menu_ref).on('click', 'ul.main-menu > li.has-sub-menu', function() {
			var $elem = $(this);
			console.log($elem.closest('ul').hasClass('has-active'));
			if ($elem.closest('ul').hasClass('has-active')) {
				$elem
					.removeClass('active')
					.closest('ul')
					.removeClass('has-active');
			} else {
				$elem
					.closest('ul')
					.addClass('has-active')
					.find('> li')
					.removeClass('active');
				$elem.addClass('active');
			}
		});

		setTimeout(() => {
			const menuListHeight = $(this.menu_list).outerHeight();
			// console.log(menuListHeight);
			this.setState({ menuHeight: menuListHeight + 54 + 90 });
			const clientHeight = $(this.menu_ref).outerHeight();
			// console.log(clientHeight);
			this.setState({ clientHeight });
		}, 3500);
	}

	render() {
		const { role, theme_mode, menu_mode, profile, menu_mini } = this.props;
		const { menuHeight, clientHeight } = this.state;
		return (
			<div
				className={`menu-w color-scheme-dark ${
					theme_mode ? '' : 'color-style-bright'
				} menu-position-side menu-side-left sub-menu-color-bright selected-menu-color-light sub-menu-style-inside sub-menu-color-light menu-has-selected-link ${menu_mode}`}
				ref={ref => (this.menu_ref = ref)}
				style={{
					width: menu_mini ? '8%' : '18%',
					overflowY: menuHeight > clientHeight ? 'scroll' : 'hidden',
				}}>
				<div className="logo-w">
					<a className="logo">
						<div className="logo-element" />
						<div className="logo-label">Deda Hospital</div>
					</a>
				</div>
				<div className="logged-user-w avatar-inline">
					<div className="logged-user-i">
						<div className="avatar-w">
							<img alt="" src={parseAvatar(profile.details?.profile_pic)} />
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
				<ul className="main-menu" ref={ref => (this.menu_list = ref)}>
					{role === 'front-desk' && <FrontDeskMenu />}
					{(role === 'lab-attendant' ||
						role === 'lab-officer' ||
						role === 'lab-supervisor' ||
						role === 'lab-hod') && <ClinicalLabMenu />}
					{role === 'accountant' && <PayPointMenu />}
					{role === 'pharmacy' && <PharmacyMenu />}
					{role === 'radiology' && <RadiologyMenu />}
					{role === 'procedure' && <ProcedureMenu />}
					{role === 'nurse' && <NurseMenu />}
					{role === 'doctor' && <DoctorMenu />}
					{role === 'hr-manager' && <HrMenu />}
					{(role === 'inventory' || role === 'pharmacy') && (
						<InventoryMenu role={role} />
					)}
					{role === 'cafeteria' && <CafeteriaMenu />}
					{role === 'hmo-officer' && <HMOMenu />}
					{role === 'account' && <Account />}
					{role === 'admin' && <AdminMenu role={role} />}
					<MyAccount />
					{(role === 'lab-attendant' ||
						role === 'lab-officer' ||
						role === 'lab-supervisor' ||
						role === 'lab-hod' ||
						role === 'admin') && <SettingsMenu role={role} />}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.user.profile,
		menu_mini: state.user.menu_mini,
	};
};

export default connect(mapStateToProps)(MainMenu);
