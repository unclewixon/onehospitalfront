import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	CK_INVESTIGATION_LAB,
	CK_INVESTIGATION_SCAN,
	CK_INVESTIGATIONS,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
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

	const encounter = useSelector(state => state.patient.encounterData);

	const [loaded, setLoaded] = useState(false);

	const [groups, setGroups] = useState([]);
	const [formset, setFormSet] = useState(null);

	// selected requests
	const [selectedTests, setSelectedTests] = useState([]);
	const [selectedScans, setSelectedScans] = useState([]);

	// lab
	const [urgentLab, setUrgentLab] = useState(false);

	// radiology
	const [urgentScan, setUrgentScan] = useState(false);

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
		const lab = await storage.getItem(CK_INVESTIGATION_LAB);
		setSelectedTests(
			lab ? lab.items : encounter.investigations?.labRequest?.tests || []
		);

		const scan = await storage.getItem(CK_INVESTIGATION_SCAN);
		setSelectedScans(
			scan
				? scan.items
				: encounter.investigations?.radiologyRequest?.tests || []
		);

		const item = await storage.getItem(CK_INVESTIGATIONS);
		if (item) {
			setFormSet(item);
			setUrgentLab(item.urgentLab);
			setValue('scan_request_note', item.scan_request_note);
			setValue('lab_request_note', item.lab_request_note);
		}
	}, [encounter, setValue]);

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

		const url = `services/category/scans?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
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
								storage.setItem(CK_INVESTIGATION_LAB, { items });
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
								setSelectedTests(e);
								storage.setItem(CK_INVESTIGATION_LAB, { items: e });
							}}
							placeholder="Search Lab Test"
						/>
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
									onChange={e => {
										setUrgentLab(!urgentLab);
										storage.setItem(CK_INVESTIGATIONS, {
											...formset,
											urgentLab: !urgentLab,
										});
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
								setSelectedScans(e);
								storage.setItem(CK_INVESTIGATION_SCAN, { items: e });
							}}
							placeholder="Search Lab Test"
						/>
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
									onChange={e => {
										setUrgentScan(!urgentScan);
										storage.setItem(CK_INVESTIGATIONS, {
											...formset,
											urgentScan: !urgentScan,
										});
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
