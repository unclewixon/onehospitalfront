import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
    renderSelect,renderTextArea
} from '../services/utilities';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import waiting from '../assets/images/waiting.gif';

const validate = values => {
	const errors = {};

	if (!values.leave_type || values.leave_type === '') {
		errors.leave_type = 'select leave type';
	}
	if (!values.reason || values.reason === '') {
		errors.reason = 'please specify you reason';
	}


	return errors;
};
class CreateLeave extends Component {
	state = {
		submitting: false,
		leave_date: null,
		leave_return: null,
    };
    
    setDate = (date, type) => {
        this.setState({ [type]: date });
    };

	render() {
        const { error, leave_categories } = this.props;
        const {
            submitting,
            leave_date,
            leave_return
        } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Create New Leave Request</h6>
						<div className="element-box">
                            <div className="form-block">
                                <form >
                                    {error && (
                                        <div
                                            className="alert alert-danger"
                                            dangerouslySetInnerHTML={{
                                                __html: `<strong>Error!</strong> ${error}`,
                                            }}
                                        />
                                    )}
                                    <div className="row">                                                                             
                                        <div className="col-sm-4">
                                            <Field
                                                id="leave_type"
                                                name="leave_type"
                                                component={renderSelect}
                                                label="Leave Type"
                                                placeholder="Select leave type"
                                                data={leave_categories}
                                            />
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label>Appointment (Date/time)</label>
                                                <div className="custom-date-input">
                                                    <DatePicker
                                                        selected={leave_date}
                                                        onChange={(date) =>
                                                            this.setDate(date, 'leave_date')
                                                        }
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        dateFormat="dd-MMM-yyyy"
                                                        className="single-daterange form-control"
                                                        placeholderText="Select date of leave"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label>Date of leave return </label>
                                                <div className="custom-date-input">
                                                    <DatePicker
                                                        selected={leave_return}
                                                        onChange={(date) =>
                                                            this.setDate(date, 'leave_return')
                                                        }
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        dateFormat="dd-MMM-yyyy"
                                                        className="single-daterange form-control"
                                                        placeholderText="Select date of leave return"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                             
                                        
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Field
                                                id="reason"
                                                name="reason"
                                                component={renderTextArea}
                                                label="Leave Reason"
                                                type="text"
                                                placeholder="Enter your leave reason"
                                            />
                                        </div>
                                    </div>
                                   
                                                                 
                                    <div className="row">
                                        <div className="col-sm-12 text-right">
                                            <button
                                                className="btn btn-primary"
                                                disabled={submitting}
                                                type="submit">
                                                {submitting ? (
                                                    <img src={waiting} alt="submitting" />
                                                ) : (
                                                        'Create leave request'
                                                    )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
					</div>
				</div>
			</div>
		);
	}
}

CreateLeave = reduxForm({
	form: 'create_staff',
	validate,
})(CreateLeave);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			leave_type: '',
			date: '',
			date_return: '',
			reason: '',
		},
		leave_categories: state.settings.leave_categories,
	};
};
export default connect(mapStateToProps, null)(CreateLeave);
