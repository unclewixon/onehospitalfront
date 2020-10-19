/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { uploadDiagnosis } from '../../actions/general';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { getAllDiagnosis } from '../../actions/settings';
import { request } from '../../services/utilities';

const Diagnosis = props => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [pageInfo, setPageInfo] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!dataLoaded) {
			loadDiagnosis(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataLoaded]);

	const loadDiagnosis = async page => {
		try {
			if (page <= 0) {
				return;
			} else if (pageInfo && page > pageInfo.lastPage) {
				return;
			}

			setLoading(true);
			const url = 'settings/diagnosis';
			const rs = await request(`${url}?page=${page}`);
			const { data, ...info } = rs;
			props.getAllDiagnosis(data);
			setPageInfo(info);
			setCurrentPage(page);
			setDataLoaded(true);
			setLoading(false);
		} catch (e) {
			setDataLoaded(true);
			setLoading(false);
			notifyError(e.message || 'could not load diagnoses');
		}
	};

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
										Diagnosis
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
													<button
														className="btn btn-sm btn-secondary"
														onClick={() => props.uploadDiagnosis(true)}>
														Upload Diagnosis Data
													</button>
												</div>
												<div className="col-sm-6">
													<form
														className="form-inline justify-content-sm-end"
														style={{ marginBottom: '7px' }}>
														<input
															className="form-control form-control-sm rounded bright"
															placeholder="Search"
															type="text"
														/>
													</form>
												</div>
											</div>
										</div>
										<div className="table-responsive">
											<table className="table table-padded">
												<thead>
													<tr>
														<th>Procedure Code</th>
														<th>ICD 10 Code</th>
														<th className="text-center">Description</th>
													</tr>
												</thead>
												<tbody>
													{!dataLoaded || loading ? (
														<tr>
															<td colSpan="5" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : (
														<>
															{props.diagnosis.map((diagnosis, i) => {
																return (
																	<tr key={i}>
																		<td>
																			<div className="user-with-avatar">
																				{diagnosis.procedureCode}
																			</div>
																		</td>
																		<td>
																			<div className="smaller lighter">
																				{diagnosis.icd10Code}
																			</div>
																		</td>
																		<td>
																			<span>{diagnosis.description}</span>
																		</td>
																	</tr>
																);
															})}
														</>
													)}
												</tbody>
											</table>
										</div>
										<div className="controls-below-table">
											<div className="table-records-info">
												{`Showing records ${currentPage} - ${pageInfo?.lastPage ||
													0}`}
											</div>
											<div className="table-records-pages">
												<ul>
													<li>
														<a onClick={() => loadDiagnosis(currentPage - 1)}>
															Previous
														</a>
													</li>
													{/* <li>
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
													</li> */}
													<li>
														<a onClick={() => loadDiagnosis(currentPage + 1)}>
															Next
														</a>
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
	);
};

const mapStateToProps = state => {
	return {
		diagnosis: state.settings.diagnosis,
	};
};

export default connect(mapStateToProps, {
	uploadDiagnosis,
	getAllDiagnosis,
})(Diagnosis);
