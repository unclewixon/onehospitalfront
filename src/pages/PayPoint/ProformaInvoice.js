import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import startCase from 'lodash.startcase';
import { useDispatch } from 'react-redux';

import { searchAPI } from '../../services/constants';
import { serviceAPI } from '../../services/constants';
import { request, patientname, formatCurrency } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifyError, notifySuccess } from '../../services/notify';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	patient_id: '',
	category_id: '',
};

const ProformaInvoice = ({ history }) => {
	const { register, handleSubmit, setValue } = useForm({ defaultValues });
	const [submitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [services, setServices] = useState([]);
	const [patient, setPatient] = useState(null);
	const [categories, setCategories] = useState([]);
	const [amount, setAmount] = useState(0);
	const [requests, setRequests] = useState([]);
	const [category, setCategory] = useState('');
	const [service, setService] = useState('');

	const dispatch = useDispatch();

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		try {
			if (values.patient_id === '') {
				notifyError('Select a patient');
				return;
			}

			if (requests.length === 0) {
				notifyError('Select a request');
				return;
			}

			const data = {
				...values,
				items: requests.map(r => ({
					category: r.category.slug,
					code: r.code,
				})),
			};

			dispatch(startBlock());
			const rs = await request('transactions', 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('requests completed');
				history.push('/paypoint/pending-bills');
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError('Error while creating new requests');
		}
	};

	const fetchServicesCategory = useCallback(async () => {
		try {
			const rs = await request('service-categories?paypoint=1', 'GET', true);
			setCategories(rs);
			setLoaded(true);
		} catch (error) {
			console.log(error);
			notifyError('error fetching service categories for the patient');
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchServicesCategory();
		}
	}, [fetchServicesCategory, loaded]);

	const fetchServicesByCategory = async slug => {
		try {
			dispatch(startBlock());
			const uri = `${serviceAPI}/${slug}?hmo_id=${patient.hmo.id}`;
			const rs = await request(uri, 'GET', true);
			setServices(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching services');
		}
	};

	const remove = index => {
		const newItems = requests.filter((item, i) => index !== i);
		setRequests(newItems);
		const total = newItems.reduce(
			(total, item) => total + (item?.serviceCost?.tariff || 0),
			0
		);
		setAmount(total);
	};

	return (
		<div className="element-box m-0 p-3">
			<div className="form-block w-100 p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Patient</label>
							<AsyncSelect
								isClearable
								getOptionValue={option => option.id}
								getOptionLabel={option => patientname(option, true)}
								defaultOptions
								name="patient"
								value={patient}
								ref={register({ name: 'patient_id' })}
								loadOptions={getOptions}
								onChange={e => {
									setPatient(e);
									setValue('patient_id', e?.id);
								}}
								placeholder="Search patients"
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Category</label>
							<Select
								name="category"
								getOptionValue={option => option.id}
								getOptionLabel={option => startCase(option.name)}
								options={categories}
								ref={register({ name: 'category_id' })}
								value={category}
								onChange={e => {
									if (!patient) {
										notifyError('please select patient');
										return;
									}

									setCategory(e);
									setService('');
									if (e === null) {
										setValue('category_id', null);
									} else {
										setValue('category_id', e.id);
										fetchServicesByCategory(e.slug);
									}
								}}
								placeholder="Select category"
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Service to request</label>
							<Select
								name="service_id"
								getOptionValue={option => option.id}
								getOptionLabel={option => startCase(option.name)}
								placeholder="Select services to request"
								options={services}
								value={service}
								onChange={e => {
									const items = [...requests, e];
									setRequests(items);
									console.log(e);
									const total = items.reduce(
										(total, item) => total + item?.serviceCost?.tariff || 0,
										0
									);
									setAmount(total);
									setService(e);
								}}
							/>
						</div>
					</div>
					{requests.length > 0 && (
						<div className="row">
							<div className="element-box p-3 m-0 mt-3 w-100">
								<table className="table table-striped table-condensed">
									<tbody>
										{requests.map((item, i) => {
											return (
												<tr key={i}>
													<td>{startCase(item.category.name)}</td>
													<td>{item.name}</td>
													<td>
														{formatCurrency(item?.serviceCost?.tariff || 0.0)}
													</td>
													<td>
														<div className="display-flex">
															<div className="ml-2">
																<TrashIcon
																	onClick={() => remove(i)}
																	style={{
																		width: '1rem',
																		height: '1rem',
																		cursor: 'pointer',
																	}}
																/>
															</div>
														</div>
													</td>
												</tr>
											);
										})}
										<tr>
											<td colSpan="2" className="text-right">
												<strong>Total</strong>
											</td>
											<td>
												<strong>{formatCurrency(amount)}</strong>
											</td>
											<td></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" disabled={submitting}>
								{submitting ? (
									<img src={waiting} alt="submitting" />
								) : (
									'Create Request'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProformaInvoice;
