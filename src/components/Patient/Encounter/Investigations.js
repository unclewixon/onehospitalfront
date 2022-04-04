import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { CK_ENCOUNTER } from '../../../services/constants';
import { request, formatCurrency } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { updateEncounterData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const defaultValues = {
	lab_request_note: '',
	lab_urgent: false,
	scan_request_note: '',
	scan_urgent: false,
	pay_later: false,
};

const Investigations = ({ patient, previous, next }) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues,
	});

	const [loaded, setLoaded] = useState(false);
	const [groups, setGroups] = useState([]);

	// selected requests
	const [selectedTests, setSelectedTests] = useState([]);
	const [selectedScans, setSelectedScans] = useState([]);

	// lab
	const [urgentLab, setUrgentLab] = useState(false);

	// radiology
	const [urgentScan, setUrgentScan] = useState(false);

	const encounter = useSelector(state => state.patient.encounterData);

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

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);

		const investigationsData =
			data && data.patient_id === patient.id
				? data.encounter?.investigations
				: null;

		setUrgentLab(investigationsData?.labRequest?.urgentLab || false);
		setValue(
			'lab_request_note',
			investigationsData?.labRequest?.lab_request_note || ''
		);

		setUrgentScan(investigationsData?.radiologyRequest?.urgentScan || false);
		setValue(
			'scan_request_note',
			investigationsData?.radiologyRequest?.scan_request_note || ''
		);

		const labs = investigationsData.labRequest
			? [...investigationsData.labRequest.tests]
			: [];

		const scans = investigationsData.radiologyRequest
			? [...investigationsData.radiologyRequest.tests]
			: [];

		setSelectedTests(labs);
		setSelectedScans(scans);

		const labRequest = {
			requestType: 'labs',
			patient_id: patient.id,
			tests: [...labs],
			request_note: investigationsData?.labRequest?.lab_request_note || '',
			urgent: investigationsData?.labRequest?.urgentLab || false,
			pay_later: 0,
		};

		const radiologyRequest = {
			requestType: 'scans',
			patient_id: patient.id,
			tests: [...scans],
			request_note:
				investigationsData?.radiologyRequest?.scan_request_note || '',
			urgent: investigationsData?.radiologyRequest?.urgentScan || false,
		};

		dispatch(
			updateEncounterData(
				{
					...encounter,
					investigations: {
						...encounter.investigations,
						labRequest,
						radiologyRequest,
					},
				},
				patient.id
			)
		);
	}, [dispatch, encounter, patient, setValue]);

	useEffect(() => {
		if (!loaded && patient) {
			fetchLabCombo();
			retrieveData();
			setLoaded(true);
		}
	}, [fetchLabCombo, loaded, patient, retrieveData]);

	const onSubmit = data => {
		const labRequest = {
			requestType: 'labs',
			patient_id: patient.id,
			tests: [...selectedTests],
			request_note: data.lab_request_note,
			urgent: data.lab_urgent,
			pay_later: 0,
		};

		const radiologyRequest = {
			requestType: 'scans',
			patient_id: patient.id,
			tests: [...selectedScans],
			request_note: data.scan_request_note,
			urgent: data.scan_urgent,
		};

		dispatch(
			updateEncounterData(
				{
					...encounter,
					investigations: {
						...encounter.investigations,
						labRequest,
						radiologyRequest,
					},
				},
				patient.id
			)
		);
		next();
	};

	const getLabTests = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `lab-tests?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/scans?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onDispatchLab = (items, obj) => {
		const labRequest = {
			requestType: 'labs',
			patient_id: patient.id,
			tests: [...items],
			request_note: obj?.lab_request_note || '',
			urgent: obj?.urgent || false,
			pay_later: 0,
		};

		dispatch(
			updateEncounterData(
				{
					...encounter,
					investigations: {
						...encounter.investigations,
						labRequest,
					},
				},
				patient.id
			)
		);
	};

	const onDispatchScan = (items, obj) => {
		const radiologyRequest = {
			requestType: 'scans',
			patient_id: patient.id,
			tests: [...items],
			request_note: obj?.scan_request_note || '',
			urgent: obj?.urgent || false,
		};

		dispatch(
			updateEncounterData(
				{
					...encounter,
					investigations: {
						...encounter.investigations,
						radiologyRequest,
					},
				},
				patient.id
			)
		);
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
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								const items = [
									...selectedTests,
									...e.tests.map(t => ({ ...t.labTest })),
								];
								setSelectedTests(items);
								onDispatchLab(items);
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
							value={selectedTests}
							name="lab_test"
							loadOptions={getLabTests}
							onChange={e => {
								if (e) {
									setSelectedTests(e);
								} else {
									setSelectedTests([]);
								}
								onDispatchLab(e || []);
							}}
							placeholder="Search Lab Test"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedTests.map((lab, i) => (
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
						<label>Lab Request Note</label>
						<textarea
							className="form-control"
							name="lab_request_note"
							rows="3"
							placeholder="Enter request note"
							onChange={e => {
								onDispatchLab(selectedTests, { note: e.target.value });
							}}
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
									name="lab_urgent"
									type="checkbox"
									checked={urgentLab}
									onChange={e => {
										setUrgentLab(!urgentLab);
										onDispatchLab(selectedTests, { urgent: !urgentLab });
									}}
									ref={register}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="mt-4"></div>
				<h5>Radiology Requests</h5>
				<div className="row">
					<div className="form-group col-sm-12">
						<label>Radiology Test</label>
						<AsyncSelect
							isMulti
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							value={selectedScans}
							name="service_request"
							loadOptions={getServices}
							onChange={e => {
								setSelectedScans(e || []);
								onDispatchScan(e);
							}}
							placeholder="Search Scans"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedScans.map((scan, i) => (
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
						<label>Scan Request Note</label>
						<textarea
							className="form-control"
							name="scan_request_note"
							rows="3"
							placeholder="Enter request note"
							onChange={e => {
								onDispatchScan(selectedScans, { note: e.target.value });
							}}
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
									name="scan_urgent"
									type="checkbox"
									checked={urgentScan}
									onChange={e => {
										setUrgentScan(!urgentScan);
										onDispatchScan(selectedScans, { urgent: !urgentScan });
									}}
									ref={register}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
					<div className="col-sm-6 text-right"></div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
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
