/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

class StaffDetail extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Staff Detail</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													STAFF ID
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													NAME
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													JOB TITLE
												</div>
												<div className="fht-cell"></div>
											</th>

											<th data-field="5">
												<div className="th-inner text-center">Actions</div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="flex text-center">
												<a className="item-title text-color">Sick Leave</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Albert kezie</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Doctor</a>
											</td>

											<td className="text-center row-actions">
												<Tooltip title="Edit Staff">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(StaffDetail);
