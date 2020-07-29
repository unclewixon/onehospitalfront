import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import moment from 'moment';
import { reviewOfSystem } from './../../services/constants';
import { routerMiddleware } from 'react-router-redux';

class GeneralView extends Component {
	render() {
		const { currentPage, ant } = this.props;

		if (currentPage !== 1) {
			return null;
		}

		return (
			<div className="element-box">
				<h6 className="element-header text-left">General</h6>
				<table className="table ">
					<tbody>
						<tr>
							<td className="font-weight-bold text-left">Enrolment Date</td>
							<td className="text-right">
								{moment(ant.createdAt).format('DD-MM-YYYY')}
							</td>
						</tr>

						<tr>
							<td className="font-weight-bold text-left">LMP</td>
							<td className="text-right">{ant.l_m_p}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">EOD</td>
							<td className="text-right">{ant.e_o_d}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Booking Period</td>
							<td className="text-right">{ant.bookingPeriod}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">LMP SOURCE</td>
							<td className="text-right">{ant.lmpSource}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Enrolment Package</td>
							<td className="text-right"> {ant.enrollmentPackage}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Required Care</td>
							<td className="text-right">
								{' '}
								{Array.isArray(ant.requiredCare)
									? ant.requiredCare.join(',')
									: ant.requiredCare}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
class FathersInfo extends Component {
	render() {
		const { fathersInfo, currentPage, loopObject } = this.props;

		if (currentPage !== 2) {
			return null;
		}

		return (
			<div className="element-box">
				<h6 className="element-header text-left">Father Info</h6>
				<table className="table">
					<tbody>{loopObject(fathersInfo)}</tbody>
				</table>
			</div>
		);
	}
}

class PreviousPregnancy extends Component {
	render() {
		const { previousPregnancy, currentPage, loopObject } = this.props;

		if (currentPage !== 3) {
			return null;
		}

		return (
			<div className="element-box">
				<h6 className="element-header text-left">Previous Pregnancy</h6>
				<table className="table">
					<tbody>{loopObject(previousPregnancy)}</tbody>
				</table>
			</div>
		);
	}
}

class FGMView extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 4) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">F.G.M</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.f_g_m)}</tbody>
				</table>
			</div>
		);
	}
}

class FamilyHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 5) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Family History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.familyHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class GynaeHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 6) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Gynae History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.gynaeHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class InitialAssessment extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 7) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Initial Assessment
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.initialAssessment)}</tbody>
				</table>
			</div>
		);
	}
}

class LabObservation extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 8) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Lab Observation
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.labObservations)}</tbody>
				</table>
			</div>
		);
	}
}

class PhysicalExam extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 9) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Physical Exam
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.physicalExam)}</tbody>
				</table>
			</div>
		);
	}
}

class SexualHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 10) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Sexual History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.sexualHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class SocialHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 11) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Social History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.socialHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class RoutineAssessment extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 12) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Routine Assessment
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.routineAssessments)}</tbody>
				</table>
			</div>
		);
	}
}

class PastOcularHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 13) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Past Ocular History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.pastOcularHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class GynaePapMearHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 14) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Gynae Pap Mear History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.gynaePapMearHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class ObstericHistory extends Component {
	render() {
		const { obstericsHistory, currentPage, loopObject } = this.props;
		if (currentPage !== 15) {
			return null;
		}

		return (
			<div className="element-box" style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Obsteric History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.obstericHistory)}</tbody>
				</table>
			</div>
		);
	}
}

