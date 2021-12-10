/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import AdmissionMenu from '../components/Navigation/AdmissionMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';

const ClinicalTasks = lazy(() => import('../components/Patient/ClinicalTasks'));
const Encounters = lazy(() => import('../components/Patient/Encounters'));
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const NurseObservation = lazy(() =>
	import('../components/Patient/NurseObservation')
);
const FluidChart = lazy(() => import('../components/Patient/FluidChart'));
const InPatientNote = lazy(() => import('../components/Patient/InPatientNote'));
const CareTeam = lazy(() => import('../components/Patient/CareTeam'));
const Lab = lazy(() => import('../components/Patient/Lab'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const NursingService = lazy(() =>
	import('../components/Patient/NursingService')
);
const Consumables = lazy(() => import('../components/Patient/Consumables'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const admission = useSelector(state => state.user.item);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'encounters':
			return <Encounters />;
		case 'vitals':
			return <Vitals type={hash[1].split('%20').join(' ')} />;
		case 'clinical-tasks':
			return (
				<ClinicalTasks can_request={admission && admission.status === 0} />
			);
		case 'nurse-observations':
			return <NurseObservation />;
		case 'fluid-chart':
			return <FluidChart />;
		case 'care-team':
			return <CareTeam can_request={admission && admission.status === 0} />;
		case 'lab':
			return (
				<Lab
					can_request={admission && admission.status === 0}
					itemId={admission.id || ''}
					type="admission"
				/>
			);
		case 'lab-request':
			return <LabRequest module="admission" itemId={admission.id || ''} />;
		case 'regimen':
			return (
				<Pharmacy
					can_request={admission && admission.status === 0}
					itemId={admission.id || ''}
					type="admission"
				/>
			);
		case 'pharmacy-request':
			return <PharmacyRequest module="admission" itemId={admission.id || ''} />;
		case 'nursing-service':
			return (
				<NursingService
					module="admission"
					can_request={admission && admission.status === 0}
					itemId={admission.id || ''}
				/>
			);
		case 'consumables':
			return (
				<Consumables
					can_request={admission && admission.status === 0}
					itemId={admission.id || ''}
					type="admission"
				/>
			);
		case 'ward-round':
		default:
			return <InPatientNote />;
	}
};

class AdmissionProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#ward-round`);
		}
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	render() {
		const { location, patient } = this.props;
		return (
			<div className="layout-w">
				<button
					aria-label="Close"
					className="close custom-close"
					type="button"
					onClick={this.closeProfile}>
					<span className="os-icon os-icon-close" />
				</button>
				{patient ? (
					<Fragment>
						<div
							className="content-w"
							style={{ width: 'calc(100% - 18%)', overflow: 'hidden' }}>
							<AdmissionMenu isAdmission={true} />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock
												profile={true}
												patient={patient}
												canAdmit={true}
											/>
										</div>
										<Suspense fallback={<Splash />}>
											<Switch>
												<HashRoute hash={location.hash} component={Page} />
											</Switch>
										</Suspense>
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
	connect(mapStateToProps, { toggleProfile })(AdmissionProfile)
);
