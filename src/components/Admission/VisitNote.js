import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import ReactDOM from 'react-dom';

import EncounterMenu from '../Navigation/EncounterMenu';
import Complaints from './Complaints';
import ReviewOfSystem from './ReviewOfSystem';
import PhysicalExamSummary from './PhysicalExamSummary';
import Diagnosis from './Diagnosis';
import Plan from './Plan';
import { soap } from '../../services/constants';

const EncounterTabs = ({
	index,
	previous,
	next,
	patient,
	closeModal,
	admission_id,
}) => {
	switch (index) {
		case 4:
			return (
				<Plan
					previous={previous}
					patient={patient}
					closeModal={closeModal}
					admission_id={admission_id}
				/>
			);
		case 3:
			return <Diagnosis next={next} previous={previous} patient={patient} />;
		case 2:
			return <PhysicalExamSummary next={next} previous={previous} />;
		case 1:
			return <ReviewOfSystem next={next} previous={previous} />;
		case 0:
		default:
			return <Complaints next={next} />;
	}
};

class VisitNote extends Component {
	state = {
		eIndex: 0,
		dropdown: false,
	};

	componentDidMount() {
		setTimeout(() => {
			this.focusDiv();
		}, 200);
	}

	open = i => () => {
		this.setState({ eIndex: i });
	};

	next = () => {
		const { eIndex } = this.state;
		const i = eIndex + 1;
		if (i <= soap.length - 1) {
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
		const { item, patient, closeModal, type } = this.props;
		const { eIndex } = this.state;
		const current = soap[eIndex];
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
							onClick={closeModal}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="layout-w flex-column">
							<EncounterMenu
								encounters={soap}
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
											admission_id={item.id}
											closeModal={closeModal}
											type={type}
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

export default VisitNote;
