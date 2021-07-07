/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import IVFProfileMenu from '../components/Navigation/IVFProfileMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';
import ExtraBlock from '../components/ExtraBlock';

const Notes = lazy(() => import('../components/IVF/Notes'));
const Embryology = lazy(() => import('../components/IVF/Embryology'));
const RegulationChart = lazy(() => import('../components/IVF/RegulationChart'));
const HcgAdministration = lazy(() =>
	import('../components/IVF/HcgAdministration')
);
const Lab = lazy(() => import('../components/Patient/Lab'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const ivf = useSelector(state => state.user.item);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'embryology':
			return <Embryology />;
		case 'regulation-chart':
			return <RegulationChart />;
		case 'hcg':
			return <HcgAdministration />;
		case 'lab':
			return (
				<Lab
					can_request={ivf && ivf.status === 0}
					itemId={ivf.id || ''}
					type="ivf"
				/>
			);
		case 'lab-request':
			return <LabRequest module="ivf" />;
		case 'notes':
		default:
			return <Notes />;
	}
};

class IVFProfile extends Component {
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
		const { location, patient, ivf } = this.props;
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
							<IVFProfileMenu />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock
												profile={true}
												patient={patient}
												noButtons={true}
											/>
											<ExtraBlock module="ivf" item={ivf} />
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
		ivf: state.user.item,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(IVFProfile)
);
