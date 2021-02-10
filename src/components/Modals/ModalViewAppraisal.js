import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalViewAppraisal extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
		const { staff, period } = this.props;
		console.log('ModalStaffAppraisal');
		console.log(staff.id);
		console.log(period.id);
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
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
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Performance Appraisal</h4>
							<div className="table-responsive col-md-12">
								<table className="table table-striped">
									<tbody>
										<tr>
											<th className="text-left">Name of Staff</th>
											<td className="text-right">My Name</td>
										</tr>
										<tr>
											<th className="text-left">Department</th>
											<td className="text-right">My Department</td>
										</tr>
										<tr>
											<th className="text-left">HOD/Line Manager</th>
											<td className="text-right">Mr Onu</td>
										</tr>
										<tr>
											<th className="text-left">Management Period</th>
											<td className="text-right text-uppercase">
												2nd Quarter [Apr - Jun]
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
											<th>Weight</th>
											<th>Self Assessment</th>
											<th>Line Manager's Assessment</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td rowSpan="5">Job Performance / Competence</td>
											<td rowSpan="5">Work Efficiency</td>
											<td>assessment 1</td>
											<td rowSpan="5">70%</td>
											<td rowSpan="5"></td>
											<td rowSpan="5"></td>
										</tr>
										<tr>
											<td>assessment 2</td>
										</tr>
										<tr>
											<td>assessment 3</td>
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
											<td>collaborate 1</td>
											<td rowSpan="2">20%</td>
											<td rowSpan="2"></td>
											<td rowSpan="2"></td>
										</tr>
										<tr>
											<td>collaborate 2</td>
										</tr>
										<tr>
											<td>Other Factor</td>
											<td>Attendance</td>
											<td>Achieve 95% monthly attendance at work</td>
											<td>10%</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td />
											<td />
											<td />
											<td>100%</td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="onboarding-text text-left mt-4">
								<h6>Employee's Comment</h6>
								<p>Commenting on the apraisal by the employee himself</p>
							</div>
							<div className="onboarding-text text-left mt-4">
								<h6>Line Manager's Comment</h6>
								<p>Commenting on the apraisal by the line manager himself</p>
							</div>
							<form>
								<fieldset className="form-group">
									<legend>
										<span className="text-secondary">HR's Comment</span>
									</legend>
									<div className="form-group">
										<textarea className="form-control" rows="3"></textarea>
									</div>
									<div className="form-buttons-w">
										<div className="text-right mt-3">
											<button className="btn btn-primary">Save</button>
										</div>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ general, hr }) => {
	return {
		staff: general.staffForApraisal,
		period: hr.performancePeriod,
	};
};

export default connect(mapStateToProps, { closeModals })(ModalViewAppraisal);
