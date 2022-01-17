import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import { useDispatch } from 'react-redux';

import { request, patientname } from '../../services/utilities';
import {
	searchAPI,
	antenatalAPI,
	bloodGroup,
	previousPregnancies,
	labourAPI,
} from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Error = ({ name }) => (
	<Field
		name={name}
		subscription={{ touched: true, error: true }}
		render={({ meta: { touched, error } }) =>
			touched && error ? <small className="text-danger">{error}</small> : null
		}
	/>
);

const ReactSelectAdapter = ({ input, ...rest }) => (
	<Select
		getOptionValue={option => option.id}
		getOptionLabel={option => option.name}
		{...input}
		{...rest}
		searchable
	/>
);

const EnrollmentForm = ({ history, location }) => {
	const [patient, setPatient] = useState(null);
	const [antenatal, setAntenatal] = useState(null);
	const [lmp, setLmp] = useState(null);

	const dispatch = useDispatch();

	const getPatientLabels = option => patientname(option, true);
	const getAncLabels = option =>
		`${option.serial_code} - ${patientname(option.patient)}`;

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}&gender=female`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getAncOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${antenatalAPI}/search?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		try {
			dispatch(startBlock());
			const data = {
				...values,
				father: {
					name: values?.name || '',
					phone: values?.phone || '',
					blood_group: values?.blood_group?.id ?? '',
				},
				alive: values?.alive?.id || '',
				miscarriage: values?.miscarriage?.id || '',
				present_pregnancies: values?.presentPregnancy?.id || '',
			};
			await request(labourAPI, 'POST', true, data);
			notifySuccess('labour enrollment done!');
			dispatch(stopBlock());
			history.push(
				location.hash ? `${location.pathname}#dashboard` : '/labour-mgt'
			);
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'labour enrollment failed');
		}
	};

	return (
		<div className="element-box">
			<div className="form-block">
				<Form
					onSubmit={onSubmit}
					validate={values => {
						const errors = {};
						if (!values.patient_id) {
							errors.patient_id = 'Select patient';
						}
						return errors;
					}}
				>
					{({ handleSubmit, submitting, values, submitError }) => (
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
								<div className="form-group col-sm-6">
									<label>Patient</label>
									<Field name="patient_id">
										{({ input, meta }) => (
											<AsyncSelect
												isClearable
												getOptionValue={option => option.id}
												getOptionLabel={getPatientLabels}
												defaultOptions
												value={patient}
												loadOptions={getOptions}
												onChange={e => {
													setPatient(e);
													e ? input.onChange(e.id) : input.onChange('');
												}}
												placeholder="Search patients"
											/>
										)}
									</Field>
									<Error name="patient_id" />
								</div>
								<div className="form-group col-sm-6">
									<label>Antenatal Enrolment (if any)</label>
									<Field name="antenatal_id">
										{({ input, meta }) => (
											<AsyncSelect
												isClearable
												getOptionValue={option => option.id}
												getOptionLabel={getAncLabels}
												defaultOptions
												value={antenatal}
												loadOptions={getAncOptions}
												onChange={e => {
													setAntenatal(e);
													e ? input.onChange(e.id) : input.onChange('');
												}}
												placeholder="Search antenatal enrolment"
											/>
										)}
									</Field>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-group">
										<label>Father's Name</label>
										<Field
											name="name"
											className="form-control"
											component="input"
											type="text"
											placeholder="Enter father's name"
										/>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Father's Phone Number</label>
										<Field
											name="phone"
											className="form-control"
											component="input"
											type="text"
											placeholder="Enter father's phone number"
										/>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Father's Blood Group</label>
										<Field
											name="blood_group"
											component={ReactSelectAdapter}
											options={bloodGroup}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-group">
										<label>Alive</label>
										<Field
											name="alive"
											component={ReactSelectAdapter}
											options={previousPregnancies}
										/>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Miscarriage</label>
										<Field
											name="miscarriage"
											component={ReactSelectAdapter}
											options={previousPregnancies}
										/>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Present Pregnancies</label>
										<Field
											name="presentPregnancy"
											component={ReactSelectAdapter}
											options={previousPregnancies}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label>LMP</label>
										<Field
											name="lmp"
											render={({ name, input: { onChange } }) => (
												<div className="custom-date-input">
													<DatePicker
														selected={lmp}
														onChange={date => {
															isValid(date)
																? onChange(format(new Date(date), 'dd-MM-yyyy'))
																: onChange(null);
															setLmp(date);
														}}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="dd-MM-yyyy"
														className="single-daterange form-control"
														placeholderText="Select LMP"
														maxDate={new Date()}
														name={name}
														disabledKeyboardNavigation
													/>
												</div>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button
										className="btn btn-primary"
										disabled={submitting}
										type="submit"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					)}
				</Form>
			</div>
		</div>
	);
};

export default EnrollmentForm;
