/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { request } from '../../../services/utilities';
import { diagnosisAPI } from '../../../services/constants';
import DatePicker from 'react-datepicker';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';

let PastHistory = props => {
	// eslint-disable-next-line no-unused-vars
	const [start_time, setStart_time] = useState(new Date());
	const [multiDate, setMultiDate] = useState([]);
	let [data, setData] = useState([]);

	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	const { encounterData, previous, encounterForm } = props;
	const defaultValues = {
		...(encounterForm.medicalHistory || []),
	};

	const { register, handleSubmit, control, errors } = useForm({
		defaultValues,
	});
	const dispatch = useDispatch();

	const onSubmit = async data => {
		encounterData.medicalHistory = data.pastHistory || [];
		encounterForm.medicalHistory = data;
		props.loadEncounterForm(encounterForm);
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	useEffect(() => {
		if (defaultValues.pastHistory?.length > 0) {
			// eslint-disable-next-line array-callback-return
			defaultValues.pastHistory.map((item, index) => {
				multiDate[index] = item.date;
				setMultiDate(multiDate);
				// eslint-disable-next-line react-hooks/exhaustive-deps
				data = [...data, { id: index }];
			});

			setData(data);
		}
	}, []);

	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;
	const setDate = (date, i) => {
		multiDate[i] = date;
		setStart_time(date);
		setMultiDate(multiDate);
	};

	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(`${diagnosisAPI}/search?q=${val}`, 'GET', true);
		return res;
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
							onClick={() => {
								append();
							}}>
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
									ref={register}
									value="icpc2"
									className="form-control"
								/>
								<label>ICPC-2</label>
							</div>
							<div className="float-right">
								<input
									type="radio"
									name="icd10"
									ref={register}
									value="icd10"
									className="form-control"
								/>
								<label>ICD-10</label>
							</div>
						</div>
					</div>
				</div>
				{data.map((hist, i) => {
					return (
						<div className="row" key={i}>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Diagnosis</label>
									<Controller
										as={
											<AsyncSelect
												required
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
										name={`pastHistory[${hist.id}].diagnosis`}
									/>
									<ErrorMessage
										errors={errors}
										name={`pastHistory[${hist.id}].diagnosis`}
										message="This is required"
										as={<span className="alert alert-danger" />}
									/>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="form-group">
									<label>Date Diagnosed</label>

									<Controller
										as={
											<DatePicker
												selected={multiDate[hist.id]}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												dateFormat="dd-MMM-yyyy"
												className="single-daterange form-control"
												placeholderText="Date Diagnosed"
											/>
										}
										control={control}
										rules={{ required: true }}
										onChange={([selected]) => {
											setDate(selected, hist.id);
											return selected;
										}}
										name={`pastHistory[${hist.id}].date`}
									/>
									<ErrorMessage
										errors={errors}
										name={`pastHistory[${hist.id}].date`}
										message="This is required"
										as={<span className="alert alert-danger" />}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Comment</label>
									<input
										placeholder="Comment on the past medical history"
										ref={register}
										name={`pastHistory[${hist.id}].comment`}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-sm-1" style={{ position: 'relative' }}>
								<a
									className="text-danger delete-icon"
									onClick={() => remove(hist.id)}>
									<i className="os-icon os-icon-cancel-circle" />
								</a>
							</div>
						</div>
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
		encounterForm: state.patient.encounterForm,
	};
};
export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(PastHistory);
