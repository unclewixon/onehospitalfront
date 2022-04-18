/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';
import { connect } from 'react-redux';

import HrMenu from './HrMenu';
import StoreMenu from './StoreMenu';
import FrontDeskMenu from './FrontDeskMenu';
import HMOMenu from './HMOMenu';
import DoctorMenu from './DoctorMenu';
import CafeteriaMenu from './CafeteriaMenu';
import ClinicalLabMenu from './ClinicalLabMenu';
import { staffname, parseAvatar } from '../../services/utilities';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import ProcedureMenu from './ProcedureMenu';
import MyAccount from './MyAccount';
import NurseMenu from './NurseMenu';
import AdminMenu from './AdminMenu';
import SettingsMenu from './SettingsMenu';
import RecordsMenu from './RecordsMenu';
import AccountingMenu from './AccountingMenu';
import CallCenterMenu from './CallCenterMenu';
import { APP_NAME } from '../../services/constants';
import UpdatedCenter from './UpdatedCenter';

class MainMenu extends Component {
	menu_ref = null;
	menu_list = null;

	state = {
		menuHeight: 1,
		clientHeight: 0,
	};

	componentDidMount() {
		$(this.menu_ref).on('click', 'ul.main-menu > li.has-sub-menu', function () {
			var $elem = $(this);
			console.log($elem.closest('ul').hasClass('has-active'));
			if ($elem.closest('ul').hasClass('has-active')) {
				$elem.removeClass('active').closest('ul').removeClass('has-active');
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
				}}
			>
				<div className="logo-w">
					<a className="logo">
						<div className="logo-element" />
						<div className="logo-label">{APP_NAME}</div>
					</a>
				</div>
				<div className="logged-user-w avatar-inline">
					<div className="logged-user-i">
						<div className="avatar-w">
							<img alt="" src={parseAvatar(profile.details?.profile_pic)} />
						</div>
						<div className="logged-user-info-w">
							<div className="logged-user-name">
								{staffname(profile.details)}
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
					{role === 'front-desk' && <CallCenterMenu />}
					{role === 'front-desk' && <UpdatedCenter />}

					{(role === 'lab-manager' ||
						role === 'lab-supervisor' ||
						role === 'lab-user') && <ClinicalLabMenu />}
					{role === 'paypoint' && <PayPointMenu />}
					{role === 'pharmacy' && <PharmacyMenu />}
					{role === 'radiology' && <RadiologyMenu />}
					{role === 'nurse' && <NurseMenu />}
					{role === 'doctor' && <DoctorMenu />}
					{(role === 'doctor' || role === 'nurse') && (
						<li className="sub-header">
							<span>PROCEDURE</span>
						</li>
					)}
					{(role === 'doctor' || role === 'nurse') && <ProcedureMenu />}
					{role === 'hr-manager' && <HrMenu />}
					{role === 'store' && <StoreMenu />}
					{(role === 'cafeteria' ||
						role === 'cafeteria-manager' ||
						role === 'cafeteria-sales') && <CafeteriaMenu />}
					{role === 'hmo-officer' && <HMOMenu />}
					{role === 'records' && <RecordsMenu />}
					{role === 'accounts' && <AccountingMenu />}
					{role === 'it-admin' && <AdminMenu role={role} />}
					<MyAccount />
					{(role === 'lab-manager' || role === 'it-admin') && (
						<SettingsMenu role={role} />
					)}
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
