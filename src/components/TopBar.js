/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import upperCase from 'lodash.uppercase';
import startCase from 'lodash.startcase';
import capitalize from 'lodash.capitalize';

import avatar1 from '../assets/images/placeholder.jpg';
import topimg from '../assets/images/company5.png';
import {
	toggleProfile,
	toggleMode,
	toggleMenu,
	toggleFullscreen,
} from '../actions/user';
import SearchPatient from './SearchPatient';
import { fullname } from '../services/utilities';

class TopBar extends Component {
	state = {
		hover_settings: false,
		focus: false,
		style: { display: 'none' },
	};

	getCoords = elem => {
		return { top: 12, right: 100 };
	};

	openProfile = () => {
		const { profile } = this.props;
		const info = { staff: profile, type: 'staff' };
		this.props.toggleProfile(true, info);
	};

	toggleSettings = () => {
		const { hover_settings } = this.state;
		this.setState({ hover_settings: !hover_settings });
	};

	doToggleMode = () => {
		this.props.toggleMode();
	};

	doToggleMenu = () => {
		this.props.toggleMenu();
	};

	doToggleFullscreen = () => {
		this.props.toggleFullscreen();
	};

	onFocus = () => {
		const style = { display: 'block' };
		const coords = this.getCoords(this.refs.searchBox);
		this.setState({ style: { ...style, ...coords }, focus: true });
	};

	onExit = () => {
		const style = { display: 'none' };
		this.setState({ style, focus: false });
	};

	render() {
		const { role, location, profile } = this.props;
		const paths = location.pathname.split('/');
		const title = paths.length > 1 ? paths[1] : '';
		const sub_title = paths.length > 2 ? paths[2] : '';
		const { hover_settings, focus, style } = this.state;
		return (
			<div className="top-bar color-scheme-transparent">
				{title && title !== '' && (
					<div className="fancy-selector-w">
						<div className="fancy-selector-current">
							<div
								className="top-icon shadowless text-white pr-0"
								style={{ cursor: 'pointer' }}
								onClick={this.doToggleMenu}>
								<i className="os-icon os-icon-hamburger-menu-1" />
							</div>
							<div className="fs-img shadowless pr-0">
								<img alt="" src={topimg} />
							</div>
							<div className="fs-main-info">
								<div className="fs-name">
									<span>{`${upperCase(
										title.replace('-mgt', '')
									)} MANAGEMENT`}</span>
								</div>
								{sub_title && (
									<div className="fs-sub">
										<span>{startCase(sub_title)}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="top-menu-controls" ref="searchBox">
					<SearchPatient style={style} onExit={this.onExit} focus={focus} />
					<div className="element-search autosuggest-search-activator">
						<input
							placeholder="Find patient..."
							type="text"
							onFocus={this.onFocus}
						/>
					</div>
					{/* <div className="messages-notifications os-dropdown-trigger os-dropdown-position-left">
						<i className="os-icon os-icon-mail-14"/>
						<div className="new-messages-count">12</div>
					</div> */}
					<div
						className={`top-icon top-settings os-dropdown-trigger os-dropdown-position-left ${
							hover_settings ? 'over' : ''
						}`}
						onClick={this.toggleSettings}>
						<i className="os-icon os-icon-ui-46" />
						<div className="os-dropdown">
							<div className="icon-w">
								<i className="os-icon os-icon-ui-46" />
							</div>
							<ul>
								<li>
									<a onClick={this.doToggleMode}>
										<i className="os-icon os-icon-ui-49" />
										<span>Dark Mode ON/OFF</span>
									</a>
								</li>
								<li>
									<a onClick={this.doToggleFullscreen}>
										<i className="os-icon os-icon-grid-10" />
										<span>Fullscreen ON/OFF</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="logged-user-w">
						<div className="logged-user-i">
							<div className="avatar-w">
								<img alt="" src={avatar1} />
							</div>
							<div className="logged-user-menu color-style-bright">
								<div className="logged-user-avatar-info">
									<div className="avatar-w">
										<img alt="" src={avatar1} />
									</div>
									<div className="logged-user-info-w">
										<div className="logged-user-name">
											{fullname(profile.details)}
										</div>
										<div className="logged-user-role">
											{role !== 'patient' ? capitalize(role) : 'Doctor'}
										</div>
									</div>
								</div>
								<div className="bg-icon">
									<i className="os-icon os-icon-wallet-loaded" />
								</div>
								<ul>
									<li>
										<a onClick={this.openProfile}>
											<i className="os-icon os-icon-user-male-circle2" />
											<span>Profile Details</span>
										</a>
									</li>
									<li>
										<Link to="/logout">
											<i className="os-icon os-icon-signs-11" />
											<span>Logout</span>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.user.profile,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		toggleProfile,
		toggleMode,
		toggleMenu,
		toggleFullscreen,
	})(TopBar)
);
