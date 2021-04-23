/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleProfile } from '../actions/user';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import AntennatalForms from '../components/Antennatal/AntennatalForms';

const AntennatalRequest = lazy(() =>
	import('../components/Patient/AntennatalRequest')
);
const Vaccines = lazy(() => import('../components/Antennatal/Vaccines'));
const VitalSigns = lazy(() => import('../components/Antennatal/VitalSigns'));

const AntenatalDetailTab = lazy(() => import('./AntennatalDetailTab'));
const Notes = lazy(() => import('../components/Antennatal/Notes'));
const Antennatal = lazy(() => import('../components/Patient/Antennatal'));
const LabTests = lazy(() => import('../components/Antennatal/LabTests'));
const Imaging = lazy(() => import('../components/Antennatal/Imaging'));
const RiskAssessments = lazy(() =>
	import('../components/Antennatal/RiskAssessments')
);
const MedicationsUsed = lazy(() =>
	import('../components/Antennatal/MedicationsUsed')
);
const ProblemList = lazy(() => import('../components/Antennatal/ProblemList'));

const storage = new SSRStorage();

class AntennatalProfile extends Component {
	state = {
		tab: 'notes',
		loading: false,
		showModal: false,
		displayAdd: true,
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ showModal: false });
	};

	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	setTab = value => {
		if (
			value === 'assessments' ||
			value === 'antennal-request' ||
			value === 'details'
		) {
			this.setState({ tab: value, displayAdd: false });
		} else {
			this.setState({ tab: value, displayAdd: true });
		}
	};

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	labMgtActions = () => {
		switch (this.state.tab) {
			case 'notes':
				return 'Add a Note';
			case 'problem-list':
				return 'Add Issue';
			case 'vital-signs':
				return 'Add Vital Sign';
			case 'risk-assessments':
				return 'New Risk Assessment';
			case 'vaccines':
				return 'New Vaccine';
			case 'medications-used':
				return 'Add Medication';
			case 'lab-tests':
				return 'Add Medical Report';
			case 'imaging':
				return 'New Imaging';
			default:
				break;
		}
	};

	render() {
		const { patient } = this.props;
		const { tab, showModal } = this.state;
		return (
			<>
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
											<div className="col-sm-12 pb-4">
												<div className="os-tabs-controls">
													<ul
														className="nav nav-tabs upper"
														style={{ fontSize: '11px' }}>
														<li className="nav-item">
															<a
																className={
																	tab === 'notes'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('notes')}>
																NOTES
															</a>
														</li>
														<li className="nav-item">
															<a
																className={
																	tab === 'assessments'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('assessments')}>
																ASSESSMENTS
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'details'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('details')}>
																DETAILS
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'vital-signs'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('vital-signs')}>
																VITAL SIGNS
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
																MEDICATIONS
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'lab-tests'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('lab-tests')}>
																LAB TESTS
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'imaging'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('imaging')}>
																IMAGING
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'risk-assessments'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('risk-assessments')}>
																RISK ASSESSMENTS
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'vaccines'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('vaccines')}>
																VACCINES
															</a>
														</li>

														<li className="nav-item">
															<a
																className={
																	tab === 'problem-list'
																		? 'nav-link active'
																		: 'nav-link'
																}
																onClick={() => this.setTab('problem-list')}>
																PROBLEM LISTS
															</a>
														</li>
													</ul>
												</div>
											</div>
											{this.state.displayAdd ? (
												<div className="col-sm-12 pb-4">
													<div className="justify-content-center align-items-center">
														<button
															className={
																'mr-4 text-center mx-2 btn btn-primary btn-sm'
															}
															onClick={() =>
																this.setState({ showModal: true })
															}>
															{this.labMgtActions()}{' '}
															<i className="os-icon os-icon-plus"></i>
														</button>
													</div>
												</div>
											) : (
												''
											)}

											{this.state.tab === 'assessments' ? (
												<div className="col-sm-12 pb-4">
													<div className="justify-content-center align-items-center">
														<button
															className={
																'mr-4 text-center mx-2 btn btn-primary btn-sm'
															}
															onClick={() => this.setTab('antennal-request')}>
															New Antennatal Assessment
															<i className="os-icon os-icon-plus"></i>
														</button>
													</div>
												</div>
											) : (
												''
											)}

											<div className="col-sm-12 pb-4">
												<Suspense fallback={<Splash />}>
													{tab === 'notes' && <Notes />}
													{tab === 'vital-signs' && <VitalSigns />}
													{tab === 'assessments' && <Antennatal />}
													{tab === 'antennal-request' && <AntennatalRequest />}
													{tab === 'details' && <AntenatalDetailTab />}
													{tab === 'risk-assessments' && <RiskAssessments />}
													{tab === 'vaccines' && <Vaccines />}
													{tab === 'medications-used' && <MedicationsUsed />}
													{tab === 'lab-tests' && <LabTests />}
													{tab === 'imaging' && <Imaging />}
													{tab === 'problem-list' && <ProblemList />}
												</Suspense>
											</div>
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
				{showModal && (
					<AntennatalForms tab={tab} closeModal={() => this.closeModal()} />
				)}
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		antennatal: state.user.antennatal,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(AntennatalProfile)
);
