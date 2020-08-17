/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar1 from '../../assets/images/avatar1.jpg';
export class Inventory extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="element-wrapper compact pt-4">
						<div className="element-actions">
							<Link
								className="btn btn-primary btn-sm"
								to="/cafeteria/inventory">
								<i className="os-icon os-icon-ui-22"></i>
								Items
							</Link>
						</div>

						<div className="element-box-tp">
							<h6 className="element-header">Item</h6>
							<div className="row">
								<div className="col-lg-7">
									<div className="padded-lg">
										<div className="projects-list">
											<div className="element-wrapper">
												<div className="row">
													<div className="col-sm-4 col-xxxl-3">
														<a className="element-box el-tablo" href="#">
															<div className="label">Products Sold</div>
															<div className="value">57</div>
															<div className="trending trending-up-basic">
																<span>12%</span>
																<i className="os-icon os-icon-arrow-up2"></i>
															</div>
														</a>
													</div>
													<div className="col-sm-4 col-xxxl-3">
														<a className="element-box el-tablo" href="#">
															<div className="label">Gross Profit</div>
															<div className="value">$457</div>
														</a>
													</div>
													<div className="col-sm-4 col-xxxl-3">
														<a className="element-box el-tablo" href="#">
															<div className="label">New Customers</div>
															<div className="value">125</div>
															<div className="trending trending-down-basic">
																<span>9%</span>
																<i className="os-icon os-icon-arrow-down"></i>
															</div>
														</a>
													</div>
													<div className="d-none d-xxxl-block col-xxxl-3">
														<a className="element-box el-tablo" href="#">
															<div className="label">Refunds Processed</div>
															<div className="value">$294</div>
														</a>
													</div>
												</div>
												<div className="element-box">
													<form>
														<h5 className="element-box-header">New Sale</h5>
														<div className="row">
															<div className="col-sm-12">
																<div className="form-group">
																	<select className="form-control">
																		<option value="">Staff</option>
																		<option value="">Patient</option>
																		<option value="">Walk-in</option>
																	</select>
																</div>
															</div>
														</div>
													</form>
												</div>
												<div className="element-box">
													<form>
														<div className="row">
															<div className="col-sm-8">
																<input
																	className="form-control form-control-sm rounded bright"
																	placeholder="Staff ID"
																	type="text"
																/>
															</div>
															<div className="col-sm-4">
																<select className="form-control rounded">
																	<option>Select State</option>
																	<option>New York</option>
																	<option>California</option>
																	<option>Boston</option>
																	<option>Texas</option>
																	<option>Colorado</option>
																</select>
															</div>
														</div>
														{/* <h6 className="element-header"></h6> */}
													</form>
													<form>
														<div className="row">
															<div className="col-sm-8">
																<input
																	className="form-control form-control-sm rounded bright"
																	placeholder="Staff ID"
																	type="text"
																/>
															</div>
															<div className="col-sm-3">
																<select className="form-control rounded">
																	<option>Quantity.</option>
																	<option>1</option>
																	<option>2</option>
																	<option>3</option>
																	<option>4</option>
																	<option>5</option>
																	<option>6</option>
																	<option>7</option>
																	<option>8</option>
																	<option>9</option>
																	<option>10</option>
																</select>
															</div>
															<a className="btn btn-primary btn-sm">
																<i
																	className="os-icon os-icon-ui-22"
																	style={{ paddingTop: '6px' }}></i>
															</a>
														</div>
													</form>
												</div>
											</div>
											<div className="project-box">
												<div className="project-info">
													<table className="table table-compact smaller text-faded mb-0">
														<thead>
															<tr>
																<th>Type</th>
																<th className="text-center">Date</th>
																<th className="text-right">Amount</th>
																<th className="text-right">Fee</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<span>BTC</span>
																	<i className="os-icon os-icon-repeat icon-separator"></i>
																	<span>USD</span>
																</td>
																<td className="text-center">01.08</td>
																<td className="text-right text-bright">
																	$25.38
																</td>
																<td className="text-right text-danger">
																	-$1.23
																</td>
															</tr>
															<tr>
																<td>
																	<span>RPX</span>
																	<i className="os-icon os-icon-repeat icon-separator"></i>
																	<span>ETH</span>
																</td>
																<td className="text-center">01.07</td>
																<td className="text-right text-bright">
																	$15.21
																</td>
																<td className="text-right text-danger">
																	-$1.13
																</td>
															</tr>
															<tr>
																<td>
																	<span>LTC</span>
																	<i className="os-icon os-icon-repeat icon-separator"></i>
																	<span>BTC</span>
																</td>
																<td className="text-center">01.05</td>
																<td className="text-right text-bright">
																	$17.43
																</td>
																<td className="text-right text-danger">
																	-$2.14
																</td>
															</tr>
															<tr>
																<td>
																	<span>PRX</span>
																	<i className="os-icon os-icon-repeat icon-separator"></i>
																	<span>LTC</span>
																</td>
																<td className="text-center">01.05</td>
																<td className="text-right text-bright">
																	$23.18
																</td>
																<td className="text-right text-danger">
																	-$3.17
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-5 b-l-lg">
									<div className="padded-lg">
										<div className="element-wrapper">
											<div className="element-actions">
												<form className="form-inline justify-content-sm-end">
													<select className="form-control form-control-sm rounded">
														<option value="Pending">Today</option>
														<option value="Active">Last Week</option>
														<option value="Cancelled">Last 30 Days</option>
													</select>
												</form>
											</div>
											<h6 className="element-header">Sales Calculator</h6>
											<div className="profile-tile">
												<a
													className="profile-tile-box"
													href="users_profile_small.html">
													<div className="pt-avatar-w">
														<img src={avatar1} alt="staff profile" />
													</div>
													<div className="pt-user-name">John Mayers</div>
												</a>
												<div className="profile-tile-meta">
													<ul>
														<li>
															Department:<strong>Internal Control</strong>
														</li>
														<li>
															Outstanding:<strong>2,000.00</strong>
														</li>
														<li>
															Response Time:<strong>2 hours</strong>
														</li>
													</ul>
													<div className="pt-btn">
														<a className="btn btn-success btn-sm">
															Send Message
														</a>
													</div>
												</div>
											</div>
											<div className="element-box">
												<div className="project-box">
													<div className="project-info">
														<div className="element-box-tp">
															<table className="table table-lightborder">
																<thead>
																	<tr>
																		<th>Customer</th>
																		<th>Products</th>
																		<th className="text-center">Status</th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td className="nowrap">Fried Plantain</td>

																		<td className="text-center">2 Portions</td>
																		<td className="text-right">$354</td>
																	</tr>
																	<tr>
																		<td className="nowrap">Jollof Rice</td>

																		<td className="text-center">1 Plate</td>
																		<td className="text-right">$94</td>
																	</tr>
																	<tr>
																		<td className="nowrap">Chicken</td>

																		<td className="text-center">2 Pieces</td>
																		<td className="text-right">$156</td>
																	</tr>
																	<tr>
																		<td className="nowrap">Malta Guiness</td>

																		<td className="text-center">1 can</td>
																		<td className="text-right">$1,120</td>
																	</tr>
																	<tr>
																		<td className="nowrap">Nestle Water</td>

																		<td className="text-center">1 can</td>
																		<td className="text-right">$856</td>
																	</tr>
																</tbody>
															</table>
															<table
																style={{
																	marginLeft: 'auto',
																	marginTop: ' 15px',
																	borderTop: '3px solid #eee',
																	paddingtop: '20px',
																	marginBottom: '20px',
																}}>
																<tbody>
																	<tr>
																		<td
																			style={{
																				color: '#B8B8B8',
																				fontsize: '12px',
																				padding: '5px 0px',
																			}}>
																			Subtotal:
																		</td>
																		<td
																			style={{
																				color: '#111',
																				textAlign: 'right',
																				fontWeight: 'bold',
																				padding: '5px 0px 5px 40px',
																				fontSize: '12px',
																			}}>
																			$145.98
																		</td>
																	</tr>
																	<tr>
																		<td
																			style={{
																				color: '#B8B8B8',
																				fontsize: '12px',
																				padding: '5px 0px',
																			}}>
																			Amt. Paid:
																		</td>
																		<td
																			style={{
																				color: '#047bf8',
																				textAlign: 'right',
																				fontWeight: 'bold',
																				padding: '5px 0px 5px 40px',
																				fontSize: '12px',
																			}}>
																			$12.83
																		</td>
																	</tr>

																	<tr>
																		<td
																			style={{
																				color: '#B8B8B8',
																				fontsize: '12px',
																				padding: '5px 0px',
																			}}>
																			Balance
																		</td>
																		<td
																			style={{
																				color: ' #45BB4C',
																				textAlign: 'right',
																				fontWeight: 'bold',
																				padding: '5px 0px 5px 40px',
																				fontSize: '12px',
																			}}>
																			$14000.00
																		</td>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Inventory;
