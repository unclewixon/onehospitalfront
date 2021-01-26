import React, { useRef, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../services/constants';
import { getAllHmos } from '../actions/hmo';

import {
	transactionsAPI,
	paymentTypeExtra,
	serviceAPI,
} from '../services/constants';
import { request } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { getAllRequestServices } from '../actions/settings';

const CreateNewTransaction = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue, errors } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [patients, setPatients] = useState();
	const [departments, setDepartments] = useState();
	const multi = false;
	const [hmo, setHmo] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [amount, setAmount] = useState(0);

	const didMountRef = useRef(false);

	let hmoList = useSelector(state => state.hmo.hmo_list);
	let hmos = hmoList.map(hmo => {
		return {
			value: hmo.id,
			label: hmo.name,
		};
	});

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		setSubmitting(true);
		let data = {
			patient_id: values.patient_id,
			hmo_id: hmo,
			department_id: values.revenue_category,
			amount: values.amount,
			serviceType: values.service_request?.map(req => req.value),
			description: values.description,
			payment_type: values.payment_type,
		};

		console.log('onSubmit(): ');
		console.log(data);

		try {
			await request(`${transactionsAPI}`, 'POST', true, data);
			history.push('/paypoint');
			notifySuccess('New payment request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save payment request');
		}
	};

	async function getDepartments() {
		const rs = await request(`departments`, 'GET', true);
		const res = rs.map(department => ({
			value: department.id,
			label: department.name,
		}));

		setDepartments(res);
	}

	useEffect(() => {
		props.getAllHmos();
	}, []);

	useEffect(() => {
		props.getAllHmos();

		if (didMountRef.current) {
			hmos = hmoList.map(hmo => {
				return {
					value: hmo.id,
					label: hmo.name,
				};
			});
		} else didMountRef.current = true;
	}, [hmoList]);

	useEffect(() => {
		getDepartments();
	}, []);

	useEffect(() => {
		if (!loaded) {
			// props
			// 	.getAllServiceCategory()
			// 	.then(response => {})
			// 	.catch(e => {
			// 		notifyError(e.message || 'could not fetch service categories');
			// 	});

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
		}
	}, [props, loaded]);

	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	const handleChangeHmo = evt => {
		let value = String(evt.value);
		setHmo(value);
		setValue('hmo_id', value);
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
			const rs = await request(`${serviceAPI}/categories/${id}`, 'GET', true);
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

						<AsyncSelect
							isClearable
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							name="patient"
							ref={register({ name: 'patient_id' })}
							loadOptions={getOptions}
							onChange={e => {
								setValue('patient_id', e.id);
							}}
							placeholder="Search patients"
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
						<label>Amount</label>

						<input
							className="form-control"
							required
							placeholder="Amount"
							type="number"
							name="amount"
							min="0"
							value={amount}
							ref={register}
							onChange={evt => {
								if (evt === null) {
									setValue('amount', null);
								} else {
									setAmount(evt.target.value);
									setValue('amount', evt.target.value);
								}
							}}
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
					<div className="form-group col-sm-6">
						<label>select HMO (If applicable)</label>
						<Select
							name="hmo_id:"
							placeholder="Select HMO"
							options={hmos}
							ref={register({ name: 'hmo_id:' })}
							onChange={evt => handleChangeHmo(evt)}
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
		getAllHmos,
	})(CreateNewTransaction)
);
