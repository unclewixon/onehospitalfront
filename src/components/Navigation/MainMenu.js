/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import capitalize from 'lodash.capitalize';
import $ from 'jquery';
import { connect } from 'react-redux';

import avatar1 from '../../assets/images/placeholder.jpg';
import HrMenu from './HrMenu';
import InventoryMenu from './InventoryMenu';
import SettingsMenu from './SettingsMenu';
import FrontDeskMenu from './FrontDeskMenu';
import HMOMenu from './HMOMenu';
import DoctorMenu from './DoctorMenu';
import CafeteriaMenu from './CafeteriaMenu';
import ClinicalLabMenu from './ClinicalLabMenu';
import { fullname } from '../../services/utilities';
import Account from './Account';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import DenstistryMenu from './DenstistryMenu';
import PhysiotherapyMenu from './PhysiotherapyMenu';
import IvfMenu from './IvfMenu';
import NicuMenu from './NicuMenu';
import AntenatalMenu from './AntenatalMenu';
import ProcedureMenu from './ProcedureMenu';
import LabourMgt from './LabourMgt';
import ImmunizationMenu from './ImmunizationMenu';
import AdminMenu from './AdminMenu';

class MainMenu extends Component {
	componentDidMount() {
		$(this.refs.menu_activated_on_click).on(
			'click',
			'ul.main-menu > li.has-sub-menu',
			function() {
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
			}
		);
	}

	render() {
		const { role, theme_mode, menu_mode, profile } = this.props;

		return (
			<div
				className={`menu-w color-scheme-dark ${
					theme_mode ? '' : 'color-style-bright'
				} menu-position-side menu-side-left sub-menu-color-bright selected-menu-color-light sub-menu-style-inside sub-menu-color-light menu-has-selected-link ${menu_mode}`}
				ref="menu_activated_on_click">
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
					{(role === 'clinical-lab' || role === 'admin') && <ClinicalLabMenu />}
					{(role === 'accountant' || role === 'admin') && <PayPointMenu />}
					{(role === 'pharmacy' || role === 'admin') && <PharmacyMenu />}
					{(role === 'radiology' || role === 'admin') && <RadiologyMenu />}
					{(role === 'dentistry' || role === 'admin') && <DenstistryMenu />}
					{(role === 'physiotherapy' || role === 'admin') && (
						<PhysiotherapyMenu />
					)}
					{(role === 'ivf' || role === 'admin') && <IvfMenu />}
					{(role === 'nicu' || role === 'admin') && <NicuMenu />}
					{(role === 'antenatal' || role === 'admin') && <AntenatalMenu />}
					{(role === 'procedure' || role === 'admin') && <ProcedureMenu />}
					{(role === 'labour-mgt' || role === 'admin') && <LabourMgt />}
					{(role === 'immunization' || role === 'admin') && (
						<ImmunizationMenu />
					)}
					{role === 'doctor' || (role === 'admin' && <DoctorMenu />)}
					{(role === 'hr' || role === 'admin') && <HrMenu />}

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
