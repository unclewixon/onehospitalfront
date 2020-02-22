import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import axios from 'axios';

import './assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

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
} from './services/constants';
import { initMode, initFullscreen } from './actions/user';
import SSRStorage from './services/storage';
import { defaultHeaders } from './services/utilities';
import { loadDepartments } from './actions/setting';
import { loadInvCategories, loadInvSubCategories } from './actions/inventory';
import { togglePreloading } from './actions/general';
import { loadRoles } from './actions/role';
import { loadBanks, loadCountries } from './actions/utility';

Notify.notifications.subscribe(alert => alert instanceof Function && alert());
const store = configureStore();

const initSettings = async () => {
	const theme_mode = await new SSRStorage().getItem(MODE_COOKIE);
	const fullscreen = await new SSRStorage().getItem(FULLSCREEN_COOKIE);

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
		] = await Promise.all([
			axiosFetch(`${API_URI}${departmentAPI}`),
			axiosFetch(`${API_URI}${inventoryCatAPI}`),
			axiosFetch(`${API_URI}${inventorySubCatAPI}`),
			axiosFetch(`${API_URI}${rolesAPI}`),
			axiosFetch(`${API_URI}${utilityAPI}/banks`),
			axiosFetch(`${API_URI}${utilityAPI}/countries`),
		]);

		if (rs_depts && rs_depts.data) {
			store.dispatch(loadDepartments(rs_depts.data));
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
	} catch (e) {
		console.log(e);
	}

	store.dispatch(togglePreloading(false));
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
