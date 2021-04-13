/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import HashRoute from '../components/HashRoute';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';

const Notes = lazy(() => import('../components/Procedures/Notes'));
const PreProcedure = lazy(() =>
	import('../components/Procedures/PreProcedure')
);
const Resources = lazy(() => import('../components/Procedures/Resources'));
const Attachments = lazy(() => import('../components/Procedures/Attachments'));
const Consumables = lazy(() => import('../components/Procedures/Consumables'));
const NursingServices = lazy(() =>
	import('../components/Procedures/NursingServices')
);
const MedicationsUsed = lazy(() =>
	import('../components/Procedures/MedicationsUsed')
);
const MedicalReport = lazy(() =>
	import('../components/Procedures/MedicalReport')
);
const PatientEquipment = lazy(() =>
	import('../components/Procedures/PatientEquipment')
);
const Billing = lazy(() => import('../components/Procedures/Billing'));

const storage = new SSRStorage();

class ProcedureProfile extends Component {
	state = {
		tab: 'notes',
		loading: false,
	};

	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	setTab = value => {
		this.setState({ tab: value });
	};

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	labMgtActions = () => {
		switch (this.state.tab) {
			case 'notes':
				return 'Add Notes';
			case 'pre-procedure':
				return 'Take Pre Procedure';
			case 'resources':
				return 'Add Resource';
			case 'consumables':
				return 'Add Consumables';
			case 'nursing-services':
				return 'Add Nursing Services';
			case 'medications-used':
				return 'Add Medications Used';
			case 'medical-report':
				return 'Add Medical Report';
			case 'patient-equipment':
				return 'Add Patient Equipment';
			case 'billing':
				return 'Add Billing';
			default:
				break;
		}
	};

	render() {
		const { patient } = this.props;
		const { tab } = this.state;
		return (
			<div className="layout-w">
				<button
					aria-label="Close"
					className="close"
					type="button"
					onClick={this.closeProfile}>
					<span className="os-icon os-icon-close" />
				</button>
				{patient ? (
					<Fragment>
						<div
							className="content-w"
							style={{ width: '100%', overflow: 'hidden' }}>
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12 pb-4">
											<ProfileBlock
												profile={true}
												patient={patient}
												noButtons={true}
											/>
										</div>
										{/* tabs should be here */}
										<div className="os-tabs-controls mt-4">
											<ul className="nav nav-tabs upper">
												<li className="nav-item">
													<a
														className={
															tab === 'notes' ? 'nav-link active' : 'nav-link'
														}
														onClick={() => this.setTab('notes')}>
														Notes
													</a>
												</li>
												<li className="nav-item">
													<a
														className={
															tab === 'pre-procedure'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('pre-procedure')}>
														PRE-PROCEDURE
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'resources'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('resources')}>
														RESOURCES
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'attachments'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('attachments')}>
														ATTACHMENTS
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'consumables'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('consumables')}>
														CONSUMABLES
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'nursing-services'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('nursing-services')}>
														NURSING SERVICES
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'medications-used'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('medications-used')}>
														MEDICATIONS USED
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'medical-report'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('medical-report')}>
														MEDICAL REPORT
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'patient-equipment'
																? 'nav-link active'
																: 'nav-link'
														}
														onClick={() => this.setTab('patient-equipment')}>
														PATIENT EQUIPMENT
													</a>
												</li>

												<li className="nav-item">
													<a
														className={
															tab === 'billing' ? 'nav-link active' : 'nav-link'
														}
														onClick={() => this.setTab('billing')}>
														BILLING
													</a>
												</li>
											</ul>
											<div className="row justify-content-center align-items-center">
												{this.state.displaylabAction && (
													<button
														className={
															'mr-4 text-center mx-2 btn btn-primary btn-sm'
														}
														onClick={() => console.log('btn clicked()')}>
														{this.labMgtActions()}{' '}
														<i className="os-icon os-icon-plus"></i>
													</button>
												)}
											</div>
										</div>
										<Suspense fallback={<Splash />}>
											{tab === 'notes' && <Notes />}
											{tab === 'pre-procedure' && <PreProcedure />}
											{tab === 'resources' && <Resources />}
											{tab === 'attachments' && <Attachments />}

											{tab === 'consumables' && <Consumables />}
											{tab === 'nursing-services' && <NursingServices />}
											{tab === 'medications-used' && <MedicationsUsed />}
											{tab === 'medical-report' && <MedicalReport />}
											{tab === 'patient-equipment' && <PatientEquipment />}
											{tab === 'billing' && <Billing />}
										</Suspense>

										{/* <Suspense fallback={<Splash />}>
											<Switch>
												<HashRoute hash={location.hash} component={Page} />
											</Switch>
										</Suspense> */}
									</div>
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<div className="content-w">
						<div className="top-bar color-scheme-transparent"></div>
						<div className="content-i">
							<div className="content-box text-center">
								<h5>Patient record was not found</h5>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(ProcedureProfile)
);
