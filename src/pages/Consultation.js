import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffItem from '../components/StaffItem';
import { createStaff } from '../actions/general';
import LabTest from "../components/LabTest"

class Consultation extends Component {
	render() {
		return (
			<div className="content-i">

				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-wrapper pb-4 mb-4 border-bottom">
									<div className="element-box-tp">
										{/* <button className="btn btn-primary" onClick={() => this.props.createStaff(true)}>
											<i className="os-icon os-icon-plus-circle" />
											<span>Create New Staff</span>
										</button> */}
									</div>
								</div>
								<div className="element-box">
									<h5 className="form-header">Consultation</h5>
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Name</th>
													<th>Traffic</th>
													<th>Category ID</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
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
