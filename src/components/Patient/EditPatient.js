import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createClinicalTask } from '../../actions/general';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';

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
