/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffItem from '../components/StaffItem';
import { createStaff } from '../actions/general';

class StaffList extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-primary btn-sm" href="#" onClick={() => this.props.createStaff(true)}>
										<i className="os-icon os-icon-ui-22"/>
										<span>Create New Staff</span>
									</a>
								</div>
								<h6 className="element-header">Staff List</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Staff ID</th>
													<th>Name</th>
													<th>Username</th>
													<th>Profession</th>
													<th>Phone</th>
													<th>Department</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<StaffItem enabled={1} />
												<StaffItem enabled={0}/>
												<StaffItem enabled={1} />
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

export default connect(null, { createStaff })(StaffList);
