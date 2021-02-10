import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import { diagnosisAPI, patientAPI, serviceAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';

const ProcedureRequest = props => {
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

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
			notifyError('error fetching procedure requests for the patient');
		}
	};
	useEffect(() => {
		if (!loaded) {
			fetchServicesCategory();
			let services = [];

			props.service &&
				props.service.forEach((item, index) => {
					const res = { label: item.name, value: item.id };
					services = [...services, res];
				});
			setServices(services);
			setLoaded(true);
		}
	}, [props, loaded]);

	const getOptionValues = option => option.id;

	const getOptionLabels = option => option.description;

	const handleChangeOptions = selectedOption => {
		setSelectedOption(selectedOption);
	};
	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(`${diagnosisAPI}/search?q=${val}`, 'GET', true);
		return res;
	};

	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(`${serviceAPI}/categories/${id}`, 'GET', true);
			let services = [];
			rs &&
				rs.forEach((item, index) => {
					const res = { label: item.name, value: item.id };
					services = [...services, res];
				});
			setServices(services);
		} catch (error) {
			console.log(error);
			notifyError('error fetching procedure requests for the patient');
		}
	};

	const onSubmit = async values => {
		setSubmitting(true);
		if (!values.service_center || !values.procedure) {
			notifyError('Service center and Procedure are required');
			setSubmitting(false);
			return;
		}
		let requestData = [];
		let theRequest = {};
		values.procedure.forEach(value => {
			requestData = [
				...requestData,
				{
					service_id: value.value,
					service_name: value.label,
				},
			];
		});
		theRequest.requestType = 'procedure';
		theRequest.bill_now = values.bill === 'on' ? 'true' : 'false';
		theRequest.request_note = values.request_note;
		theRequest.patient_id = props.patient.id;
		theRequest.primary_diagnosis = selectedOption.icd10Code;
		theRequest.requestBody = requestData;

		try {
			await request(`${patientAPI}/save-request`, 'POST', true, theRequest);

			setSubmitting(false);
			notifySuccess('Procedure Request Saved');
			props.history.push('/settings/roles#procedure');
			// return  <Redirect  to="/settings/roles#procedure" />
		} catch (e) {
			setSubmitting(false);
			const message = e.message || 'could not save Procedure Request';
			notifyError(message);
		}
	};

	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	const handleChangeProcedure = evt => {
		setValue('procedure', evt);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Procedure Request</h6>
				{!loaded ? (
					<div className="text-center">
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
						<div className="element-box">
							<div className="form-block w-100">
								<form onSubmit={handleSubmit(onSubmit)}>
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
											<label>Procedure</label>
											<Select
												name="procedure"
												placeholder="Select procedure"
												isMulti
												options={services}
												ref={register({ name: 'procedure' })}
												onChange={evt => handleChangeProcedure(evt)}
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="form-group col-sm-12">
											<label>Primary Diagnosis</label>
											<AsyncSelect
												required
												cacheOptions
												value={selectedOption}
												getOptionValue={getOptionValues}
												getOptionLabel={getOptionLabels}
												defaultOptions
												loadOptions={getOptions}
												onChange={handleChangeOptions}
												placeholder="primary diagnosis"
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

									<div className="row">
										<div className="form-group col-sm-3">
											<div className="d-flex">
												<input
													className="form-control"
													placeholder="Bill number"
													type="radio"
													name="bill"
													ref={register}
												/>
												<label className="mx-1">Bill now</label>
											</div>
										</div>
										<div className="form-group col-sm-3">
											<div className="d-flex">
												<input
													className="form-control"
													placeholder="bill later"
													type="radio"
													name="bill"
													ref={register}
												/>
												<label className="mx-1">Bill later </label>
											</div>
										</div>
									</div>

									<div>
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary" disabled={submitting}>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Create Procedure Request'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};

export default compose(withRouter, connect(mapStateToProps))(ProcedureRequest);
