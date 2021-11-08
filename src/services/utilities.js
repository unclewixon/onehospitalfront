/* eslint-disable no-sparse-arrays */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import numeral from 'numeral';
import uppercase from 'lodash.uppercase';
import startCase from 'lodash.startcase';
import padLeft from 'pad-left';
import { confirmAlert } from 'react-confirm-alert';
import JwtDecode from 'jwt-decode';
import Multiselect from 'react-widgets/lib/Multiselect';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import truncate from 'lodash.truncate';

import SSRStorage from './storage';
import { API_URI, patientAPI, TOKEN_COOKIE } from './constants';
import axios from 'axios';

import placeholder from '../assets/images/placeholder.jpg';

//const store = configureStore();
export const formatCurrency = amount =>
	`₦${numeral(Math.abs(parseFloat(amount))).format('0,0.00')}`;

export const isUnset = o => typeof o === 'undefined' || o === null;

export const isSet = o => !isUnset(o);

export function encodeValue(val) {
	if (typeof val === 'string') {
		return val;
	}

	return JSON.stringify(val);
}

export async function getData2(patient, title) {
	const res = await request(`${patientAPI}/${patient.id}/vitals`, 'GET', true);
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
			window.location.reload(true);
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

export const defaultUploadHeaders = {
	Accept: 'application/json',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
	//'Content-Type': 'application/x-www-form-urlencoded',
	'Content-Type': 'multipart/form-data',
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
		// console.log('f');
		// prettier-ignore
		const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
		axios.defaults.headers.common['Authorization'] = user.token;
	}
	const result = await axios.patch(url, data);
	return parseJSON(result);
};

export const request = async (url, method, authed = false, data) => {
	// prettier-ignore
	const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	// console.log(user);
	const response = await fetch(`${API_URI}/${url}`, {
		method: method,
		headers: authed ? headers(user) : { ...defaultHeaders },
		body: JSON.stringify(data),
	});
	const result = await checkStatus(response);
	return parseJSON(result);
};

export const upload = async (url, method, body) => {
	// prettier-ignore
	const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	const jwt = `Bearer ${user.token}`;
	let headers = { Authorization: jwt };
	const response = await fetch(url, { method, headers, body });
	const result = await checkStatus(response);
	return parseJSON(result);
};

export const uploadFile = async (url, body) => {
	// prettier-ignore
	const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
	const jwt = `Bearer ${user.token}`;
	let headers = { Authorization: jwt };
	const response = axios.post(`${API_URI}/${url}`, body, { headers });
	// const response = await fetch(url, { method, headers, body });
	return response;
};

export const updateImmutable = (list, payload) => {
	const data = list.find(d => d.id === payload.id);
	if (data) {
		const index = list.findIndex(d => d.id === payload.id);

		return [
			...list.slice(0, index),
			{ ...data, ...payload },
			...list.slice(index + 1),
		];
	}

	return list;
};

export const getPageList = (array, page_size, page_number) => {
	return array.slice((page_number - 1) * page_size, page_number * page_size);
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

export const formatPatientId = data => {
	let formattedId = String(data.id);
	let len = 7 - formattedId.length;
	while (len >= 0) {
		formattedId = '0' + formattedId;
		len--;
	}
	return formattedId;
};

export const renderMultiselect = ({
	input,
	data,
	valueField,
	textField,
	placeholder,
	label,
	meta: { touched, error },
}) => (
	<div>
		<Multiselect
			{...input}
			onBlur={() => input.onBlur()}
			value={input.value || []} // requires value to be an array
			data={data}
			valueField={valueField}
			textField={textField}
			label={label}
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
					<p>{alertText ? alertText : 'You want to delete this'}</p>
					<div>
						<button
							className="btn btn-danger"
							style={{ margin: '10px' }}
							onClick={onClose}>
							No
						</button>
						<button
							className="btn btn-primary"
							style={{ margin: '10px' }}
							onClick={onclick}>
							Yes
						</button>
					</div>
				</div>
			);
		},
	});
};

