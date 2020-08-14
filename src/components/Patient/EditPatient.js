import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	renderMultiselect,
} from '../../services/utilities';
import { socket } from '../../services/constants';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { createClinicalTask } from '../../actions/general';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';
import Popover from 'antd/lib/popover';

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

class EditPatient extends Component {
	state = {
		submitting: false,
		discharged_date: null,
	};
	render() {
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Admit Patient</h6>
					<div className="element-box">
						<div className="form-block w-100">
							{this.props.currentStep === 1 ? (
								<PatientForm />
							) : (
								<PatientNOKForm />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentStep: state.patient.formStep,
	};
};

export default connect(mapStateToProps, { createClinicalTask })(EditPatient);
