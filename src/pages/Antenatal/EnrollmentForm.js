import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Splash from '../../components/Splash';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const General = lazy(() => import('../../components/Enrollment/General'));
const FathersInfo = lazy(() =>
	import('../../components/Enrollment/FathersInfo')
);
const ObstericsHistory = lazy(() =>
	import('../../components/Enrollment/ObstericsHistory')
);
const PreviousPregnancies = lazy(() =>
	import('../../components/Enrollment/PreviousPregnancies')
);
const EnrollmentPackages = lazy(() =>
	import('../../components/Enrollment/EnrollmentPackages')
);

class EnrollmentForm extends Component {
	state = {
		page: 1,
		submitting: false,
		patient: null,
		doctors: [],
		lmp: '',
		dob: '',
	};

	submitAntenatal = async data => {
		try {
			this.props.startBlock();
			const { history, location, reset } = this.props;
			this.setState({ submitting: true });
			const url = 'patient/antenatal/save';
			await request(url, 'POST', true, data);
			this.setState({ submitting: false });
			notifySuccess('antenatal enrollment done!');
			reset('antenatal');
			this.props.stopBlock();
			history.push(
				location.hash ? `${location.pathname}#dashboard` : '/antenatal'
			);
		} catch (e) {
			this.props.stopBlock();
			this.setState({ submitting: false });
			notifyError(e.message || 'antenatal enrollment failed');
		}
	};

	setInput = (value, type) => {
		this.setState({ [type]: value });
	};

	nextPage = async data => {
		console.log(data);

		if (this.state.page === 5) {
			const { patient, doctors, lmp, dob } = this.state;

			const newAntenatal = {
				patient_id: patient.id,
				bookingPeriod: data.bookingPeriod,
				doctors: doctors,
				lmp: lmp !== '' ? moment(lmp).format('YYYY-MM-DD') : '',
				lmpSource: data.lmpSource,
				edd:
					lmp !== ''
						? moment(lmp)
								.add(9, 'M')
								.format('YYYY-MM-DD')
						: '',
				father: {
					name: data.name,
					phone: data.phone,
					blood_group: data.blood_group,
				},
				history: {
					obstericHistory: {
						gestHistory: data.gestHistory || '',
						sex: data.sex || '',
						weight: data.weight || '',
						alive: data.obsteric_alive || '',
						dob: dob ? moment(dob).format('DD-MM-YYYY') : '',
						abnormalities: data.abnormalities || '',
						comment: data.additional_comment || '',
					},
				},
				previousPregnancy: {
					gravida: data.gravida || '',
					para: data.para || '',
					alive: data.alive || '',
					miscarriage: data.miscarriage || '',
					abortion: data.abortion || '',
				},
				enrollment_package_id: data.package_id,
			};

			console.log(newAntenatal);

			this.submitAntenatal(newAntenatal);
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

	setPatient = patient => {
		this.setState({ patient });
	};

	setDoctors = doctors => {
		this.setState({ doctors });
	};

	render() {
		const { page, submitting, patient, lmp, doctors, dob } = this.state;
		return (
			<div className="element-box">
				<Suspense fallback={<Splash />}>
					{page === 1 && (
						<General
							onSubmit={this.nextPage}
							page={page}
							setPatient={this.setPatient}
							patient={patient}
							setDoctors={this.setDoctors}
							doctors={doctors}
							setInput={this.setInput}
							lmp={lmp}
						/>
					)}
					{page === 2 && (
						<FathersInfo
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							page={page}
						/>
					)}

					{page === 3 && (
						<ObstericsHistory
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							setInput={this.setInput}
							dob={dob}
							page={page}
						/>
					)}
					{page === 4 && (
						<PreviousPregnancies
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							page={page}
						/>
					)}

					{page === 5 && (
						<EnrollmentPackages
							submitting={submitting}
							previousPage={this.previousPage}
							page={page}
							doSubmit={this.nextPage}
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

export default withRouter(
	connect(mapStateToProps, { startBlock, stopBlock })(EnrollmentForm)
);
