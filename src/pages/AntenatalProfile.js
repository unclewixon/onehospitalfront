/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import AntenatalMenu from '../components/Navigation/AntenatalProfileMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';
import ExtraBlock from '../components/ExtraBlock';

const Notes = lazy(() => import('../components/Antenatal/Notes'));
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const Radiology = lazy(() => import('../components/Patient/Radiology'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const RadiologyRequest = lazy(() =>
	import('../components/Patient/RadiologyRequest')
);
const Lab = lazy(() => import('../components/Patient/Lab'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));
const AntenatalAssessments = lazy(() =>
	import('../components/Antenatal/AntenatalAssessments')
);

const storage = new SSRStorage();

const Page = ({ location }) => {
	const antenatal = useSelector(state => state.user.item);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'radiology':
			return (
				<Radiology
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'radiology-request':
			return (
				<RadiologyRequest module="antenatal" itemId={antenatal.id || ''} />
			);
		case 'regimen':
			return (
				<Pharmacy
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'pharmacy-request':
			return <PharmacyRequest module="antenatal" itemId={antenatal.id || ''} />;
		case 'lab':
			return (
				<Lab
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'lab-request':
			return <LabRequest module="antenatal" itemId={antenatal.id || ''} />;
		case 'vitals':
			return <Vitals type={hash[1].split('%20').join(' ')} />;
		case 'assessments':
			return (
				<AntenatalAssessments
					can_request={antenatal && antenatal.status === 0}
				/>
			);
		case 'gynae-history':
		case 'obst-history':
		case 'notes':
		default:
			return <Notes can_request={antenatal && antenatal.status === 0} />;
	}
};

class AntenatalProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#assessments`);
		}
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	render() {
		const { location, patient, antenatal } = this.props;
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
							<AntenatalMenu />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock profile={true} patient={patient} />
											<ExtraBlock module="antenatal" item={antenatal} />
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
		antenatal: state.user.item,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(AntenatalProfile)
);
