import React from 'react';
import numeral from 'numeral';

import SSRStorage from './storage';
import { TOKEN_COOKIE } from './constants';

export const formatCurrency = amount => `₦${numeral(amount).format('0,0.00')}`;

export const isUnset = o => typeof o === 'undefined' || o === null;

export const isSet = o => !isUnset(o);

export function encodeValue(val) {
	if (typeof val === 'string') {
		return val;
	}

	return JSON.stringify(val);
}

export function decodeValue(val) {
	if (typeof val === 'string') {
		try {
			return JSON.parse(val);
		} catch (_) {}
	}

	return val;
}

const checkStatus = async response => {
	if (!response.ok) {
		if (response.statusText === 'Unauthorized') {
			// prettier-ignore
			(new SSRStorage()).removeItem(TOKEN_COOKIE);
		}
		const message = await response.text();
		const err = JSON.parse(message);
		throw Object.freeze({ message: err.error });
	}
	return response;
};

const headers = token => {
	const jwt = `Bearer ${token}`;
	return { ...defaultHeaders, Authorization: jwt };
};

const parseJSON = response => response.json();

const defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const request = async (url, method, authed = false, data) => {
	// prettier-ignore
	const token = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	const response = await fetch(url, {
		method: method,
		headers: authed ? headers(token) : { ...defaultHeaders },
		body: JSON.stringify(data),
	});
	const result = await checkStatus(response);
	return parseJSON(result);
};

export const renderTextInput = ({input, label, type, id, placeholder, meta: {touched, error}}) => (
	<div className={`form-group ${touched && (error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<input {...input} type={type} className="form-control" placeholder={placeholder || label} />
		{touched && (error && <div className="help-block form-text with-errors form-control-feedback"><ul className="list-unstyled"><li>{error}</li></ul></div>)}
	</div>
);

export const renderTextInputGroup = ({input, append, label, icon, type, id, placeholder, meta: {touched, error}}) => (
	<div className={`form-group ${touched && (error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<div className="input-group">
			{!append && (
				<div className="input-group-prepend">
					<div className="input-group-text">{icon}</div>
				</div>
			)}
			<input {...input} type={type} className="form-control" placeholder={placeholder || label} />
			{append && (
				<div className="input-group-append">
					<div className="input-group-text">{icon}</div>
				</div>
			)}
		</div>
		{touched && (error && <div className="help-block form-text with-errors form-control-feedback"><ul className="list-unstyled"><li>{error}</li></ul></div>)}
	</div>
);

export const renderSelect = ({input, label, id, data, meta: {touched, error}}) => (
	<div className={`form-group ${touched && (error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<select {...input} className="form-control" placeholder={label}>
			<option>{label}</option>
			{data.map((d, i) => <option key={i} value={d.id}>{d.name}</option>)}
		</select>
		{touched && (error && <div className="help-block form-text with-errors form-control-feedback"><ul className="list-unstyled"><li>{error}</li></ul></div>)}
	</div>
);
