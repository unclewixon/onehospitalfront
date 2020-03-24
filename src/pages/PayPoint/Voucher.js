import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Tooltip from 'antd/lib/tooltip';

import { createVoucher } from '../../actions/general';
export class Voucher extends Component {
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<>
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<button
									className="btn btn-primary"
									onClick={() => this.props.createVoucher(true)}>
									New Voucher
								</button>
							</div>
							<h6 className="element-header">Voucher</h6>
							<div className="element-box">
								<div className="table table-responsive">
									<table
										id="table"
										className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th data-field="id" className="text-center">
													No
												</th>
												<th data-field="owner" className="text-center">
													For
												</th>
												<th data-field="project" className="text-center">
													{/* <div className="th-inner sortable both">
                                                        DON'T KNOW YET
												</div>
                                                    <div className="fht-cell"></div> */}
													Amount (&#x20A6;)
												</th>

												<th className="text-center">
													{/* <div className="th-inner "></div>
                                                    <div className="fht-cell"></div> */}
													Date Created
												</th>
												<th className="text-center">Used</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr data-index="0" data-id="20">
												<td className="flex text-center">
													<a>
														<span
															className="w-32"
															style={{ boxShadow: 'none' }}>
															1
														</span>
													</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">Diagnosis</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">30000</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">3/12/2019</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">whatever</a>
												</td>

												<td className="text-center row-actions">
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
												<td className="flex text-center">
													<a>
														<span
															className="w-32"
															style={{ boxShadow: 'none' }}>
															2
														</span>
													</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">Diagnosis</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">4000000</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">13/08/2019</a>
												</td>
												<td className="flex text-center">
													<a className="item-title text-color">whatever</a>
												</td>

												<td className="text-center row-actions">
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
			</>
		);
	}
}

export default connect(null, { createVoucher })(withRouter(Voucher));
