import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import ReactDOM from 'react-dom';

import EncounterMenu from '../Navigation/EncounterMenu';
import { assessmentMenu } from '../../services/constants';
import GeneralAssessment from './Assessment/GeneralAssessment';
import GeneralComments from './Assessment/GeneralComments';
import LabInvestigation from './Assessment/LabInvestigation';
import RadiologyRequest from './Assessment/RadiologyRequest';
import Prescription from './Assessment/Prescription';
import NextAppointment from './Assessment/NextAppointment';

const AssessmentTabs = ({
	index,
	previous,
	next,
	closeModal,
	assessment,
	appointment_id,
	patient,
	antenatal,
}) => {
	switch (index) {
		case 5:
			return (
				<NextAppointment
					assessment={assessment}
					previous={previous}
					closeModal={closeModal}
					appointment_id={appointment_id || ''}
					antenatal={antenatal}
				/>
			);
		case 4:
			return (
				<Prescription
					assessment={assessment}
					next={next}
					previous={previous}
					patient={patient}
				/>
			);
		case 3:
			return (
				<RadiologyRequest
					assessment={assessment}
					next={next}
					previous={previous}
				/>
			);
		case 2:
			return (
				<LabInvestigation
					assessment={assessment}
					next={next}
					previous={previous}
				/>
			);
		case 1:
			return (
				<GeneralAssessment
					assessment={assessment}
					next={next}
					previous={previous}
				/>
			);
		case 0:
		default:
			return <GeneralComments assessment={assessment} next={next} />;
	}
};

class NewAssessment extends Component {
	state = {
		eIndex: 0,
		dropdown: false,
		assessment: null,
	};

	componentDidMount() {
		setTimeout(() => {
			this.focusDiv();
		}, 200);
	}

	open = i => () => {
		this.setState({ eIndex: i });
	};

	next = data => {
		const { eIndex, assessment } = this.state;
		const i = eIndex + 1;
		if (i <= assessmentMenu.length - 1) {
			this.setState({ eIndex: i, assessment: { ...assessment, ...data } });
		}

		setTimeout(() => {
			this.focusDiv();
		}, 200);
	};

	previous = () => {
		const { eIndex } = this.state;
		const i = eIndex - 1;
		if (i >= 0) {
			this.setState({ eIndex: i });
		}

		setTimeout(() => {
			this.focusDiv();
		}, 200);
	};

	toggleDropdown = () => () => {
		this.setState((prevState, props) => ({
			dropdown: !prevState.dropdown,
		}));
	};

	focusDiv() {
		console.log('set focus');
		try {
			ReactDOM.findDOMNode(this.refs.theDiv).focus();
		} catch (e) {}
	}

	render() {
		const { closeModal, appointment_id, patient, antenatal } = this.props;
		const { eIndex, assessment } = this.state;
		const current = assessmentMenu[eIndex];
		return (
			<div
				className="onboarding-modal modal fade animated show top-modal"
				role="dialog"
				style={{ display: 'block' }}
				tabIndex="1"
				ref="theDiv">
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content">
						<button
							aria-label="Close"
							className="close override text-white"
							type="button"
							onClick={() => closeModal()}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="layout-w flex-column">
							<EncounterMenu
								encounters={assessmentMenu}
								active={kebabCase(current)}
								open={this.open}
								noClick={true}
							/>
							<div className="content-w">
								<div className="content-i">
									<div
										className="content-box encounter-box"
										style={eIndex === 3 ? { overflowY: 'visible' } : {}}>
										<AssessmentTabs
											index={eIndex}
											next={this.next}
											previous={this.previous}
											closeModal={closeModal}
											assessment={assessment}
											appointment_id={appointment_id}
											patient={patient}
											antenatal={antenatal}
										/>
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

export default NewAssessment;
