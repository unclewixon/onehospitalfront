/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import { patientAPI, searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';

const NewRadiology = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	// const [loaded, setLoaded] = useState(false);
	// const [loading, setLoading] = useState(false);
	// const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	// const [imagingServices, setImagingServices] = useState([]);
	const [multi, setMulti] = useState(false);
	// const [serviceList, setServiceList] = useState([]);
	// const [multiple, setMultiple] = useState([]);
	const [services, setServices] = useState([]);
	const [query, setQuery] = useState('');
	const [searching, setSearching] = useState(false);
	const [patients, setPatients] = useState([]);

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
		let data = {
			requestType: values.requestType.toLowerCase(),
			patient_id: values.patient_id,
			requestNote: values.request_note,
			requestBody: values.service_request.map(req => {
				return {
					specialization: req.label,
					service_id: req.value,
				};
			}),
		};
		try {
			await request(`${patientAPI}/save-request`, 'POST', true, data);

			history.push('/radiology/all-request');
			notifySuccess('New radiology request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save radiology request');
		}
	};

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
		setValue('patient_id', pat.id);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		setPatients([]);
	};
	const filterRequest = async () => {
		setServices([]);

		let requestType = props.ServicesList.filter(service => {
			return service.category.name === 'Ultrasound';
		}).map(data => {
			return {
				value: data.id,
				label: data.name,
			};
		});

		await setServices(requestType);

		// console.log(serviceList.map(service => service.category.id));
	};

	useEffect(() => {
		if (!dataLoaded) {
			// props
			// 	.getAllService()
			// 	.then(response => {
			// 		setDataLoaded(true);
			// 	})
			// 	.catch(e => {
			// 		setDataLoaded(true);
			// 		notifyError(e.message || 'could not fetch services list');
			// 	});

			// setServiceList(props.ServicesList);
			filterRequest();
			console.log(services);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props, dataLoaded]);

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="element-content">
					<div className="element-box">
						<h6 className="element-header">Create Radiology </h6>

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
											options={services}
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
									<div className="form-group col-sm-6">
										<label>Patient</label>

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
												'Save'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		ServicesList: state.settings.services,
	};
};

export default withRouter(connect(mapStateToProps)(NewRadiology));
