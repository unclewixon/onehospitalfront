import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Link } from 'react-router-dom';

import { toggleProfile } from '../../actions/user';
import background from '../../assets/images/b3.jpeg';
import profilepix from '../../assets/images/a6.jpeg';
import PatientMenu from '../../components/Navigation/PatientMenu';
import SSRStorage from '../../services/storage';
import { USER_RECORD } from '../../services/constants';
import HashRoute from '../../components/HashRoute';
import Splash from '../../components/Splash';

const Dashboard = lazy(() => import('../../components/Patient/Dashboard'));
const Lab = lazy(() => import('../../components/Patient/Lab'));
const Encounter = lazy(() => import('../../components/Patient/Encounter'));
const Pharmacy = lazy(() => import('../../components/Patient/Pharmacy'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1);
	switch (hash) {
		case 'encounter':
			return <Encounter />;
		case 'lab':
			return <Lab />;
		case 'pharmacy':
			return <Pharmacy />;
		case 'dashboard':
		default:
			return <Dashboard />;
	}
};

class PatientProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	componentDidMount() {
		const { location } = this.props;
		if(!location.hash){
			this.props.history.push(`${location.pathname}#dashboard`);
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
					onClick={this.closeProfile}
				>
					<span className="os-icon os-icon-close" />
				</button>
				{patient ? (
					<Fragment>
						<PatientMenu />
						<div className="content-w">
							<div className="top-bar color-scheme-transparent"></div>
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12 pb-4">
											<div
												className="card-header bg-dark bg-img p-0 no-border"
												style={{
													backgroundImage: `url(${background})`,
													backgroundPosition: '50% -114.052px',
												}}
											>
												<div className="bg-dark-overlay r-2x no-r-b">
													<div className="d-md-flex">
														<div className="p-4">
															<div className="d-flex">
																<Link to={`${location.pathname}#dashboard`}>
																	<span className="avatar w-64">
																		<img src={profilepix} alt="" />{' '}
																		<i className="on"></i>
																	</span>
																</Link>
																<div className="mx-3">
																	<h5 className="mt-2">{`${patient.surname} ${patient.other_names}`}</h5>
																	<div className="text-fade text-sm">
																		<span className="m-r">
																			Senior Industrial Designer
																		</span>{' '}
																		<small>
																			<i className="fa fa-map-marker mr-2"></i>{' '}
																			London, UK
																		</small>
																	</div>
																</div>
															</div>
														</div>
														<span className="flex"></span>
														<div className="align-items-center d-flex p-4"></div>
													</div>
												</div>
											</div>
											<div className="p-3">
												<div className="d-flex">
													<ul className="nav nav-pills">
														<li className="nav-item button-space">
															<Link className="btn btn-grey" to="#">
																<i className="os-icon os-icon-edit"></i>
																<span>Edit Profile</span>
															</Link>
														</li>
														<li className="nav-item button-space">
															<Link
																className="btn btn-info d-sm-inline-block text-white"
																to="#"
															>
																<i className="os-icon os-icon-plus-circle"></i>
																<span>Request Admission</span>
															</Link>
														</li>
														<li className="nav-item button-space">
															<Link
																className="btn btn-grey d-sm-inline-block"
																to="#"
															>
																<i className="os-icon os-icon-plus-circle"></i>
																<span>Enroll Antenatal</span>
															</Link>
														</li>
														<li className="nav-item button-space">
															<Link
																className="btn btn-grey d-sm-inline-block"
																to="#"
															>
																<i className="os-icon os-icon-plus-circle"></i>
																<span>Enroll Immunization</span>
															</Link>
														</li>
														<li className="nav-item button-space">
															<Link
																className="btn btn-grey d-sm-inline-block"
																to="#"
															>
																<i className="os-icon os-icon-plus-circle"></i>
																<span>Enroll IVF</span>
															</Link>
														</li>
														<li className="nav-item button-space">
															<Link className="btn btn-primary" to="#">
																<i className="os-icon os-icon-documents-03"></i>
																<span>Upload Document</span>
															</Link>
														</li>
													</ul>
												</div>
											</div>
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
