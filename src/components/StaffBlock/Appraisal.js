/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
export class Appraisal extends Component {
	render() {
		const { location } = this.props;

		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header mt-3">Appraisal</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													PERIOD
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													FROM DATE
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													TO DATE
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
												<a className="item-title text-color">03-26-2013</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">4-2-2013</a>
											</td>

											<td className="text-center row-actions">
												<Tooltip title="Self">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Line Manager">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="View Staff">
													<Link
														className="secondary"
														to={`${location.pathname}#staff-detail`}>
														<i className="os-icon os-icon-folder-plus" />
													</Link>
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

export default withRouter(Appraisal);
