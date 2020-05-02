/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import {
	renderSelect,
	renderSelectWithDefault,
	request,
} from '../../../services/utilities';
import {
	allergyCategories,
	API_URI,
	diagnosisAPI,
	diagnosisType,
} from '../../../services/constants';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import { useForm } from 'react-hook-form';

let Diagnosis = props => {
	const [selectedMultipleOption, setSelectedMultipleOption] = useState([]);
	const [type, setType] = useState([]);
	const { register, handleSubmit, setValue } = useForm();
	const [comment, setComment] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);
	const { previous, next, encounterData } = props;
	const dispatch = useDispatch();

	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;

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

	const addDiagnosis = () => {
		setDiagnoses([...diagnoses, { id: diagnoses.length, deleted: 0 }]);
	};

	const updateDiagnoses = (id, type, value) => {
		const diagnosis = diagnoses.find(d => d.id === id);
		if (diagnosis) {
			const idx = diagnoses.findIndex(d => d.id === id);
			const _diagnoses = [
				...diagnoses.slice(0, idx),
				{ ...diagnosis, [type]: value },
				...diagnoses.slice(idx + 1),
			];

			return _diagnoses;
		}
		return [];
	};

	const removeDiagnosis = id => () => {
		const diagnoses = updateDiagnoses(id, 'deleted', 1);
		selectedMultipleOption.splice(id, 1);
		setDiagnoses([...diagnoses]);
	};

	const onSubmit = async values => {
		let diagnosisToSave = [];
		selectedMultipleOption.forEach(function(value, i) {
			let _ToSave = [];
			_ToSave['diagnosis'] = value.description;
			_ToSave['type'] = type[i].value;
			_ToSave['comment'] = comment[i];
			diagnosisToSave = [_ToSave, ...diagnosisToSave];
		});
		console.log(diagnosisToSave);
		encounterData.diagnosis = diagnosisToSave;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={addDiagnosis}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add diagnosis</span>
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{diagnoses.map((dia, i) => {
							return (
								dia.deleted === 0 && (
									<div className="mt-4" key={i}>
										<div className="row mt-1">
											<div className="col-md-6">
												<label>Diagnosis Data</label>
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
										<div className="row">
											<div className="col-md-5">
												<div className="form-group">
													<AsyncSelect
														required
														cacheOptions
														value={selectedMultipleOption[dia.id]}
														getOptionValue={getOptionValues}
														getOptionLabel={getOptionLabels}
														defaultOptions
														loadOptions={getOptions}
														onChange={evt => {
															selectedMultipleOption[dia.id] = evt;
															setSelectedMultipleOption(selectedMultipleOption);
														}}
														placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
													/>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group">
													<Select
														id="type"
														name="type"
														placeholder="Select Type"
														options={diagnosisType}
														ref={register({ name: 'type' })}
														value={type[dia.id]}
														onChange={evt => {
															type[dia.id] = evt;
															setType(type);
														}}
														required
													/>
												</div>
											</div>
											<div className="col-md-2">
												<div className="form-group">
													Comment
													<input
														type="text"
														placeholder="Comment"
														value={comment[dia.id]}
														onChange={evt => {
															comment[dia.id] = evt.target.value;
															setComment(comment);
														}}
														className="form-control"
													/>
												</div>
											</div>
											<div
												className="col-md-1"
												style={{ position: 'relative' }}>
												<a
													className="text-danger delete-icon"
													onClick={removeDiagnosis(dia.id)}>
													<i className="os-icon os-icon-cancel-circle" />
												</a>
											</div>
										</div>
									</div>
								)
							);
						})}
					</div>
					{diagnoses.length > 0 && (
						<div className="col-sm-6">
							<div className="form-group">
								{/* <label>Existing Diagnoses</label> */}
							</div>
						</div>
					)}
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

Diagnosis = reduxForm({
	form: 'create_diagnosis',
})(Diagnosis);

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
	};
};

export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(Diagnosis);
