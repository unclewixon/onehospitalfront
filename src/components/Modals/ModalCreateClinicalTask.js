import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { renderTextInput, renderTextArea } from '../../services/utilities';
import { Checkbox } from 'antd';

import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import { vitalItems } from '../../services/constants';
import VitalForm from '../Patient/VitalForm';

// const BMI = lazy(() => import('../ClinicalTask/BMI'));
// const BloodPressure = lazy(() => import('../ClinicalTask/BloodPressure'));
// const Dilation = lazy(() => import('../ClinicalTask/Dilation'));
// const FetalHeartRate = lazy(() => import('../ClinicalTask/FetalHeartRate'));
// const FundusHeight = lazy(() => import('../ClinicalTask/FundusHeight'));
// const BSA = lazy(() => import('../ClinicalTask/BSA'));
// const Glucose = lazy(() => import('../ClinicalTask/Glucose'));
// const HeadCircumference = lazy(() =>
// 	import('../ClinicalTask/HeadCircumference')
// );
// const Height = lazy(() => import('../ClinicalTask/Height'));
// const LengthOfArm = lazy(() => import('../ClinicalTask/LengthOfArm'));
// const MidArmCircumference = lazy(() =>
// 	import('../ClinicalTask/MidArmCircumference')
// );
// const MUAC = lazy(() => import('../ClinicalTask/MUAC'));
// const PainScale = lazy(() => import('../ClinicalTask/PainScale'));
// const PCV = lazy(() => import('../ClinicalTask/PCV'));
// const Protein = lazy(() => import('../ClinicalTask/Protein'));
// const Pulse = lazy(() => import('../ClinicalTask/Pulse'));
// const Respiration = lazy(() => import('../ClinicalTask/Respiration'));
// const SPO = lazy(() => import('../ClinicalTask/SPO'));
// const SurfaceArea = lazy(() => import('../ClinicalTask/SurfaceArea'));
// const Temperature = lazy(() => import('../ClinicalTask/Temperature'));
// const Urine = lazy(() => import('../ClinicalTask/Urine'));
// const Weight = lazy(() => import('../ClinicalTask/Weight'));

export class ModalCreateClinicalTask extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	render() {
		const { location } = this.props;
		const hash = location.hash.substr(1).split('#');
		const type =
			hash.length > 1 ? hash[1].split('%20').join(' ') : 'Blood Pressure';

		console.log(type);
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title text-center">Clinical Task</h4>

							<div className="col-md-12">
								<div className="element-wrapper">
									<div className="element-box-tp mb-3">
										<div className="el-buttons-list">
											{vitalItems.map((vital, i) => (
												<Link
													className="btn btn-white btn-sm mr-2  text-center"
													to={`${location.pathname}#start-admission#${vital}`}
													key={i}>
													<i className="os-icon os-icon-delivery-box-2" />
													<span>{vital}</span>
												</Link>
											))}
										</div>
									</div>
									<h6 className="element-header text-center">{type}</h6>
									<div className="element-box">
										<VitalForm type={type} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(null, { closeModals })(ModalCreateClinicalTask)
);
