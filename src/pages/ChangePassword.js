/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import waiting from '../assets/images/waiting.gif';
import { request, redirectToPage } from '../services/utilities';
import SSRStorage from '../services/storage';
import {
	FULLSCREEN_COOKIE,
	MODE_COOKIE,
	TOKEN_COOKIE,
	USER_RECORD,
	CK_COMPLAINTS,
	CK_REVIEW_OF_SYSTEMS,
	CK_HX_FORMS,
	CK_PAST_HISTORY,
	CK_ALLERGIES,
	CK_PAST_ALLERGIES,
	CK_PHYSICAL_EXAM,
	CK_INVESTIGATIONS,
	CK_INVESTIGATION_LAB,
	CK_INVESTIGATION_SCAN,
	CK_INVESTIGATION_REGIMEN,
	CK_INVESTIGATION_PROCEDURE,
	CK_TREATMENT_PLAN,
	CK_CONSUMABLE,
	CK_ITEM_OTHERS,
	CK_DIAGNOSIS,
	CK_PAST_DIAGNOSIS,
} from '../services/constants';
import { signOut } from '../actions/user';
import { loginUser } from '../actions/user';

const storage = new SSRStorage();

const validate = values => {
	const errors = {};
	if (!values.password) {
		errors.password = 'enter password';
	}
	if (!values.repassword) {
		errors.repassword = 're-enter password';
	}
	if (
		values.password &&
		values.repassword &&
		values.password !== values.repassword
	) {
		errors.repassword = 'passwords are not the same';
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

const ChangePassword = ({ location, history, error, handleSubmit }) => {
	const [state, setState] = useState({
		submitting: false,
		loaded: false,
	});

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

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

	const doChangePassword = async data => {
		try {
			setState({ ...state, submitting: true });
			const url = `auth/${user.id}/change-password`;
			const rs = await request(url, 'POST', true, data);
			dispatch(loginUser(rs));
			storage.setItem(TOKEN_COOKIE, rs);
			dispatch(reset('change-password'));
			redirectToPage(rs.role, history);
		} catch (e) {
			console.log(e);
			setState({ ...state, submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not save password',
			});
		}
	};

	const { submitting } = state;

	const doLogout = async () => {
		if (user.role.slug === 'doctor') {
			await request(`hr/staffs/unset-room/${user.details.id}`, 'GET', true);
			storage.removeItem('ACTIVE:ROOM');
		}

		storage.removeItem(USER_RECORD);
		storage.removeItem(TOKEN_COOKIE);

		storage.removeItem(CK_COMPLAINTS);
		storage.removeItem(CK_REVIEW_OF_SYSTEMS);
		storage.removeItem(CK_HX_FORMS);
		storage.removeItem(CK_PAST_HISTORY);
		storage.removeItem(CK_ALLERGIES);
		storage.removeItem(CK_PAST_ALLERGIES);
		storage.removeItem(CK_PHYSICAL_EXAM);
		storage.removeItem(CK_INVESTIGATIONS);
		storage.removeItem(CK_INVESTIGATION_LAB);
		storage.removeItem(CK_INVESTIGATION_SCAN);
		storage.removeItem(CK_INVESTIGATION_REGIMEN);
		storage.removeItem(CK_INVESTIGATION_PROCEDURE);
		storage.removeItem(CK_TREATMENT_PLAN);
		storage.removeItem(CK_CONSUMABLE);
		storage.removeItem(CK_ITEM_OTHERS);
		storage.removeItem(CK_DIAGNOSIS);
		storage.removeItem(CK_PAST_DIAGNOSIS);

		dispatch(signOut());

		history.push('/');
	};

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
						<form onSubmit={handleSubmit(doChangePassword)} autoComplete="off">
							{error && (
								<div
									className="alert alert-danger"
									dangerouslySetInnerHTML={{
										__html: `<strong>Error!</strong> ${error}`,
									}}
								/>
							)}
							<Field
								id="password"
								name="password"
								component={renderTextInput}
								type="password"
								placeholder="Enter your password"
								className="form-control"
								icon="os-icon-fingerprint"
								label="Password"
							/>
							<Field
								name="repassword"
								component={renderTextInput}
								type="password"
								placeholder="Re-enter your password"
								className="form-control"
								icon="os-icon-fingerprint"
								label="Re-enter Password"
							/>
							<div className="form-group mt-2">
								<div className="fxt-transformY-50 fxt-transition-delay-9 row">
									<div className="col-md-6">
										<button
											className="fxt-btn-fill"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save Password'
											)}
										</button>
									</div>
									<div className="col-md-6">
										<a
											className="fxt-btn-fill text-center custom-bg"
											onClick={() => doLogout()}>
											Logout
										</a>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default withRouter(
	reduxForm({ form: 'change-password', validate })(ChangePassword)
);
