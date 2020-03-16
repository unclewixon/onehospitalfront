/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

const Lab = ({ location }) => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#lab-request`}
						className="btn btn-primary">
						<i className="os-icon os-icon-plus"></i>
						New Lab Request
					</Link>
				</div>
				<h6 className="element-header">Lab Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						<div
							className="fixed-table-container"
							style={{ paddingBottom: '0px' }}>
							<div className="fixed-table-body">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>ID</th>
											<th>Request Date</th>
											<th>Requested By</th>
											<th>Request Specimen</th>
											<th className="text-center">Request Status</th>
											<th className="text-right" />
										</tr>
									</thead>
									<tbody>
										<tr className="" data-index="0" data-id="20">
											<td>
												<span className="text-bold">LAB/32456789</span>
											</td>
											<td>
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="badge badge-secondary">pending</span>
											</td>
											<td className="row-actions text-right">
												<Tooltip title="View Request">
													<a href="#">
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
												<Tooltip title="Print Request">
													<a className="ml-2" href="#">
														<i className="icon-feather-printer" />
													</a>
												</Tooltip>
											</td>
										</tr>
										<tr className="" data-index="0" data-id="20">
											<td>
												<span className="text-bold">LAB/32456789</span>
											</td>
											<td>
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="badge badge-success">completed</span>
											</td>
											<td className="row-actions text-right">
												<Tooltip title="View Request">
													<a href="#">
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
												<Tooltip title="Print Request">
													<a className="ml-2" href="#">
														<i className="icon-feather-printer" />
													</a>
												</Tooltip>
											</td>
										</tr>
										<tr className="" data-index="0" data-id="20">
											<td>
												<span className="text-bold">LAB/32456789</span>
											</td>
											<td>
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="badge badge-danger">pending</span>
											</td>
											<td className="row-actions text-right">
												<Tooltip title="View Request">
													<a href="#">
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
												<Tooltip title="Print Request">
													<a className="ml-2" href="#">
														<i className="icon-feather-printer" />
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
	);
};

export default withRouter(Lab);
