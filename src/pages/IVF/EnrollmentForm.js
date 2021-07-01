import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import Splash from '../../components/Splash';

const WifeLab = lazy(() => import('../../components/IVF/WifeLab'));
const HusbandLab = lazy(() => import('../../components/IVF/HusbandLab'));
const AssesmentInfo = lazy(() => import('../../components/IVF/AssesmentInfo'));
const Others = lazy(() => import('../../components/IVF/Others'));

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

	setDate = (date, type) => {
		this.setState({ [type]: date });
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
		const { page } = this.state;
		return (
			<div className="element-box">
				<Suspense fallback={<Splash />}>
					{page === 1 && <WifeLab onSubmit={this.nextPage} page={page} />}

					{page === 2 && (
						<HusbandLab
							onSubmit={this.nextPage}
							previousPage={this.previousPage}
							page={page}
						/>
					)}

					{page === 3 && (
						<AssesmentInfo
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
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EnrollmentForm);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(EnrollmentForm));
