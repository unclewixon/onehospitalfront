import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';

import { serviceAPI } from '../../../services/constants';
import { request, formatCurrency } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { updateEncounterData } from '../../../actions/patient';

const defaultValues = {
	lab_request_note: '',
	lab_urgent: false,
	scan_request_note: '',
	scan_urgent: false,
	pay_later: false,
};

const category_id = 13;

const Investigations = ({ patient, previous, next }) => {
	const { register, handleSubmit } = useForm({
		defaultValues,
	});

	const encounter = useSelector(state => state.patient.encounterData);

	const [loaded, setLoaded] = useState(false);

	const [labTests, setLabTests] = useState([]);
	const [groups, setGroups] = useState([]);
	const [services, setServices] = useState([]);

	// selected requests
	const [selectedTests, setSelectedTests] = useState([]);
	const [selectedScans, setSelectedScans] = useState([]);

	// lab
	const [group, setGroup] = useState(null);
	const [labTest, setLabTest] = useState(null);
	const [urgentLab, setUrgentLab] = useState(false);
	const [payLater, setPayLater] = useState(false);

	// radiology
	const [service, setService] = useState(null);
	const [urgentScan, setUrgentScan] = useState(false);

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
					notifyError('Error fetching drugs');
				}

				try {
					const url = `${serviceAPI}/category/${category_id}?hmo_id=${hmoId}`;
					const rs = await request(url, 'GET', true);
					setServices(rs);
				} catch (e) {
					notifyError('Error fetching scan services');
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
		if (!loaded && patient) {
			getServiceUnit(patient.hmo.id);
		}
		setLoaded(true);
	}, [
		encounter.investigations.labRequest,
		encounter.investigations.radiologyRequest,
		getServiceUnit,
		loaded,
		patient,
	]);

	const onTrash = (index, type) => {
		if (type === 'lab') {
			const items = selectedTests.filter((test, i) => index !== i);
			setSelectedTests(items);
		} else {
			const items = selectedScans.filter((test, i) => index !== i);
			setSelectedScans(items);
		}
	};

	const onSubmit = data => {
		const labRequest = {
			requestType: 'lab',
			patient_id: patient.id,
			tests: [...selectedTests.map(t => ({ id: t.id }))],
			request_note: data.lab_request_note,
			urgent: data.lab_urgent,
			pay_later: data.pay_later ? -1 : 0,
		};

		const radiologyRequest = {
			requestType: 'radiology',
			patient_id: patient.id,
			tests: [...selectedScans.map(t => ({ id: t.id }))],
			request_note: data.sacn_request_note,
			urgent: data.scan_urgent,
		};

		dispatch(
			updateEncounterData({
				...encounter,
				investigations: {
					...encounter.investigations,
					labRequest,
					radiologyRequest,
				},
			})
		);
		dispatch(next);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<h5>Lab Requests</h5>
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
								setSelectedTests([
									...selectedTests,
									...e.tests.map(t => ({ ...t.labTest })),
								]);
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
								setSelectedTests([...selectedTests, e]);
								setLabTests([]);
								setLabTest(null);
							}}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
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
									{selectedTests.map((item, i) => {
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
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<label>Lab Request Note</label>
						<textarea
							className="form-control"
							name="lab_request_note"
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
									name="lab_urgent"
									type="checkbox"
									checked={urgentLab}
									onChange={e => setUrgentLab(!urgentLab)}
									ref={register}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
					<div className="form-group col-sm-4">
						<div className="form-check col-sm-12">
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="pay_later"
									type="checkbox"
									checked={payLater}
									onChange={e => setPayLater(!payLater)}
									ref={register}
								/>
								Pay Later
							</label>
						</div>
					</div>
					<div className="col-sm-4 text-right"></div>
				</div>
				<div className="mt-4"></div>
				<h5>Radiology Requests</h5>
				<div className="row">
					<div className="form-group col-sm-12">
						<label>Radiology Test</label>
						<Select
							name="service_request"
							placeholder="Select Radiology Test"
							options={services}
							value={service}
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								setService(e);
								setSelectedScans([...selectedScans, e]);
								setService(null);
							}}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
							<Table>
								<thead>
									<tr>
										<th>Radiology Scan</th>
										<th>Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{selectedScans.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.name}</td>
												<td>{formatCurrency(item.hmoTarrif)}</td>
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
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<label>Scan Request Note</label>
						<textarea
							className="form-control"
							name="scan_request_note"
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
									name="scan_urgent"
									type="checkbox"
									checked={urgentScan}
									onChange={e => setUrgentScan(!urgentScan)}
									ref={register}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
					<div className="col-sm-6 text-right"></div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Investigations;
