import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffItem from '../components/StaffItem';
import { createStaff } from '../actions/general';

class Consultation extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								
								<div className="element-box">
									<h5 className="form-header">Staff List</h5>
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Name</th>
													<th>Traffic</th>
													<th>Category ID</th>
													<th>Phone</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<StaffItem />
												<StaffItem />
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

export default connect(null, { createStaff })(Consultation);
