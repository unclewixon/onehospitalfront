import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import searchingGIF from '../assets/images/searching.gif';
import { renderTextInput, renderTextArea } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

class CreateExcuseDuty extends Component {
	state = {
		submitting: false,
	};
	render() {
		const { error, reset } = this.props;
		const { submitting } = this.state;
		return (
			<div className="element-wrapper my-4">
				<h6 className="element-header"> Create Excuse Duty</h6>
				<div className="element-box">
					<div className="form-block">
						<form>
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
									<Field
										id="staff_name"
										name="staff_name"
										component={renderTextInput}
										type="text"
										label="Staff ID/Name"
										placeholder="Search staff by id or name"
									/>
								</div>
								<div className="col-sm-6">
									<Field
										id="exempted_days"
										name="exempted_days"
										component={renderTextInput}
										label="Exempted for day:"
										type="text"
										placeholder="Enter number of days for exemption"
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<label>Date</label>
									<RangePicker defaultValue={[moment(), moment()]} />
								</div>
								<div className="col-sm-6">
									<Field
										id="diagnosis"
										name="diagnosis"
										component={renderTextInput}
										type="text"
										label="Diagnosis"
										placeholder="Search diagnosis"
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<Field
										id="consulting_doctor"
										name="consulting_doctor"
										component={renderTextInput}
										label="Consulting doctor"
										type="text"
										readOnly={true}
									/>
								</div>
							</div>

							<div className="row mt-2">
								<div className="col-sm-12 text-right">
									<button
										className="btn btn-primary"
										disabled={submitting}
										type="submit">
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Save'
										)}
									</button>

									<button
										className="btn btn-primary ml-2"
										onClick={reset}
										type="button">
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CreateExcuseDuty = reduxForm({
	form: 'create_excuse_duty',
})(CreateExcuseDuty);
export default CreateExcuseDuty;
