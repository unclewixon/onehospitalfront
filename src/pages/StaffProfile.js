import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Link } from 'react-router-dom';

import avatar1 from '../assets/images/avatar1.jpg';
import { toggleProfile } from '../actions/user';
import { USER_RECORD } from '../services/constants';
import SSRStorage from '../services/storage';
import Splash from '../components/Splash';
import HashRoute from '../components/HashRoute';

const Dashboard = lazy(() => import('../components/StaffBlock/Dashboard'));
const EditStaff = lazy(() => import('../components/StaffBlock/EditStaff'));
const Billing = lazy(() => import('../components/StaffBlock/Billing'));
const DutyRooster = lazy(() => import('../components/StaffBlock/DutyRooster'));
const ExcuseDuty = lazy(() => import('../components/StaffBlock/ExcuseDuty'));
const CreateAppraisal = lazy(() =>
	import('../components/StaffBlock/CreateAppraisal')
);
const LeaveRequest = lazy(() =>
	import('../components/StaffBlock/LeaveRequest')
);
const Appraisal = lazy(() => import('../components/StaffBlock/Appraisal'));
const StaffDetail = lazy(() => import('../components/StaffBlock/StaffDetail'));
const CreateLeave = lazy(() => import('../components/CreateLeave'));
const CreateExcuseDuty = lazy(() => import('../components/CreateExcuseDuty'));
const LineAppraisal = lazy(() =>
	import('../components/StaffBlock/LineAppraisal')
);

const StaffAppraisal = lazy(() =>
	import('../components/StaffBlock/StaffAppraisal')
);

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1);
	switch (hash) {
		case 'staff-detail':
			return <StaffDetail />;
		case 'edit-staff':
			return <EditStaff />;
		case 'billing':
			return <Billing />;
		case 'duty-roster':
			return <DutyRooster />;
		case 'leave-request':
			return <LeaveRequest />;
		case 'excuse-duty':
			return <ExcuseDuty />;
		case 'appraisal':
			return <Appraisal />;
		case 'create-leave':
			return <CreateLeave />;
		case 'create-appraisal':
			return <CreateAppraisal />;
		case 'create-excuse':
			return <CreateExcuseDuty />;
		case 'self-appraisal':
			return <CreateAppraisal />;
		case 'line-appraisal':
			return <LineAppraisal />;
		case 'staff-appraisal':
			return <StaffAppraisal />;

		default:
			return <Dashboard />;
	}
};

class StaffProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
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
		const { location, staff } = this.props;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={this.closeProfile}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="col-md-12">
							<div className="support-index">
								<div className="support-ticket-content-w force-show-folded-info">
									<div className="support-ticket-content">
										<div className="support-ticket-content-header">
											<h4 className="ticket-header">Deda Staff Profile</h4>
										</div>
										<div className="ticket-thread">
											<div className="ticket-reply">
												<div className="ticket-reply-info">
													<Link
														className="author with-avatar"
														to={`${location.pathname}#dashboard`}>
														<img alt="" src={avatar1} />
														<span>
															{staff.details.first_name +
																' ' +
																staff.details.last_name}
														</span>
													</Link>
													<div
														className="actions"
														style={{ zIndex: 100 }}
														href="#">
														<i className="os-icon os-icon-ui-46"></i>
														<div className="actions-list">
															<Link to={`${location.pathname}#edit-staff`}>
																<i className="os-icon os-icon-ui-49"></i>
																<span>Edit</span>
															</Link>
															<Link to={`${location.pathname}#billing`}>
																<i className="os-icon os-icon-ui-09"></i>
																<span>Billing</span>
															</Link>
															<Link to={`${location.pathname}#duty-roster`}>
																<i className="os-icon os-icon-ui-03"></i>
																<span>Duty Rooster</span>
															</Link>
															<Link to={`${location.pathname}#excuse-duty`}>
																<i className="os-icon os-icon-ui-03"></i>
																<span>Excuse Duty</span>
															</Link>
															<Link to={`${location.pathname}#appraisal`}>
																<i className="os-icon os-icon-ui-03"></i>
																<span>Appraisal</span>
															</Link>
															<Link to={`${location.pathname}#leave-request`}>
																<i className="os-icon os-icon-ui-03"></i>
																<span>Leave Request</span>
															</Link>
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
									<div
										className="support-ticket-info"
										style={{ position: 'relative' }}>
										<div className="customer text-capitalize">
											<div className="avatar" style={{ boxShadow: 'none' }}>
												<img alt="" src={avatar1} />
											</div>
											<h4 className="customer-name">
												{staff.details.first_name +
													' ' +
													staff.details.last_name}
											</h4>
											<div className="customer-tickets">
												Clinical Laboratory
											</div>
										</div>

										<h5 className="info-header">A few Colleagues</h5>
										<div>profile data list</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.staff,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(StaffProfile)
);
