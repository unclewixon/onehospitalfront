/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showHistory } from '../actions/general';

class LeaveItem extends Component {
	state = {
		collapsed: true,
	};

	doLeaveHistory = e => {
		e.preventDefault();
		console.log('leave history');
		this.props.showHistory(true);
	};

	toggle = e => {
		e.preventDefault();
		this.setState({ collapsed: !this.state.collapsed });
	};

	doApproveLeave = e => {
		e.preventDefault();
		console.log('approve leave');
	};

	doDeclineLeave = e => {
		e.preventDefault();
		console.log('decline leave');
	};

	render() {
		const { onLeave, hasRequest } = this.props;
		const { collapsed } = this.state;
		return (
			<>
				<tr>
					<td>
						{hasRequest && (
							<div role="button" tabIndex="0" className={`row-expand-icon ${collapsed ? 'row-collapsed' : 'row-expanded'}`} onClick={this.toggle}/>
						)}
					</td>
					<td>John Mayers</td>
					<td>Doctor</td>
					<td>OPD</td>
					<td>{onLeave ? 'Maternity Leave' : '-'}</td>
					<td className="text-center">{onLeave ? '20 Oct, 2020' : '-'}</td>
					<td className="text-center">{onLeave ? '20 Nov, 2020' : '-'}</td>
					<td className="text-center">
						{onLeave ? (
							<span className="badge badge-danger-inverted">on leave</span>
						) : '-'}
					</td>
					<td className="text-right row-actions">
						{hasRequest && (
							<a href="#" onClick={this.toggle} className="secondary" title="Approve Leave">
								<i className="os-icon os-icon-check-circle" />
							</a>
						)}
						<a href="#" onClick={this.doLeaveHistory} className="danger" title="Leave History">
							<i className="os-icon os-icon-basic-2-259-calendar" />
						</a>
					</td>
				</tr>
				{!collapsed && (
					<tr className="expanded-row leave-box">
						<td/>
						<td colSpan="8">
							<div className="element-wrapper">
								<div className="element-actions">
									<a href="#" className="btn btn-success btn-sm mr-2" onClick={this.doApproveLeave}>
										<i className="os-icon os-icon-check-circle" />
										<span>Approve Leave</span>
									</a>
									<a href="#" className="btn btn-secondary btn-sm" onClick={this.doDeclineLeave}>
										<i className="os-icon os-icon-x-circle" />
										<span>Decline</span>
									</a>
								</div>
								<h6 className="element-header">Leave Application</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped table-sm">
											<tbody>
												<tr>
													<th>Type of Leave</th>
													<td>Sick Leave</td>
												</tr>
												<tr>
													<th>Doctor's Name</th>
													<td>Dr Onu</td>
												</tr>
												<tr>
													<th>Summary</th>
													<td>Staff is not feeling well</td>
												</tr>
												<tr>
													<th>Leave Duration</th>
													<td>12 Jul, 2020 - 12 Aug, 2020 [30 Days]</td>
												</tr>
												<tr>
													<th>Date</th>
													<td>12 Jul, 2020</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</td>
					</tr>
				)}
			</>
		);
	}
}

export default connect(null, { showHistory })(LeaveItem);
