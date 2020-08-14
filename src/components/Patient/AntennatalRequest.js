import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import { patientAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import GeneralAssessment from '../MutlistepForms/GeneralAssessment';
import GeneralComments from '../MutlistepForms/GeneralComments';
import LabInvestigation from '../MutlistepForms/LabInvestigation';
import RadiologicalInvestigation from '../MutlistepForms/RadiologicalInvestigation';
import Prescription from '../MutlistepForms/Prescription';
import NextAppointment from '../MutlistepForms/NextAppointment';

class AntennatalRequest extends Component {
	state = {
		page: 1,
		submit: false,
		apointmentDate: '',
		pharmacyRequest: [],
	};

	nextPage = async data => {
		if (this.state.page === 6) {
			let scan = data.scansToRequest ? data.scansToRequest : [];
			let scans = [];
			if (scan.length !== 0) {
				scans = this.props.service
					.filter(el => el.category.id === data.serviceCenter)
					.filter(el => scan.includes(el.name))
					.map(el => ({ specialization: el.name, service_id: el.id }));
			}

			console.log(data.tests, data.groups, scans);
			let grps = data.groups ? data.groups : [];
			let tsts = data.tests ? data.tests : [];

			const groups = this.props.LabGroups.filter(el =>
				grps.includes(el.name)
			).map(el => {
				return {
					specialization: el.name,
					service_id: el.id,
				};
			});

			const tests = this.props.LabTests.filter(el =>
				tsts.includes(el.name)
			).map(el => {
				return {
					specialization: el.name,
					service_id: el.id,
				};
			});

			const newAntenatal = {
				heightOfFunds: data.heightOfFunds || '',
				fetalHeartRate: data.fetalHeartRate || '',
				positionOfFetus: data.positionOfFetus || '',
				fetalLie: data.fetalLie || '',
				patient_id: this.props.patient.id,
				relationshipToBrim: data.relationshipToBrim || '',
				comment: data.comment || '',
				labRequest: {
					requestBody: {
						groups,
						tests,
						preferredSpecimen: data.preferredSpecimen || '',
						laboratory: data.laboratory || '',
					},
				},
				imagingRequest: {
					requestNote: data.requestNote || '',
					requestBody: scans,
				},
				pharmacyRequest: {
					requestBody: this.state.pharmacyRequest,
				},

				nextAppointment: {
					apointmentDate:
						moment(this.state.apointmentDate).format('L') +
						' ' +
						moment(this.state.apointmentDate).format('LT'),
				},
			};

			console.log(newAntenatal);

			console.dir(JSON.stringify(newAntenatal));
			try {
				const rs = await request(
					`${patientAPI}/antenatal/visits`,
					'POST',
					true,
					newAntenatal
				);
				console.log(rs);
				const { history, location, reset } = this.props;

				notifySuccess('Antennatal Assessment succesfully submitted');
				reset();

				history.push(
					location.hash ? `${location.pathname}#dashboard` : '/antennatal'
				);
			} catch (e) {
				this.setState({ submitting: false });
				notifyError(
					e.message || 'Submission of antennatal form not successful'
				);
			}

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

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};

	setPrescription = pres => {
		this.setState(prevState => ({
			pharmacyRequest: [...pres],
		}));
	};

	render() {
		const { page, submit, apointmentDate } = this.state;
		const { submitting } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Antennal Assessment</h6>
					<div className="element-box">
						{page === 1 && (
							<GeneralAssessment onSubmit={this.nextPage} page={page} />
						)}
						{page === 2 && (
							<GeneralComments
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
								page={page}
							/>
						)}
						{page === 3 && (
							<LabInvestigation
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
								page={page}
							/>
						)}
						{page === 4 && (
							<RadiologicalInvestigation
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
								page={page}
							/>
						)}
						{page === 5 && (
							<Prescription
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
								page={page}
								pharmacyRequest={this.state.pharmacyRequest}
								setPrescription={this.setPrescription}
							/>
						)}
						{page === 6 && (
							<NextAppointment
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
								setDate={this.setDate}
								apointmentDate={apointmentDate}
								page={page}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

// AntennatalRequest.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// };
AntennatalRequest = reduxForm({
	form: 'antennatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(AntennatalRequest);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		LabTests: state.settings.lab_tests,
		LabGroups: state.settings.lab_groups,
		ServiceCategories: state.settings.service_categories,
		service: state.settings.services,
	};
};

export default withRouter(connect(mapStateToProps, {})(AntennatalRequest));
