import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	socket,
	patientAPI,
	serviceAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

import { request } from '../../services/utilities';

import {
	get_all_services,
	getAllService,
	getAllServiceCategory,
} from '../../actions/settings';

const ImagingRequest = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [imagingServices, setImagingServices] = useState([]);
	const [multi, setMulti] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);

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

	const onSubmit = async values => {
		console.log(values);
		const { service } = props;
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
			let requestData = [];
			let theRequest = {};
			values.service_request.forEach(value => {
				requestData = [
					...requestData,
					{
						service_id: value.value,
						service_name: value.label,
					},
				];
			});
			theRequest.requestType = values.requestType.toLowerCase();
			//theRequest.bill_now =  'true';
			theRequest.request_note = values.request_note;
			theRequest.patient_id = props.patient.id;
			//theRequest.primary_diagnosis = selectedOption.icd10Code;
			theRequest.requestBody = requestData;
			console.log(theRequest);
			const rs = await request(
				`${API_URI}${patientAPI}/save-request`,
				'POST',
				true,
				theRequest
			);
			history.push('settings/roles#imaging');
			notifySuccess('Imaging request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save Imaging request');
		}
	};

	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	const handleChangeProcedure = evt => {
		setValue('service_request', evt);
	};

	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(
				`${API_URI}${serviceAPI}` + '/categories/' + id,
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
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Imaging Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Request Type</label>

									<input
										className="form-control"
										placeholder="Request Type"
										type="text"
										name="requestType"
										value="Imaging"
										readOnly
										ref={register}
									/>
								</div>

								{/*<div className="form-group col-sm-6">*/}
								{/*	<label>*/}
								{/*		Service to request{' '}*/}
								{/*		{multi ? (*/}
								{/*			<span className="mx-1 text-danger">* required </span>*/}
								{/*		) : (*/}
								{/*			''*/}
								{/*		)}*/}
								{/*	</label>*/}
								{/*	<Select*/}
								{/*		name="service_request"*/}
								{/*		placeholder="Select service to request from"*/}
								{/*		isMulti*/}
								{/*		options={imagingServices}*/}
								{/*		ref={register({ name: 'service_request' })}*/}
								{/*		onChange={evt => {*/}
								{/*			if (evt) {*/}
								{/*				setMulti(false);*/}
								{/*				setValue('service_request', evt);*/}
								{/*			}*/}
								{/*		}}*/}
								{/*		required*/}
								{/*	/>*/}
								{/*</div>*/}
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Center</label>
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
										placeholder="Select service to request from"
										isMulti
										options={services}
										ref={register({ name: 'service_request' })}
										onChange={evt => handleChangeProcedure(evt)}
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
											'Create Imaging Request'
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
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};
export default connect(mapStateToProps, {
	get_all_services,
	getAllServiceCategory,
})(ImagingRequest);
