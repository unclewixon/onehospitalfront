/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { API_URI, patientAPI, vitalItems } from '../../services/constants';
import { getData, request } from '../../services/utilities';
import { addVital } from '../../actions/vitals';
import { connect } from 'react-redux';
import configureStore from '../../store';

const BMI = lazy(() => import('../Vitals/BMI'));
const BloodPressure = lazy(() => import('../Vitals/BloodPressure'));
const Dilation = lazy(() => import('../Vitals/Dilation'));
const FetalHeartRate = lazy(() => import('../Vitals/FetalHeartRate'));
const FundusHeight = lazy(() => import('../Vitals/FundusHeight'));
const BSA = lazy(() => import('../Vitals/BSA'));
const Glucose = lazy(() => import('../Vitals/Glucose'));
const HeadCircumference = lazy(() => import('../Vitals/HeadCircumference'));
const Height = lazy(() => import('../Vitals/Height'));
const LengthOfArm = lazy(() => import('../Vitals/LengthOfArm'));
const MidArmCircumference = lazy(() => import('../Vitals/MidArmCircumference'));
const MUAC = lazy(() => import('../Vitals/MUAC'));
const PainScale = lazy(() => import('../Vitals/PainScale'));
const PCV = lazy(() => import('../Vitals/PCV'));
const Protein = lazy(() => import('../Vitals/Protein'));
const Pulse = lazy(() => import('../Vitals/Pulse'));
const Respiration = lazy(() => import('../Vitals/Respiration'));
const SPO = lazy(() => import('../Vitals/SPO'));
const SurfaceArea = lazy(() => import('../Vitals/SurfaceArea'));
const Temperature = lazy(() => import('../Vitals/Temperature'));
const Urine = lazy(() => import('../Vitals/Urine'));
const Weight = lazy(() => import('../Vitals/Weight'));

const Page = ({ type, allVitals }) => {
	switch (type) {
		case 'Urine':
			return <Urine allVitals={allVitals} />;
		case 'Weight':
			return <Weight allVitals={allVitals} />;
		case 'Temperature':
			return <Temperature allVitals={allVitals} />;
		case 'Surface Area':
			return <SurfaceArea allVitals={allVitals} />;
		case 'SpO2':
			return <SPO allVitals={allVitals} />;
		case 'Respiration':
			return <Respiration allVitals={allVitals} />;
		case 'Pulse':
			return <Pulse allVitals={allVitals} />;
		case 'Protein':
			return <Protein allVitals={allVitals} />;
		case 'PCV':
			return <PCV allVitals={allVitals} />;
		case 'Pain Scale':
			return <PainScale allVitals={allVitals} />;
		case 'MUAC':
			return <MUAC allVitals={allVitals} />;
		case 'Mid-Arm Circumference':
			return <MidArmCircumference allVitals={allVitals} />;
		case 'Length of Arm':
			return <LengthOfArm allVitals={allVitals} />;
		case 'Height':
			return <Height allVitals={allVitals} />;
		case 'Head Circumference':
			return <HeadCircumference allVitals={allVitals} />;
		case 'Glucose':
			return <Glucose allVitals={allVitals} />;
		case 'Dilation':
			return <Dilation allVitals={allVitals} />;
		case 'Fetal Heart Rate':
			return <FetalHeartRate allVitals={allVitals} />;
		case 'Fundus Height':
			return <FundusHeight allVitals={allVitals} />;
		case 'Blood Pressure':
			return <BloodPressure allVitals={allVitals} />;
		case 'BSA':
			return <BSA allVitals={allVitals} />;
		case 'BMI':
		default:
			return <BMI allVitals={allVitals} />;
	}
};
const store = configureStore();
const Vitals = ({ type, location, patient, vitals }) => {
	const [vitalPage, setVitalPage] = useState(type);
	const [allVitals, setAllVitals] = useState({});
	const vitalClick = vital => {
		setVitalPage(vital);
	};
	useEffect(() => {
		getData(patient);
	}, []);
	async function getData(patient) {
		const res = await request(
			`${API_URI}${patientAPI}/` + patient.id + '/vitals',
			'GET',
			true
		);
		await store.dispatch(addVital(res));
		res.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
		await setAllVitals(res);
		return res;
	}

	return (
		<div className="col-md-12">
			<div className="element-wrapper">
				<div className="element-box-tp mb-3">
					<div className="el-buttons-list">
						{vitalItems.map((vital, i) => (
							<a
								onClick={() => vitalClick(vital)}
								className="btn btn-white btn-sm mr-2"
								key={i}>
								<i className="os-icon os-icon-delivery-box-2" />
								<span>{vital}</span>
							</a>
						))}
					</div>
				</div>
				<h6 className="element-header text-center">{vitalPage}</h6>
				<div className="element-box">
					<Page type={vitalPage} allVitals={allVitals} />
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};
export default connect(mapStateToProps, { addVital })(withRouter(Vitals));