class ModalAntenatalDetail extends Component {
	state = {
		currentPage: 1,
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	loopObject = obj => {
		return Object.entries(obj).map((item, i) => {
			return (
				<tr>
					<td
						className="font-weight-bold text-left text-capitalize"
						style={{ fontSize: '12px' }}>
						{!item[0].includes('_')
							? item[0].replace(/([A-Z])/g, ' $1')
							: item[0]
									.split('_')
									.join(' ')
									.replace(/([A-Z])/g, ' $1')}
					</td>
					<td className="text-right" style={{ fontSize: '12px' }}>
						{item[1] || '-'}
					</td>
				</tr>
			);
		});
	};

	loopHistory = obj => {
		return Object.entries(obj).map((item, i) => {
			let item0 = item[0].replace(/([A-Z])/g, ' $1');
			console.log(item[1]);
			return (
				<div className="element-box">
					<h6 className="element-header text-left text-capitalize">
						{!item0.includes('_') ? item0 : item0.split('_').join('.')}
					</h6>

					<table className="table">
						<tbody>{this.loopObject(item[1])}</tbody>
					</table>
				</div>
			);
		});
	};

	nextPage = () => {
		let currentPage = this.state.currentPage;
		currentPage =
			currentPage === 1
				? 2
				: currentPage === 2
				? 3
				: currentPage === 3
				? 4
				: currentPage === 4
				? 5
				: currentPage === 5
				? 6
				: currentPage === 6
				? 7
				: currentPage === 7
				? 8
				: currentPage === 8
				? 9
				: currentPage === 9
				? 10
				: currentPage === 10
				? 11
				: currentPage === 11
				? 12
				: currentPage === 12
				? 13
				: currentPage === 13
				? 14
				: currentPage === 14
				? 15
				: currentPage + 1;

		this.setState({
			currentPage: currentPage,
		});
	};

	prevPage = () => {
		let currentPage = this.state.currentPage;
		currentPage =
			currentPage === 15
				? 14
				: currentPage === 14
				? 13
				: currentPage === 13
				? 12
				: currentPage === 12
				? 11
				: currentPage === 11
				? 10
				: currentPage === 10
				? 9
				: currentPage === 9
				? 8
				: currentPage === 8
				? 7
				: currentPage === 7
				? 6
				: currentPage === 6
				? 5
				: currentPage === 5
				? 4
				: currentPage === 4
				? 3
				: currentPage === 3
				? 2
				: currentPage === 2
				? 1
				: currentPage - 1;

		this.setState({
			currentPage: currentPage,
		});
	};

	render() {
		const { antenatal_id, antennatal } = this.props;
		const ant = antennatal.find(el => el.id === antenatal_id);
		const fathersInfo = JSON.parse(ant.fathersInfo);
		const previousPregnancy = JSON.parse(ant.previousPregnancy);

		const { currentPage } = this.state;

		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span aria-hidden="true"> ×</span>
						</button>

						<div className="onboarding-content with-gradient">
							<div className="element-info">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">
											Antenatal Enrolment Detail
										</h5>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-3">
									<div className="user-profile compact">
										<div
											className="up-head-w"
											style={{
												backgroundImage: require('../../assets/images/b3.jpeg'),
											}}>
											<div className="up-main-info">
												<h2
													className="up-header text-capitalize"
													style={{ color: '#334152' }}>
													{ant.surname} {ant.other_names}
												</h2>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-9">
									<div className="element-wrapper">
										<GeneralView currentPage={currentPage} ant={ant} />
										<FathersInfo
											currentPage={currentPage}
											loopObject={this.loopObject}
											fathersInfo={fathersInfo}
										/>
										<PreviousPregnancy
											currentPage={currentPage}
											loopObject={this.loopObject}
											previousPregnancy={previousPregnancy}
										/>
										<FGMView
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<FamilyHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<SexualHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<SocialHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<GynaeHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<LabObservation
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<InitialAssessment
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<PhysicalExam
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<RoutineAssessment
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<GynaePapMearHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<ObstericHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<PastOcularHistory
											currentPage={currentPage}
											loopHistory={this.loopHistory}
											obstericsHistory={ant.obstericsHistory}
											loopObject={this.loopObject}
										/>
										<div className="row">
											<div className="col-sm-6 text-left">
												{currentPage > 1 ? (
													<button
														className="btn btn-primary"
														onClick={this.prevPage}>
														Previous
													</button>
												) : null}
											</div>
											<div className="col-sm-6 text-right">
												{currentPage < 15 ? (
													<button
														className="btn btn-primary"
														onClick={this.nextPage}>
														Next
													</button>
												) : null}
											</div>
										</div>
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

const mapStateToProps = state => {
	return {
		antennatal: state.patient.antennatal,
		antenatal_id: state.general.antenatal_id,
	};
};

export default connect(mapStateToProps, { closeModals })(ModalAntenatalDetail);
