import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, patientname, formatCurrency } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';

const defaultValues = {
	request_note: '',
	urgent: false,
};

const SendButton = ({ submitting }) => {
	return (
		<div className="col-sm-12 text-right">
			<button className="btn btn-primary" disabled={submitting}>
				{submitting ? <img src={waiting} alt="submitting" /> : 'Send Request'}
			</button>
		</div>
	);
};

const RadiologyRequest = ({ module, history, location, itemId }) => {
	const { register, handleSubmit } = useForm({ defaultValues });

	const [submitting, setSubmitting] = useState(false);
	const [loadedPatient, setLoadedPatient] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [urgent, setUrgent] = useState(false);

	// selected radiology
	const [tests, setTests] = useState([]);

	const currentPatient = useSelector(state => state.user.patient);

	useEffect(() => {
		if (!loadedPatient && currentPatient) {
			setChosenPatient(currentPatient);
			setLoadedPatient(true);
		}
	}, [currentPatient, loadedPatient]);

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/scans?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async data => {
		try {
			if (!chosenPatient) {
				notifyError('Please select a patient');
				return;
			}

			if (tests.length === 0) {
				notifyError('Please select a radiology test');
				return;
			}

			const datum = {
				requestType: 'scans',
				patient_id: chosenPatient.id,
				tests: [...tests],
				request_note: data.request_note,
				urgent: data.urgent,
				antenatal_id: module === 'antenatal' ? itemId : '',
			};

			setSubmitting(true);
			await request('requests/save-request', 'POST', true, datum);
			setSubmitting(false);
			notifySuccess('Radiology request sent!');
			if (!module || (module && module === '')) {
				history.push('/radiology');
			} else {
				history.push(`${location.pathname}#radiology`);
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error sending radiology request');
		}
	};

	return (
		<div className={!module || (module && module === '') ? '' : 'col-sm-12'}>
			<div className="element-box m-0 p-3">
				<div className="form-block w-100">
					{chosenPatient && chosenPatient.outstanding < 0 && (
						<div className="alert alert-danger">
							{`Outstanding Balance: ${formatCurrency(
								chosenPatient.outstanding,
								true
							)}`}
						</div>
					)}
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
												setTests([]);
											}
										}}
										placeholder="Search patients"
									/>
								</div>
							</div>
						)}
						<div className="row">
							<div className="form-group col-sm-12 relative">
								<label>Radiology Test</label>
								<AsyncSelect
									isMulti
									isClearable
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									defaultOptions
									value={tests}
									name="service_request"
									loadOptions={getServices}
									onChange={e => {
										if (e) {
											setTests(e);
										} else {
											setTests([]);
										}
									}}
									placeholder="Select Radiology Test"
								/>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-sm-12">
								{tests.map((scan, i) => (
									<span
										className={`badge badge-${
											scan ? 'info' : 'danger'
										} text-white ml-2`}
										key={i}
									>{`${scan.name}: ${formatCurrency(
										scan?.serviceCost?.tariff || 0
									)}`}</span>
								))}
							</div>
						</div>

						<div className="row mt-4">
							<div className="form-group col-sm-12">
								<label>Request Note</label>
								<textarea
									className="form-control"
									name="request_note"
									rows="3"
									placeholder="Enter request note"
									ref={register}
								></textarea>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-6">
								<div className="form-check col-sm-12">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="urgent"
											type="checkbox"
											checked={urgent}
											onChange={e => setUrgent(!urgent)}
											ref={register}
										/>
										Please check if urgent
									</label>
								</div>
							</div>
							{chosenPatient && (
								<>
									{chosenPatient.hmo?.name === 'Private' ? (
										<>
											{chosenPatient.admission ? (
												<SendButton submitting={submitting} />
											) : (
												<>
													{chosenPatient.outstanding >= 0 && (
														<SendButton submitting={submitting} />
													)}
												</>
											)}
										</>
									) : (
										<SendButton submitting={submitting} />
									)}
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(RadiologyRequest);
