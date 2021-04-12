/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { Table } from 'react-bootstrap';

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

	// load categories
	const [categories, setCategories] = useState([]);

	// load groups
	const [groups, setGroups] = useState([]);

	// load
	const [labTests, setLabTests] = useState([]);

	// selected lab tests
	const [tests, setTests] = useState([]);

	const [category, setCategory] = useState(null);
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
					const url = `lab-tests/categories?hasTest=1&hmo_id=${hmoId}`;
					const rs = await request(url, 'GET', true);
					setCategories(rs);
				} catch (error) {}

				try {
					const url = `lab-tests/groups?hmo_id=${hmoId}`;
					const rs = await request(url, 'GET', true);
					setGroups(rs);
				} catch (e) {
					notifyError('Error fetching drugs');
				}

				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('Error fetching drugs');
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
			};

			setSubmitting(true);
			await request('patient/save-request', 'POST', true, datum);
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
												getServiceUnit(e.hmo.id);
												setChosenPatient(e);
											} else {
												setChosenPatient(null);
												setCategories([]);
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
							<div className="form-group col-sm-12">
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
						</div>
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Lab Categories</label>
								<Select
									name="lab_category"
									placeholder="Select Lab Category"
									options={categories}
									value={category}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										setCategory(e);
										setLabTests(e.lab_tests);
									}}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Lab Test</label>
								<Select
									name="lab_tests"
									placeholder="Select Lab Tests"
									options={labTests}
									value={labTest}
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									onChange={e => {
										setLabTest(e);
										setTests([...tests, e]);
										setCategory(null);
										setLabTests([]);
										setLabTest(null);
									}}
								/>
							</div>
						</div>

						<div className="row">
							<Table>
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
							</Table>
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

export default withRouter(LabRequest);
