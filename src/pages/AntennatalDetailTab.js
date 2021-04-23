// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { Component, Suspense, lazy, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { Switch, withRouter } from 'react-router-dom';

// import { viewAntenatalDetail } from '../actions/general';

// import HashRoute from '../components/HashRoute';
// import Splash from '../components/Splash';

// import AntennatalMenuView from '../components/Navigation/AntennatalMenuView';

// const GeneralView = lazy(() => import('../pages/AntenatalDetail/GeneralView'));
// const ObstericHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/ObstericHistory')
// );
// const FamilyHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/FamilyHistory')
// );
// const FathersInfo = lazy(() => import('../pages/AntenatalDetail/FathersInfo'));
// const FGMView = lazy(() => import('../pages/AntenatalDetail/FGMView'));
// const GynaeHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/GynaeHistory')
// );
// const GynaePapMearHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/GynaePapMearHistory')
// );
// const InitialAssessment = lazy(() =>
// 	import('../pages/AntenatalDetail/InitialAssessment')
// );
// const LabObservation = lazy(() =>
// 	import('../pages/AntenatalDetail/LabObservation')
// );
// const PastOcularHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/PastOcularHistory')
// );
// const PhysicalExam = lazy(() =>
// 	import('../pages/AntenatalDetail/PhysicalExam')
// );
// const PreviousPregnancy = lazy(() =>
// 	import('../pages/AntenatalDetail/PreviousPregnancy')
// );
// const RoutineAssessment = lazy(() =>
// 	import('../pages/AntenatalDetail/RoutineAssessment')
// );
// const SexualHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/SexualHistory')
// );
// const SocialHistory = lazy(() =>
// 	import('../pages/AntenatalDetail/SocialHistory')
// );

// class AntennatalDetailTab extends Component {
// 	closeProfile = () => {
// 		this.props.viewAntenatalDetail(false);
// 	};

// 	loopObject = obj => {
// 		return Object.entries(obj).map((item, i) => {
// 			return (
// 				<tr key={i}>
// 					<td
// 						className="font-weight-bold text-left text-capitalize"
// 						style={{ fontSize: '12px' }}>
// 						{!item[0].includes('_')
// 							? item[0].replace(/([A-Z])/g, ' $1')
// 							: item[0]
// 									.split('_')
// 									.join(' ')
// 									.replace(/([A-Z])/g, ' $1')}
// 					</td>
// 					<td className="text-right" style={{ fontSize: '12px' }}>
// 						{item[1] || '-'}
// 					</td>
// 				</tr>
// 			);
// 		});
// 	};

// 	loopHistory = obj => {
// 		return Object.entries(obj).map((item, i) => {
// 			let item0 = item[0].replace(/([A-Z])/g, ' $1');
// 			console.log(item[1]);
// 			return (
// 				<div className="element-box">
// 					<h6 className="element-header text-left text-capitalize">
// 						{!item0.includes('_') ? item0 : item0.split('_').join('.')}
// 					</h6>

// 					<table className="table">
// 						<tbody>{this.loopObject(item[1])}</tbody>
// 					</table>
// 				</div>
// 			);
// 		});
// 	};

// 	Page = () => {
// 		const { location, antennatal, user_antennatal } = this.props;
// 		const ant = antennatal.find(el => el.id === user_antennatal.id);
// 		const fathersInfo = JSON.parse(ant.fathersInfo);
// 		const previousPregnancy = JSON.parse(ant.previousPregnancy);

// 		const hash = location.hash.substr(1).split('#');
// 		switch (hash[0]) {
// 			case 'fathers-info':
// 				return (
// 					<FathersInfo loopObject={this.loopObject} fathersInfo={fathersInfo} />
// 				);
// 			case 'previous-pregnancy':
// 				return (
// 					<PreviousPregnancy
// 						loopObject={this.loopObject}
// 						previousPregnancy={previousPregnancy}
// 					/>
// 				);
// 			case 'fgm-view':
// 				return (
// 					<FGMView
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'family-history':
// 				return (
// 					<FamilyHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'sexual-history':
// 				return (
// 					<SexualHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'social-history':
// 				return (
// 					<SocialHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'gynae-history':
// 				return (
// 					<GynaeHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'lab-observation':
// 				return (
// 					<LabObservation
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'initial-assessment':
// 				return (
// 					<InitialAssessment
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'pyhsical-exam':
// 				return (
// 					<PhysicalExam
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'routine-assessment':
// 				return (
// 					<RoutineAssessment
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'gpm-history':
// 				return (
// 					<GynaePapMearHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'obsteric-history':
// 				return (
// 					<ObstericHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			case 'past-ocular-history':
// 				return (
// 					<PastOcularHistory
// 						loopHistory={this.loopHistory}
// 						obstericsHistory={ant.obstericsHistory}
// 						loopObject={this.loopObject}
// 					/>
// 				);
// 			default:
// 				return <GeneralView ant={ant} />;
// 		}
// 	};

// 	componentDidMount() {
// 		const { location } = this.props;
// 		if (!location.hash) {
// 			this.props.history.push(`${location.pathname}#general`);
// 		}
// 	}

// 	componentWillUnmount() {
// 		const { location } = this.props;
// 		this.props.history.push(location.pathname);
// 	}

// 	render() {
// 		const { location, antennatal, user_antennatal } = this.props;
// 		const ant = antennatal.find(el => el.id === user_antennatal.id);
// 		console.log(this.props, ant);

// 		return (
// 			<div className="layout-w">
// 				{/* <button
// 					aria-label="Close"
// 					className="close"
// 					type="button"
// 					onClick={this.closeProfile}>
// 					<span className="os-icon os-icon-close" />
// 				</button> */}
// 				{ant ? (
// 					<Fragment>
// 						<AntennatalMenuView />
// 						<div
// 							className="content-w content-w-l-18"
// 							style={{ width: 'calc(100% - 18%)', overflow: 'hidden' }}>
// 							<div className="content-i">
// 								<div className="content-box">
// 									<div className="row">
// 										<Suspense fallback={<Splash />}>
// 											<Switch>
// 												<HashRoute hash={location.hash} component={this.Page} />
// 											</Switch>
// 										</Suspense>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</Fragment>
// 				) : (
// 					<div className="content-w">
// 						<div className="top-bar color-scheme-transparent"></div>
// 						<div className="content-i">
// 							<div className="content-box text-center">
// 								<h5>Patient record was not found</h5>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = state => {
// 	return {
// 		antennatal: state.patient.antennatal,
// 		antenatal_id: state.general.antenatal_id,
// 		user_antennatal: state.user.antennatal,
// 	};
// };

// export default withRouter(
// 	connect(mapStateToProps, { viewAntenatalDetail })(AntennatalDetailTab)
// );
