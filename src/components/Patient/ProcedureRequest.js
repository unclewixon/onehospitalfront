import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI, serviceAPI, diagnosisAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, formatPatientId } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	request_note: '',
	diagnosis: [],
	bill: 'later',
};

const categories = [{ id: 19, name: 'Genreal Surgery' }];

const ProcedureRequest = ({ module, history, location }) => {
	const { register, handleSubmit, setValue } = useForm({ defaultValues });

	const [submitting, setSubmitting] = useState(false);
	const [category, setCategory] = useState(null);
	const [loadedPatient, setLoadedPatient] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [service, setService] = useState(null);

	// diagnosis
	const [diagnosisType, setDiagnosisType] = useState('10');

	// load services
	const [services, setServices] = useState([]);

	const currentPatient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const getServiceUnit = async (hmoId, categoryId) => {
		try {
			dispatch(startBlock());

			const url = `${serviceAPI}/category/${categoryId}?hmo_id=${hmoId}`;
			const rs = await request(url, 'GET', true);
			setServices(rs);

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('error fetching procedures');
			dispatch(stopBlock());
		}
	};

	useEffect(() => {
		if (!loadedPatient && currentPatient) {
			setChosenPatient(currentPatient);
		}
		setLoadedPatient(true);
	}, [currentPatient, loadedPatient]);

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async data => {
		try {
			if (!chosenPatient) {
				notifyError('Please select a patient');
				return;
			}

			if (!service) {
				notifyError('Please select a procedure');
				return;
			}

			const datum = {
				requestType: 'procedure',
				patient_id: chosenPatient.id,
				tests: [{ id: service.id }],
				request_note: data.request_note,
				urgent: false,
				diagnosis: data.diagnosis || [],
				bill: data.bill,
			};

			setSubmitting(true);
			await request('patient/save-request', 'POST', true, datum);
			setSubmitting(false);
			notifySuccess('Procedure request sent!');
			if (module !== 'patient') {
				history.push('/procedure');
			} else {
				history.push(`${location.pathname}#procedure`);
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error sending procedure request');
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (Icd${option.diagnosisType}: ${option.icd10Code ||
			option.procedureCode})`;

	const getOptions = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=${diagnosisType}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className={module && module === 'patient' ? 'col-sm-12' : ''}>
			<div className="element-box m-0 p-3">
				<div className="form-block w-100">
					<form onSubmit={handleSubmit(onSubmit)}>
						{!currentPatient && (
							<div className="row">
								<div className="form-group col-sm-12">
									<label htmlFor="patient">Patient Name</label>
									<AsyncSelect
										isClearable
										getOptionValue={option => option.id}
										getOptionLabel={option =>
											`${option.other_names} ${
												option.surname
											} (${formatPatientId(option.id)})`
										}
										defaultOptions
										name="patient"
										loadOptions={getPatients}
										onChange={e => {
											if (e) {
												setChosenPatient(e);
											} else {
												setChosenPatient(null);
												setServices([]);
											}
										}}
										placeholder="Search patients"
									/>
								</div>
							</div>
						)}
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Category</label>
								<Select
									name="category"
									placeholder="Select Category"
									options={categories}
									value={category}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										if (!chosenPatient) {
											notifyError('Please select patient');
											return false;
										}
										setCategory(e);
										getServiceUnit(chosenPatient.hmo.id, e.id);
									}}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Procedure</label>
								<Select
									name="service_request"
									placeholder="Select Procedure"
									options={services}
									value={service}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										setService(e);
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12 relative">
								<div className="posit-top">
									<div className="row">
										<div className="form-group col-sm-12">
											<label>
												<input
													type="radio"
													checked={diagnosisType === '10'}
													onChange={() => setDiagnosisType('10')}
												/>{' '}
												ICD10
											</label>
											<label className="ml-2">
												<input
													type="radio"
													checked={diagnosisType === '2'}
													onChange={() => setDiagnosisType('2')}
												/>{' '}
												ICPC-2
											</label>
										</div>
									</div>
								</div>
								<label>Primary diagnoses</label>
								<AsyncSelect
									required
									getOptionValue={getOptionValues}
									getOptionLabel={getOptionLabels}
									defaultOptions
									isMulti
									name="diagnosis"
									ref={register({ name: 'diagnosis', required: true })}
									loadOptions={getOptions}
									onChange={e => {
										setValue('diagnosis', e);
									}}
									placeholder="Search for diagnosis"
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label>Request Note</label>
								<textarea
									className="form-control"
									name="request_note"
									rows="3"
									placeholder="Enter request note"
									ref={register}></textarea>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="row">
									<div className="form-group col-sm-3">
										<div className="d-flex">
											<input
												className="form-control"
												type="radio"
												name="bill"
												ref={register}
												value="now"
											/>
											<label className="mx-1">Bill now</label>
										</div>
									</div>
									<div className="form-group col-sm-3">
										<div className="d-flex">
											<input
												className="form-control"
												type="radio"
												name="bill"
												ref={register}
												value="later"
											/>
											<label className="mx-1">Bill later </label>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6 text-right">
								<button className="btn btn-primary" disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										'Send Request'
									)}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ProcedureRequest);
