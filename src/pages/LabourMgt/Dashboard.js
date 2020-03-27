/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;
const departments = [
	{ id: 'ejejekek', name: 'angel' },
	{ id: 'sislkas', name: 'kafta' },
];
class Dashboard extends Component {
	state = {
		filtering: false,
		id: null,
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		const { filtering } = this.state;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="element-content">
						<div className="row">
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">TOTAL OPEN</div>
									<div className="value text-center">57</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">TOTAl FILLED</div>
									<div className="value text-center">457</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">LOW STOCK</div>
									<div className="value text-center">125</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">BUDGET</div>
									<div className="value text-center">125</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12">
					<h6 className="element-header">Recently Enrolled</h6>
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
				</div>

				<div className="col-sm-12">
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Folder Id</th>
										<th>Name</th>
										<th>Age</th>
										<th>Date Enrolled</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr data-index="0" data-id="20">
										<td>
											<a>
												<span
													className="w-32 avatar gd-warning"
													style={{ boxShadow: 'none' }}>
													IN32456789
												</span>
											</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">old soldier</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">24</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">21/31/2008</a>
										</td>
										<td className="text-right row-actions">
											<Tooltip title="view detail">
												<Link to="/labour-mgt/detail" className="secondary">
													<i className="os-icon os-icon-folder-plus" />
												</Link>
											</Tooltip>
										</td>
									</tr>
									<tr data-index="0" data-id="20">
										<td>
											<a>
												<span
													className="w-32 avatar gd-warning"
													style={{ boxShadow: 'none' }}>
													IN32456789
												</span>
											</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">old soldier</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">24</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">21/31/2008</a>
										</td>
										<td className="text-right row-actions">
											<Tooltip title="view detail">
												<Link to="/labour-mgt/detail" className="secondary">
													<i className="os-icon os-icon-folder-plus" />
												</Link>
											</Tooltip>
										</td>
									</tr>

									<tr data-index="0" data-id="20">
										<td>
											<a>
												<span
													className="w-32 avatar gd-warning"
													style={{ boxShadow: 'none' }}>
													IN32456789
												</span>
											</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">old soldier</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">24</a>
										</td>
										<td className="flex">
											<a className="item-title text-color">21/31/2008</a>
										</td>
										<td className="text-right row-actions">
											<Tooltip title="view detail">
												<Link to="/labour-mgt/detail" className="secondary">
													<i className="os-icon os-icon-folder-plus" />
												</Link>
											</Tooltip>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, null)(Dashboard);
