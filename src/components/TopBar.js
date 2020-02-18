/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import capitalize from 'lodash.capitalize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import avatar1 from '../assets/images/avatar1.jpg';
import { toggleProfile } from '../actions/general';

class TopBar extends Component {
	openProfile = () => {
		console.log('open profile');
		this.props.toggleProfile(true);
	};

	render() {
		const { role } = this.props;
		return (
			<div className="top-bar color-scheme-transparent">
				<div className="top-menu-controls">
					{/* <div className="element-search autosuggest-search-activator">
						<input placeholder="Start typing to search..." type="text" />
					</div> */}
					{/* <div className="messages-notifications os-dropdown-trigger os-dropdown-position-left">
						<i className="os-icon os-icon-mail-14"/>
						<div className="new-messages-count">12</div>
					</div> */}
					<div className="top-icon top-settings os-dropdown-trigger os-dropdown-position-left">
						<i className="os-icon os-icon-ui-46"></i>
						<div className="os-dropdown">
							<div className="icon-w">
								<i className="os-icon os-icon-ui-46"></i>
							</div>
							<ul>
								<li>
									<a href="users_profile_small.html">
										<i className="os-icon os-icon-ui-49"></i>
										<span>Profile Settings</span>
									</a>
								</li>
								<li>
									<a href="users_profile_small.html">
										<i className="os-icon os-icon-grid-10"></i>
										<span>Billing Info</span>
									</a>
								</li>
								<li>
									<a href="users_profile_small.html">
										<i className="os-icon os-icon-ui-44"></i>
										<span>My Invoices</span>
									</a>
								</li>
								<li>
									<a href="users_profile_small.html">
										<i className="os-icon os-icon-ui-15"></i>
										<span>Cancel Account</span>
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
										<div className="logged-user-name">Maria Gomez</div>
										<div className="logged-user-role">{role !== 'patient' ? capitalize(role) : 'Doctor'}</div>
									</div>
								</div>
								<div className="bg-icon">
									<i className="os-icon os-icon-wallet-loaded"/>
								</div>
								<ul>
									<li>
										<a onClick={this.openProfile}>
											<i className="os-icon os-icon-user-male-circle2"/>
											<span>Profile Details</span>
										</a>
									</li>
									<li>
										<Link to="/">
											<i className="os-icon os-icon-signs-11"/>
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

export default connect(null, { toggleProfile })(TopBar);
