/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const HmoBulkUpload = () => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a
										aria-expanded="true"
										className="nav-link active"
										data-toggle="tab">
										HEALTH MANAGEMENT ORGANIZATIONS BULK UPLOAD
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="pipelines-w">
						<div className="row">
							<div className="col-lg-12 col-xxl-12">
								<div className="element-wrapper">
									<div className="element-box-tp">
										<div className="controls-above-table">
											<div className="row">
												<div className="col-sm-6">
													<a className="btn btn-sm btn-secondary" href="#">
														Upload HMO Services
													</a>
												</div>
												<div className="col-sm-6">
													<form className="form-inline justify-content-sm-end">
														<select
															className="form-control form-control-sm rounded bright"
															defaultValue="AXA Mansard HMO">
															<option value="AXA Mansard HMO">
																AXA Mansard HMO
															</option>
															<option value="Pending">Pending</option>
															<option value="Active">Active</option>
															<option value="Cancelled">Cancelled</option>
														</select>
													</form>
												</div>
											</div>
										</div>
										<div className="table-responsive">
											<table className="table table-padded">
												<thead>
													<tr>
														<th>Code</th>
														<th>Name</th>
														<th className="text-center">Price</th>

														<th>Discount</th>
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<div className="user-with-avatar">0011</div>
														</td>
														<td>
															<div className="smaller lighter">
																Precious HMO
															</div>
														</td>
														<td>
															<span>₦500,000.00</span>
														</td>

														<td className="nowrap">
															<span>4%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="user-with-avatar">0012</div>
														</td>
														<td>
															<div className="smaller lighter">Staff HMO</div>
														</td>
														<td>
															<span>₦250,000.00</span>
														</td>

														<td className="nowrap">
															<span>3.5%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="user-with-avatar">0013</div>
														</td>
														<td>
															<div className="smaller lighter">Mansard HMO</div>
														</td>
														<td>
															<span>₦50,000.00</span>
														</td>

														<td className="nowrap">
															<span>6%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="user-with-avatar">0014</div>
														</td>
														<td>
															<div className="smaller lighter">Zenith HMO</div>
														</td>
														<td>
															<span>₦18,500.00</span>
														</td>

														<td className="nowrap">
															<span>3.35%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="user-with-avatar">0015</div>
														</td>
														<td>
															<div className="smaller lighter">
																Central Bank
															</div>
														</td>
														<td>
															<span>₦314,000.00</span>
														</td>

														<td className="nowrap">
															<span>4%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="user-with-avatar">016</div>
														</td>
														<td>
															<div className="smaller lighter">
																Reliance HMO
															</div>
														</td>
														<td>
															<span>₦300,000.00</span>
														</td>

														<td className="nowrap">
															<span>8%</span>
														</td>
														<td className="row-actions">
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-ui-44"></i>
															</a>
															<a className="danger" href="#">
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div>
									<div></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HmoBulkUpload;
