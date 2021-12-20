import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';

import EncounterMenu from '../../Navigation/EncounterMenu';
import Complaints from '../Encounter/Complaints';
import Consumable from '../Encounter/Consumable';
import PlanForm from '../Encounter/PlanForm';
import Investigations from '../Encounter/Investigations';
import Diagnosis from '../Encounter/Diagnosis';
import PhysicalExam from '../Encounter/PhysicalExam';
import Allergies from '../Encounter/Allergies';
import PastHistory from '../Encounter/PastHistory';
import HxForm from '../Encounter/HxForm';
import ReviewOfSystem from '../Encounter/ReviewOfSystem';
import { encounters } from '../../../services/constants';

const EncounterTabs = ({
	index,
	previous,
	next,
	patient,
	closeModal,
	updateAppointment,
	appointment_id,
}) => {
	switch (index) {
		case 9:
			return (
				<Consumable
					previous={previous}
					patient={patient}
					closeModal={closeModal}
					updateAppointment={updateAppointment}
					appointment_id={appointment_id}
				/>
			);
		case 8:
			return <PlanForm next={next} previous={previous} patient={patient} />;
		case 7:
			return (
				<Investigations next={next} previous={previous} patient={patient} />
			);
		case 6:
			return <Diagnosis next={next} previous={previous} patient={patient} />;
		case 5:
			return <PhysicalExam next={next} previous={previous} patient={patient} />;
		case 4:
			return <Allergies next={next} previous={previous} patient={patient} />;
		case 3:
			return <PastHistory next={next} previous={previous} patient={patient} />;
		case 2:
			return <HxForm next={next} previous={previous} patient={patient} />;
		case 1:
			return (
				<ReviewOfSystem next={next} previous={previous} patient={patient} />
			);
		case 0:
		default:
			return <Complaints next={next} patient={patient} />;
	}
};

class OpenEncounter extends Component {
	state = {
		eIndex: 0,
		content: '',
		dropdown: false,
	};

	componentDidMount() {
		setTimeout(() => {
			this.focusDiv();
		}, 200);

		// ArrowKeysReact.config({
		// 	left: () => {
		// 		this.setState({
		// 			content: 'left key detected.',
		// 		});
		// 		this.previous();
		// 	},
		// 	right: () => {
		// 		this.setState({
		// 			content: 'right key detected.',
		// 		});
		// 		this.next();
		// 	},
		// 	up: () => {
		// 		this.setState({
		// 			content: 'up key detected.',
		// 		});
		// 	},
		// 	down: () => {
		// 		this.setState({
		// 			content: 'down key detected.',
		// 		});
		// 	},
		// });
	}

	open = i => () => {
		this.setState({ eIndex: i });
	};

	next = () => {
		const { eIndex } = this.state;
		const i = eIndex + 1;
		if (i <= encounters.length - 1) {
			this.setState({ eIndex: i });
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
		const {
			appointment_id,
			patient,
			closeModal,
			updateAppointment,
		} = this.props;
		const { eIndex } = this.state;
		const current = encounters[eIndex];
		return (
			<div
				className="onboarding-modal modal fade animated show top-modal"
				role="dialog"
				style={{ display: 'block' }}
				tabIndex="1"
				{...ArrowKeysReact.events}
				ref="theDiv">
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content">
						<button
							aria-label="Close"
							className="close text-white"
							type="button"
							onClick={closeModal}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="layout-w flex-column">
							<EncounterMenu
								encounters={encounters}
								active={kebabCase(current)}
								open={this.open}
							/>
							<div className="content-w">
								<div className="content-i">
									<div
										className="content-box encounter-box"
										style={eIndex === 3 ? { overflowY: 'visible' } : {}}>
										<EncounterTabs
											index={eIndex}
											next={this.next}
											previous={this.previous}
											patient={patient}
											appointment_id={appointment_id}
											closeModal={closeModal}
											updateAppointment={updateAppointment}
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

export default OpenEncounter;
