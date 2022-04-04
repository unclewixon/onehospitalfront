/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
export class SaleSummary extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-box">
							<div className="table table-responsive">
								<table
									id="table"
									className="table table-theme v-middle table-hover"
								>
									<thead>
										<tr>
											<th data-field="id">
												<div>Item prescription</div>
											</th>
											<th data-field="owner">
												<div>Folder Id</div>
											</th>
											<th data-field="project">
												<div>Quantity</div>
											</th>
											<th data-field="project">
												<div>Agent</div>
											</th>

											<th data-field="5">
												<div></div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr data-index="0" data-id="20">
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td>
												<a>
													<span
														className="w-32 avatar gd-warning"
														style={{ boxShadow: 'none' }}
													>
														IN32456789
													</span>
												</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">6</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td className="row-actions">
												<Tooltip title="Receive Request">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>
										<tr data-index="0" data-id="20">
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td>
												<a>
													<span
														className="w-32 avatar gd-warning"
														style={{ boxShadow: 'none' }}
													>
														IN32456789
													</span>
												</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">12</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td className="row-actions">
												<Tooltip title="Receive Request">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>

										<tr data-index="0" data-id="20">
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td>
												<a>
													<span
														className="w-32 avatar gd-warning"
														style={{ boxShadow: 'none' }}
													>
														IN32456789
													</span>
												</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">6</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td className="row-actions">
												<Tooltip title="Receive Request">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>

										<tr data-index="0" data-id="20">
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td>
												<a>
													<span
														className="w-32 avatar gd-warning"
														style={{ boxShadow: 'none' }}
													>
														IN32456789
													</span>
												</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">90</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td className="row-actions">
												<Tooltip title="Receive Request">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>

										<tr data-index="0" data-id="20">
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td>
												<a>
													<span
														className="w-32 avatar gd-warning"
														style={{ boxShadow: 'none' }}
													>
														IN32456789
													</span>
												</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">300</a>
											</td>
											<td className="flex">
												<a className="item-title text-color">
													Netflix hackathon
												</a>
											</td>

											<td className="row-actions">
												<Tooltip title="Receive Request">
													<a className="secondary">
														<i className="os-icon os-icon-folder-plus" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
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

export default SaleSummary;
