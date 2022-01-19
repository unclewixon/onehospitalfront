/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, patientname } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { formatCurrency } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const defaultValues = {
	request_note: '',
	urgent: false,
};

const LabRequest = ({ module, history, location, itemId }) => {
	const { register, handleSubmit } = useForm({
		defaultValues,
	});

	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [loadedPatient, setLoadedPatient] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);

	// load groups
	const [groups, setGroups] = useState([]);

	// selected lab tests
	const [labTests, setLabTests] = useState([]);

	const [urgent, setUrgent] = useState(false);

	const currentPatient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const fetchLabCombo = useCallback(async () => {
		try {
			dispatch(startBlock());

			try {
				const url = 'lab-tests/groups';
				const rs = await request(url, 'GET', true);
				setGroups(rs);
			} catch (e) {
				notifyError('Error fetching lab groups');
			}

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching groups');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchLabCombo();
			setLoaded(true);
		}
		if (!loadedPatient && currentPatient) {
			setChosenPatient(currentPatient);
			setLoadedPatient(true);
		}
	}, [currentPatient, fetchLabCombo, loaded, loadedPatient]);

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getLabTests = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `lab-tests?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const onSubmit = async data => {
		try {
			if (!chosenPatient) {
				notifyError('Please select a patient');
				return;
			}

			if (labTests.length === 0) {
				notifyError('Please select a lab tests');
				return;
			}

			const datum = {
				requestType: 'labs',
				patient_id: chosenPatient.id,
				tests: [...labTests],
				request_note: data.request_note,
				urgent: data.urgent,
				pay_later: 0,
				antenatal_id: module === 'antenatal' ? itemId : '',
				admission_id: module === 'admission' ? itemId : '',
				nicu_id: module === 'nicu' ? itemId : '',
				ivf_id: module === 'ivf' ? itemId : '',
			};

			setSubmitting(true);
			await request('requests/save-request', 'POST', true, datum);
			setSubmitting(false);
			notifySuccess('Lab request sent!');
			if (!module || (module && module === '')) {
				history.push('/lab');
			} else {
				history.push(`${location.pathname}#lab`);
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error sending lab request');
		}
	};

	return (
		<div className={!module || (module && module === '') ? '' : 'col-sm-12'}>
			<div className="element-box m-0 p-3">
				<div className="form-block w-100">
					{chosenPatient && chosenPatient.outstanding > 0 && (
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
												setLabTests([]);
											}
										}}
										placeholder="Search patients"
									/>
								</div>
							</div>
						)}
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Lab Group</label>
								<Select
									name="lab_group"
									placeholder="Select Lab Group"
									options={groups}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										setLabTests([
											...labTests,
											...e.tests.map(t => ({ ...t.labTest })),
										]);
									}}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Lab Test</label>
								<AsyncSelect
									isMulti
									isClearable
									getOptionValue={option => option.id}
									getOptionLabel={option =>
										`${option.name} (${option.category.name})`
									}
									defaultOptions
									value={labTests}
									name="lab_test"
									loadOptions={getLabTests}
									onChange={e => {
										if (e) {
											setLabTests(e);
										} else {
											setLabTests([]);
										}
									}}
									placeholder="Search Lab Test"
								/>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-sm-12">
								{labTests.map((lab, i) => (
									<span
										className={`badge badge-${
											lab ? 'info' : 'danger'
										} text-white ml-2`}
										key={i}
									>{`${lab.name}: ${formatCurrency(
										lab?.service?.tariff || 0
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
							<div className="form-group col-sm-4">
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
								<div className="col-sm-8 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Send Request'
										)}
									</button>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(LabRequest);
