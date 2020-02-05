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
								<div className="element-box">
									<h5 className="form-header">Leave Management</h5>
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Name</th>
													<th>Profession</th>
													<th>Department</th>
													<th className="text-center">Date To leave</th>
													<th className="text-center">Date To Return</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<LeaveItem onLeave={true} />
												<LeaveItem onLeave={false} />
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
