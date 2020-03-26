import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import EncounterMenu from '../../Navigation/EncounterMenu';
import Complaints from '../Encounter/Complaints';
import Consumable from '../Encounter/Consumable';
import PlanForm from '../Encounter/PlanForm';
import Investigations from '../Encounter/Investigations';
import Diagnosis from '../Encounter/Diagnosis';
import PhysicalExamSummary from '../Encounter/PhysicalExamSummary';
import PhysicalExam from '../Encounter/PhysicalExam';
import Allergies from '../Encounter/Allergies';
import PastHistory from '../Encounter/PastHistory';
import HxForm from '../Encounter/HxForm';
import ReviewOfSystem from '../Encounter/ReviewOfSystem';
import { encounters } from '../../../services/constants';
import { closeModals } from '../../../actions/general';
import ProfileBlock from '../../ProfileBlock';

const EncounterTabs = ({ index }) => {
	switch (index) {
		case 10:
			return <Consumable />;
		case 9:
			return <PlanForm />;
		case 8:
			return <Investigations />;
		case 7:
			return <Diagnosis />;
		case 6:
			return <PhysicalExamSummary />;
		case 5:
			return <PhysicalExam />;
		case 4:
			return <Allergies />;
		case 3:
			return <PastHistory />;
		case 2:
			return <HxForm />;
		case 1:
			return <ReviewOfSystem />;
		case 0:
		default:
			return <Complaints />;
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

		ArrowKeysReact.config({
			left: () => {
				this.setState({
					content: 'left key detected.',
				});
				this.previous();
			},
			right: () => {
				this.setState({
					content: 'right key detected.',
				});
				this.next();
			},
			up: () => {
				this.setState({
					content: 'up key detected.',
				});
			},
			down: () => {
				this.setState({
					content: 'down key detected.',
				});
			},
		});
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
		ReactDOM.findDOMNode(this.refs.theDiv).focus();
	}

	render() {
		const { patient } = this.props;
		const { eIndex, dropdown } = this.state;
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
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="layout-w flex-column">
							<ProfileBlock
								dropdown={dropdown}
								patient={patient}
								toggleDropdown={this.toggleDropdown}
							/>
							<EncounterMenu
								profile={false}
								encounters={encounters}
								active={kebabCase(current)}
								open={this.open}
							/>
							<div className="content-w">
								<div className="content-i">
									<div className="content-box">
										{/* <h6 className="onboarding-title">{current}</h6> */}
										<EncounterTabs index={eIndex} />
										<div className="row mt-5">
											<div className="col-sm-12 d-flex ant-row-flex-space-between">
												<button
													className="btn btn-primary"
													onClick={this.previous}>
													Previous
												</button>
												<button className="btn btn-primary" onClick={this.next}>
													Next
												</button>
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

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, { closeModals })(OpenEncounter);
