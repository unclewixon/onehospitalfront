/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import { updateEncounterData } from '../../../actions/patient';
import {
	patientAPI,
	diagnosisAPI,
	diagnosisType,
} from '../../../services/constants';
import { request, getType } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';

const Diagnosis = ({ previous, next, patient }) => {
	const { register, handleSubmit, reset } = useForm();
	const [loaded, setLoaded] = useState(false);
	const [diagnoses, setDiagnoses] = useState([]);
	const [pastDiagnoses, setPastDiagnoses] = useState([]);
	const [selectedPastDiagnoses, setSelectedPastDiagnoses] = useState([]);
	const [diagnosis, setDiagnosis] = useState('');
	const [type, setType] = useState('');
	const [existing, setExisting] = useState(false);

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const fetchDiagnoses = useCallback(async () => {
		try {
			const url = `${patientAPI}/${patient.id}/diagnoses?status=Active`;
			const rs = await request(url, 'GET', true);
			setPastDiagnoses(rs);
		} catch (error) {
			console.log(error);
			notifyError('Could not fetch diagnoses for the patient');
		}
	}, [patient]);

	useEffect(() => {
		if (!loaded) {
			setDiagnoses(encounter.diagnosis);
			setSelectedPastDiagnoses(encounter.pastDiagnosis);
			setLoaded(true);
			fetchDiagnoses();
		}
	}, [encounter.diagnosis, encounter.pastDiagnosis, fetchDiagnoses, loaded]);

	const remove = index => {
		const newItems = diagnoses.filter((item, i) => index !== i);
		setDiagnoses(newItems);
	};

	const onNext = () => {
		dispatch(
			updateEncounterData({
				...encounter,
				diagnosis: [...diagnoses],
				pastDiagnosis: [...selectedPastDiagnoses],
			})
		);
		dispatch(next);
	};

	const divStyle = {
		height: '500px',
		overflowY: 'scroll',
	};

	const onSubmit = values => {
		if (diagnosis !== '' && type !== '') {
			setDiagnoses([...diagnoses, { ...values, diagnosis, type }]);
			setDiagnosis('');
			setType('');
			reset();
		} else {
			notifyError('Error, please complete the diagnoses form');
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (Icd${option.diagnosisType}: ${option.icd10Code ||
			option.procedureCode})`;

	const getOptions = async q => {
		if (!q || (q && q.length <= 1)) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);

		return res;
	};

	const onSelect = (e, diagnosis) => {
		const selected = selectedPastDiagnoses.find(o => o.id === diagnosis.id);
		if (selected) {
			const filtered = selectedPastDiagnoses.filter(o => o.id !== diagnosis.id);
			setSelectedPastDiagnoses(filtered);
		} else {
			setSelectedPastDiagnoses([
				...selectedPastDiagnoses,
				{ id: diagnosis.id, diagnosis },
			]);
		}
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<div className="row">
				<div className="col-md-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row">
							<div className="col-sm-10">
								<div className="form-group">
									<label>Diagnosis</label>
									<AsyncSelect
										required
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										name="diagnosis"
										loadOptions={getOptions}
										value={diagnosis}
										onChange={e => {
											setDiagnosis(e);
										}}
										placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Type</label>
									<Select
										placeholder="Select Type"
										ref={register}
										options={diagnosisType}
										value={type}
										onChange={e => {
											setType(e);
										}}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Comment</label>
									<input
										className="form-control"
										placeholder="Comment"
										type="text"
										ref={register}
										name="comment"
									/>
								</div>
							</div>
							<div className="col-sm-2" style={{ position: 'relative' }}>
								<button
									className="btn btn-danger btn-sm"
									style={{ margin: '45px 0 0', display: 'block' }}
									type="submit">
									<i className="os-icon os-icon-plus-circle" /> Add
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-5">
					<div className="allergen-block">
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label>
										Existing Diagnosis{' '}
										<input
											type="checkbox"
											checked={existing}
											className="form-control"
											onChange={e => {
												setExisting(e.target.checked);
												setSelectedPastDiagnoses(
													e.target.checked
														? [
																...pastDiagnoses.map(d => ({
																	id: d.id,
																	diagnosis: d,
																})),
														  ]
														: []
												);
											}}
										/>
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							{pastDiagnoses.map((diagnosis, i) => {
								const value = selectedPastDiagnoses.find(
									o => o.id === diagnosis.id
								);
								return (
									<div className="col-md-12" key={i}>
										<div className="form-group history-item">
											<label>
												{`${getType(diagnosis.diagnosisType)} (${diagnosis.item
													.icd10Code || diagnosis.item.procedureCode}): ${
													diagnosis.item.description
												}`}
											</label>
											<div>
												<input
													type="checkbox"
													className="form-control"
													value={value !== null}
													onChange={e => onSelect(e, diagnosis)}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="element-box p-3 m-0 mt-3 w-100">
					<Table>
						<thead>
							<tr>
								<th>Diagnosis</th>
								<th>Type</th>
								<th>Comment</th>
								<th nowrap="nowrap" className="text-center"></th>
							</tr>
						</thead>
						<tbody>
							{diagnoses.map((item, index) => {
								return (
									<tr key={index}>
										<td>{`${getType(item.diagnosis.diagnosisType)} (${item
											.diagnosis.icd10Code || item.diagnosis.procedureCode}): ${
											item.diagnosis.description
										}`}</td>
										<td>{item.type.value}</td>
										<td>{item.comment}</td>
										<td>
											<div className="display-flex">
												<div className="ml-2">
													<TrashIcon
														onClick={() => remove(index)}
														style={{
															width: '1rem',
															height: '1rem',
															cursor: 'pointer',
														}}
													/>
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</div>

			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={onNext}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Diagnosis;
