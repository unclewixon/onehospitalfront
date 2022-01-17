import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { request, patientname } from '../../services/utilities';
import { searchAPI, antenatalAPI } from '../../services/constants';

const Error = ({ name }) => (
	<Field
		name={name}
		subscription={{ touched: true, error: true }}
		render={({ meta: { touched, error } }) =>
			touched && error ? <small className="text-danger">{error}</small> : null
		}
	/>
);

const EnrollmentForm = () => {
	const [patient, setPatient] = useState(null);
	const [antenatal, setAntenatal] = useState(null);

	const getPatientLabels = option => patientname(option, true);
	const getAncLabels = option =>
		`${option.serial_code} - ${patientname(option)}`;

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
		console.log(values);
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
												placeholder="Search antenatals"
											/>
										)}
									</Field>
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