export const renderSelectWithDefault = ({
	input,
	label,
	placeholder,
	id,
	defaultVal,
	data,

	meta: { touched, error },
}) => {
	return (
		<div
			className={`form-group ${touched &&
				(error ? 'has-error has-danger' : '')}`}>
			<label htmlFor={id}>{label}</label>
			<select {...input} className="form-control">
				<option value="">{placeholder}</option>
				{data.map((d, i) => {
					let def = d.id === defaultVal;
					return (
						<option key={i} value={d.id} defaultChecked={def}>
							{d.name}
						</option>
					);
				})}
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
	let uri = '';
	try {
		switch (role.slug) {
			case 'front-desk':
				uri = '/front-desk';
				break;
			case 'hr-manager':
				uri = '/hr/staffs';
				break;
			case 'inventory':
				uri = '/inventory/categories';
				break;
			case 'cafeteria':
				uri = '/cafeteria';
				break;
			case 'it-admin':
				uri = '/settings';
				break;
			case 'hmo-officer':
				uri = '/hmo/dashboard';
				break;
			case 'paypoint':
				uri = '/paypoint';
				break;
			case 'laboratory':
				uri = '/lab';
				break;
			case 'radiology':
				uri = '/radiology';
				break;
			case 'nurse':
				uri = '/nurse';
				break;
			case 'doctor':
				uri = '/doctor';
				break;
			case 'pharmacy':
				uri = '/pharmacy';
				break;
			case 'ivf':
				uri = '/ivf';
				break;
			case 'records':
				uri = '/records';
				break;
			case 'accounts':
				uri = '/accounting';
				break;
			case 'store':
				uri = '/store';
				break;
			default:
				uri = '/front-desk';
				break;
		}
	} catch (e) {
		uri = '/front-desk';
	}

	if (uri !== '') {
		history.push(uri);
	} else {
		history.push('/?not-authenticated');
	}
};

export const staffname = user =>
	user ? `${startCase(user?.first_name)} ${startCase(user?.last_name)}` : '-';

export const patientname = (user, pid = false) =>
	user
		? `${user.other_names} ${user.surname} ${
				pid ? `(${formatPatientId(user)})` : ''
		  }`
		: '--';

export const formatNumber = n =>
	parseFloat(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

export const formatDate = (date, format = 'YYYY-MM-DD') =>
	date ? moment(date).format(format) : '--';

export const trimText = (str, length = 50, omission = '...') =>
	truncate(str, { length, omission });

export const getPeriod = () => {
	const qtr = moment().format('Qo');
	const start = moment()
		.startOf('quarter')
		.format('MMM');
	const end = moment()
		.endOf('quarter')
		.format('MMM');

	return `${qtr} Quarter [${start} - ${end}]`;
};

export const errorMessage = error => {
	return (
		error && (
			<div
				className="alert alert-danger"
				dangerouslySetInnerHTML={{
					__html: `<strong>Error!</strong> ${error}`,
				}}
			/>
		)
	);
};

export const findByID = (array, id) => {
	return array.find(item => item.id === id);
};

export const getAge = dob => {
	if (!dob) return 0;

	const date = moment(new Date(dob));

	const years = moment().diff(date, 'years', false);
	const days = moment().diff(date.add(years, 'years'), 'days', false);

	if (years === 0) {
		return `${days} days`;
	}

	// const months = moment().diff(date.add(years, 'years'), 'months', false);
	return `${years}years`; // ${months}months
};

export const groupBy = function(xs, key) {
	return xs.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

export const checkVaccine = data => {
	if (!data.date_administered) {
		if (moment().isSame(data.date_due, 'day')) {
			return 'yellow';
		} else if (moment().isAfter(data.date_due)) {
			return 'red';
		} else if (moment().isBefore(data.date_due)) {
			return 'grey';
		}
	}
	return 'green';
};

export const vaccineNotDue = data => {
	return (
		!data.appointment_date &&
		!data.date_administered &&
		moment().isBefore(data.date_due)
	);
};

export const vaccineMissed = data => {
	return (
		!data.appointment_date &&
		!data.date_administered &&
		!moment().isSame(data.date_due, 'day') &&
		moment().isAfter(data.date_due)
	);
};

export const hasExpired = date => {
	if (date) {
		return moment().isAfter(moment(date, 'YYYY-MM-DD'));
	}

	return false;
};

export const hasPassed = date => {
	if (date) {
		return moment(date, 'YYYY-MM-DD HH:mm:ss').isBefore(
			moment().startOf('day')
		);
	}

	return false;
};

export const itemRender = (current, type, originalElement) => {
	if (type === 'prev') {
		return <a>Previous</a>;
	}
	if (type === 'next') {
		return <a>Next</a>;
	}
	return originalElement;
};

export const nth = n => {
	const _nth = [, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th';
	return `${n}${_nth} Floor`;
};

export const parseAvatar = avatar => {
	return avatar
		? `${process.env.REACT_APP_API}/uploads/avatars/${avatar}`
		: placeholder;
};

export const parseNote = note => {
	if (note.type === 'diagnosis') {
		return `${note.diagnosis.description} - ${note.diagnosis.type}`;
	}

	if (note.type === 'allergy') {
		return `${note.allergy} [${note.category}] - ${note.reaction} (${note.severity})`;
	}

	if (note.type === 'patient-history') {
		const title = startCase(note.category);
		const keys = Object.keys(note.history);
		const values = Object.values(note.history).map(
			(name, i) => `${startCase(keys[i])}: ${name}`
		);

		return `</br><span class="text-underline">${title.replaceAll(
			'history',
			''
		)}</span></br>${values.join('</br>')}`;
	}

	return note.description;
};

export const parseSource = source => (source === 'ward' ? 'Room' : source);

export const getGestationAge = date => {
	const weeks = moment().diff(moment(date), 'weeks');
	const days = moment().diff(moment(date).add(weeks, 'w'), 'days');
	const display = `${days}day${days > 1 ? 's' : ''}`;
	return `${weeks}week${weeks > 1 ? 's' : ''} ${days > 0 ? display : ''}`;
};
