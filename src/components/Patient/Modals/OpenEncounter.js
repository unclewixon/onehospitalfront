import React, { Component, useEffect, useState, useRef } from 'react';
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

const OpenEncounter = props => {
	const [state, setState] = useState({
		eIndex: 0,
		content: '',
		dropdown: false,
	});

	const theDiv = useRef();

	useEffect(() => {
		setTimeout(() => {
			focusDiv();
		}, 200);

		ArrowKeysReact.config({
			left: () => {
				setState({
					...state,
					content: 'left key detected.',
				});
				previous();
			},
			right: () => {
				setState({
					...state,
					content: 'right key detected.',
				});
				next();
			},
			up: () => {
				setState({
					...state,
					content: 'up key detected.',
				});
			},
			down: () => {
				setState({
					...state,
					content: 'down key detected.',
				});
			},
		});
	});

	const open = i => () => {
		setState({ ...state, eIndex: i });
	};

	const next = () => {
		const { eIndex } = state;
		const i = eIndex + 1;
		if (i <= encounters.length - 1) {
			setState({ ...state, eIndex: i });
		}

		setTimeout(() => {
			focusDiv();
		}, 200);
	};

	const previous = () => {
		const { eIndex } = state;
		const i = eIndex - 1;
		if (i >= 0) {
			setState({ ...state, eIndex: i });
		}

		setTimeout(() => {
			focusDiv();
		}, 200);
	};

	const toggleDropdown = () => () => {
		setState((prevState, props) => ({
			dropdown: !prevState.dropdown,
		}));
	};

	function focusDiv() {
		// console.log('set focus');
		ReactDOM.findDOMNode(theDiv.current).focus();
	}

	const { patient } = props;
	const { eIndex, dropdown } = state;
	const current = encounters[eIndex];

	return (
		<div
			className="onboarding-modal modal fade animated show top-modal"
			role="dialog"
			style={{ display: 'block' }}
			tabIndex="1"
			{...ArrowKeysReact.events}
			ref={theDiv}>
			<div className="modal-dialog modal-lg modal-centered" role="document">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => props.closeModals(false)}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="layout-w flex-column">
						<ProfileBlock
							dropdown={dropdown}
							patient={patient}
							toggleDropdown={toggleDropdown}
						/>
						<EncounterMenu
							profile={false}
							encounters={encounters}
							active={kebabCase(current)}
							open={open}
						/>
						<div className="content-w">
							<div className="content-i">
								<div className="content-box">
									{/* <h6 className="onboarding-title">{current}</h6> */}
									{
										{
											10: (
												<Consumable
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											9: (
												<PlanForm
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											8: (
												<Investigations
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											7: (
												<Diagnosis
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											6: (
												<PhysicalExamSummary
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											5: (
												<PhysicalExam
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											4: (
												<Allergies
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											3: (
												<PastHistory
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											2: (
												<HxForm
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											1: (
												<ReviewOfSystem
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
											0: (
												<Complaints
													index={eIndex}
													next={next}
													previous={previous}
												/>
											),
										}[eIndex]
									}
									<div className="row mt-5">
										<div className="col-sm-12 d-flex ant-row-flex-space-between">
											<button className="btn btn-primary" onClick={previous}>
												Previous
											</button>
											<button className="btn btn-primary" onClick={next}>
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
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, { closeModals })(OpenEncounter);
