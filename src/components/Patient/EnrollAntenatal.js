import React, { Component, Suspense } from 'react';
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
import Splash from '../Splash';
import EnrollmentForm from '../Enrollment/EnrollmentForm';
import AntennatalRequest from './AntennatalRequest';

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

class EnrollAntenatal extends Component {
	state = {
		submitting: false,
		discharged_date: null,
	};
	render() {
		return (
			<div className="col-sm-12">
				<AntennatalRequest />;
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentStep: state.patient.formStep,
	};
};

export default connect(mapStateToProps, { createClinicalTask })(
	EnrollAntenatal
);
