import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeaveItem from '../components/LeaveItem';

class LeaveMgt extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<form className="form-inline justify-content-sm-end">
										<label>Department:</label>
										<select className="form-control form-control-sm rounded mr-4">
											<option value="Pending">All</option>
											<option value="Pending">Nursing</option>
											<option value="Active">Gynae</option>
											<option value="Cancelled">OPD</option>
										</select>
										<label>Category:</label>
										<select className="form-control form-control-sm rounded mr-4">
											<option value="Pending">All</option>
											<option value="Active">Sick Leave</option>
											<option value="Active">Maternity Leave</option>
										</select>
										<label>Status:</label>
										<select className="form-control form-control-sm rounded">
											<option value="Pending">All</option>
											<option value="Pending">On Leave</option>
											<option value="Active">Not On Leave</option>
										</select>
									</form>
								</div>
								<h6 className="element-header">Leave Management</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th/>
													<th>Name</th>
													<th>Profession</th>
													<th>Department</th>
													<th>Type</th>
													<th className="text-center">Date To leave</th>
													<th className="text-center">Date To Return</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<LeaveItem
													onLeave={true}
													hasRequest={false}
												/>
												<LeaveItem
													onLeave={false}
													hasRequest={true}
												/>
												<LeaveItem
													onLeave={true}
													hasRequest={false}
												/>
												<LeaveItem
													onLeave={false}
													hasRequest={true}
												/>
												<LeaveItem
													onLeave={false}
													hasRequest={true}
												/>
											</tbody>
										</table>
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

export default connect(null)(LeaveMgt);
