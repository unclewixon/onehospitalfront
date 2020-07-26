/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Queue from '../components/Queue';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class Nicu extends Component {
	render() {
		const { staff } = this.props;
		const department = staff?.details?.department?.name;

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
																	<div className="th-inner sortable both">
																		FOLDER ID
																	</div>
																	<div className="fht-cell"></div>
																</th>
																<th data-field="owner">
																	<div className="th-inner sortable both">
																		PRESCRIPTION
																	</div>
																	<div className="fht-cell"></div>
																</th>
																<th data-field="project">
																	<div className="th-inner sortable both">
																		DON'T KNOW YET
																	</div>
																	<div className="fht-cell"></div>
																</th>

																<th data-field="5">
																	<div className="th-inner "></div>
																	<div className="fht-cell"></div>
																</th>
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
							</div>
						</div>
					</div>
				</div>
				<div className="content-panel compact">
					<Queue department={department} />
				</div>
			</div>
		);
	}
}

const mapStatetoProps = ({ user }) => {
	return {
		staff: user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(Nicu));
