import React, { Component, lazy, Suspense } from 'react';
import Splash from '../../components/Splash';
import { API_URI, patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';

import { reduxForm } from 'redux-form';
import moment from 'moment';

const WifeLab = lazy(() => import('./WifeLab'));
const HusbandLab = lazy(() => import('./HusbandLab'));
const AssesmentInfo = lazy(() => import('./AssesmentInfo'));

const Others = lazy(() => import('./Others'));

class EnrollmentForm extends Component {
	state = {
		page: 1,
		submitting: false,
		patient_id: '',
		patient_name: '',
		lmpHx: '',
		dom: '',
		gest_date: '',
		dob: '',
		lmp: '',
	};

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};
	nextPage = async data => {
		console.log(this.state.patient_id);

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

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
	};

	render() {
		const { page, submitting } = this.state;
		return (
			<div className="element-box">
				<Suspense fallback={<Splash />}>
					{page === 3 && (
						<AssesmentInfo
							onSubmit={this.nextPage}
							previousPage={this.previousPage}
							page={page}
						/>
					)}

					{page === 1 && <WifeLab onSubmit={this.nextPage} page={page} />}

					{page === 2 && (
						<HusbandLab
							onSubmit={this.nextPage}
							previousPage={this.previousPage}
							page={page}
						/>
					)}

					{page === 4 && (
						<Others
							onSubmit={this.nextPage}
							previousPage={this.previousPage}
							page={page}
						/>
					)}
				</Suspense>
			</div>
		);
	}
}

EnrollmentForm = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EnrollmentForm);
const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(EnrollmentForm));
