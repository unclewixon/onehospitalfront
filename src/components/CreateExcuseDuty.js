import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { request, Compulsory, ErrorBlock } from '../services/utilities';
import { diagnosisAPI } from '../services/constants';
import { startBlock, stopBlock } from '../actions/redux-block';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';

const CreateExcuseDuty = ({ location, history }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [diagnoses, setDiagnoses] = useState([]);

	const patient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const getDiagnoses = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const handleSubmit = async values => {
		try {
			const data = {
				...values,
				start_date: moment(values.start_date, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
				end_date: moment(values.end_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
				patient_id: patient.id,
			};
			dispatch(startBlock());
			const rs = await request('patient/excuse-duties', 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('Excuse duty created!');
				history.push(`${location.pathname}#excuse-duty`);
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not save excuse duty',
				};
			}
		} catch (e) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save excuse duty' };
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Create Excuse Duty</h6>
				<div className="form-block element-box">
					<Form
						onSubmit={handleSubmit}
						validate={values => {
							const errors = {};
							if (!values.start_date) {
								errors.start_date = 'Select start date';
							}
							if (!values.end_date) {
								errors.end_date = 'Select end date';
							}
							if (
								!values.diagnoses ||
								(values.diagnoses && values.diagnoses.length === 0)
							) {
								errors.diagnoses = 'Select diagnosis';
							}
							if (!values.comment) {
								errors.comment = 'Enter comment';
							}
							return errors;
						}}
						render={({ handleSubmit, submitting, submitError }) => (
							<form onSubmit={handleSubmit}>
								{submitError && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${submitError}`,
										}}
									/>
								)}
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label>
												Start Date <Compulsory />
											</label>
											<Field
												name="start_date"
												render={({ name, input: { onChange } }) => (
													<div className="custom-date-input">
														<DatePicker
															selected={startDate}
															onChange={date => {
																isValid(date)
																	? onChange(
																			format(new Date(date), 'dd-MM-yyyy')
																	  )
																	: onChange(null);
																setStartDate(date);
															}}
															peekNextMonth
															showMonthDropdown
															showYearDropdown
															dropdownMode="select"
															dateFormat="dd-MM-yyyy"
															className="single-daterange form-control"
															placeholderText="Select start date"
															name={name}
															disabledKeyboardNavigation
														/>
													</div>
												)}
											/>
											<ErrorBlock name="start_date" />
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>
												End Date <Compulsory />
											</label>
											<Field
												name="end_date"
												render={({ name, input: { onChange } }) => (
													<div className="custom-date-input">
														<DatePicker
															selected={endDate}
															onChange={date => {
																isValid(date)
																	? onChange(
																			format(new Date(date), 'dd-MM-yyyy')
																	  )
																	: onChange(null);
																setEndDate(date);
															}}
															peekNextMonth
															showMonthDropdown
															showYearDropdown
															dropdownMode="select"
															dateFormat="dd-MM-yyyy"
															className="single-daterange form-control"
															placeholderText="Select end date"
															minDate={startDate || new Date()}
															name={name}
															disabledKeyboardNavigation
															disabled={!startDate}
														/>
													</div>
												)}
											/>
											<ErrorBlock name="end_date" />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label>Diagnosis</label>
											<Field name="diagnoses">
												{({ input, meta }) => (
													<AsyncSelect
														isClearable
														getOptionValue={option => option.id}
														getOptionLabel={option =>
															`${option.description} (${option.type}: ${option.code})`
														}
														defaultOptions
														isMulti
														value={diagnoses}
														loadOptions={getDiagnoses}
														onChange={e => {
															input.onChange(e);
															setDiagnoses(e);
														}}
														placeholder="Search for diagnosis"
													/>
												)}
											</Field>
											<ErrorBlock name="diagnoses" />
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>
												Note <Compulsory />
											</label>
											<Field
												name="comment"
												className="form-control"
												component="textarea"
												placeholder="Note"
											/>
											<ErrorBlock name="comment" />
										</div>
									</div>
								</div>
								<div className="row mt-2">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-secondary"
											onClick={() =>
												history.push(`${location.pathname}#excuse-duty`)
											}
										>
											Cancel
										</button>
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									</div>
								</div>
							</form>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CreateExcuseDuty);
