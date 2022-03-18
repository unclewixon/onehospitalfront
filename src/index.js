import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import axios from 'axios';

import './assets/bower_components/select2/dist/css/select2.css';
import './assets/icon_fonts_assets/feather/style.css';
import './assets/icon_fonts_assets/picons-thin/style.css';
import './assets/icon_fonts_assets/font-awesome/css/font-awesome.css';
import './assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-block-ui/style.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import history from './services/history';
import Notify from './services/notify';
import {
	MODE_COOKIE,
	API_URI,
	departmentAPI,
	rolesAPI,
	utilityAPI,
	USER_RECORD,
	TOKEN_COOKIE,
} from './services/constants';
import {
	initMode,
	initFullscreen,
	toggleProfile,
	loginUser,
} from './actions/user';
import SSRStorage from './services/storage';
import { defaultHeaders, getUser, redirectToPage } from './services/utilities';
import { loadDepartments } from './actions/department';
import { loadSpecializations } from './actions/settings';
import { togglePreloading } from './actions/general';
import { loadRoles } from './actions/role';
import {
	loadBanks,
	loadCountries,
	loadPaymentMethods,
} from './actions/utility';

Notify.notifications.subscribe(alert => alert instanceof Function && alert());
const store = configureStore();
const storage = new SSRStorage();

const initSettings = async () => {
	const theme_mode = await storage.getItem(MODE_COOKIE);
	// const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);

	store.dispatch(initMode(theme_mode));
	store.dispatch(initFullscreen(true));
};

const axiosFetch = (url, jwt) =>
	axios.get(url, {
		headers: !jwt ? defaultHeaders : { ...defaultHeaders, Authorization: jwt },
	});

const initData = async () => {
	await initSettings();

	try {
		let [rs_banks, rs_countries, rs_pm] = await Promise.all([
			axiosFetch(`${API_URI}/${utilityAPI}/banks`),
			axiosFetch(`${API_URI}/${utilityAPI}/countries`),
			axiosFetch(`${API_URI}/${utilityAPI}/payment-methods`),
		]);

		if (rs_banks && rs_banks.data) {
			store.dispatch(loadBanks(rs_banks.data));
		}
		if (rs_countries && rs_countries.data) {
			store.dispatch(loadCountries(rs_countries.data));
		}
		if (rs_pm && rs_pm.data) {
			store.dispatch(loadPaymentMethods(rs_pm.data));
		}
	} catch (e) {
		// console.log(e.response);
	}

	const query = history.location.search.replace('?', '');
	const qs = query !== 'not-authenticated' ? query : 'not-authenticated';
	const user = await getUser();
	if (user) {
		try {
			const jwt = `Bearer ${user.token}`;
			let [
				rs_depts,
				rs_roles,
				rs_specializations,
				rs_user,
			] = await Promise.all([
				axiosFetch(`${API_URI}/${departmentAPI}`, jwt),
				axiosFetch(`${API_URI}/${rolesAPI}`, jwt),
				axiosFetch(`${API_URI}/specializations`, jwt),
				axiosFetch(`${API_URI}/auth/${user.username}`, jwt),
			]);

			if (rs_depts && rs_depts.data) {
				store.dispatch(loadDepartments(rs_depts.data));
			}
			if (rs_roles && rs_roles.data) {
				store.dispatch(loadRoles(rs_roles.data));
			}
			if (rs_specializations && rs_specializations.data) {
				store.dispatch(loadSpecializations(rs_specializations.data));
			}

			const details = {
				...user.details,
				room: rs_user?.data?.details?.room || null,
			};

			store.dispatch(loginUser({ ...user, details }));
			store.dispatch(togglePreloading(false));

			const search = history.location.search.replace('?', '');
			const qm = search === '' ? '' : '?';
			const url = `${history.location.pathname}${qm}${search}`;
			if (user.passwordChanged) {
				setTimeout(async () => {
					const user_record = await storage.getItem(USER_RECORD);
					if (user_record) {
						store.dispatch(toggleProfile(true, user_record));
					}
				}, 200);

				if (history.location.pathname === '/') {
					redirectToPage(user.role, history, user.permissions);
				} else {
					history.push(url);
				}
			} else {
				history.push('/change-password');
			}
		} catch (e) {
			// console.log(e);
			storage.removeItem(TOKEN_COOKIE);
			store.dispatch(togglePreloading(false));
			history.push(`/?${qs}`);
		}
	} else {
		store.dispatch(togglePreloading(false));
		history.push(`/?${qs}`);
	}
};

initData();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
        	<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
