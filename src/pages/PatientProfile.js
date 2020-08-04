/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import PatientMenu from '../components/Navigation/PatientMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import HashRoute from '../components/HashRoute';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import { confirmAction } from '../services/utilities';
import EnrollAntenatal from '../components/Patient/EnrollAntenatal';
import PatientDataUpload from '../components/Patient/PatientDataUpload';
const EnrollImmunization = lazy(() =>
	import('../components/Patient/EnrollImmunization')
);
const PatientImmunization = lazy(() =>
	import('../components/Patient/PatientImmunization')
);
const Dashboard = lazy(() => import('../components/Patient/Dashboard'));
const Lab = lazy(() => import('../components/Patient/Lab'));
const Encounters = lazy(() => import('../components/Patient/Encounters'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const Imaging = lazy(() => import('../components/Patient/Imaging'));
const Dentistry = lazy(() => import('../components/Patient/Dentistry'));
const Opthalmology = lazy(() => import('../components/Patient/Opthalmology'));
const Procedure = lazy(() => import('../components/Patient/Procedure'));
const Physiotherapy = lazy(() => import('../components/Patient/Physiotherapy'));
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const Allergies = lazy(() => import('../components/Patient/Allergies'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const OpthalmologyRequest = lazy(() =>
	import('../components/Patient/OpthalmologyRequest')
);
const PhysiotherapyRequest = lazy(() =>
	import('../components/Patient/PhysiotherapyRequest')
);
const ImagingRequest = lazy(() =>
	import('../components/Patient/ImagingRequest')
);

const DentistryRequest = lazy(() =>
	import('../components/Patient/DentistryRequest')
);
const ProcedureRequest = lazy(() =>
	import('../components/Patient/ProcedureRequest')
);
const AllergyRequest = lazy(() =>
	import('../components/Patient/AllergyRequest')
);

const UpdateAllergy = lazy(() => import('../components/Patient/UpdateAllergy'));
const Antennatal = lazy(() => import('../components/Patient/Antennatal'));
const AntennatalRequest = lazy(() =>
	import('../components/Patient/AntennatalRequest')
);

const EnrollAntenatalPatient = lazy(() =>
	import('../components/Patient/EnrollAntenatalPatient')
);

const EnrollIVFPatient = lazy(() =>
	import('../components/Patient/EnrollIVFPatient')
);

const PatientAdmission = lazy(() =>
	import('../components/Patient/PatientAdmission')
);
const EditPatient = lazy(() => import('../components/Patient/EditPatient'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'encounters':
			return <Encounters />;
		case 'lab':
			return <Lab />;
		case 'pharmacy':
			return <Pharmacy />;
		case 'vitals':
			return <Vitals type={hash[1].split('%20').join(' ')} />;
		case 'allergies':
			return <Allergies />;
		case 'imaging':
			return <Imaging />;
		case 'opthalmology':
			return <Opthalmology />;
		case 'procedure':
			return <Procedure />;
		case 'physio':
			return <Physiotherapy />;
		case 'dentistry':
			return <Dentistry />;
		case 'lab-request':
			return <LabRequest />;
		case 'pharmacy-request':
			return <PharmacyRequest />;
		case 'opthalmology-request':
			return <OpthalmologyRequest />;

		case 'physiotherapy-request':
			return <PhysiotherapyRequest />;
		case 'imaging-request':
			return <ImagingRequest />;

		case 'dentistry-request':
			return <DentistryRequest />;
		case 'procedure-request':
			return <ProcedureRequest />;

		case 'allergy-request':
			return <AllergyRequest />;
		case 'update-allergy':
			return <UpdateAllergy />;
		case 'anc-visit-entry':
			return <Antennatal />;
		case 'antennal-request':
			return <AntennatalRequest />;
		case 'start-admission':
			return <PatientAdmission />;
		case 'edit-profile':
			return <EditPatient />;
		case 'enroll-ivf':
			return <EnrollIVFPatient />;
		case 'enroll-antenatal':
			return <EnrollAntenatalPatient />;
		case 'upload-document':
			return <PatientDataUpload />;
		case 'enroll-immunization':
			return <EnrollImmunization />;
		case 'immunization':
			return <PatientImmunization />;
		default:
			return <Dashboard />;
	}
};

class PatientProfile extends Component {
	state = {
		dropdown: false,
	};

	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	toggleDropdown = () => () => {
		this.setState((prevState, props) => ({
			dropdown: !prevState.dropdown,
		}));
	};

	startAdmission = () => {
		const { location } = this.props;
		this.props.history.push(`${location.pathname}#start-admission`);
	};

	confirmStartAdmission = () => {
		confirmAction(
			this.startAdmission,
			null,
			'Are you sure you want to place this patient on admission ?',
			'Confirm Admission'
		);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#dashboard`);
		}
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	render() {
		const { location, patient } = this.props;
		const { dropdown } = this.state;
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
						<PatientMenu />
						<div className="content-w content-w-l-18">
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12 pb-4">
											<ProfileBlock
												profile={true}
												dropdown={dropdown}
												patient={patient}
												toggleDropdown={this.toggleDropdown}
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
	connect(mapStateToProps, { toggleProfile })(PatientProfile)
);
