import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	socket,
	transactionsAPI,
	paymentType,
	paymentTypeExtra,
	serviceAPI,
} from '../services/constants';
import { request, formatNumber } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import {
	get_all_services,
	getAllRequestServices,
	getAllService,
	getAllServiceCategory,
} from '../actions/settings';

const CreateNewTransaction = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue, setError, errors } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [serviceCenter, setServiceCenter] = useState([]);
	const [patients, setPatients] = useState();
	const [departments, setDepartments] = useState();
	const [multi, setMulti] = useState(false);
	const [serviceList, setServiceList] = useState([]);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [amount, setAmount] = useState(0);
	const [multiple, setMultiple] = useState([]);

	const onSubmit = async values => {
		setSubmitting(true);
		let data = {
			patient_id: values.patient_id,
			department_id: values.revenue_category,
			amount: values.amount,
			serviceType: values.service_request.map(req => req.value),
			description: values.description,
			payment_type: values.payment_type,
		};
		try {
			const rs = await request(`${transactionsAPI}`, 'POST', true, data);
			history.push('/paypoint');
			notifySuccess('New payment request saved');
			setSubmitting(false);
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			notifyError(e.message || 'could not save payment request');
		}
	};

	async function getPatients() {
		const rs = await request(`patient/list`, 'GET', true);
		const res = rs.map(patient => ({
			value: patient.id,
			label: patient.surname + ', ' + patient.other_names,
		}));
		setPatients(res);
	}

	async function getDepartments() {
		const rs = await request(`departments`, 'GET', true);
		const res = rs.map(department => ({
			value: department.id,
			label: department.name,
		}));
		setDepartments(res);
	}

	useEffect(() => {
		getPatients();
	}, []);

	useEffect(() => {
		getDepartments();
	}, []);

	useEffect(() => {
		if (!loaded) {
			props
				.getAllServiceCategory()
				.then(response => {})
				.catch(e => {
					notifyError(e.message || 'could not fetch service categories');
				});
		}
		let data = [];
		let services = [];
		props.ServiceCategories.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			data = [...data, res];
		});
		props.service.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			services = [...services, res];
		});
		setServicesCategory(data);
		setServices(services);
		setLoaded(true);
	}, [props, loaded]);

	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	const handleChangeProcedure = evt => {
		const { service } = props;

		let sum = 0;
		evt.forEach(val => {
			let result = service.find(p => p.id === val.value);
			sum += parseInt(result.tariff);
		});
		setAmount(sum);
		setValue('service_request', evt);
	};

	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(
				`${serviceAPI}` + '/categories/' + id,
				'GET',
				true
			);
			props.get_all_services(rs);
		} catch (error) {
			console.log(error);
			notifyError('error fetching imaging requests for the patient');
		}
	};

	return (
		<div className="form-block w-100 p-4">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>
							Patient{' '}
							<div className="text-danger">
								{errors.patient_id && errors.patient_id.message}
							</div>
						</label>
						<Select
							id="patient"
							placeholder="Select Patient"
							options={patients}
							rules={{ required: 'Please select an option' }}
							ref={register({ name: 'patient_id' })}
							onChange={evt => {
								setValue('patient_id', String(evt.value));
							}}
						/>
					</div>

					<div className="form-group col-sm-6">
						<label>
							Revenue Category{' '}
							<div className="text-danger">
								{errors.revenue_category && errors.revenue_category.message}
							</div>
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
									setValue('revenue_category', evt.value);
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
							options={servicesCategory}
							ref={register({ name: 'service_center' })}
							onChange={evt => handleChangeServiceCategory(evt)}
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
							placeholder="Select services to request"
							isMulti
							options={services}
							ref={register({ name: 'service_request' })}
							onChange={evt => handleChangeProcedure(evt)}
							required
						/>
					</div>
				</div>

				{/*<div className="row">*/}
				{/*	<div className="form-group col-sm-6">*/}
				{/*		<label>*/}
				{/*			Service Center{' '}*/}
				{/*			{multi ? (*/}
				{/*				<span className="mx-1 text-danger">* required </span>*/}
				{/*			) : (*/}
				{/*				''*/}
				{/*			)}*/}
				{/*		</label>*/}

				{/*		<Select*/}
				{/*			name="service_center"*/}
				{/*			placeholder="Select Service Center"*/}
				{/*			options={filterServiceCenter()}*/}
				{/*			ref={register({ name: 'service_center' })}*/}
				{/*			onChange={evt => {*/}
				{/*				if (evt === null) {*/}
				{/*					setValue('service_center', null);*/}
				{/*				} else {*/}
				{/*					console.log(evt.value);*/}
				{/*					filterRequest(evt.value);*/}
				{/*					setValue('service_center', evt.value);*/}
				{/*				}*/}
				{/*			}}*/}
				{/*			required*/}
				{/*		/>*/}
				{/*	</div>*/}

				{/*	<div className="form-group col-sm-6">*/}
				{/*		<label>*/}
				{/*			Service to request{' '}*/}
				{/*			{multi ? (*/}
				{/*				<span className="mx-1 text-danger">* required </span>*/}
				{/*			) : (*/}
				{/*				''*/}
				{/*			)}*/}
				{/*		</label>*/}

				{/*		<Select*/}
				{/*			name="service_request"*/}
				{/*			placeholder="Select services to request"*/}
				{/*			value={multiple}*/}
				{/*			isMulti*/}
				{/*			options={services}*/}
				{/*			ref={register({ name: 'service_request' })}*/}
				{/*			onChange={evt => changeMulti(evt)}*/}
				{/*			required*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

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
									setValue('amount', evt.value);
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
							options={paymentTypeExtra}
							ref={register({ name: 'payment_type' })}
							onChange={evt => {
								if (evt === null) {
									setValue('payment_type', null);
								} else {
									setValue('payment_type', evt.value);
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
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		getAllRequestServices,
		get_all_services,
		getAllServiceCategory,
	})(CreateNewTransaction)
);
