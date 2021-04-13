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

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'attachments':
			return <Attachments />;
		case 'resources':
			return <Resources />;
		case 'pre-procedure':
			return <PreProcedure />;
		case 'notes':
			return <Notes />;
		default:
			return <Notes />;
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
