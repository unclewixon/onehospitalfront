/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Roster extends Component {
	doFilter = e => {
		e.preventDefault();
	};

	doUpload = e => {
		e.preventDefault();
		console.log('upload roster');
	};

	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Duty Roster</h6>
								<div className="control-header">
									<div className="row align-items-center">
										<div className="col-9">
											<form action="" className="form-inline">
												<div className="form-group">
													<label className="mr-2" htmlFor="">Filter by: </label>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Department</label>
													<select className="form-control-sm">
														<option>Nursing</option>
														<option>OPD</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Month</label>
													<select className="form-control-sm">
														<option>January</option>
														<option>February</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Year</label>
													<select className="form-control-sm">
														<option>1990</option>
														<option>1991</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<a className="btn btn-sm btn-primary btn-upper" href="#" onClick={this.doFilter}>
														<i className="os-icon os-icon-ui-37"/>
														<span>Filter</span>
													</a>
												</div>
											</form>
										</div>
										<div className="col-3 text-right">
											<a className="btn btn-sm btn-link btn-upper mr-4 d-lg-inline-block" href="#" onClick={this.doUpload}>
												<i className="os-icon os-icon-upload"/>
												<span>Upload Roster</span>
											</a>
										</div>
									</div>
								</div>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Date</th>
													<th>Day</th>
													<th>Emma O.</th>
													<th>Emeka I.</th>
													<th>Wilson K.</th>
													<th>Wilson K.</th>
													<th>Wilson K.</th>
													<th>Wilson K.</th>
													<th>Wilson K.</th>
													<th>Yemi I.</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>10 Jan, 2020</td>
													<td>Wednesday</td>
													<td><span className="badge badge-danger">OFF</span></td>
													<td><span className="badge badge-danger">OFF</span></td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Night</td>
												</tr>
												<tr>
													<td>11 Jan, 2020</td>
													<td>Thursday</td>
													<td>Night</td>
													<td>Night</td>
													<td>Morning</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
												</tr>
												<tr>
													<td>12 Jan, 2020</td>
													<td>Friday</td>
													<td>Night</td>
													<td>Night</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td>Morning</td>
													<td><span className="badge badge-danger">OFF</span></td>
												</tr>
												<tr>
													<td>13 Jan, 2020</td>
													<td>Saturday</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td>Night</td>
													<td><span className="badge badge-danger">OFF</span></td>
													<td>Night</td>
												</tr>
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

export default Roster;
