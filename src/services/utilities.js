import React from 'react';
import numeral from 'numeral';
import uppercase from 'lodash.uppercase';
import startCase from 'lodash.startcase';
import padLeft from 'pad-left';
import { confirmAlert } from 'react-confirm-alert';
import JwtDecode from 'jwt-decode';
import Multiselect from 'react-widgets/lib/Multiselect';

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

export const defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const headers = token => {
	const jwt = `Bearer ${token}`;
	return { ...defaultHeaders, Authorization: jwt };
};

const parseJSON = response => response.json();

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

export const upload = async (url, method, body) => {
	const response = await fetch(url, { method, headers, body });
	const result = await checkStatus(response);
	return parseJSON(result);
};

// prettier-ignore
export const renderTextInput = ({input, label, type, id, placeholder, meta: { touched, error }}) => (
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
		{touched && error && (
			<div className="help-block form-text with-errors form-control-feedback">
				<ul className="list-unstyled">
					<li>{error}</li>
				</ul>
			</div>
		)}
	</div>
);

export const renderTextArea = ({
	input,
	label,
	type,
	id,
	placeholder,
	meta: { touched, error },
}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<textarea
			{...input}
			type={type}
			className="form-control"
			placeholder={placeholder || label}></textarea>
		{touched && error && (
			<div className="help-block form-text with-errors form-control-feedback">
				<ul className="list-unstyled">
					<li>{error}</li>
				</ul>
			</div>
		)}
	</div>
);

//multiselect input
export const renderMultiselect = ({ input, data, valueField, textField }) => (
	<Multiselect
		{...input}
		onBlur={() => input.onBlur()}
		value={input.value || []} // requires value to be an array
		data={data}
		valueField={valueField}
		textField={textField}
	/>
);

// prettier-ignore
export const renderTextInputGroup = ({input, append, label, icon, type, id, placeholder, meta: { touched, error }}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<div className="input-group">
			{!append && (
				<div className="input-group-prepend">
					<div className="input-group-text">{icon}</div>
				</div>
			)}
			<input
				{...input}
				type={type}
				className="form-control"
				placeholder={placeholder || label}
			/>
			{append && (
				<div className="input-group-append">
					<div className="input-group-text">{icon}</div>
				</div>
			)}
		</div>
		{touched && error && (
			<div className="help-block form-text with-errors form-control-feedback">
				<ul className="list-unstyled">
					<li>{error}</li>
				</ul>
			</div>
		)}
	</div>
);

export const confirmAction = (action, payload, alertText) => {
	confirmAlert({
		customUI: ({ onClose }) => {
			const onclick = async () => {
				action(payload);
				onClose();
			};
			return (
				<div className="custom-ui">
					<h1>Are you sure?</h1>
					<p>{alertText ? alertText : 'You want to delete this remove'}</p>
					<div>
						<button
							className="btn btn-primary"
							style={{ margin: 10 }}
							onClick={onClose}>
							No
						</button>
						<button
							className="btn btn-danger"
							style={{ margin: 10 }}
							onClick={onclick}>
							Yes
						</button>
					</div>
				</div>
			);
		},
	});
};

export const renderSelect = ({
	input,
	label,
	placeholder,
	id,
	data,
	meta: { touched, error },
}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<select {...input} className="form-control">
			<option value="">{placeholder}</option>
			{data.map((d, i) => (
				<option key={i} value={d.id}>
					{d.name}
				</option>
			))}
		</select>
		{touched && error && (
			<div className="help-block form-text with-errors form-control-feedback">
				<ul className="list-unstyled">
					<li>{error}</li>
				</ul>
			</div>
		)}
	</div>
);

const firstLetter = item =>
	item && item !== '' ? `${item.substring(0, 1)}.` : '';

const parseDuty = item => (item && item !== '' ? ` [${uppercase(item)}]` : '');

const parseClass = item => {
	if (item === 'o') {
		return 'bg-secondary';
	} else if (item === 'm' || item === 'n') {
		return 'bg-primary';
	} else {
		return 'bg-primary';
	}
};

export const parseRoster = result => {
	let rosters = [];
	result.forEach(item => {
		item.schedule.forEach(schedule => {
			if (schedule.duty !== '') {
				rosters = [
					...rosters,
					{
						title: `${startCase(item.last_name)} ${firstLetter(
							item.first_name
						)}${parseDuty(schedule.duty)}`,
						date: `${item.period}-${
							schedule.date !== '' ? padLeft(schedule.date, 2, '0') : ''
						}`,
						className: parseClass(schedule.duty),
					},
				];
			}
		});
	});
	return rosters;
};

export const getUserID = async () => {
	// const date = new Date();
	// prettier-ignore
	const token = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	if (token) {
		const decoded = JwtDecode(token);
		console.log(decoded);
		// const userid = decoded.sub;
		// if (decoded.exp < date.getTime()) {
		// 	return userid;
		// }
	}

	return null;
};
