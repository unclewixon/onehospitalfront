import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

import { request } from '../../services/utilities';
import { serviceAPI } from '../../services/constants';

import {
	get_all_services,
	getAllRequestServices,
	getAllServiceCategory,
} from '../../actions/settings';

const OpthalmologyRequest = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	// const [Loading, setLoading] = useState(false);
	// const [data, getDataToEdit] = useState(null);
	// const [dataLoaded, setDataLoaded] = useState(false);
	const [opthalServices, setOpthalServices] = useState([]);
	const [multi, setMulti] = useState(false);

	const onSubmit = async values => {
		if (
			values.service_request === undefined ||
			values.service_request.length === 0
		) {
			setMulti(true);
			return;
		}

		// socket.emit('saveAppointment', values);
		setSubmitting(true);
		try {
			let data = {
				requestType: values.requestType.toLowerCase(),
				patient_id: props.patient.id,
				requestNote: values.request_note,
				requestBody: values.service_request.map(req => {
					return {
						specialization: req.label,
						service_id: req.value,
						amount: req.amount,
					};
				}),
				referredBy: values.referredBy,
			};

			await request(`${patientAPI}/save-request`, 'POST', true, data);

			history.push('settings/roles#opthalmology');
			notifySuccess('Opthalmology request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save Opthalmology request');
		}
	};

	const opthalmologyValue = useCallback(() => {
		let opthalValue =
			props &&
			props.services &&
			props.services.map(service => {
				return {
					value: service.id,
					label: service.name,
					amount: service.amount,
				};
			});

		setOpthalServices(opthalValue);
	}, [props]);

	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(`${serviceAPI}/categories/${id}`, 'GET', true);
			props.get_all_services(rs);
		} catch (error) {
			console.log(error);
			notifyError('error fetching imaging requests for the patient');
		}
	};

	const onServiceSelect = e => {
		fetchServicesByCategory(e.value);
	};

	useEffect(() => {
		const { getAllRequestServices, getAllServiceCategory } = props;
		if (!loaded) {
			getAllRequestServices();
			getAllServiceCategory();
			opthalmologyValue();

			setLoaded(true);
		}
	}, [props, loaded, opthalmologyValue]);

	const serviceCats =
		props &&
		props.serviceCategories &&
		props.serviceCategories.map(cats => {
			return {
				label: cats.name,
				value: cats.id,
			};
		});

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Opthalmology Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Request Type</label>

									<input
										className="form-control"
										placeholder="Request Type"
										type="text"
										name="requestType"
										value="Opthalmology"
										readOnly
										ref={register}
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Category</label>
									<Select
										name="service_request"
										placeholder="Select category"
										options={serviceCats}
										ref={register({ name: 'service_category' })}
										onChange={evt => onServiceSelect(evt)}
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
									{}
									<Select
										name="service_request"
										placeholder="Select service to request from"
										isMulti
										options={opthalServices}
										ref={register({ name: 'service_request' })}
										onChange={evt => {
											if (evt) {
												setMulti(false);
												setValue('service_request', evt);
											}
										}}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Request Note</label>
									<textarea
										required
										className="form-control"
										name="request_note"
										rows="3"
										placeholder="Enter request note"
										ref={register}></textarea>
								</div>
							</div>

							<div>
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Opthalmology Request'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		services: state.settings.services,
		requestServices: state.settings.request_services,
		serviceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps, {
	get_all_services,
	getAllRequestServices,
	getAllServiceCategory,
})(OpthalmologyRequest);
