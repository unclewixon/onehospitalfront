import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import axios from 'axios';

import 'react-widgets/dist/css/react-widgets.css';
import './assets/icon_fonts_assets/feather/style.css';
import './assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import history from './services/history';
import Notify from './services/notify';
import {
	MODE_COOKIE,
	FULLSCREEN_COOKIE,
	API_URI,
	departmentAPI,
	inventoryCatAPI,
	inventorySubCatAPI,
	rolesAPI,
	utilityAPI,
	USER_RECORD,
} from './services/constants';
import {
	initMode,
	initFullscreen,
	toggleProfile,
	loginUser,
} from './actions/user';
import SSRStorage from './services/storage';
import { defaultHeaders, getUser, redirectToPage } from './services/utilities';
import { getAllDepartments, getAllSpecialization } from './actions/settings';
import { loadInvCategories, loadInvSubCategories } from './actions/inventory';
import { togglePreloading } from './actions/general';
import { loadRoles } from './actions/role';
import { loadBanks, loadCountries } from './actions/utility';

Notify.notifications.subscribe(alert => alert instanceof Function && alert());
const store = configureStore();
const storage = new SSRStorage();

const initSettings = async () => {
	const theme_mode = await storage.getItem(MODE_COOKIE);
	const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);

	store.dispatch(initMode(theme_mode));
	store.dispatch(initFullscreen(fullscreen));
};

const axiosFetch = url => axios.get(url, { headers: defaultHeaders });

const initData = async () => {
	await initSettings();

	try {
		let [
			rs_depts,
			rs_invcategories,
			rs_invsubcategories,
			rs_roles,
			rs_banks,
			rs_countries,
			rs_specializations,
		] = await Promise.all([
			axiosFetch(`${API_URI}${departmentAPI}`),
			axiosFetch(`${API_URI}${inventoryCatAPI}`),
			axiosFetch(`${API_URI}${inventorySubCatAPI}`),
			axiosFetch(`${API_URI}${rolesAPI}`),
			axiosFetch(`${API_URI}${utilityAPI}/banks`),
			axiosFetch(`${API_URI}${utilityAPI}/countries`),
			axiosFetch(`${API_URI}/specializations`),
		]);

		if (rs_depts && rs_depts.data) {
			store.dispatch(getAllDepartments(rs_depts.data));
		}
		if (rs_invcategories && rs_invcategories.data) {
			store.dispatch(loadInvCategories(rs_invcategories.data));
		}
		if (rs_invsubcategories && rs_invsubcategories.data) {
			store.dispatch(loadInvSubCategories(rs_invsubcategories.data));
		}
		if (rs_roles && rs_roles.data) {
			store.dispatch(loadRoles(rs_roles.data));
		}
		if (rs_banks && rs_banks.data) {
			store.dispatch(loadBanks(rs_banks.data));
		}
		if (rs_countries && rs_countries.data) {
			store.dispatch(loadCountries(rs_countries.data));
		}
		if (rs_specializations && rs_specializations.data) {
			store.dispatch(getAllSpecialization(rs_specializations.data));
		}
	} catch (e) {
		console.log(e);
	}

	const user = await getUser();
	if (user) {
		store.dispatch(loginUser(user));
		store.dispatch(togglePreloading(false));
		redirectToPage(user.role, history);

		setTimeout(async () => {
			const user_record = await storage.getItem(USER_RECORD);
			if (user_record) {
				store.dispatch(toggleProfile(true, user_record));
			}
		}, 200);
	} else {
		store.dispatch(togglePreloading(false));
		history.push('/?not-authenticated');
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
