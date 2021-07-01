/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import ViewPrescription from '../Pharmacy/ViewPrescription';
import { request, updateImmutable, itemRender } from '../../services/utilities';
import TableLoading from '../TableLoading';

const Pharmacy = ({ location, patient, can_request = true, type, itemId }) => {
	const [loaded, setLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [prescriptions, setPrescriptions] = useState([]);
	const [filled, setFilled] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const startDate = '';
	const endDate = '';

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setActiveRequest(null);
		setShowModal(false);
		setFilled(false);
	};

	const fetch = useCallback(
		async page => {
			try {
				const block = type || '';
				const url = `requests/${patient.id}/request/pharmacy?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=10&item_id=${itemId}&type=${block}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setPrescriptions(result);
				setMeta(meta);
				setLoaded(true);
			} catch (error) {
				setLoaded(true);
				notifyError('Error could not fetch regimen prescriptions');
			}
		},
		[itemId, patient, type]
	);

	useEffect(() => {
		if (!loaded) {
			fetch(1);
		}
	}, [fetch, loaded]);

	const updatePrescriptions = update => {
		const updatedDrugs = updateImmutable(prescriptions, update);
		setPrescriptions(updatedDrugs);
	};

	const onNavigatePage = nextPage => {
		fetch(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					{can_request && (
						<Link
							className="btn btn-primary btn-sm"
							to={`${location.pathname}#pharmacy-request`}>
							<i className="os-icon os-icon-plus" />
							New Pharmacy Request
						</Link>
					)}
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
							<TableLoading />
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
															{request.transaction &&
																request.transaction.status === 0 &&
																request.status === 0 &&
																request.isFilled && (
																	<span className="badge badge-info text-white">
																		Awaiting Payment
																	</span>
																)}
															{request.transaction &&
																request.transaction.status === 1 &&
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
																			document.body.classList.add('modal-open');
																			setActiveRequest(request);
																			setShowModal(true);
																			setFilled(false);
																		}}>
																		<i className="os-icon os-icon-check-square" />
																	</a>
																</Tooltip>
															)}
															{request.status === 1 && (
																<Tooltip title="Print Prescription">
																	<a className="ml-2">
																		<i className="icon-feather-printer" />
																	</a>
																</Tooltip>
															)}
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
