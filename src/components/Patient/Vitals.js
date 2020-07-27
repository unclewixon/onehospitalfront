/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useEffect, useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Overlay, Popover, Button, ListGroup } from 'react-bootstrap';
import { API_URI, patientAPI, vitalItems } from '../../services/constants';
import { request } from '../../services/utilities';
import { loadVitals } from '../../actions/patient';
import { connect } from 'react-redux';
import waiting from '../../assets/images/searching.gif';
import { getAllDepartments } from './../../actions/settings';

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

const Page = ({ type }) => {
	switch (type) {
		case 'Urine':
			return <Urine />;
		case 'Weight':
			return <Weight />;
		case 'Temperature':
			return <Temperature />;
		case 'Surface Area':
			return <SurfaceArea />;
		case 'SpO2':
			return <SPO />;
		case 'Respiration':
			return <Respiration />;
		case 'Pulse':
			return <Pulse />;
		case 'Protein':
			return <Protein />;
		case 'PCV':
			return <PCV />;
		case 'Pain Scale':
			return <PainScale />;
		case 'MUAC':
			return <MUAC />;
		case 'Mid-Arm Circumference':
			return <MidArmCircumference />;
		case 'Length of Arm':
			return <LengthOfArm />;
		case 'Height':
			return <Height />;
		case 'Head Circumference':
			return <HeadCircumference />;
		case 'Glucose':
			return <Glucose />;
		case 'Dilation':
			return <Dilation />;
		case 'Fetal Heart Rate':
			return <FetalHeartRate />;
		case 'Fundus Height':
			return <FundusHeight />;
		case 'Blood Pressure':
			return <BloodPressure />;
		case 'BSA':
			return <BSA />;
		case 'BMI':
		default:
			return <BMI />;
	}
};

const Vitals = props => {
	const { type, location, patient, departments } = props;

	const [loaded, setLoaded] = useState(false);
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const [loading, setLoading] = useState(false);

	const ref = useRef(null);

	const handleButtonClick = event => {
		setShow(!show);
		setTarget(event.target);
	};

	useEffect(() => {
		async function doLoadVitals() {
			const rs = await getData(patient);
			props.loadVitals(rs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
			setLoaded(true);
		}

		if (!loaded) {
			doLoadVitals();
		}
	}, [loaded, patient, props]);

	async function getData(patient) {
		const res = await request(
			`${API_URI}${patientAPI}/${patient.id}/vitals`,
			'GET',
			true
		);
		return res;
	}

	const addToQueue = async deptId => {
		setLoading(true);
		const data = {
			patient_id: patient?.id,
			department_id: deptId?.id,
		};

		const res = await request(
			`${API_URI}/front-desk/queue-system/add`,
			'POST',
			true,
			data
		);

		if (res) {
			setLoading(false);
		}
	};

	return (
		<div className="col-md-12">
			<div className="element-wrapper">
				<div className="element-box-tp mb-3">
					<div className="el-buttons-list">
						{vitalItems.map((vital, i) => (
							<Link
								className="btn btn-white btn-sm mr-2"
								to={`${location.pathname}#vitals#${vital}`}
								key={i}>
								<i className="os-icon os-icon-delivery-box-2" />
								<span>{vital}</span>
							</Link>
						))}
					</div>
				</div>
				<h6 className="element-header text-center">{type}</h6>
				<div className="element-box">
					<Page type={type} />
				</div>
				<div className="element-wrapper">
					<div className="element-actions" ref={ref}>
						<Overlay
							show={show}
							target={target}
							placement="top"
							container={ref.current}>
							<Popover
								title="Select Department"
								id="vitals-send"
								style={{ width: '10rem' }}>
								{loading ? (
									<img src={waiting} alt="submitting" />
								) : departments && departments.length ? (
									departments.map((dept, index) => {
										const name = dept.name;
										return (
											<div action key={index}>
												{
													<button
														style={{
															border: 'none',
															background: '#fff',
															width: '100%',
															textAlign: 'center',
															paddingTop: '1rem',
															paddingBottom: '1rem',
														}}
														onClick={() => addToQueue(dept)}>
														{name.toUpperCase()}
													</button>
												}
											</div>
										);
									})
								) : (
									[]
								)}
							</Popover>
						</Overlay>
						<Button
							className="btn btn-primary btn-sm"
							onClick={handleButtonClick}>
							<i className="os-icon os-icon-mail-18"></i>
							<span>Send To</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		departments: state.settings.departments,
	};
};
export default connect(mapStateToProps, { loadVitals, getAllDepartments })(
	withRouter(Vitals)
);
