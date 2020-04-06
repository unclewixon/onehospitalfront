import React, { Component } from 'react';

import GeneralAssessment from '../MutlistepForms/GeneralAssessment';
import GeneralComments from '../MutlistepForms/GeneralComments';
import LabInvestigation from '../MutlistepForms/LabInvestigation';
import RadiologicalInvestigation from '../MutlistepForms/RadiologicalInvestigation';
import Prescription from '../MutlistepForms/Prescription';
import NextAppointment from '../MutlistepForms/NextAppointment';
import EnrollmentForm from '../Enrollment/EnrollmentForm';
class EnrollAntenatalPatient extends Component {
	state = {
		page: 1,
		submitting: false,
	};

	nextPage = () => {
		if (this.state.page === 6) {
			this.setState(prevState => {
				return {
					...prevState,
					submitting: !prevState.submitting,
				};
			});

			return;
		}
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page + 1,
			};
		});
	};
	previousPage = () => {
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page - 1,
			};
		});
	};
	render() {
		const { page, submitting } = this.state;

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Enroll Antenatal</h6>
					<EnrollmentForm />
				</div>
			</div>
		);
	}
}

// EnrollPatient.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// };

export default EnrollAntenatalPatient;
