import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	socket,
	patientAPI,
	searchAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
const labCategories = [
	{ value: 'cancer', label: 'cancer' },
	{ value: 'x-ray', label: 'x-ray' },
	{ value: 'blood', label: 'blood' },
];
const serviceCenter = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
const LabRequest = () => {
	// const page = location.pathname.split('/').pop();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [query, setQuery] = useState('');
	const [searching, setSearching] = useState(false);
	const [patients, setPatients] = useState([]);

	const onSubmit = async values => {
		console.log(values);
		setSubmitting(true);
		// socket.emit('saveAppointment', values);
	};

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

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Lab Request</h6>
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
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Center</label>
									<Select
										name="service_center"
										placeholder="Select Service Center"
										options={serviceCenter}
										ref={register({ name: 'service_center' })}
										onChange={evt => {
											setValue('service_center', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Categories</label>
									<Select
										name="lab_categories"
										placeholder="Select lab categories"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_categories' })}
										onChange={evt => {
											setValue('lab_categories', String(evt.value));
										}}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Lab Combination</label>
									<Select
										name="lab_combos"
										placeholder="Select Lab Combination"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_combos' })}
										onChange={evt => {
											setValue('lab_combos', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Tests to request</label>
									<Select
										name="lab_tests_torequest"
										placeholder="Select lab tests to request"
										isMulti
										options={labCategories}
										ref={register({ name: 'lab_test_torequest' })}
										onChange={evt => {
											setValue('lab_test_torequest', String(evt.value));
										}}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Referred Specimen</label>
									<textarea
										required
										className="form-control"
										name="referred_specimen"
										rows="3"
										placeholder="Enter referred specimen"
										ref={register}></textarea>
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

							<div className="row">
								<div className="form-check col-sm-6">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="urgent"
											type="checkbox"
											value={true}
											ref={register}
										/>{' '}
										Please check if urgent
									</label>
								</div>

								<div className="col-sm-6 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Lab Request'
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

export default LabRequest;
