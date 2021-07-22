/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI } from '../services/constants';
import ModalProformaInvoice from './Modals/ModalProformaInvoice';
import { serviceAPI } from '../services/constants';
import { request, patientname } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifyError } from '../services/notify';
import { get_all_request_services } from '../actions/settings';

const ProformaInvoice = props => {
	const { register, handleSubmit, setValue, errors } = useForm();
	const [submitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const multi = false;
	const [hmo, setHmo] = useState('');
	const [des, setDes] = useState('');
	const [hmoObject, setHmoObject] = useState(null);
	const [services, setServices] = useState([]);
	const [servs, setServs] = useState([]);
	const [patient, setPatient] = useState(null);
	const [servicesObjects, setServicesObjects] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [amount, setAmount] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [details, setDetails] = useState([]);

	const user = useSelector(state => state.user.profile);

	const hmoList = [];
	const hmos = hmoList.map(hmo => {
		return {
			value: hmo.id,
			label: hmo.name,
		};
	});

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		setDes(values.description);
		document.body.classList.add('modal-open');
		setShowModal(true);
		setDetails(servs);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setDetails([]);
		setDes('');
		setHmoObject(null);
		setServices([]);
		setServs([]);
		setPatient(null);
		setServicesObjects([]);
		setServicesCategory([]);
		setAmount(0);
	};

	const fetchServicesCategory = async () => {
		try {
			const rs = await request(`${serviceAPI}/categories`, 'GET', true);
			let data = [];
			rs.forEach((item, index) => {
				const res = { label: item.name, value: item.id };
				data = [...data, res];
			});
			setServicesCategory(data);
			setLoaded(true);
		} catch (error) {
			console.log(error);
			notifyError('error fetching service categories for the patient');
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchServicesCategory();
		}
	}, [props, loaded]);

	const handleChangeServiceCategory = evt => {
		if (hmo === '') {
			notifyError('please select Hmo');
			setValue('revenue_category', null);
		} else {
			let value = String(evt.value);
			fetchServicesByCategory(value);
			setValue('service_center', value);
			setValue('revenue_category', value);
		}
	};

	const handleChangeHmo = evt => {
		let value = String(evt.value);
		const hmo = hmoList.find(hmo => hmo.id === parseInt(value));
		setHmoObject(hmo);
		setHmo(value);
		setValue('hmo_id', value);
	};

	const handleChangeProcedure = async evt => {
		let sum = amount;
		let servArr = servs;

		evt &&
			(await evt.forEach(val => {
				console.log(evt);
				let p = servicesObjects.find(p => p.id === val.value);
				if (p) {
					sum += parseInt(p.tariff);
					servArr.push({ id: p.id, amount: p.tariff, name: p.name });
				}
			}));
		evt && setAmount(sum);
		evt && setValue('payment_method', sum);
		evt && setServs(servArr);
	};

	const fetchServicesByCategory = async id => {
		if (hmo === '') {
			notifyError('please select Hmo');
		} else {
			try {
				console.log('before syaty');
				const rs = await request(
					`${serviceAPI}/category/${id}?hmo_id=${hmo}`,
					'GET',
					true
				);
				console.log(rs);
				setServicesObjects(rs);
				let services = [];
				rs &&
					rs.forEach((item, index) => {
						const res = { label: item.name, value: item.id };
						services = [...services, res];
					});
				setServices(services);
			} catch (error) {
				console.log(error);
				notifyError('error fetching services');
			}
		}
	};

	return (
		<>
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
									setPatient(e);
									setValue('patient_id', e?.id);
								}}
								placeholder="Search patients"
							/>
						</div>

						<div className="form-group col-sm-6">
							<label>select HMO </label>
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
								options={servicesCategory}
								ref={register({ name: 'revenue_category' })}
								defaultValue={{ value: '' }}
								onChange={evt => {
									if (evt === null) {
										setValue('revenue_category', null);
									} else {
										handleChangeServiceCategory(evt);
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
								placeholder="Select services to request"
								isMulti
								options={services}
								ref={register({ name: 'service_request' })}
								onChange={evt => handleChangeProcedure(evt)}
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
								disabled={true}
								value={amount}
								ref={register}
								onChange={evt => {
									setAmount(evt.target.value);
									setValue('amount', evt.target.value);
								}}
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
								ref={register}
								onChange={evt => {
									setValue('description', evt.target.value);
								}}></textarea>
						</div>
					</div>

					<div>
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" disabled={submitting}>
								{submitting ? (
									<img src={waiting} alt="submitting" />
								) : (
									'Preview'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
			{showModal && (
				<ModalProformaInvoice
					details={details}
					showModal={showModal}
					total={amount}
					hmo={hmoObject}
					patient={patient}
					user={user}
					description={des}
					closeModal={() => closeModal()}
				/>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		requestServices: state.settings.request_services,
		ServiceCategories: state.settings.service_categories,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		get_all_request_services,
	})(ProformaInvoice)
);
