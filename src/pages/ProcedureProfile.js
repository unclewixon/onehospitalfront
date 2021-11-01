/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import ProcedureMenu from '../components/Navigation/ProcedureProfileMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';

const Notes = lazy(() => import('../components/Procedures/Notes'));
const Attachments = lazy(() => import('../components/Procedures/Attachments'));
const Consumables = lazy(() => import('../components/Procedures/Consumables'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const MedicalReport = lazy(() =>
	import('../components/Procedures/MedicalReport')
);
const Vitals = lazy(() => import('../components/Patient/Vitals'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const procedure = useSelector(state => state.user.item);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'attachments':
			return <Attachments can_request={procedure && procedure.status === 0} />;
		case 'consumables':
			return (
				<Consumables
					can_request={procedure && procedure.status === 0}
					itemId={procedure.id || ''}
					type="procedure"
				/>
			);
		case 'medical-report':
			return <MedicalReport />;
		case 'regimen':
			return (
				<Pharmacy
					can_request={procedure && !procedure.finishedDate}
					itemId={procedure.id || ''}
					type="procedure"
				/>
			);
		case 'pharmacy-request':
			return <PharmacyRequest module="procedure" itemId={procedure.id || ''} />;
		case 'vitals':
			return <Vitals type={hash[1].split('%20').join(' ')} />;
		case 'notes':
		default:
			return <Notes can_request={procedure && procedure.status === 0} />;
	}
};

class ProcedureProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#notes`);
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
					className="close"
					type="button"
					onClick={this.closeProfile}>
					<span className="os-icon os-icon-close" />
				</button>
				{patient ? (
					<Fragment>
						<div
							className="content-w"
							style={{ width: 'calc(100% - 18%)', overflow: 'hidden' }}>
							<ProcedureMenu />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock profile={true} patient={patient} />
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
	connect(mapStateToProps, { toggleProfile })(ProcedureProfile)
);
