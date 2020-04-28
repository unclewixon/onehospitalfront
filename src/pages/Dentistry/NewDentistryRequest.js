import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	searchAPI,
	patientAPI,
	serviceAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { request } from '../../services/utilities';
import { add_allergies } from '../../actions/patient';
import { useHistory } from 'react-router-dom';

import {
	get_all_services,
	getAllServiceCategory,
} from '../../actions/settings';

const NewDentistry = props => {
	let history = useHistory();

	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [multi, setMulti] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');
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
			theRequest.patient_id = values.patient_id;
			//theRequest.primary_diagnosis = selectedOption.icd10Code;
			theRequest.requestBody = requestData;
			const rs = await request(
				`${API_URI}${patientAPI}/save-request`,
				'POST',
				true,
				theRequest
			);
			history.push('settings/roles#dentistry');
			notifySuccess('Dentistry request saved');
			setSubmitting(false);
		} catch (e) {
			console.log(e, 'error from the server');
			setSubmitting(false);
			notifyError(e.message || 'could not save dentistry request');
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
				`${API_URI}${serviceAPI}/categories/${id}`,
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
				<h6 className="element-header">New Dentistry Request</h6>
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
								<div className="form-group col-sm-12">
									<label>Request Type</label>

									<input
										className="form-control"
										placeholder="Request Type"
										type="text"
										name="requestType"
										value="Dentistry"
										readOnly
										ref={register({
											required: true,
										})}
									/>
								</div>
							</div>

							<div className="row">
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
										ref={register({
											required: true,
											name: 'service_request',
										})}
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
											'Create Dentistry Request'
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
})(NewDentistry);
