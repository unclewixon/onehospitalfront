import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	// SubmissionError,
	reset,
	change,
	formValueSelector,
} from 'redux-form';
import $ from 'jquery';

import { errorMessage, request, confirmAction } from '../../services/utilities';
import { appraisalAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { setPerformancePeriod } from '../../actions/hr';

const validate = values => {
	const errors = {};
	return errors;
};

export const renderTextInput = ({
	input,
	label,
	type,
	readOnly,
	placeholder,
	meta: { touched, error },
}) => (
	<div
		className={`form-group ${touched &&
			(error ? 'has-error has-danger' : '')}`}>
		<input
			{...input}
			type={type}
			className="form-control"
			placeholder={placeholder || label}
			readOnly={readOnly}
		/>
	</div>
);

class CreateAppraisal extends Component {
	state = {
		submitting: false,
		departments: [],
	};

	componentDidMount() {
		this.fetchDepartments();
		console.log(this.props.staff);
	}

	fetchDepartments = async () => {
		try {
			const rs = await request(`departments`, 'GET', true);
			this.setState({ departments: rs });
		} catch (error) {
			console.log(error);
			notifyError(error.message || 'could not fetch departments');
		}
	};

	handleChangeA1 = e => {
		let newValue = e.target.value;
		const { work_attitude, other_factor } = this.props;
		const total = parseInt(newValue, 10) + work_attitude + other_factor;
		if (!isNaN(total) && total <= 100) {
			this.props.dispatch(this.props.change('sum_total', total));
		}
	};

	handleChangeA2 = e => {
		let newValue = e.target.value;
		const { performance, other_factor } = this.props;
		const total = performance + parseInt(newValue, 10) + other_factor;
		if (!isNaN(total) && total <= 100) {
			this.props.dispatch(this.props.change('sum_total', total));
		}
	};

	handleChangeA3 = e => {
		let newValue = e.target.value;
		const { performance, work_attitude } = this.props;
		const total = performance + work_attitude + parseInt(newValue, 10);
		if (!isNaN(total) && total <= 100) {
			this.props.dispatch(this.props.change('sum_total', total));
		}
	};

	doCreateAppraisal = data => async () => {
		const { performance, work_attitude, other_factor } = this.props;
		const total = performance + work_attitude + other_factor;
		if (!isNaN(total) && total === 100) {
			this.setState({ submitting: true });
			const { staff, location } = this.props;
			const { departments } = this.state;
			console.log('doCreateApprai');
			console.log(departments);
			console.log(staff);
			const deptId = staff?.details?.department?.id;
			const department = departments?.find(d => d?.id === deptId);
			console.log(department);
			if (department) {
				const details = {
					staffId: staff?.id,
					lineManagerId: department?.hod_id,
					departmentId: staff.details?.department.id,
					employeeComment: data?.employeeComment,
					indicators: [
						{
							keyFocus: 'Job Performance/Competence',
							objective: 'Work Efficiency',
							kpis: [
								'To provide urgent medical attention and urgent treatment to staff or visitors in case of accident or sudden',
								'Attending to emergencies as regards clients (inpatient) health care.',
								"monitor the patents' conditions and progress",
							],
							weight: `${data.performance}%`,
						},
						{
							keyFocus: 'Work Attitude',
							objective: 'Team & Work Collaboration',
							kpis: [
								'Collaborate with colleagues and nursing staff regularly',
								'Makes meaningful recommendation to consultants and communicate effectively with consultants and others',
							],
							weight: `${data.work_attitude}%`,
						},
						{
							keyFocus: 'Other Factor',
							objective: 'Attendence',
							kpis: ['Achieve 95% monthly attendence at work'],
							weight: `${data.other_factor}%`,
						},
					],
				};

				console.log(details);

				try {
					const rs = await request(
						`${appraisalAPI}/new`,
						'POST',
						true,
						details
					);
					if (rs.success) {
						this.props.reset('create_appraisal');
						notifySuccess('appraisal created!');
					} else {
						notifyError(`${rs.message}`);
						console.log(rs);
					}
					this.setState({ submitting: false });

					this.props.history.push(`${location.pathname}#appraisal`);
				} catch (e) {
					console.log(e);
					this.setState({ submitting: false });
					console.log(e);
					setTimeout(function() {
						$('.slide-pane__content').scrollTop(0);
					}, 500);
					notifyError(`${e.message}`);
				}
			} else {
				setTimeout(function() {
					$('.slide-pane__content').scrollTop(0);
				}, 500);
				notifyError('invalid department');
				this.setState({ submitting: false });
			}
		} else {
			notifyError('please ensure total equals 100%');
		}
	};

	lineManager = data => async () => {
		try {
			console.log(data);
		} catch (e) {}
	};

	confirmSave = data => {
		confirmAction(
			this.doCreateAppraisal(data),
			null,
			'You will not be able to edit after submitting appraisal '
		);
	};

	render() {
		const { staff, error, handleSubmit, period, isStaffAppraisal } = this.props;
		const { submitting } = this.state;

		return (
			<div className="row my-4">
				<div className="col-sm-12">
					<div className="element-wrapper">
						{!isStaffAppraisal && (
							<>
								<div className="element-actions">
									<Link
										className="btn btn-primary btn-sm text-white"
										to={`/my-account/appraisal/staff-appraisal`}>
										<i className="os-icon os-icon-ui-22" />
										<span>go back</span>
									</Link>
								</div>
								<h6 className="element-header">New Staff Appraisal</h6>
							</>
						)}
						<div className="element-box m-0 p-3">
							<form onSubmit={handleSubmit(this.confirmSave)}>
								{errorMessage(error)}
								<div className="table-responsive">
									<table className="table table-striped">
										<tbody>
											<tr>
												<th className="text-left">Department</th>
												<td className="text-right">
													{staff?.department?.name}
												</td>
											</tr>
											<tr>
												<th className="text-left">Management Period</th>
												<td className="text-right text-uppercase">
													{/* {getPeriod()} */}
													{period?.performancePeriod}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="table-responsive mt-4">
									<table className="table table-bordered">
										<thead>
											<tr>
												<th>Key Focus</th>
												<th>Objective</th>
												<th>KPIs (Assessment Criteria)</th>
												<th>Example Weight</th>
												{isStaffAppraisal ? <th>Staff Assessment </th> : null}
												<th>
													{!isStaffAppraisal
														? 'Weight'
														: 'Your assessment of Staff'}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="5">Job Performance / Competence</td>
												<td rowSpan="5">Work Efficiency</td>
												<td>
													To provide urgent medical attention and urgent
													treatment to staff or visitors in case of accident or
													sudden
												</td>
												<td rowSpan="5">70%</td>
												{isStaffAppraisal ? <td rowSpan="5">65%</td> : null}
												<td rowSpan="5">
													<Field
														name="performance"
														component={renderTextInput}
														label="Job Performance / Competence"
														type="number"
														onChange={this.handleChangeA1}
													/>
												</td>
											</tr>
											<tr>
												<td>
													Attending to emergencies as regards clients
													(inpatient) health care.
												</td>
											</tr>
											<tr>
												<td>monitor the patents' conditions and progress</td>
											</tr>
											<tr>
												<td>assessment 4</td>
											</tr>
											<tr>
												<td>assessment 5</td>
											</tr>
											<tr>
												<td rowSpan="2">Work Attitude</td>
												<td rowSpan="2">Team & Work Collaboration</td>
												<td>
													Collaborate with colleagues and nursing staff
													regularly
												</td>
												<td rowSpan="2">20%</td>
												{isStaffAppraisal ? <td rowSpan="2">15%</td> : null}
												<td rowSpan="2">
													<Field
														name="work_attitude"
														component={renderTextInput}
														label="Work Attitude"
														type="number"
														onChange={this.handleChangeA2}
													/>
												</td>
											</tr>
											<tr>
												<td>
													Makes meaningful recommendation to consultants and
													communicate effectively with consultants and others
												</td>
											</tr>
											<tr>
												<td>Other Factor</td>
												<td>Attendance</td>
												<td>Achieve 95% monthly attendance at work</td>
												<td>10%</td>
												{isStaffAppraisal ? <td>9%</td> : null}
												<td>
													<Field
														name="other_factor"
														component={renderTextInput}
														label="Other Factor"
														type="number"
														onChange={this.handleChangeA3}
													/>
												</td>
											</tr>
											<tr>
												<td />
												<td />
												<td />

												<td>100%</td>
												{isStaffAppraisal ? <td>89%</td> : null}

												<td>
													<Field
														name="sum_total"
														component={renderTextInput}
														label="Total"
														type="number"
														readOnly={true}
													/>
												</td>
											</tr>
										</tbody>
									</table>
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
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateAppraisal = reduxForm({
	form: 'create_appraisal',
	validate,
})(CreateAppraisal);

const selector = formValueSelector('create_appraisal');

const mapStateToProps = (state, ownProps) => {
	const _performance = selector(state, 'performance');
	const _workAttitude = selector(state, 'work_attitude');
	const _otherFactor = selector(state, 'other_factor');

	return {
		initialValues: {
			performance: 0,
			work_attitude: 0,
			other_factor: 0,
			sum_total: 0,
		},
		//staff: state.user.profile,
		performance: parseInt(_performance, 10),
		work_attitude: parseInt(_workAttitude, 10),
		other_factor: parseInt(_otherFactor, 10),
		period: state.hr.performancePeriod,
		staff: state.general.staffForApraisal,
	};
};

export default withRouter(
	connect(mapStateToProps, { change, reset, setPerformancePeriod })(
		CreateAppraisal
	)
);
