import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import {
	errorMessage,
	renderTextArea,
	confirmAction,
	renderTextInput,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
const work = {
	q16:
		'Expresses self well to verbal and written communication;steps all appropriate individuals informedregarding the progrss or problems',
	q17: 'Accepts the perspective of others and maintains a positive attitude',
	q18:
		'Analyzes own departmental need and improves  capabilties to meet chaning requirement on the job;ensures or enhabce professionsal postion',
	q19:
		'Demonstrates flexibilty;adjust to shifting priorities;stay focused during stressful or difficult situations',
	q20:
		'Work efffectively as a member of ateam to the achievement of joint objectives',
};

const admin = {
	q1:
		'Creates effective work plans;Identifies the appropriate resource and process;Sets priorities;delegates authority and meets deadlines',
	q2:
		'Ensures department compliance with regulatory standard while adhering to the Company Policies and compliance',
	q3:
		'Incorporates control systems that monitor workflow and ensure task completion',
	q4:
		'Enforces for all subordinates and personally complies with all Hospital disease prevention and control',
	q5:
		'Ensures that budget are used responsibliy;introduces innovative ways to reduce costs',
	q6:
		'Identifies customer needs and take actionto meet those needs;continually searches for ways ton increase customer satisfaction',
	q7:
		'Emphazies the need to deliver quality services;confirm standard for quality  and evaluates processes against those standard in an effoort to improve departement performance',
};
const leader = {
	q8:
		"Demonstrate knowledge of the Hospital's mission and values and their relationship to the department's work",
	q9:
		'Demonstrate the ability to take change; gains support and commitment;initiate actions and makes logical decisions',
	q10: 'Fosters team spirit through cooperation and trust;leads by example',

	q11:
		'Initiate new and uinque ideas; assumes risk and accepts responsibility for results',
	q12:
		'Acts professionally and responsibly within and outside of the Hospital;contribute to positive image',

	q13:
		'Create and develops work teams through coaching,counselling and mentoring',
	q14:
		'Provides staff withcontinual feedback;conducts performance appraisal on time;recognizes and celebrates exceptional performance and take collective actions to improve poor performance',
	q15: 'Exhibits fairness in handling various matters amongst team members',
};

const validate = values => {
	const errors = {};

	// eslint-disable-next-line array-callback-return
	Object.keys(admin).map(el => {
		if (
			!values[el] ||
			(values[el] && parseInt(values[el], 10) > 5) ||
			(values[el] && parseInt(values[el], 10) < 1)
		) {
			errors[el] = 'error';
		}
	});

	// eslint-disable-next-line array-callback-return
	Object.keys(leader).map(el => {
		if (
			!values[el] ||
			(values[el] && parseInt(values[el], 10) > 5) ||
			(values[el] && parseInt(values[el], 10) < 1)
		) {
			errors[el] = 'error';
		}
	});

	// eslint-disable-next-line array-callback-return
	Object.keys(work).map(el => {
		if (
			!values[el] ||
			(values[el] && parseInt(values[el], 10) > 5) ||
			(values[el] && parseInt(values[el], 10) < 1)
		) {
			errors[el] = 'error';
		}
	});

	if (!values.comment) {
		errors.comment = 'error';
	}

	return errors;
};

class ModalLineAppraisal extends Component {
	state = {
		submitting: false,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	doLineAssessment = data => async () => {
		try {
			const total = Object.keys(data).reduce((acc, el) => {
				if (el === 'comment') {
					return acc;
				}
				return acc + +data[el];
			}, 0);
			console.log(total);
		} catch (e) {}
	};
	confirmSave = data => {
		confirmAction(
			this.doLineAssessment(data),
			null,
			'You will not be able to edit after submitting appraisal'
		);
	};
	render() {
		const { error, handleSubmit, period } = this.props;
		const { submitting } = this.state;
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
							<div className="element-info mb-3">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">
											SUPERVISOR'S EVALUATION {period.performancePeriod} Score
											1-5 (5 Highest)
										</h5>
									</div>
								</div>
							</div>
							<div className="row my-4">
								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box">
											<form onSubmit={handleSubmit(this.confirmSave)}>
												{errorMessage(error)}
												<h6>ADMINISTRATIVE COMPETITIVENESS</h6>
												<table className="table table-striped table-bordered">
													<tbody>
														{Object.keys(admin).map(el => {
															return (
																<tr>
																	<td
																		className="font-weight-bold text-left"
																		colSpan="7">
																		{admin[el]}
																	</td>
																	<td
																		className="text-right"
																		style={{ width: '100px' }}>
																		<Field
																			name={el}
																			component={renderTextInput}
																			label=""
																			type="number"
																		/>
																	</td>
																</tr>
															);
														})}
													</tbody>
												</table>

												<h6>LEADERSHIP AND STAFF MANAGEMENT</h6>

												<table className="table table-striped table-bordered">
													<tbody>
														{Object.keys(leader).map(el => {
															return (
																<tr>
																	<td
																		className="font-weight-bold text-left"
																		colSpan="7">
																		{leader[el]}
																	</td>
																	<td
																		className="text-right"
																		style={{ width: '100px' }}>
																		<Field
																			name={el}
																			component={renderTextInput}
																			label=""
																			type="number"
																		/>
																	</td>
																</tr>
															);
														})}
													</tbody>
												</table>

												<h6>WORK METHODS AND QUALITIES</h6>

												<table className="table table-striped table-bordered">
													<tbody>
														{Object.keys(work).map(el => {
															return (
																<tr>
																	<td
																		className="font-weight-bold text-left"
																		colSpan="7">
																		{work[el]}
																	</td>
																	<td
																		className="text-right"
																		style={{ width: '100px' }}>
																		<Field
																			name={el}
																			component={renderTextInput}
																			label=""
																			type="number"
																		/>
																	</td>
																</tr>
															);
														})}

														{/* <tr>
											<td className="font-weight-bold text-right" colSpan="7">
												Total
											</td>
											<td className="text-right" colSpan="2">
												<Field
													name="total"
													component={renderTextInput}
													label=""
													type="number"
													readOnly
													onChange={this.handleChangeA1}
												/>
											</td>
										</tr> */}
													</tbody>
												</table>
												<fieldset className="form-group">
													<legend>
														<span className="text-secondary">
															EVALUATOR'S COMMENT:Discuss your assessment in
															detail
														</span>
													</legend>
													<div className="form-group">
														<Field
															name="comment"
															component={renderTextArea}
															type="text"
															placeholder="Write your comment here"
														/>
													</div>
													<div className="form-buttons-w">
														<div className="text-right mt-3">
															<button
																className="btn btn-primary"
																disabled={submitting}
																type="submit">
																{submitting ? (
																	<img src={waiting} alt="submitting" />
																) : (
																	'Save'
																)}
															</button>
														</div>
													</div>
												</fieldset>
											</form>
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

ModalLineAppraisal = reduxForm({
	form: 'line_appraisal',
	validate,
})(ModalLineAppraisal);
const mapStateToProps = state => {
	return {
		line_appraisal: state.general.line_appraisal,
		departments: state.settings.departments,
		period: state.hr.performancePeriod,
	};
};

export default withRouter(
	connect(mapStateToProps, { closeModals })(ModalLineAppraisal)
);
