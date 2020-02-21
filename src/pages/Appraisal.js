import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppraisalItem from '../components/AppraisalItem';

class Appraisal extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Appraisals</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Department</th>
													<th>HOD/Line Manager</th>
													<th>Period</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<AppraisalItem approved={1} />
												<AppraisalItem approved={0} />
												<AppraisalItem approved={1} />
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

export default connect(null)(Appraisal);
