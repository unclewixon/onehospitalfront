/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

// import avatar1 from '../assets/images/avatar1.jpg';
// import avatar2 from '../assets/images/avatar2.jpg';
// import avatar3 from '../assets/images/avatar3.jpg';
// import avatar4 from '../assets/images/avatar4.jpg';
// import usFlag from '../assets/images/flags-icons/us.png';
// import caFlag from '../assets/images/flags-icons/ca.png';
// import ukFlag from '../assets/images/flags-icons/uk.png';
import TopBar from '../components/TopBar';
import MainMenu from '../components/MainMenu';

const data = [
	{
		date: '20 Oct',
		Temperature: 24,
	},
	{
		date: '21 Oct',
		Temperature: 13,
	},
	{
		date: '22 Oct',
		Temperature: 98,
	},
	{
		date: '23 Oct',
		Temperature: 39,
	},
];

class PatientProfile extends Component {
	componentDidMount() {
		window.document.body.className =
			'menu-position-side menu-side-left with-content-panel';
	}

	render() {
		return (
			<div className="all-wrapper with-side-panel solid-bg-all">
				<div className="layout-w">
					<MainMenu role="patient" />
					<div className="content-w">
						<TopBar role="patient" />
						<div className="content-i">
							<div className="content-box">
								<div className="row">
									<div className="col-lg-12">
										<div className="element-balances justify-content-between mobile-full-width">
											<div className="balance balance-v2">
												<div className="balance-title">Sex:</div>
												<div className="strong"><small>Female</small></div>
											</div>
											<div className="balance balance-v2">
												<div className="balance-title">Date of Birth:</div>
												<div className="strong"><small>08-08-2019</small></div>
											</div>
											<div className="balance balance-v2">
												<div className="balance-title">Insurance Status:</div>
												<div className="strong"><small>Private</small></div>
											</div>
											<div className="balance balance-v2">
												<div className="balance-title">Admitted:</div>
												<div className="strong"><small>No</small></div>
											</div>
											<div className="balance balance-v2">
												<div className="balance-title">Outstanding Balance:</div>
												<div className="strong"><small>₦23,000.00</small></div>
											</div>
										</div>
										<div className="element-wrapper pb-4 mb-4 border-bottom">
											<div className="element-box-tp">
												<a className="btn btn-primary" href="#">
													<i className="os-icon os-icon-documents-03"></i>
													<span>Upload Document</span>
												</a>
												<a className="btn btn-grey" href="#">
													<i className="os-icon os-icon-log-out"></i>
													<span>Other Details</span>
												</a>
												<a className="btn btn-grey" href="#">
													<i className="os-icon os-icon-edit"></i>
													<span>Edit Profile</span>
												</a>
												<a className="btn btn-grey d-sm-inline-block" href="#">
													<i className="os-icon os-icon-plus-circle"></i>
													<span>Request Admission</span>
												</a>
												<a className="btn btn-grey d-sm-inline-block" href="#">
													<i className="os-icon os-icon-plus-circle"></i>
													<span>Enroll Antenatal</span>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="element-wrapper">
											<h6 className="element-header">Vitals</h6>
											<div className="element-box">
												<div className="os-tabs-w">
													<div className="os-tabs-controls">
														<ul className="nav nav-tabs smaller">
															<li className="nav-item">
																<a className="nav-link">BMI</a>
															</li>
															{/* <li className="nav-item"><a className="nav-link">BSA</a></li> */}
															<li className="nav-item">
																<a className="nav-link">Blood Pressure</a>
															</li>
															{/* <li className="nav-item"><a className="nav-link">Dilation</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">Fetal Heart Rate</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">Fundus Height</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">Glucose</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">Head Circumference</a></li> */}
															<li className="nav-item">
																<a className="nav-link">Height</a>
															</li>
															{/* <li className="nav-item"><a className="nav-link">Length of Arm</a></li>
															<li className="nav-item"><a className="nav-link">MUAC</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">Mid-Arm Circumference</a></li> */}
															{/* <li className="nav-item"><a className="nav-link">PCV</a></li> */}
															{/* <a className="nav-item"><a className="nav-link">Pain Scale</a></a> */}
															{/* <li className="nav-item"><a className="nav-link">Protein</a></li> */}
															<li className="nav-item">
																<a className="nav-link">Pulse</a>
															</li>
															{/* <a className="nav-item"><a className="nav-link">Respiration</a></a> */}
															<li className="nav-item">
																<a className="nav-link">SpO2</a>
															</li>
															{/* <li className="nav-item"><a className="nav-link">Surface Area</a></li> */}
															<li className="nav-item">
																<a className="nav-link active">Temperature</a>
															</li>
															<li className="nav-item">
																<a className="nav-link">Urine</a>
															</li>
															<li className="nav-item">
																<a className="nav-link">Weight</a>
															</li>
														</ul>
													</div>
													<div className="tab-content">
														<div className="tab-pane active" id="tab_overview">
															<div className="el-chart-w">
																<LineChart
																	width={500}
																	height={300}
																	data={data}
																	margin={{
																		top: 5,
																		right: 30,
																		left: 20,
																		bottom: 5,
																	}}
																>
																	<CartesianGrid strokeDasharray="3 3" />
																	<XAxis dataKey="date" />
																	<YAxis />
																	<Tooltip />
																	<Legend />
																	<Line
																		type="monotone"
																		dataKey="Temperature"
																		stroke="#8884d8"
																		activeDot={{ r: 8 }}
																	/>
																</LineChart>
															</div>
														</div>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a
																		data-target=".bd-example-modal-lg"
																		data-toggle="modal"
																		href="#"
																	>
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
																		<i className="os-icon os-icon-folder"></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-user"></i>
																	</a>
																	<a className="danger" href="#">
																		<i className="os-icon os-icon-ui-15"></i>
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PatientProfile;
