/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Tooltip from 'antd/lib/tooltip';

const Payslip = () => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">Payslip</h6>
							<div className="element-content">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>
													<div className="th-inner sortable both">
														Date (Month/Year)
													</div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Monthly Salary
													</div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Amount Paid
													</div>
												</th>
												<th>
													<div className="th-inner sortable both">Actions</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<Tooltip title="View Breakdown" className="p-2">
														<a>
															<i className="os-icon os-icon-documents-15" />
														</a>
													</Tooltip>
													<Tooltip title="Print Payslip" className="p-2">
														<a>
															<i className="os-icon os-icon-printer" />
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
	);
};

export default Payslip;
