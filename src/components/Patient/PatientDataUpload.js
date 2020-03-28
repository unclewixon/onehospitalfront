/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';

const PatientDataUpload = () => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Patient Data Upload</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<div className="pipelines-w">
							<div className="row">
								<div className="col-lg-12 col-xxl-12">
									<div className="element-wrapper">
										<div className="element-box-tp">
											<div className="controls-above-table">
												<div className="row">
													<div className="col-sm-6">
														<a className="btn btn-sm btn-secondary" href="#">
															Upload Document
														</a>
													</div>
													<div className="col-sm-6"></div>
												</div>
											</div>
											<div className="table-responsive">
												<table className="table table-padded">
													<thead>
														<tr>
															<th>ID</th>
															<th>Document Name</th>
															<th>Document Type</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<div className="user-with-avatar">1</div>
															</td>
															<td>
																<div className="smaller lighter">Vitals</div>
															</td>
															<td>
																<span>PDF</span>
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
																<div className="user-with-avatar">2</div>
															</td>
															<td>
																<div className="smaller lighter">
																	Consultation History
																</div>
															</td>
															<td>
																<span>Excel</span>
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
		</div>
	);
};

export default PatientDataUpload;
