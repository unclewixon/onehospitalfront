import React from 'react';
import numeral from 'numeral';
import uppercase from 'lodash.uppercase';
import startCase from 'lodash.startcase';
import padLeft from 'pad-left';
import { confirmAlert } from 'react-confirm-alert';
import JwtDecode from 'jwt-decode';
import Multiselect from 'react-widgets/lib/Multiselect';
import DatePicker from 'react-datepicker';

import SSRStorage from './storage';
import { API_URI, patientAPI, TOKEN_COOKIE } from './constants';
import axios from 'axios';
// import { addVital } from '../actions/patient';
// import { store } from '../store';

//const store = configureStore();
export const formatCurrency = amount => `₦${numeral(amount).format('0,0.00')}`;

export const isUnset = o => typeof o === 'undefined' || o === null;

export const isSet = o => !isUnset(o);

export function encodeValue(val) {
	if (typeof val === 'string') {
		return val;
	}

	return JSON.stringify(val);
}

export async function getData2(patient, title) {
	const res = await request(
		`${API_URI}${patientAPI}/${patient.id}/vitals`,
		'GET',
		true
	);
	return res.find(c => c.readingType === title);
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
		throw Object.freeze({ message: err.message || err.error });
	}
	return response;
};

export const defaultHeaders = {
	Accept: 'application/json',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
	'Content-Type': 'application/json',
};

// export const patchHeaders = {
// 	Accept: 'application/json',
// 	'Access-Control-Allow-Origin': '*',
// 	'Content-Type': 'application/json',
// };

const headers = user => {
	if (user) {
		const jwt = `Bearer ${user.token}`;
		return { ...defaultHeaders, Authorization: jwt };
	} else {
		return defaultHeaders;
	}
};

// const headersPatch = token => {
// 	const jwt = `Bearer ${token}`;
// 	return { ...patchHeaders, Authorization: jwt };
// };

const parseJSON = response => response.json();

export const requestPatch = async (url, authed = false, data) => {
	axios.defaults.headers.post['Access-Control-Allow-Origin'] =
		'GET, POST,HEAD, OPTIONS,PUT, DELETE';
	axios.defaults.headers.post['Access-Control-Request-Headers'] = '*';
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post['Accept'] = 'application/json';
	if (authed) {
		console.log('f');
		const token = await new SSRStorage().getItem(TOKEN_COOKIE);
		axios.defaults.headers.common['Authorization'] = token;
	}
	const result = await axios.patch(url, data);
	return parseJSON(result);
};

export const request = async (url, method, authed = false, data) => {
	// prettier-ignore
	const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);

	if (method === 'DELETE') {
		const response = await fetch(url, {
			method: method,
			headers: authed ? headers(user) : { ...defaultHeaders },
			body: JSON.stringify(data),
		});
		const result = await checkStatus(response);
		return { success: true };
	}
	const response = await fetch(url, {
		method: method,
		headers: authed ? headers(user) : { ...defaultHeaders },
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
export const renderTextInput = ({ input, label, type, id, placeholder, readOnly = false, meta: { touched, error } }) => (
	<div
		className={`form-group ${touched &&
		(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<input
			{...input}
			type={type}
			className="form-control"
			placeholder={placeholder || label}
			readOnly={readOnly}
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

// prettier-ignore
export const renderTextInputGroup = ({ input, append, label, icon, type, id, placeholder, meta: { touched, error } }) => (
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

export const renderMultiselect = ({
	input,
	data,
	valueField,
	textField,
	label,
}) => (
	<Multiselect
		{...input}
		onBlur={() => input.onBlur()}
		value={input.value || []} // requires value to be an array
		data={data}
		valueField={valueField}
		textField={textField}
		label={label}
	/>
);

export const renderDateTimePicker = ({
	input,
	placeholder,
	minDate,
	maxDate,
}) => (
	<div className="custom-date-input">
		<DatePicker
			className="single-daterange form-control"
			dateFormat="yyyy/MM/dd"
			selected={input.value || null}
			onChange={input.onChange}
			minDate={minDate}
			maxDate={maxDate}
			disabledKeyboardNavigation
			placeholderText={placeholder}
		/>
	</div>
);

export const renderTimePicker = ({ input, placeholder, minDate, maxDate }) => (
	<div className="custom-date-input">
		<DatePicker
			className="single-daterange form-control"
			dateFormat="Pp"
			selected={input.value || null}
			onChange={input.onChange}
			disabledKeyboardNavigation
			placeholderText={placeholder}
		/>
	</div>
);

export const confirmAction = (action, payload, alertText, alertHead) => {
	confirmAlert({
		customUI: ({ onClose }) => {
			const onclick = async () => {
				action(payload);
				onClose();
			};
			return (
				<div className="custom-ui text-center">
					<h1 className="">{alertHead ? alertHead : 'Are you sure?'}</h1>
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

export const renderSelectWithChange = ({
	input,
	label,
	onChangeSubmitAction,
	placeholder,
	id,
	data,
	meta: { touched, error },
}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<label htmlFor={id}>{label}</label>
		<select {...input} className="form-control" onChange={onChangeSubmitAction}>
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

export const getUser = async () => {
	const date = new Date();
	// prettier-ignore
	const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	if (user) {
		const token = user.token;
		const decoded = JwtDecode(token);
		if (decoded.exp > date.getTime() / 1000) {
			return user;
		}
	}

	return null;
};

export const redirectToPage = (role, history) => {
	console.log(role);
	history.push('/settings/roles');
};

export const fullname = user => `${user.first_name} ${user.last_name}`;

export const formatNumber = n =>
	parseFloat(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

export const findByID = (array, id) => {
	console.log(array, id);
	return array.find(item => item.id === id);
};
