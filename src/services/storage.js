import Cookies from 'universal-cookie';

import { isUnset, decodeValue, encodeValue } from './utilities';

export default class SSRStorage {
	constructor() {
		const cookies = new Cookies();
		this.$cookies = cookies;
	}

	setItem(key, value, options = { path: '/' }) {
		// Unset null, undefined
		if (isUnset(value)) {
			return this.removeItem(key);
		}

		// Cookies
		this.setCookie(key, value, options);

		// Local Storage
		this.setLocalStorage(key, value);

		return value;
	}

	async getItem(key) {
		// Cookies
		let value = await this.getCookie(key);

		try {
			// Local Storage
			if (isUnset(value)) {
				value = this.getLocalStorage(key);
			}
		} catch (e) {}

		return value;
	}

	removeItem(key) {
		this.removeLocalStorage(key);
		this.removeCookie(key);
	}

	// ------------------------------------
	// Local storage
	// ------------------------------------
	setLocalStorage(key, value) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		try {
			localStorage.setItem(key, encodeValue(value));
		} catch (e) {}

		return value;
	}

	getLocalStorage(key) {
		const value = localStorage.getItem(key);
		return decodeValue(value);
	}

	removeLocalStorage(key) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.removeItem(key);
	}

	// ------------------------------------
	// Cookies
	// ------------------------------------
	setCookie(key, value, options = {}) {
		const _value = encodeValue(value);
		this.$cookies.set(key, _value, { ...options, sameSite: 'lax' });
		return value;
	}

	async getCookie(key) {
		const value = await this.$cookies.get(key);
		return decodeValue(value);
	}

	async removeCookie(key, options) {
		this.$cookies.remove(key, { path: '/' });
	}
}
