/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

const Antennatal = ({ location }) => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#antennal-request`}
						className="btn btn-primary">
						<i className="os-icon os-icon-plus"></i>
						New Antennatal Assessment
					</Link>
				</div>
				<h6 className="element-header">Antennatal</h6>
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
											<th>Request Date</th>
											<th>GA</th>
											<th>Measurement</th>
											<th className="text-center">Fetal lie</th>
											<th className="text-center">Presentation</th>
											<th>Comments </th>
											<th>By</th>
											<th className="text-right" />
										</tr>
									</thead>
									<tbody>
										<tr className="" data-index="0" data-id="20">
											<td>
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="">
												<span className="">Kechi</span>
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
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="">
												<span className="">Monday Agbo</span>
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
												<span>20-Jan-2020</span>
												<span className="smaller lighter ml-1">3:22pm</span>
											</td>
											<td>
												<Link to="/">Uchechi I.</Link>
											</td>
											<td>Blood</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td className="text-center">
												<span className="">pending</span>
											</td>
											<td>
												<span className="">Ali and simbi</span>
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

export default withRouter(Antennatal);
