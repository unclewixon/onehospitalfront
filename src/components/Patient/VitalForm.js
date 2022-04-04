import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import DatePicker from 'react-datepicker';

import { renderTextInput, renderSelect } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { loadVitals } from '../../actions/patient';
import moment from 'moment';
import { reset } from 'redux-form';
import { notifySuccess } from '../../services/notify';

const intervals = [
	{ id: 'Daily', name: 'Daily' },
	{ id: 'Weekly', name: 'Weekly' },
	{ id: 'Monthly', name: 'Monthly' },
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

	SubmitVitals = async data => {
		const { start_time } = this.state;
		const { type, vitals } = this.props;
		//console.log(start_time, type, data);

		vitals.forEach(function (value, i) {
			if (value.task === type) {
				vitals.splice(i, 1);
			}
		});
		let vitalsNew = {
			task: type,
			interval: data.every,
			intervalType: data.interval,
			taskCount: data.task_count,
			startTime: moment(start_time).format('DD-MM-YY'),
		};
		let vitalToSave = [...vitals, vitalsNew];

		this.props.loadVitals(vitalToSave);
		this.props.dispatch(reset('create_vitals'));
		notifySuccess('Vitals for ' + type + ' Created');
	};

	render() {
		const { submitting, start_time } = this.state;
		const { type, handleSubmit } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.SubmitVitals)}>
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
								data={intervals}
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
								type="submit"
							>
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
	form: 'create_vitals',
})(VitalForm);

const mapStateToProps = (state, ownProps) => {
	return {
		vitals: state.patient.vitals,
	};
};

export default connect(mapStateToProps, { loadVitals })(VitalForm);
