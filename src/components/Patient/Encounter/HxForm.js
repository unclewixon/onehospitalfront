import React, { Component } from 'react';
import { renderSelect } from '../../../services/utilities';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';

import { FamilyHistory } from '../../Enrollment/FamilyHistory';
import { SocialHistory } from '../../Enrollment/SocialHistory';
import GynaeHistory from '../../Enrollment/GynaeHistory';
import { ObstericHistory } from '../../Enrollment/ObstericHistory';
import { SexualHistory } from '../../Enrollment/SexualHistory';
import { GynaePap } from '../../Enrollment/GynaePap';
import { FGM } from '../../Enrollment/FGM';
import { PastOcular } from '../../Enrollment/PastOcular';
import { PhysicalExam } from '../../Enrollment/PhysicalExam';
import { InitialAssessment } from '../../Enrollment/InitialAssessment';
import { LabObservation } from '../../Enrollment/LabObservation';
import { RoutineAssessment } from '../../Enrollment/RoutineAssessment';
import { obstericHistory } from '../../../services/constants';
import { validateAntennatal } from '../../../services/validationSchemas';
import moment from 'moment';

const selector = formValueSelector('antennatal');
const validate = validateAntennatal;

class HxForm extends Component {
	state = {
		lmpHx: '',
		dom: '',
		gest_date: '',
		dob: '',
		lmp: '',
	};

	//const { encounterData, previous, next, encounterForm, handleSubmit, error, value } = this.props;

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};
	obstHistory = value => {
		let { lmpHx, dom, gest_date, dob } = this.state;
		switch (value) {
			case 'Family History':
				return <FamilyHistory />;
			case 'Social History':
				return <SocialHistory />;
			case 'Gynae History':
				return <GynaeHistory setLmpHx={this.setDate} lmpHx={lmpHx} />;
			case 'Obsteric History':
				return <ObstericHistory setDate={this.setDate} dob={dob} />;
			case 'Sexual History':
				return <SexualHistory />;
			case 'Gynae Pap-Mear History':
				return <GynaePap />;
			case 'FGM':
				return <FGM />;
			case 'Past Ocular History':
				return <PastOcular />;
			case 'Antenatal General/Physical Examination':
				return <PhysicalExam />;
			case 'Antenatal Initial Assessment':
				return <InitialAssessment dom={dom} setDom={this.setDate} />;
			case 'Antenatal Lab Observations':
				return <LabObservation />;
			case 'Antenatal Routine Assessments':
				return (
					<RoutineAssessment gest_date={gest_date} setGest={this.setDate} />
				);
			default:
				break;
		}
	};

	onSubmit = async data => {
		const obstericsHistory = {
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
				dob: this.state.dob ? moment(this.state.dob).format('DD-MM-YYYY') : '',
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
		};
		const { encounterData, next } = this.props;
		encounterData.patientHistory = obstericsHistory || [];
		//encounterData.patientHistory =  [];
		this.props.loadEncounterData(encounterData);
		this.props.dispatch(next);
	};

	render() {
		const { handleSubmit, previous, error, value } = this.props;

		return (
			<>
				<div className="form-block">
					<form onSubmit={handleSubmit(this.onSubmit)}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}

						<div className="row">
							<div className="col-sm-12">
								<Field
									id="obstericsHistory"
									name="obstericsHistory"
									component={renderSelect}
									label="Select Previous Obsteric History"
									placeholder="Select Previous Obsteric History"
									data={obstericHistory}
								/>
							</div>
						</div>

						<div className="row">{this.obstHistory(value)}</div>

						<div className="row mt-5">
							<div className="col-sm-12 d-flex ant-row-flex-space-between">
								<button
									type="button"
									className="btn btn-primary"
									onClick={previous}>
									Previous
								</button>
								<button className="btn btn-primary" type="submit">
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}

HxForm = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(HxForm);

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
		value: selector(state, 'obstericsHistory'),
	};
};
export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(HxForm);
