/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';

import {
	renderTextInput,
	renderSelect,
	patientname,
	staffname,
} from '../../services/utilities';
import { request } from '../../services/utilities';
import { searchAPI, lmpSource, bookingPeriod } from '../../services/constants';

const validate = values => {
	const errors = {};
	return errors;
};

const General = ({
	location,
	handleSubmit,
	onSubmit,
	error,
	page,
	setPatient,
	patient,
	setInput,
	lmp,
	setDoctors,
	doctors,
}) => {
	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}&gender=female`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getOptionValuesStaff = option => option.id;
	const getOptionLabelsStaff = option => staffname(option);

	const getOptionsStaff = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}&profession=Doctor`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<>
			<h6 className="element-header">Step {page}. General</h6>
			<div className="form-block">
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && (
						<div
							className="alert alert-danger"
							dangerouslySetInnerHTML={{
								__html: `<strong>Error!</strong> ${error}`,
							}}
						/>
					)}

					{location.hash ? null : (
						<div className="row">
							<div className="form-group col-sm-12">
								<label>Patient</label>

								<AsyncSelect
									isClearable
									getOptionValue={getOptionValues}
									getOptionLabel={getOptionLabels}
									defaultOptions
									name="patient"
									value={patient}
									loadOptions={getOptions}
									onChange={e => setPatient(e)}
									placeholder="Search patients"
								/>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-sm-6">
							<Field
								id="bookingPeriod"
								name="bookingPeriod"
								component={renderSelect}
								label="Indication for booking"
								placeholder="Select bookings"
								data={bookingPeriod}
							/>
						</div>

						<div className="col-sm-6">
							<label>Doctor</label>
							<AsyncSelect
								isClearable
								isMulti
								getOptionValue={getOptionValuesStaff}
								getOptionLabel={getOptionLabelsStaff}
								defaultOptions
								name="doctors"
								value={doctors}
								loadOptions={getOptionsStaff}
								onChange={e => setDoctors(e)}
								placeholder="Search doctors"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<label>LMP</label>
								<div className="custom-date-input">
									<DatePicker
										selected={lmp}
										onChange={date => setInput(date, 'lmp')}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy"
										className="single-daterange form-control"
										placeholderText="Select LMP"
										maxDate={new Date()}
										required
									/>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<Field
								id="lmpSource"
								name="lmpSource"
								component={renderSelect}
								label="Select LMP Source"
								placeholder="Select lmp source"
								data={lmpSource}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<Field
								id="edd"
								name="edd"
								component={renderTextInput}
								value={lmp ? moment(lmp).add(9, 'M').format('DD-MM-YYYY') : ''}
								label="EDD"
								type="text"
								placeholder={
									lmp ? moment(lmp).add(9, 'M').format('DD-MM-YYYY') : ''
								}
								readOnly
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default withRouter(
	connect(null)(
		reduxForm({
			form: 'antenatal',
			destroyOnUnmount: false,
			forceUnregisterOnUnmount: true,
			validate,
		})(General)
	)
);
