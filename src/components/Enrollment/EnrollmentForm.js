import React, { Component, lazy, Suspense } from 'react';
import Splash from '../../components/Splash';
import { patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';

import { reduxForm } from 'redux-form';
import moment from 'moment';
const General = lazy(() => import('./General'));
const FathersInfo = lazy(() => import('./FathersInfo'));
const ObstericsHistory = lazy(() => import('./ObstericsHistory'));
const PreviousPregnancies = lazy(() => import('./PreviousPregnancies'));
const EnrollmentPackages = lazy(() => import('./EnrollmentPackages'));
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

	submitAntennatal = async data => {
		await this.setState({ submitting: true });

		try {
			const rs = await request(
				`${patientAPI}/antenatal/save`,
				'POST',
				true,
				data
			);

			const { history, location, reset } = this.props;
			this.setState({
				submitting: false,
			});
			console.log(rs);

			notifySuccess('New antennatal succesfully submitted');
			reset();
			this.setState({ patient_id: '' });

			// this.props.addStaff(rs);
			history.push(
				location.hash ? `${location.pathname}#dashboard` : '/antenatal'
			);
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(e.message || 'Submission of antennatal form not successful');
		}
	};

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};
	nextPage = async data => {
		console.log(this.state.patient_id);

		if (this.state.page === 5) {
			console.log(data);
			const newAntennatal = {
				patient_id: this.props.location.hash
					? this.props.patient.id
					: this.state.patient_id,
				enrollmentPackage: data.package,
				bookingPeriod: data.bookingPeriod,
				requiredCare: data.requiredCare,
				l_m_p: this.state.lmp
					? moment(this.state.lmp).format('DD-MM-YYYY')
					: '',
				lmpSource: data.lmpSource,
				e_o_d: this.state.lmp
					? moment(this.state.lmp)
							.add(9, 'M')
							.format('DD-MM-YYYY')
					: '',
				fathersInfo: {
					name: data.name,
					phone_number: data.phone,
					blood_group: data.blood_group,
				},
				obstericsHistory: {
					familyHistory: {
						childHealthHistory: data.childHealthHistory || '',
						adultHealthHistory: data.adultHealthHistory || '',
						hereditaryDisease: data.hereditaryDisease || '',
						motherHealthStatus: data.motherHealthStatus || '',
						motherAgeOfDeath: data.motherAgeOfDeath || '',
						motherCauseOfDeath: data.motherCauseOfDeath || '',
						fatherHealthStatus: data.fatherHealthStatus || '',
						fatherAgeOfDeath: data.fatherAgeOfDeath || '',
						fatherCauseOfDeath: data.fatherCauseOfDeath || '',
						siblingHealthStatus: data.siblingHealthStatus || '',
						siblingAgeOfDeath: data.siblingAgeOfDeath || '',
						siblingCauseOfDeath: data.siblingCauseOfDeath || '',
					},
					socialHistory: {
						maritalStatus: data.maritalStatus || '',
						occupation: data.occupation || '',
						homeEnvironment: data.homeEnvironment || '',
						dailyRoutine: data.dailyRoutine || '',
						dietaryPattern: data.dietaryPattern || '',
						motherAgeOfDeath: data.motherAgeOfDeath || '',
						exercisePattern: data.exercisePattern || '',
						sleepPattern: data.sleepPattern || '',
						coffeConsumption: data.coffeConsumption || '',
						alcoholUse: data.alcoholUse || '',
						drugUse: data.drugUse || '',
					},
					gynaeHistory: {
						menarche: data.menarche || '',
						menstralCycle: data.menstralCycle || '',
						lmp: this.state.lmpHx
							? moment(this.state.lmpHx).format('DD-MM-YYYY')
							: '',
						contraception: data.contraception || '',
						contraceptionMethod: data.contraceptionMethod || '',
						dysmenorrhea: data.dysmenorrhea || '',
						abnormalBleeding: data.abnormalBleeding || '',
					},
					obstericHistory: {
						gestHistory: data.gestHistory || '',
						sex: data.sex || '',
						weight: data.weight || '',
						alive: data.obsteric_alive || '',
						dob: this.state.dob
							? moment(this.state.dob).format('DD-MM-YYYY')
							: '',
						abnormalities: data.abnormalities || '',
						comment: data.additional_comment || '',
					},
					sexualHistory: {
						coitarche: data.coitarche || '',
						noOfPartners: data.noOfPartners || '',
						methodOfSex: data.methodOfSex || '',
						currentPartnerHealth: data.currentPartnerHealth || '',
						dyspareunia: data.dyspareunia || '',
						satisfaction: data.satisfaction || '',
						historyOfAbuse: data.historyOfAbuse || '',
					},
					gynaePapMearHistory: {
						abnormalPapSmear: data.abnormalPapSmear || '',
						followupTreatment: data.followup || '',
					},
					f_g_m: {
						f_g_m: data.f_g_m || '',
						fgmType: data.fgmType || '',
					},
					pastOcularHistory: {
						ocularTrauma: data.ocularTrauma || '',
						spectacleCorrection: data.spectacleCorrection || '',
						ocularSurgery: data.ocularSurgery || '',
						ocularMedication: data.ocularMedication || '',
						traditionalMedication: data.traditionalMedication || '',
						lastEyeExam: data.lastEyeExam || '',
						others: data.past_others || '',
					},
					physicalExam: {
						codema: data.codema || '',
						breast: data.breast || '',
						goitre: data.goitre || '',
						teeth: data.teeth || '',
						nutrition: data.nutrition || '',
						anemia: data.anemia || '',
						cvs: data.cvs || '',
						comment: data.physicalExamComment || '',
					},
					initialAssessment: {
						menarche: data.initialMenarche || '',
						menstralCycle: data.initialMenstralCycle || '',
						dateOfMovement: this.state.dom
							? moment(this.state.dom).format('DD-MM-YYYY')
							: '',
						w_r: data.w_r || '',
						height: data.initHeight || '',
						weight: data.initWeight || '',
						heightOfFundus: data.height_of_fundus || '',
						engaged: data.engaged || '',
					},
					labObservations: {
						hb: data.h_b || '',
						hbsag: data.hbsag || '',
						hiv: data.hiv || '',
						vdrl: data.vdrl || '',
						urinalysis: data.urinalysis || '',
						comment: data.lab_comment || '',
					},
					routineAssessments: {
						gestDate: this.state.gest_date
							? moment(this.state.gest_date).format('DD-MM-YYYY')
							: '',
						heightOfFundus: data.routine_height_of_fundus || '',
						position: data.position || '',
						fetalHeart: data.fetal_heart || '',
						weight: data.routineWeight || '',
						oedema: data.oedema || '',
					},
				},
				previousPregnancy: {
					gravida: data.gravida || '',
					para: data.para || '',
					alive: data.alive || '',
					miscarriage: data.miscarriage || '',
					abortion: data.abortion || '',
				},
			};

			console.log(newAntennatal);

			this.submitAntennatal(newAntennatal);
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

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
	};

	render() {
		const { page, submitting } = this.state;
		return (
			<div className="element-box">
				<Suspense fallback={<Splash />}>
					{page === 1 && (
						<General
							onSubmit={this.nextPage}
							page={page}
							setPatient={this.setPatient}
							name={this.state.patient_name}
							lmp={this.state.lmp}
							setDate={this.setDate}
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
							lmpHx={this.state.lmpHx}
							dob={this.state.dob}
							gest_date={this.state.gest_date}
							dom={this.state.dom}
							setDate={this.setDate}
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
