import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	diagnosisAPI,
	patientAPI,
	serviceAPI,
	searchAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import searchingGIF from '../../assets/images/searching.gif';

import {
	get_all_diagnosis,
	get_all_services,
	getAllServiceCategory,
} from '../../actions/settings';
import { SubmissionError } from 'redux-form';
import { compose } from 'redux';

const NewProcedure = props => {
	const { register, handleSubmit, setValue, triggerValidation } = useForm({
		mode: 'onBlur',
	});
	const [submitting, setSubmitting] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [searching, setSearching] = useState(false);
	const [patients, setPatients] = useState([]);
	const [query, setQuery] = useState('');

	const handlePatientChange = e => {
		setQuery(e.target.value);
		searchPatient();
	};

	const searchPatient = async () => {
		if (query.length > 2) {
			try {
				setSearching(true);
				const rs = await request(
					`${API_URI}${searchAPI}?q=${query}`,
					'GET',
					true
				);

				setPatients(rs);
				setSearching(false);
			} catch (e) {
				notifyError('Error Occurred');
				setSearching(false);
			}
		}
	};

	const patientSet = pat => {
		setValue('patient_id', pat.id);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		setPatients([]);
	};

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

	const getOptionValues = option => option.id;

	const getOptionLabels = option => option.description;

	const handleChangeOptions = selectedOption => {
		setSelectedOption(selectedOption);
	};
	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase()
		const res = await request(
			`${API_URI}${diagnosisAPI}${val}`,
			'GET',
			true
		);
		return res;
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

	const onSubmit = async values => {
		setSubmitting(true);
		let requestData = [];
		let theRequest = {};
		if (values.procedure) {
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
			theRequest.patient_id = values.patient_id;
			theRequest.primary_diagnosis = selectedOption.icd10Code;
			theRequest.requestBody = requestData;
			try {
				const rs = await request(
					`${API_URI}${patientAPI}/save-request`,
					'POST',
					true,
					theRequest
				);
				setSubmitting(false);
				notifySuccess('Procedure Request Saved');
				props.history.push('/settings/roles#procedure');
				// return  <Redirect  to="/settings/roles#procedure" />
			} catch (e) {
				setSubmitting(false);
				throw new SubmissionError({
					_error: e.message || 'could not save Procedure Request',
				});
			}
			return;
		} else {
			setSubmitting(false);
			notifyError('Procedure Required');
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
										<div className="form-group col-sm-12">
											<label>Patient Id</label>

											<input
												className="form-control"
												placeholder="Search for patient"
												type="text"
												name="patient_id"
												defaultValue=""
												id="patient"
												ref={register({ name: 'patient_id' })}
												onChange={handlePatientChange}
												autoComplete="off"
												required
											/>
											{searching && (
												<div className="searching text-center">
													<img alt="searching" src={searchingGIF} />
												</div>
											)}

											{patients &&
												patients.map(pat => {
													return (
														<div
															style={{ display: 'flex' }}
															key={pat.id}
															className="element-box">
															<a
																onClick={() => patientSet(pat)}
																className="ssg-item cursor">
																{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
																<div
																	className="item-name"
																	dangerouslySetInnerHTML={{
																		__html: `${pat.surname} ${pat.other_names}`,
																	}}
																/>
															</a>
														</div>
													);
												})}
										</div>
										<div className="form-group col-sm-6">
											<label>Service Center</label>
											<Select
												name="service_center"
												placeholder="Select Service Center"
												options={servicesCategory}
												ref={register({
													required: true,
													name: 'service_center',
												})}
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
												ref={register({
													required: true,
													name: 'procedure',
												})}
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
											<button
												className="btn btn-primary"
												disabled={submitting}
												onClick={() => {
													triggerValidation('procedure');
												}}>
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

export default compose(
	withRouter,
	connect(mapStateToProps, {
		get_all_services,
		get_all_diagnosis,
		getAllServiceCategory,
	})
)(NewProcedure);
