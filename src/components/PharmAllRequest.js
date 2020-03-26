/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;
const departments = [
	{ id: 'ejejekek', name: 'angel' },
	{ id: 'sislkas', name: 'kafta' },
];
export class PharmAllRequest extends Component {
	state = {
		filtering: false,
	};

	change = e => {
		console.log(e.target.value);
	};
	render() {
		const { filtering } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">All Request</h6>
					<div className="row my-4">
						<form action="" className="form-inline pl-3">
							<div className="form-group">
								<label className="mr-2">Filter by: </label>
							</div>
							<div className="form-group mr-2">
								<label className="mr-2 " htmlFor="id">
									ID
								</label>
								<select
									style={{ height: '32px' }}
									id="department"
									className="form-control"
									name="id"
									onChange={e => this.change(e)}>
									{departments.map((dept, i) => {
										return (
											<option key={i} value={dept.id}>
												{dept.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group mr-2">
								<RangePicker />
							</div>
							<div className="form-group mr-2">
								<a
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={this.doFilter}>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
										)}
									</span>
								</a>
							</div>
						</form>
					</div>

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
				</div>
			</div>
		);
	}
}

export default PharmAllRequest;
