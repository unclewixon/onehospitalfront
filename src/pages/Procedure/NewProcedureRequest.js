/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { compose } from 'redux';

import {
	diagnosisAPI,
	patientAPI,
	serviceAPI,
	searchAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, requestNonJson } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';

const NewProcedure = props => {
	const { register, handleSubmit, setValue, triggerValidation } = useForm({
		mode: 'onBlur',
	});
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [searching, setSearching] = useState(false);
	const [diagnosisType, setDiagnosisType] = useState('icd10');
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
				const rs = await request(`${searchAPI}?q=${query}`, 'GET', true);

				setPatients(rs);
				setSearching(false);
			} catch (e) {
				notifyError('Error Occurred');
				setSearching(false);
			}
		}
	};

	const patientSet = pat => {
		setValue('patient', pat.id);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		setPatients([]);
	};

	useEffect(() => {
		if (!loaded) {
			filterRequest();
			setLoaded(true);
		}
	}, [props, loaded]);

	const getOptionValues = option => option.id;

	const getOptionLabels = option => option.description;

	const handleChangeOptions = selectedOption => {
		setSelectedOption(selectedOption);
	};
	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=${diagnosisType}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	// for patient name search
	const getOptionName = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	// for patirnt name search
	const getOptionNameValues = option => option.id;
	const getOptionNameLabels = option =>
		`${option.other_names} ${option.surname}`;

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
			theRequest.patient_id = values.patient;
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

	const filterRequest = async () => {
		setServices([]);

		// dispatch(startBlock());
		//
		try {
			setSearching(true);
			const res = await request(
				'services/categories/General&nbsp;surgery',
				'GET',
				true
			);

			// const serviceRes = await request(
			// 	`services/category/${res.id}`,
			// 	'GET',
			// 	true
			// );

			// let requestType = serviceRes.map(data => {
			// 	return {
			// 		value: data.id,
			// 		label: data.name,
			// 	};
			// });

			// setServices(requestType);
			console.log('requestType', res);
		} catch (e) {
			notifyError(e.message || 'Error fetching service category');
			console.log('requestTypes', e);
			setSearching(false);
		}
	};

	const handleChangeProcedure = evt => {
		setValue('procedure', evt);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
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
											<label>Patient Name</label>
											<AsyncSelect
												isClearable
												getOptionValue={getOptionNameValues}
												getOptionLabel={getOptionNameLabels}
												defaultOptions
												name="patient"
												ref={register({ name: 'patient', required: true })}
												loadOptions={getOptionName}
												onChange={e => {
													setValue('patient', e);
												}}
												placeholder="Search patient"
											/>

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
											<div className="posit-top">
												<div className="row">
													<div className="form-group col-sm-12">
														<label>
															<input
																type="radio"
																checked={diagnosisType === 'icd10'}
																onChange={() => setDiagnosisType('icd10')}
															/>{' '}
															ICD10
														</label>
														<label className="ml-2">
															<input
																type="radio"
																checked={diagnosisType === 'icpc2'}
																onChange={() => setDiagnosisType('icpc2')}
															/>{' '}
															ICPC-2
														</label>
													</div>
												</div>
											</div>
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
	};
};

export default compose(withRouter, connect(mapStateToProps))(NewProcedure);
