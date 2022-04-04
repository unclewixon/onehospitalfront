/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import axios from 'axios';
import { AbilityBuilder } from '@casl/ability';
import { v4 as uuidv4 } from 'uuid';

import waiting from '../assets/images/waiting.gif';
import { request, redirectToPage, defaultHeaders } from '../services/utilities';
import { API_URI, departmentAPI, rolesAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import { loginUser } from '../actions/user';
import SSRStorage from '../services/storage';
import {
	FULLSCREEN_COOKIE,
	MODE_COOKIE,
	TOKEN_COOKIE,
} from '../services/constants';
import { loadRoles } from '../actions/role';
import { loadDepartments } from '../actions/department';
import { loadSpecializations } from '../actions/settings';
import { setConnection } from '../actions/general';
import ability from '../services/ability';
import { initSocket, subscribeIO } from '../services/socket';

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
		<div className="input-group">
			<input
				{...input}
				type={type}
				className="form-control"
				placeholder={placeholder}
			/>
			<div className="input-group-prepend">
				<div className="input-group-text">
					<i className={`pre-icon os-icon ${icon}`} />
				</div>
			</div>
		</div>
	</div>
);

const Login = ({ location, history, error, handleSubmit }) => {
	const [state, setState] = useState({
		submitting: false,
		loaded: false,
	});

	const dispatch = useDispatch();

	const initSettings = useCallback(async () => {
		const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);
		const theme_mode = await storage.getItem(MODE_COOKIE);
		const isLogin = location.pathname === '/';
		window.document.body.className = `menu-position-side menu-side-left${
			fullscreen || isLogin ? ' full-screen' : ''
		} with-content-panel${theme_mode ? ' color-scheme-dark' : ''}`;
	}, [location]);

	useEffect(() => {
		if (!state.loaded) {
			setState({ ...state, loaded: true });
			initSettings();
		}
	}, [initSettings, state]);

	const doLogin = async data => {
		try {
			setState({ ...state, submitting: true });
			const address = uuidv4();
			const detail = { ...data, address };
			const rs = await request('auth/login', 'POST', true, detail);
			if (rs && rs.token) {
				try {
					const jwt = `Bearer ${rs.token}`;
					let [rs_depts, rs_roles, rs_specializations] = await Promise.all([
						axiosFetch(`${API_URI}/${departmentAPI}`, jwt),
						axiosFetch(`${API_URI}/${rolesAPI}`, jwt),
						axiosFetch(`${API_URI}/specializations`, jwt),
					]);

					if (rs_depts && rs_depts.data) {
						dispatch(loadDepartments(rs_depts.data));
					}
					if (rs_roles && rs_roles.data) {
						dispatch(loadRoles(rs_roles.data));
					}
					if (rs_specializations && rs_specializations.data) {
						dispatch(loadSpecializations(rs_specializations.data));
					}

					dispatch(loginUser(rs));
					storage.setItem(TOKEN_COOKIE, rs);

					const { can, rules } = new AbilityBuilder();

					can(rs.permissions, 'all');

					ability.update(rules);

					notifySuccess('login successful!');

					initSocket();
					subscribeIO();

					dispatch(setConnection(true));

					if (rs.passwordChanged) {
						redirectToPage(rs.role, history, rs.permissions);
					} else {
						history.push('/change-password');
					}
				} catch (e) {
					console.log(e);
					setState({ ...state, submitting: false });
					throw new SubmissionError({
						_error: 'could not login user',
					});
				}
			} else if (rs && rs.error) {
				dispatch(change('login_user', 'bypass', 1));
				setState({ ...state, submitting: false });
				// throw prompt to logout other users
			} else {
				setState({ ...state, submitting: false });
				throw new SubmissionError({
					_error: 'could not login user',
				});
			}
		} catch (e) {
			console.log(e);
			setState({ ...state, submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not login user',
			});
		}
	};

	const { submitting } = state;

	const query = location.search.replace('?', '');
	const sessions = query.split('=');
	const session = sessions.length > 0 ? sessions[0] : '';

	return (
		<section className="fxt-animation template">
			<div className="bg-overlay">
				<div className="fxt-content">
					<div className="logo-header">
						<a className="fxt-logo">
							<img src={require('../assets/images/logo.png')} alt="logo" />
						</a>
					</div>
					<div className="fxt-form">
						<form onSubmit={handleSubmit(doLogin)} autoComplete="off">
							{session !== '' && (
								<div
									className="alert alert-danger"
									dangerouslySetInnerHTML={{ __html: `Session Expired!` }}
								/>
							)}
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
								type="text"
								placeholder="Enter your username"
								className="form-control"
								icon="os-icon-user-male-circle"
								label="Username"
							/>
							<Field
								name="password"
								component={renderTextInput}
								type="password"
								placeholder="Enter your password"
								className="form-control"
								icon="os-icon-fingerprint"
								label="Password"
							/>
							<div className="form-group mt-2">
								{/* <Link to="/forgot-password">Forgot Password?</Link> */}
								<div className="fxt-transformY-50 fxt-transition-delay-9">
									<button
										className="fxt-btn-fill"
										disabled={submitting}
										type="submit"
									>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Log me in'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = () => {
	return {
		initialValues: {
			bypass: 0,
		},
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'login_user', validate })(Login)
);
