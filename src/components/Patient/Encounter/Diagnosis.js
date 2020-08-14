/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { request } from '../../../services/utilities';
import { diagnosisAPI, diagnosisType } from '../../../services/constants';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';

let Diagnosis = props => {
	const { previous, encounterData, encounterForm } = props;
	const dispatch = useDispatch();
	const defaultValues = {
		diagnosis: encounterForm.diagnosis?.diagnosis,
	};
	const { register, handleSubmit, control, errors } = useForm({
		defaultValues,
	});
	let [data, setData] = useState([]);
	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	useEffect(() => {
		if (defaultValues?.diagnosis?.length > 0) {
			// eslint-disable-next-line array-callback-return
			defaultValues.diagnosis.map((item, index) => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				data = [...data, { id: index }];
			});
			setData(data);
		}
	}, []);

	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;

	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(`${diagnosisAPI}/search?q=${val}`, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		encounterForm.diagnosis = values;
		props.loadEncounterForm(encounterForm);

		encounterData.diagnosis = values.diagnosis || [];
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
							onClick={() => {
								append();
							}}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add diagnosis</span>
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{data.map((dia, i) => {
							return (
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
														name={`diagnosis[${dia.id}].icd10`}
														ref={register}
														value="icpc2"
														className="form-control"
													/>
													<label>ICPC-2</label>
												</div>
												<div className="float-right">
													<input
														type="radio"
														name={`diagnosis[${dia.id}].icd10`}
														ref={register}
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
												<Controller
													as={
														<AsyncSelect
															cacheOptions
															getOptionValue={getOptionValues}
															getOptionLabel={getOptionLabels}
															defaultOptions
															loadOptions={getOptions}
															placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
														/>
													}
													control={control}
													rules={{ required: true }}
													onChange={([selected]) => {
														return selected;
													}}
													name={`diagnosis[${dia.id}].diagnosis`}
												/>
												<ErrorMessage
													errors={errors}
													name={`diagnosis[${dia.id}].diagnosis`}
													message="This is required"
													as={<span className="alert alert-danger" />}
												/>
											</div>
										</div>
										<div className="col-md-3">
											<div className="form-group">
												<Controller
													as={
														<Select
															placeholder="Select Type"
															options={diagnosisType}
														/>
													}
													control={control}
													rules={{ required: true }}
													onChange={([selected]) => {
														return selected;
													}}
													name={`diagnosis[${dia.id}].type`}
												/>
												<ErrorMessage
													errors={errors}
													name={`diagnosis[${dia.id}].type`}
													message="This is required"
													as={<span className="alert alert-danger" />}
												/>
											</div>
										</div>
										<div className="col-md-2">
											<div className="form-group">
												Comment
												<input
													type="text"
													placeholder="Comment"
													name={`diagnosis[${dia.id}].comment`}
													ref={register}
													className="form-control"
												/>
											</div>
										</div>
										<div className="col-md-1" style={{ position: 'relative' }}>
											<a
												className="text-danger delete-icon"
												onClick={() => remove(dia.id)}>
												<i className="os-icon os-icon-cancel-circle" />
											</a>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					{data.length > 0 && (
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
