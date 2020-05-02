/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { renderTextInput, request } from '../../../services/utilities';
import { API_URI, diagnosisAPI } from '../../../services/constants';
import DatePicker from 'react-datepicker';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData } from '../../../actions/patient';
import { useForm } from 'react-hook-form';
import { Field } from 'redux-form';

let PastHistory = props => {
	const [histories, setHistories] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedMultipleOption, setSelectedMultipleOption] = useState([]);
	const [start_time, setStart_time] = useState(new Date());
	const [multiDate, setMultiDate] = useState([]);
	const [multiComment, setMultiComment] = useState([]);
	const [form, updateForm] = useState([]);
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const { encounterData, previous, next } = props;

	const addHistory = () => {
		setHistories([...histories, { id: histories.length, deleted: 0 }]);
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;
	const handleChangeComment = (selected, i) => {
		multiComment[i] = selected.target.value;
		setMultiComment(multiComment);
	};

	const handleChangeOptions = (selected, i) => {
		setSelectedOption(selected);
		selectedMultipleOption[i] = selected;
		setSelectedMultipleOption(selectedMultipleOption);
	};

	const setDate = (date, i) => {
		multiDate[i] = date;
		setStart_time(date);
		setMultiDate(multiDate);
		//console.log(date, type);
		//this.setState({ [type]: date });
	};

	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(
			`${API_URI}${diagnosisAPI}` + 'search?q=' + val,
			'GET',
			true
		);
		return res;
	};

	const onChange = date => setStart_time(date);

	const updateHistories = (id, type, value) => {
		const history = histories.find(d => d.id === id);
		if (history) {
			const idx = histories.findIndex(d => d.id === id);
			const _histories = [
				...histories.slice(0, idx),
				{ ...history, [type]: value },
				...histories.slice(idx + 1),
			];

			return _histories;
		}
		return [];
	};

	const removeHistory = id => () => {
		const histories = updateHistories(id, 'deleted', 1);
		selectedMultipleOption.splice(id, 1);
		setHistories([...histories]);
	};

	const onSubmit = async values => {
		//medicalHistory
		let medicalToSave = [];
		selectedMultipleOption.forEach(function(value, i) {
			let _ToSave = [];
			_ToSave['diagnosis'] = value.description;
			_ToSave['date'] = multiDate[i];
			_ToSave['comment'] = multiComment[i];
			//medicalToSave = [_ToSave, ...medicalToSave];
			medicalToSave.splice(i, 0, _ToSave);
		});

		encounterData.medicalHistory = medicalToSave;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};
	const divStyle = {
		height: '500px',
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={addHistory}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add</span>
						</a>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-6">
						<label>Past Medical History:</label>
					</div>
					<div className="col-md-6">
						<div className="form-group clearfix diagnosis-type">
							<div className="float-right ml-2">
								<input
									type="radio"
									name="icd10"
									value="icpc2"
									className="form-control"
								/>
								<label>ICPC-2</label>
							</div>
							<div className="float-right">
								<input
									type="radio"
									name="icd10"
									value="icd10"
									className="form-control"
								/>
								<label>ICD-10</label>
							</div>
						</div>
					</div>
				</div>
				{histories.map((hist, i) => {
					return (
						hist.deleted === 0 && (
							<div className="row" key={i}>
								<div className="col-sm-6">
									<div className="form-group">
										<label>Diagnosis</label>
										<AsyncSelect
											required
											cacheOptions
											value={selectedMultipleOption[hist.id]}
											getOptionValue={getOptionValues}
											getOptionLabel={getOptionLabels}
											defaultOptions
											loadOptions={getOptions}
											onChange={evt => handleChangeOptions(evt, hist.id)}
											placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
										/>
									</div>
								</div>
								<div className="col-sm-2">
									<div className="form-group">
										<label>Date Diagnosed</label>
										<DatePicker
											selected={multiDate[hist.id]}
											onChange={date => setDate(date, hist.id)}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="single-daterange form-control"
											placeholderText="Date Diagnosed"
										/>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Comment</label>
										<input
											placeholder="Comment on the past medical history"
											//value={multiComment[i]}
											onChange={evt => handleChangeComment(evt, hist.id)}
											className="form-control"
										/>
									</div>
								</div>
								<div className="col-sm-1" style={{ position: 'relative' }}>
									<a
										className="text-danger delete-icon"
										onClick={removeHistory(hist.id)}>
										<i className="os-icon os-icon-cancel-circle" />
									</a>
								</div>
							</div>
						)
					);
				})}

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
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
	};
};
export default connect(mapStateToProps, { loadEncounterData })(PastHistory);
