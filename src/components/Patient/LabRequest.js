/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import { formatCurrency } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { formatPatientId } from '../../services/utilities';

const defaultValues = {
	request_note: '',
	urgent: false,
};

const LabRequest = ({ module, history, location }) => {
	const { register, handleSubmit } = useForm({
		defaultValues,
	});

	const [submitting, setSubmitting] = useState(false);
	const [loadedPatient, setLoadedPatient] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);

	// load groups
	const [groups, setGroups] = useState([]);

	// selected lab tests
	const [tests, setTests] = useState([]);

	const [group, setGroup] = useState(null);
	const [labTest, setLabTest] = useState(null);

	const [urgent, setUrgent] = useState(false);

	const currentPatient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const getServiceUnit = useCallback(
		async hmoId => {
			try {
				dispatch(startBlock());

				try {
					const url = `lab-tests/groups?hmo_id=${hmoId}`;
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
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loadedPatient && currentPatient) {
			setChosenPatient(currentPatient);
			getServiceUnit(currentPatient.hmo.id);
		}
		setLoadedPatient(true);
	}, [currentPatient, loadedPatient, getServiceUnit]);

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

		if (!chosenPatient?.hmo) {
			return [];
		}

		const url = `lab-tests?q=${q}&hmo_id=${chosenPatient.hmo.id}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const onTrash = index => {
		const items = tests.filter((test, i) => index !== i);
		setTests(items);
	};

	const onSubmit = async data => {
		try {
			if (!chosenPatient) {
				notifyError('Please select a patient');
				return;
			}

			if (tests.length === 0) {
				notifyError('Please select a lab test');
				return;
			}

			const datum = {
				requestType: 'lab',
				patient_id: chosenPatient.id,
				tests: [...tests.map(t => ({ id: t.id }))],
				request_note: data.request_note,
				urgent: data.urgent,
				pay_later: 0,
			};

			setSubmitting(true);
			await request('requests/save-request', 'POST', true, datum);
			setSubmitting(false);
			notifySuccess('Lab request sent!');
			if (module !== 'patient') {
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
		<div
			className={
				module && (module === 'patient' || module === 'ivf') ? 'col-sm-12' : ''
			}>
			<div className="element-box m-0 p-3">
				<div className="form-block w-100">
					{chosenPatient && chosenPatient.wallet > 0 && (
						<div className="alert alert-danger">
							{`Outstanding Balance: ${formatCurrency(chosenPatient.wallet)}`}
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
												getServiceUnit(e.hmo.id);
												setChosenPatient(e);
											} else {
												setChosenPatient(null);
												setTests([]);
												setGroups([]);
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
									value={group}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										setGroup(e);
										setTests([
											...tests,
											...e.tests.map(t => ({ ...t.labTest })),
										]);
									}}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Lab Test</label>
								<AsyncSelect
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									defaultOptions
									name="lab_test"
									loadOptions={getLabTests}
									value={labTest}
									onChange={e => {
										setLabTest(e);
										setTests([...tests, e]);
										setLabTest(null);
									}}
									placeholder="Search Lab Test"
								/>
							</div>
						</div>

						<div className="row">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Category</th>
										<th>Lab Test</th>
										<th>Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{tests.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.category.name}</td>
												<td>{item.name}</td>
												<td>{formatCurrency(item.hmoPrice)}</td>
												<td>
													<TrashIcon
														onClick={() => onTrash(i)}
														style={{
															width: '1rem',
															height: '1rem',
															cursor: 'pointer',
														}}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="row mt-4">
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
							{chosenPatient &&
								((chosenPatient.wallet === 0 && !chosenPatient.isAdmitted) ||
									chosenPatient.isAdmitted) && (
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
