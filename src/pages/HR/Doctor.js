/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

// import avatar1 from '../assets/images/avatar1.jpg';
// import avatar2 from '../assets/images/avatar2.jpg';
// import avatar3 from '../assets/images/avatar3.jpg';
// import avatar4 from '../assets/images/avatar4.jpg';
// import usFlag from '../assets/images/flags-icons/us.png';
// import caFlag from '../assets/images/flags-icons/ca.png';
// import ukFlag from '../assets/images/flags-icons/uk.png';
import Queue from '../../components/Queue';

class Doctor extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Doctor Info</h6>
								<div className="element-content">
									<div className="row">
										<div className="col-sm-4 col-xxxl-3">
											<a className="element-box el-tablo" href="#">
												<div className="label">Appointments Today</div>
												<div className="value">15</div>
												<div className="trending">
													<span>Patients</span>
												</div>
											</a>
										</div>
										<div className="col-sm-4 col-xxxl-3">
											<a className="element-box el-tablo" href="#">
												<div className="label">Appointments Seen</div>
												<div className="value">4</div>
												<div className="trending">
													<span>Patients</span>
												</div>
											</a>
										</div>
										<div className="col-sm-4 col-xxxl-3">
											<a className="element-box el-tablo" href="#">
												<div className="label">Appointments Left</div>
												<div className="value">8</div>
												<div className="trending">
													<span>Patients</span>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Recent Activity</h6>
								<div className="element-box-tp">
									<div className="table-responsive">
										<table className="table table-padded">
											<thead>
												<tr>
													<th>Date</th>
													<th>Description</th>
													<th className="text-left">Satus</th>
													<th className="text-center">Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<span>Today</span>
														<span className="smaller lighter">
															1:52am
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Microbiology &amp; Histopatology Test
															Request for Patient 1234233
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller green"></span>
														<span>Complete</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a
															data-target=".bd-example-modal-lg"
															data-toggle="modal"
															href="#"
														>
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
													</td>
												</tr>
												<tr>
													<td>
														<span>Jan 19th</span>
														<span className="smaller lighter">
															3:22pm
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Clinical Chemistry Test Request for Patient
															768999
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller red"></span>
														<span>Declined</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a href="#">
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
													</td>
												</tr>
												<tr>
													<td>
														<span>Yesterday</span>
														<span className="smaller lighter">
															7:45am
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Hematology Test Request for Patient 89778
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller yellow"></span>
														<span>Pending</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a href="#">
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
													</td>
												</tr>
												<tr>
													<td>
														<span>Jan 23rd</span>
														<span className="smaller lighter">
															2:12pm
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Immunology/Tumour/Infectious Disease Test
															Request for 243333
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller yellow"></span>
														<span>Pending</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a href="#">
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
													</td>
												</tr>
												<tr>
													<td>
														<span>Jan 12th</span>
														<span className="smaller lighter">
															9:51am
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Microbiology &amp; Histopatology Test
															Request for Patient 1234233
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller green"></span>
														<span>Complete</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a href="#">
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
													</td>
												</tr>
												<tr>
													<td>
														<span>Jan 9th</span>
														<span className="smaller lighter">
															12:45pm
														</span>
													</td>
													<td className="cell-with-media">
														<span>
															Clinical Chemistry Test Request for Patient
															768999
														</span>
													</td>
													<td className="nowrap">
														<span className="status-pill smaller yellow"></span>
														<span>Pending</span>
													</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-folder"/>
														</a>
														<a href="#">
															<i className="os-icon os-icon-user"/>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"/>
														</a>
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
				</div>
				<div className="content-panel compact">
					<Queue />
				</div>
			</div>
		);
	}
}

export default Doctor;
