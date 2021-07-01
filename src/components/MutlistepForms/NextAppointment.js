import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import { reduxForm } from 'redux-form';
import waiting from '../../assets/images/waiting.gif';

import DatePicker from 'react-datepicker';

class NextAppointment extends Component {
	render() {
		const {
			handleSubmit,
			previousPage,
			submitting,
			error,
			page,
			apointmentDate,
			setDate,
		} = this.props;
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
							{/* <div className="col-sm-6">
								<div className="form-group">
									<label>APPOINTMENT DATE</label>
									<Field
										name="apointmentDate"
										showTime={true}
										component={renderTimePicker}
										placeholder="YYYY/MM/DD"
										minDate={new Date()}
									/>
								</div>
							</div> */}

							<div className="col-sm-12">
								<div className="form-group">
									<label> Next Appointment Date</label>
									<div className="custom-date-input">
										<DatePicker
											selected={apointmentDate}
											onChange={date => setDate(date, 'apointmentDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											className="single-daterange form-control"
											placeholderText="Select next appoint date and time"
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											showTimeInput
											minDate={new Date()}
											required
										/>
									</div>
								</div>
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
										'Create Antenatal'
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
	form: 'antenatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(NextAppointment);

export default NextAppointment;
