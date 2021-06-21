/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popover from 'antd/lib/popover';

import NicuActivity from './NicuActivity';

const Nicu = props => {
	const [showModal, setShowModal] = useState(false);

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">NICU</h6>
							<div className="row">
								<div className="col-md-12">
									<div className="element-content">
										<div className="row">
											<div className="col-sm-4 col-xxxl-4">
												<a className="element-box el-tablo">
													<div className="label">TOTAL OPEN</div>
													<div className="value text-center">57</div>
												</a>
											</div>
											<div className="col-sm-4 col-xxxl-4">
												<a className="element-box el-tablo">
													<div className="label">TOTAl FILLED</div>
													<div className="value text-center">457</div>
												</a>
											</div>
											<div className="col-sm-4 col-xxxl-4">
												<a className="element-box el-tablo">
													<div className="label">LOW STOCK</div>
													<div className="value text-center">125</div>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-12">
									<div className="element-wrapper">
										<h6 className="element-header">Prescription</h6>
										<div className="element-box">
											<div className="table table-responsive">
												<table
													id="table"
													className="table table-theme v-middle table-hover">
													<thead>
														<tr>
															<th data-field="id">
																<div>FOLDER NUMBER</div>
															</th>
															<th data-field="owner">
																<div>NAME</div>
															</th>
															<th data-field="project">
																<div>DATE OF BIRTH</div>
															</th>

															<th data-field="5">
																<div>STATUS</div>
															</th>
															<th data-field="5">
																<div>ACTION</div>
															</th>
														</tr>
													</thead>
													<tbody>
														<tr data-index="0" data-id="20">
															<td className="flex">
																<a className="item-title text-color">
																	IN32456789
																</a>
															</td>
															<td className="flex">
																<a className="item-title text-color">
																	Netflix hackathon
																</a>
															</td>
															<td className="flex">
																<a className="item-title text-color">
																	10/5/2020
																</a>
															</td>
															<td className="flex">
																<a className="btn btn-success btn-sm white">
																	Admitted
																</a>
															</td>

															<td className=" ">
																<Tooltip title="Receive Request">
																	<a className="secondary lead">
																		<Popover
																			title=""
																			overlayClassName=""
																			content={
																				<NicuActivity
																					onModalClick={() => onModalClick()}
																					// doHide={() => setVisible(true)}
																				/>
																			}
																			trigger="click"
																			showModal={showModal}>
																			<i className="icon-feather-more-vertical" />
																		</Popover>
																	</a>
																</Tooltip>
															</td>
														</tr>
														{/* <tr data-index="0" data-id="20">
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
																	<a className="item-title text-color">
																		Netflix hackathon
																	</a>
																</td>
																<td className="flex">
																	<a className="item-title text-color">blood</a>
																</td>

																<td className="text-right row-actions">
																	<Tooltip title="Receive Request">
																		<a className="secondary">
																			<i className="os-icon os-icon-grid-10" />
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
																	<a className="item-title text-color">
																		Netflix hackathon
																	</a>
																</td>
																<td className="flex">
																	<a className="item-title text-color">blood</a>
																</td>

																<td className="text-right row-actions">
																	<Tooltip title="Receive Request">
																		<a className="secondary">
																			<i className="os-icon os-icon-grid-10" />
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
																	<a className="item-title text-color">
																		Netflix hackathon
																	</a>
																</td>
																<td className="flex">
																	<a className="item-title text-color">blood</a>
																</td>

																<td className="text-right row-actions">
																	<Tooltip title="Receive Request">
																		<a className="secondary">
																			<i className="os-icon os-icon-grid-10" />
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
																	<a className="item-title text-color">
																		Netflix hackathon
																	</a>
																</td>
																<td className="flex">
																	<a className="item-title text-color">blood</a>
																</td>

																<td className="text-right row-actions">
																	<Tooltip title="Receive Request">
																		<a className="secondary">
																			<i className="os-icon os-icon-grid-10" />
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
														 */}
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
	);
};

const mapStatetoProps = ({ user }) => {
	return {
		staff: user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(Nicu));
