/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import searchingGIF from '../../assets/images/searching.gif';
// import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import ModalSelectBed from './../../components/Modals/ModalSelectBed';

const InPatientCare = () => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<Link className="btn btn-primary btn-sm">
									<i className="os-icon os-icon-ui-22"></i>
									<span>Inbound Patient</span>
								</Link>
								<Link className="btn btn-success btn-sm">
									<i className="os-icon os-icon-grid-10"></i>
									<span>Patient In Admission</span>
								</Link>
							</div>
							<h6 className="element-header">List of Patients in care</h6>
							{showModal ? (
								<ModalSelectBed
									showModal={showModal}
									onModalClick={onModalClick}
								/>
							) : null}
							<div className="element-content">
								<div className="table-responsive">
									{
										<table className="table table-striped">
											<thead>
												<tr>
													<th>
														<div className="th-inner sortable both">
															Patient Name
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															File Number
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Gender/Age
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">Action</div>
													</th>
												</tr>
											</thead>
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="7" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : (
													<Fragment>
														<tr>
															<td>My name</td>
															<td>DEDA-000111222</td>
															<td>Male</td>
															<td>
																<div style={{ color: '#fff' }}>
																	<a
																		onClick={onModalClick}
																		className="btn btn-success btn-sm">
																		<i className="os-icon os-icon-user"></i>
																		<span>Assign Bed</span>
																	</a>
																</div>
															</td>
														</tr>
													</Fragment>
												)}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InPatientCare;
