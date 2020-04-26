/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import axios from 'axios';

import logo from '../assets/images/logo-big.png';
import waiting from '../assets/images/waiting.gif';
import { request, redirectToPage, defaultHeaders } from '../services/utilities';
import {
	API_URI,
	departmentAPI,
	inventoryCatAPI,
	inventorySubCatAPI,
	rolesAPI,
} from '../services/constants';
import { notifySuccess } from '../services/notify';
import { loginUser } from '../actions/user';
import SSRStorage from '../services/storage';
import {
	FULLSCREEN_COOKIE,
	MODE_COOKIE,
	TOKEN_COOKIE,
} from '../services/constants';
import { loadRoles } from '../actions/role';
import { loadDepartments, loadSpecializations } from '../actions/settings';
import { loadInvCategories, loadInvSubCategories } from '../actions/inventory';

const storage = new SSRStorage();

const axiosFetch = (url, jwt) =>
	axios.get(url, {
		headers: !jwt ? defaultHeaders : { ...defaultHeaders, Authorization: jwt },
	});

const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = 'enter username';
	}
	if (!values.password) {
		errors.password = 'enter password';
	}
	return errors;
};

// prettier-ignore
const renderTextInput = ({input, label, type, id, placeholder, icon, meta: { touched, error }}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<input
			{...input}
			type={type}
			className="form-control"
			placeholder={placeholder || label}
		/>
		<div className={`pre-icon os-icon ${icon}`} />
	</div>
);

class Login extends Component {
	state = {
		submitting: false,
	};

	componentDidMount() {
		window.document.body.className = 'auth-wrapper';
	}

	async componentWillUnmount() {
		const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);
		const theme_mode = await storage.getItem(MODE_COOKIE);

		window.document.body.className = `menu-position-side menu-side-left ${
			fullscreen ? 'full-screen' : ''
		} with-content-panel ${theme_mode ? 'color-scheme-dark' : ''}`;
	}

	doLogin = async data => {
		this.setState({ submitting: true });
		try {
			const rs = await request(`${API_URI}/auth/login`, 'POST', true, data);
			try {
				const jwt = `Bearer ${rs.token}`;
				let [
					rs_depts,
					rs_invcategories,
					rs_invsubcategories,
					rs_roles,
					rs_specializations,
				] = await Promise.all([
					axiosFetch(`${API_URI}${departmentAPI}`, jwt),
					axiosFetch(`${API_URI}${inventoryCatAPI}`, jwt),
					axiosFetch(`${API_URI}${inventorySubCatAPI}`, jwt),
					axiosFetch(`${API_URI}${rolesAPI}`, jwt),
					axiosFetch(`${API_URI}/specializations`, jwt),
				]);

				if (rs_depts && rs_depts.data) {
					this.props.loadDepartments(rs_depts.data);
				}
				if (rs_invcategories && rs_invcategories.data) {
					this.props.loadInvCategories(rs_invcategories.data);
				}
				if (rs_invsubcategories && rs_invsubcategories.data) {
					this.props.loadInvSubCategories(rs_invsubcategories.data);
				}
				if (rs_roles && rs_roles.data) {
					this.props.loadRoles(rs_roles.data);
				}
				if (rs_specializations && rs_specializations.data) {
					this.props.loadSpecializations(rs_specializations.data);
				}
				console.log(rs);
				this.props.loginUser(rs);
				storage.setItem(TOKEN_COOKIE, rs);
				notifySuccess('login successful!');
				redirectToPage(rs.role, this.props.history);
			} catch (e) {
				this.setState({ submitting: false });
				throw new SubmissionError({
					_error: 'could not login user',
				});
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not login user',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="all-wrapper menu-side with-pattern">
				<div className="auth-box-w">
					<div className="logo-w">
						<a>
							<img alt="" src={logo} />
						</a>
					</div>
					<h4 className="auth-header">Login Form</h4>
					<form onSubmit={handleSubmit(this.doLogin)}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}
						<Field
							id="username"
							name="username"
							component={renderTextInput}
							label="Username"
							type="text"
							placeholder="Enter your username"
							icon="os-icon-user-male-circle"
						/>
						<Field
							id="password"
							name="password"
							component={renderTextInput}
							label="Password"
							type="password"
							placeholder="Enter your password"
							icon="os-icon-fingerprint"
						/>
						<div className="buttons-w">
							<button
								className="btn btn-primary"
								disabled={submitting}
								type="submit">
								{submitting ? (
									<img src={waiting} alt="submitting" />
								) : (
									'Log me in'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login = reduxForm({
	form: 'login_user',
	validate,
})(Login);

export default connect(null, {
	loginUser,
	loadDepartments,
	loadInvCategories,
	loadInvSubCategories,
	loadRoles,
	loadSpecializations,
})(Login);
