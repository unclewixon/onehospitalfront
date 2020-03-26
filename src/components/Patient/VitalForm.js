import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import DatePicker from 'react-datepicker';

import { renderTextInput, renderSelect } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
// import DateTimePicker from 'react-datetime-picker';

const religions = [
	{ label: 'Atheist', value: 'Atheist' },
	{ label: 'Buddhism', value: 'Buddhism' },
	{ label: 'Christianity', value: 'Christianity' },
	{ label: 'Hinduism', value: 'Hinduism' },
	{ label: 'Islam', value: 'Islam' },
];
class VitalForm extends Component {
	state = {
		submitting: false,
		start_time: new Date(),
	};

	onChange = date => this.setState({ start_time: date });

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};
	render() {
		const { submitting, start_time } = this.state;
		const { type } = this.props;
		console.log(type);

		return (
			<div>
				<form>
					<div className="row">
						{type === 'Others' ? (
							<div className="col-sm-12">
								<Field
									id="task_description"
									name="task_description"
									component={renderTextInput}
									label="Task Description"
									placeholder="Enter task description"
								/>
							</div>
						) : null}
						<div className="col-sm-6">
							<Field
								id="every"
								name="every"
								component={renderTextInput}
								label="Every"
								placeholder=""
							/>
						</div>
						<div className="col-sm-6">
							<Field
								id="interval"
								name="interval"
								component={renderSelect}
								label="Interval"
								placeholder="Select interval"
								data={religions}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="task_count"
								name="task_count"
								component={renderTextInput}
								label="Task Count"
								placeholder="Enter text count"
							/>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label>Start Time</label>
								<div className="custom-date-input">
									<DatePicker
										selected={start_time}
										onChange={date => this.setDate(date, 'start_time')}
										showTimeSelect
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy h:mm aa"
										className="single-daterange form-control"
										placeholderText="Select start time"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-right">
							<button
								className="btn btn-primary"
								disabled={submitting}
								type="submit">
								{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

VitalForm = reduxForm({
	form: 'create_staff',
})(VitalForm);
export default connect(null, null)(VitalForm);
