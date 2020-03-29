import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	paymentType,
	socket,
	transactionsAPI,
} from '../services/constants';
import { request, formatNumber } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { getAllRequestServices } from '../actions/settings';

const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];

const CreateNewTransaction = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [serviceCenter, setServiceCenter] = useState([]);
	const [patients, setPatients] = useState();
	const [departments, setDepartments] = useState();
	const [multi, setMulti] = useState(false);
	const [services, setServices] = useState([]);
	const [amount, setAmount] = useState(0);

	const onSubmit = async values => {
		console.log(values);
		setSubmitting(true);

		try {
			let data = {
				patient_id: values.patient_id,
				department_id: values.revenue_category.value,
				amount: values.amount,
				serviceType: values.service_request.value,
				description: values.description,
			};

			console.log(data);

			const rs = await request(
				`${API_URI}${transactionsAPI}`,
				'POST',
				true,
				data
			);

			console.log(props.location, history);

			history.push('/billing-paypoint');
			notifySuccess('New payment request saved');
			setSubmitting(false);
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			notifyError(e.message || 'could not save payment request');
		}
	};

	const filterServiceCenter = () => {
		return Array.from(new Set(serviceCenter.map(data => data.group))).map(
			service => {
				return {
					value: service,
					label: service,
				};
			}
		);
	};

	const filterRequest = center => {
		setServices([]);
		setAmount(0);
		let requestType = serviceCenter
			.filter(service => service.group === center)
			.map(data => {
				return {
					value: data.id,
					label: data.name,
					amount: data.amount,
				};
			});
		setServices(requestType);
	};

	const settingAmount = value => {
		setAmount(value);
	};
	async function getPatients() {
		const rs = await request(`${API_URI}/patient/list`, 'GET', true);
		const res = rs.map(patient => ({
			value: patient.id,
			label: patient.surname + ', ' + patient.other_names,
		}));
		setPatients(res);
	}

	async function getDepartments() {
		const rs = await request(`${API_URI}/departments`, 'GET', true);
		const res = rs.map(department => ({
			value: department.id,
			label: department.name,
		}));
		setDepartments(res);
	}

	async function getRequestService() {
		const rs = await request(`${API_URI}/request-types`, 'GET', true);
		setServiceCenter(rs);
	}

	useEffect(() => {
		getRequestService();
	}, []);

	useEffect(() => {
		getPatients();
	}, []);

	useEffect(() => {
		getDepartments();
	}, []);

	return (
		<div className="form-block w-100">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Patient</label>
						<Select
							id="patient"
							placeholder="Select Patient"
							options={patients}
							ref={register({ name: 'patient_id' })}
							onChange={evt => {
								setValue('patient_id', String(evt.value));
							}}
						/>
					</div>

					<div className="form-group col-sm-6">
						<label>
							Revenue Category{' '}
							{multi ? (
								<span className="mx-1 text-danger">* required </span>
							) : (
								''
							)}
						</label>

						<Select
							name="revenue_category"
							placeholder="Select revenue_category"
							options={departments}
							ref={register({ name: 'revenue_category' })}
							defaultValue={{ value: '' }}
							onChange={evt => {
								if (evt === null) {
									setValue('revenue_category', null);
								} else {
									setValue('revenue_category', evt);
								}
							}}
							required
						/>
					</div>
				</div>

				<div className="row">
					<div className="form-group col-sm-6">
						<label>
							Service Center{' '}
							{multi ? (
								<span className="mx-1 text-danger">* required </span>
							) : (
								''
							)}
						</label>

						<Select
							name="service_center"
							placeholder="Select Service Center"
							options={filterServiceCenter()}
							ref={register({ name: 'service_center' })}
							onChange={evt => {
								if (evt === null) {
									setValue('service_center', null);
								} else {
									filterRequest(evt.value);
									setValue('service_center', evt);
								}
							}}
							required
						/>
					</div>

					<div className="form-group col-sm-6">
						<label>
							Service to request{' '}
							{multi ? (
								<span className="mx-1 text-danger">* required </span>
							) : (
								''
							)}
						</label>

						<Select
							name="service_request"
							placeholder="Select service_request"
							options={services}
							ref={register({ name: 'service_request' })}
							onChange={evt => {
								if (evt === null) {
									setValue('service_request', null);
								} else {
									settingAmount(evt.amount);
									setValue('service_request', evt);
								}
							}}
							required
						/>
					</div>
				</div>

				<div className="row">
					<div className="form-group col-sm-6">
						<label>Amount</label>

						<input
							className="form-control"
							required
							placeholder="Amount"
							type="number"
							name="amount"
							value={amount}
							min="0"
							ref={register}
							onChange={evt => {
								if (evt === null) {
									setValue('amount', null);
								} else {
									setAmount(evt);
									setValue('amount', evt);
								}
							}}
						/>
					</div>
					<div className="form-group col-sm-6">
						<label>
							Payment Type{' '}
							{multi ? (
								<span className="mx-1 text-danger">* required </span>
							) : (
								''
							)}
						</label>

						<Select
							name="payment_type"
							placeholder="Select Payment Type"
							options={paymentType}
							ref={register({ name: 'payment_type' })}
							defaultValue={{ value: '' }}
							onChange={evt => {
								if (evt === null) {
									setValue('payment_type', null);
								} else {
									setValue('payment_type', evt);
								}
							}}
							required
						/>
					</div>
				</div>

				<div className="row">
					<div className="form-group col-sm-12">
						<label>Description</label>
						<textarea
							required
							className="form-control"
							name="description"
							rows="3"
							placeholder="Enter description"
							ref={register}></textarea>
					</div>
				</div>

				<div>
					<div className="col-sm-12 text-right">
						<button className="btn btn-primary" disabled={submitting}>
							{submitting ? <img src={waiting} alt="submitting" /> : 'Create'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		requestServices: state.settings.request_services,
	};
};

export default withRouter(
	connect(mapStateToProps, { getAllRequestServices })(CreateNewTransaction)
);
