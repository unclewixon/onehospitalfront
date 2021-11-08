import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI, diagnosisAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, patientname, formatCurrency } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	request_note: '',
	diagnosis: [],
	bill: 'later',
};

const ProcedureRequest = ({ module, history, location }) => {
	const { register, handleSubmit, setValue } = useForm({ defaultValues });

	const [submitting, setSubmitting] = useState(false);
	const [loadedPatient, setLoadedPatient] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [service, setService] = useState(null);

	const currentPatient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

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
				tests: [{ ...service }],
				request_note: data.request_note,
				urgent: false,
				diagnosis: data.diagnosis || [],
				bill: data.bill === 'later' ? -1 : 0,
			};

			dispatch(startBlock());
			setSubmitting(true);
			await request('requests/save-request', 'POST', true, datum);
			setSubmitting(false);
			notifySuccess('Procedure request sent!');
			dispatch(stopBlock());
			if (module !== 'patient') {
				history.push('/procedure');
			} else {
				history.push(`${location.pathname}#procedure`);
			}
		} catch (error) {
			dispatch(stopBlock());
			console.log(error);
			setSubmitting(false);
			notifyError('Error sending procedure request');
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (${option.type}: ${option.code})`;

	const getOptions = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/procedure?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className={!module || (module && module === '') ? '' : 'col-sm-12'}>
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
										getOptionLabel={option => patientname(option, true)}
										defaultOptions
										name="patient"
										loadOptions={getPatients}
										onChange={e => {
											if (e) {
												setChosenPatient(e);
											} else {
												setChosenPatient(null);
												setService([]);
											}
										}}
										placeholder="Search patients"
									/>
								</div>
							</div>
						)}
						<div className="row">
							<div className="form-group col-sm-6 relative">
								<label>Procedure</label>
								{service && (
									<div className="posit-top">
										<div className="row">
											<div className="col-sm-12">
												<span
													className={`badge badge-${
														service ? 'info' : 'danger'
													} text-white`}>{`Base Price: ${formatCurrency(
													service?.serviceCost?.tariff || 0
												)}`}</span>
											</div>
										</div>
									</div>
								)}
								<AsyncSelect
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									defaultOptions
									name="service_request"
									loadOptions={getServices}
									value={service}
									onChange={e => {
										if (!chosenPatient) {
											notifyError('Please select patient');
											return false;
										}
										setService(e);
									}}
									placeholder="Select Procedure"
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
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
