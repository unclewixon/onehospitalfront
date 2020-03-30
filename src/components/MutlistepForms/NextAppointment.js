import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	request,
	renderSelect,
	renderDateTimePicker,
	renderTimePicker,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'react-datepicker';

const fetal = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
class NextAppointment extends Component {
	render() {
		const { handleSubmit, previousPage, submitting, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. Next Appointment</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}

						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>APPOINTMENT DATE</label>
									<Field
										name="appointment_dates"
										showTime={false}
										component={renderDateTimePicker}
										placeholder="YYYY/MM/DD"
										minDate={new Date()}
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Appointment Time</label>
									<Field
										name="appointment_dates"
										showTime={false}
										component={renderTimePicker}
										placeholder="Pick Time"
									/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Field
									id="location"
									name="location"
									component={renderSelect}
									label="Select location"
									placeholder="Select location"
									data={fetal}
								/>
							</div>
							<div className="col-sm-6">
								<Field
									id="clinic"
									name="clinic"
									component={renderSelect}
									label="Select Clinic"
									placeholder="Select Clinic"
									data={fetal}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									type="button"
									onClick={previousPage}>
									Previous
								</button>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										'Create Antennatal'
									)}
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}
NextAppointment = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(NextAppointment);

export default NextAppointment;
