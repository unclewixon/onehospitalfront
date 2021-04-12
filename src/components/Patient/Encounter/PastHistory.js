/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import moment from 'moment';

import { request } from '../../../services/utilities';
import { diagnosisAPI } from '../../../services/constants';
import { updateEncounterData } from '../../../actions/patient';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import { notifyError } from '../../../services/notify';

const PastHistory = ({ previous, next }) => {
	const [loaded, setLoaded] = useState(false);
	const [diagnoses, setDiagnoses] = useState([]);
	const [diagnosis, setDiagnosis] = useState(null);
	const [date, setDate] = useState('');
	const [comment, setComment] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const remove = index => {
		const newItems = diagnoses.filter((item, i) => index !== i);
		setDiagnoses(newItems);
	};

	const onSubmit = () => {
		dispatch(updateEncounterData({ ...encounter, medicalHistory: diagnoses }));
		dispatch(next);
	};

	useEffect(() => {
		if (!loaded) {
			setDiagnoses(encounter.medicalHistory);
			setLoaded(true);
		}
	}, [encounter.medicalHistory, loaded]);

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

	const divStyle = {
		height: '500px',
	};

	const add = () => {
		if (diagnosis && date !== '') {
			setDiagnoses([
				...diagnoses,
				{ diagnosis, date: moment(date).format('DD-MM-YYYY'), comment },
			]);
			setDiagnosis(null);
			setDate('');
			setComment('');
		} else {
			notifyError('Error, please select diagnosis or date of diagnosis');
		}
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<div className="row mt-1">
				<div className="col-md-6">
					<label>Past Medical History:</label>
				</div>
				<div className="col-md-6"></div>
			</div>
			<div className="row">
				<div className="col-sm-6">
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
				<div className="col-sm-2">
					<div className="form-group">
						<label>Date Diagnosed</label>
						<DatePicker
							selected={date}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							placeholderText="Date Diagnosed"
							onChange={e => setDate(e)}
						/>
					</div>
				</div>
				<div className="col-sm-3">
					<div className="form-group">
						<label>Comment</label>
						<input
							placeholder="Comment on the past medical history"
							name="comment"
							className="form-control"
							value={comment}
							onChange={e => setComment(e.target.value)}
						/>
					</div>
				</div>
				<div className="col-sm-1" style={{ position: 'relative' }}>
					<a
						className="text-danger delete-icon"
						style={{ margin: '45px 0 0', display: 'block' }}
						onClick={() => add()}>
						<i className="os-icon os-icon-plus-circle" />
					</a>
				</div>
			</div>

			<div className="row">
				<Table>
					<thead>
						<tr>
							<th>Diagnosis</th>
							<th>Date</th>
							<th>Comment</th>
							<th nowrap="nowrap" className="text-center"></th>
						</tr>
					</thead>
					<tbody>
						{diagnoses.map((item, index) => {
							return (
								<tr key={index}>
									<td>{`${item.diagnosis.description} (Icd${
										item.diagnosis.diagnosisType
									}: ${item.diagnosis.icd10Code ||
										item.diagnosis.procedureCode})`}</td>
									<td>{item.date}</td>
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

			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={onSubmit}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PastHistory;
