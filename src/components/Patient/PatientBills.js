/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';

import TableLoading from '../TableLoading';
import {
	request,
	itemRender,
	staffname,
	formatCurrency,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import ModalServiceDetails from '../Modals/ModalServiceDetails';

const PatientBills = () => {
	const [loading, setLoading] = useState(true);
	const [bills, setBills] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);
	const [details, setDetails] = useState([]);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const startDate = '';
	const endDate = '';
	const search = '';

	const fetchBills = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient/${patient.id}/transactions?page=${p}&limit=10&startDate=${startDate}&endDate=${endDate}&q=${search}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setBills(result);
				setMeta(meta);
				setLoading(false);
				dispatch(stopBlock());
			} catch (e) {
				notifyError(e.message || 'could not fetch bills');
				setLoading(false);
				dispatch(stopBlock());
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchBills(1);
			setLoading(false);
		}
	}, [fetchBills, loading]);

	const onNavigatePage = nextPage => {
		fetchBills(nextPage);
	};

	const viewDetails = (transaction_type, data) => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setDetails({ transaction_type, data });
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setDetails([]);
	};

	return (
		<div className="row">
			<div className="m-0 w-100">
				{loading ? (
					<TableLoading />
				) : (
					<div className="">
						<div className="table-responsive">
							<div
								id="dataTable1_wrapper"
								className="dataTables_wrapper container-fluid dt-bootstrap4">
								<div className="row">
									<div className="col-sm-12 col-md-6"></div>
									<div className="col-sm-12 col-md-6">
										<div id="dataTable1_filter" className="dataTables_filter">
											<label>
												Search:
												<input
													type="search"
													className="form-control form-control-sm"
													placeholder=""
													aria-controls="dataTable1"
												/>
											</label>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<table
											id="dataTable1"
											width="100%"
											className="table table-striped table-lightfont dataTable"
											role="grid"
											aria-describedby="dataTable1_info"
											style={{ width: '100%' }}>
											<thead style={{ borderCollapse: 'collapse' }}>
												<tr>
													<th>Bill#</th>
													<th>Item</th>
													<th>Date</th>
													<th>Amount</th>
													<th>Balance</th>
													<th>Payment Type</th>
													<th>Status</th>
													<th>Received By</th>
												</tr>
											</thead>
											<tbody>
												{bills.map((item, i) => {
													return (
														<tr
															className={i % 2 === 0 ? 'even' : 'odd'}
															key={i}>
															<td className="sorting_1">{item.id}</td>
															<td>
																<span className="text-capitalize">
																	{item.transaction_type}
																</span>
																{item.transaction_type !== 'registration' && (
																	<a
																		className="item-title text-primary text-underline ml-2"
																		onClick={() =>
																			viewDetails(
																				item.transaction_type,
																				item.transaction_details
																			)
																		}>
																		details
																	</a>
																)}
															</td>
															<td>
																{moment(item.createdAt).format(
																	'DD-MMM-YYYY h:mm a'
																)}
															</td>
															<td>{formatCurrency(item.amount || 0)}</td>
															<td>{formatCurrency(item.balance || 0)}</td>
															<td>{item.payment_type || '--'}</td>
															<td>
																{item.status === 0 && (
																	<span className="badge badge-secondary text-white">
																		pending
																	</span>
																)}
																{item.status === -1 && (
																	<span className="badge badge-info text-white">
																		pay later
																	</span>
																)}
																{item.status === 1 && (
																	<span className="badge badge-success">
																		paid
																	</span>
																)}
															</td>
															<td>
																{item.staff ? staffname(item.staff) : '--'}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} lab results`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			{showModal && (
				<ModalServiceDetails
					details={details}
					closeModal={() => closeModal()}
				/>
			)}
		</div>
	);
};

export default PatientBills;
