/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
export class PharmFillRequest extends Component {
	render() {
		return (
			<>
				<h6 className="element-header">Filled Request</h6>
				<div className="element-box">
					<div className="table table-responsive">
						<table
							id="table"
							className="table table-theme v-middle table-hover">
							<thead>
								<tr>
									<th className="text-center"> Date</th>
									<th className="text-center"> Folder No</th>
									<th className="text-center"> Prescription</th>
									<th className="text-center"> Request From</th>
									<th className="text-center"> Action</th>
								</tr>
							</thead>
							<tbody>
								<tr data-index="0" data-id="20">
									<td className="flex text-center">
										<a className="item-title text-color">03-26-2015</a>
									</td>
									<td className="text-center">
										<span>IN32456789</span>
									</td>
									<td className="text-center">
										<a className="item-title text-color">Netflix hackathon</a>
									</td>
									<td className="flex text-center">
										<a className="item-title text-color">03-26-2014</a>
									</td>

									<td className="text-center row-actions">
										<Tooltip title="View Filled Request">
											<a className="secondary">
												<i className="os-icon os-icon-folder-plus" />
											</a>
										</Tooltip>
										<Tooltip title="Edit Filled Request">
											<a className="secondary">
												<i className="os-icon os-icon-edit-32" />
											</a>
										</Tooltip>
									</td>
								</tr>

								<tr data-index="0" data-id="20">
									<td className="flex text-center">
										<a className="item-title text-color">03-26-2013</a>
									</td>
									<td className="text-center">
										<span>IN32456789</span>
									</td>
									<td className="text-center">
										<a className="item-title text-color">Netflix hackathon</a>
									</td>
									<td className="flex text-center">
										<a className="item-title text-color">03-26-2014</a>
									</td>

									<td className="text-center row-actions">
										<Tooltip title="View filled Request">
											<a className="secondary">
												<i className="os-icon os-icon-folder-plus" />
											</a>
										</Tooltip>
										<Tooltip title="Edit filled Request">
											<a className="secondary">
												<i className="os-icon os-icon-edit-32" />
											</a>
										</Tooltip>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="controls-below-table">
						<div className="table-records-info">Showing records 1 - 5</div>
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
			</>
		);
	}
}

export default PharmFillRequest;
