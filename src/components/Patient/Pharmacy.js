/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import ViewPrescription from '../Pharmacy/ViewPrescription';
import { request, updateImmutable, itemRender } from '../../services/utilities';

const Pharmacy = ({ location, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [allDrugs, setAllDrugs] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [prescriptions, setPrescriptions] = useState([]);
	const [filled, setFilled] = useState(false);
	const [meta, setMeta] = useState(null);

	const startDate = '';
	const endDate = '';

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setActiveRequest(null);
		setShowModal(false);
		setFilled(false);
	};

	const getServiceUnit = async hmoId => {
		try {
			const res = await request('inventory/categories', 'GET', true);

			if (res && res.length > 0) {
				const selectCat = res.find(cat => cat.name === 'Pharmacy');

				const url = `inventory/stocks-by-category/${selectCat.id}/${hmoId}`;
				const rs = await request(url, 'GET', true);
				setAllDrugs(rs);
			}
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	};

	useEffect(() => {
		const getPrescriptions = async () => {
			const url = `patient/${patient.id}/request/pharmacy?startDate=${startDate}&endDate=${endDate}&limit=10`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setPrescriptions(result);
			setMeta(meta);
			setLoaded(true);
		};

		if (!loaded) {
			getPrescriptions();
		}
	}, [endDate, loaded, patient.id, startDate]);

	const updatePrescriptions = update => {
		const updatedDrugs = updateImmutable(prescriptions, update);
		setPrescriptions(updatedDrugs);
	};

	const fetch = async page => {
		const url = `patient/${patient.id}/request/pharmacy?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=10`;
		const rs = await request(url, 'GET', true);
		const { result, ...meta } = rs;
		setPrescriptions(result);
		setMeta(meta);
		setLoaded(true);
	};

	const onNavigatePage = nextPage => {
		fetch(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary btn-sm"
						to={`${location.pathname}#pharmacy-request`}>
						<i className="os-icon os-icon-plus" />
						New Pharmacy Request
					</Link>
				</div>
				<h6 className="element-header">Pharmacy Requests</h6>
				<div className="element-box p-3 m-0">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						{!loaded ? (
							<div colSpan="5" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
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
												<th>Requested By</th>
												<th className="text-center">Request Status</th>
												<th />
											</tr>
										</thead>
										<tbody>
											{prescriptions.map((request, index) => {
												return (
													<tr key={index}>
														<td>
															{moment(request.createdAt).format(
																'DD-MMM-YYYY : h:mmA'
															)}
														</td>
														<td>
															{request.created_by ? request.created_by : ''}
														</td>
														<td className="text-center">
															{request.status === 0 && !request.isFilled && (
																<span className="badge badge-warning">
																	Pending
																</span>
															)}
															{request.transaction_status === 0 &&
																request.status === 0 &&
																request.isFilled && (
																	<span className="badge badge-info text-white">
																		Awaiting Payment
																	</span>
																)}
															{request.transaction_status === 1 &&
																request.status === 0 && (
																	<span className="badge badge-secondary">
																		Awaiting Dispense
																	</span>
																)}
															{request.status === 1 && (
																<span className="badge badge-success">
																	Completed
																</span>
															)}
														</td>
														<td className="row-actions text-right">
															{request.isFilled && (
																<Tooltip title="View Prescription">
																	<a
																		className="info"
																		onClick={() => {
																			document.body.classList.add('modal-open');
																			setActiveRequest(request);
																			setShowModal(true);
																			setFilled(true);
																		}}>
																		<i className="os-icon os-icon-eye" />
																	</a>
																</Tooltip>
															)}
															{!request.isFilled && (
																<Tooltip title="Fill Prescription">
																	<a
																		className="primary"
																		onClick={async () => {
																			await getServiceUnit(
																				request.patient_hmo_id
																			);
																			document.body.classList.add('modal-open');
																			setActiveRequest(request);
																			setShowModal(true);
																			setFilled(false);
																		}}>
																		<i className="os-icon os-icon-check-square" />
																	</a>
																</Tooltip>
															)}
															<Tooltip title="Print Prescription">
																<a className="ml-2">
																	<i className="icon-feather-printer" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} prescriptions`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
										/>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{showModal && (
				<ViewPrescription
					closeModal={closeModal}
					activeRequest={activeRequest}
					drugs={allDrugs}
					updatePrescriptions={updatePrescriptions}
					filled={filled}
				/>
			)}
		</div>
	);
};

const mapStateToProps = ({ user }) => ({
	patient: user.patient,
});

export default withRouter(connect(mapStateToProps)(Pharmacy));
