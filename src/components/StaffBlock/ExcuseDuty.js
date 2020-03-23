/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
export class ExcuseDuty extends Component {
	state = {
		submitting: false,
		staff: '',
	};

	render() {
		const { location } = this.props;
		return (
			<div className="row my-4">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions">
							<Link
								className="btn btn-primary btn-sm text-white"
								to={`${location.pathname}#create-excuse`}>
								<i className="os-icon os-icon-ui-22" />
								<span>New Excuse Duty</span>
							</Link>
						</div>
						<h6 className="element-header">Excuse Duty</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="id">
												<div className="th-inner sortable both text-center"></div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													Staff Name
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Date from
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Date return
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Duration
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													status
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
										<tr data-index="0" data-id="20">
											<td className="flex text-center">
												<a className="item-title text-color"></a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Sick Leave</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">03-26-2013</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">4-2-2013</a>
											</td>

											<td className="flex text-center">
												<a className="item-title text-color">12 days</a>
											</td>

											<td className="flex text-center">
												<a className="item-title text-color">Not on Leave</a>
											</td>

											<td className="text- row-actions">
												<Tooltip title="View excuse duty">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit excuse duty">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete excuse duty">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>

										<tr data-index="0" data-id="20">
											<td className="flex text-center">
												<a className="item-title text-color"></a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Akhi Koro</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">03-26-2013</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">4-2-2013</a>
											</td>

											<td className="flex text-center">
												<a className="item-title text-color">2 weeks</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Not on Leave</a>
											</td>

											<td className="text- row-actions">
												<Tooltip title="View excuse duty">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit excuse duty">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete excuse duty">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>
									</tbody>
								</table>

								<div className="controls-below-table">
									<div className="table-records-info">
										Showing records 1 - 5
									</div>
									<div className="table-records-pages">
										<ul>
											<li>
												<a href="#">Previous</a>
											</li>
											<li>
												<a className="current" href="#">
													1
												</a>
											</li>
											<li>
												<a href="#">2</a>
											</li>
											<li>
												<a href="#">3</a>
											</li>
											<li>
												<a href="#">4</a>
											</li>
											<li>
												<a href="#">Next</a>
											</li>
										</ul>
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

export default withRouter(ExcuseDuty);
