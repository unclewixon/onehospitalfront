import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { API_URI, socket, patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

import { request } from '../../services/utilities';

import { getAllService } from '../../actions/settings';

const ImagingRequest = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [imagingServices, setImagingServices] = useState([]);
	const [multi, setMulti] = useState(false);
	const [services, setServices] = useState([]);

	const onSubmit = async values => {
		console.log(values);

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
					};
				}),
			};

			console.log(data);

			const rs = await request(
				`${API_URI}${patientAPI}/save-request`,
				'POST',
				true,
				data
			);

			history.push('settings/roles#imaging');
			notifySuccess('Imaging request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save Imaging request');
		}
	};

	const imagingValue = () => {
		let imagingServices = props.requestServices
			.filter(service => service.category.name === 'Ultrasound')
			.map(service => {
				return {
					value: service.id,
					label: service.name,
				};
			});
		console.log(imagingServices);
		setImagingServices(imagingServices);
	};

	useEffect(() => {
		if (!loaded && props.requestServices.length === 0) {
			props
				.getAllService()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch request services');
				});
		}
		setLoaded(true);
		imagingValue();
	}, [props, loaded]);

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
										options={imagingServices}
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
		requestServices: state.settings.services,
	};
};
export default connect(mapStateToProps, { getAllService })(ImagingRequest);
