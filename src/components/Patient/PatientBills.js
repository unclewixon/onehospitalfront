/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
import startCase from 'lodash.startcase';

import TableLoading from '../TableLoading';
import {
	request,
	itemRender,
	staffname,
	formatCurrency,
	formatDate,
	parseSource,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import waiting from '../../assets/images/waiting.gif';
import SetCreditLimit from './Modals/SetCreditLimit';
import MakeDeposit from './Modals/MakeDeposit';
import ModalApplyCredit from '../Modals/ModalApplyCredit';
import { messageService } from '../../services/message';
import TransferCredit from './Modals/TransferCredit';

const { RangePicker } = DatePicker;

const paymentStatus = [
	{ value: 0, label: 'Pending' },
	{ value: 1, label: 'Paid' },
];

const PatientBills = () => {
	const [loading, setLoading] = useState(true);
	const [bills, setBills] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [outstandingAmount, setOutstandingAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [status, setStatus] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [visible, setVisible] = useState(false);
	const [depositVisible, setDepositVisible] = useState(false);
	const [filtered, setFiltered] = useState(false);
	const [date, setDate] = useState([]);
	const [depositBalance, setDepositBalance] = useState(0);
	const [showApplyModal, setShowApplyModal] = useState(false);
	const [transferVisible, setTransferVisible] = useState(false);
	const [services, setServices] = useState([]);
	const [service, setService] = useState('');

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchBills = useCallback(
		async (page, start, end, status, service) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const startDate = start || '';
				const endDate = end || '';
				const item = status || '';
				const service_id = service || '';
				const url = `patient/${patient.id}/transactions?page=${p}&limit=12&startDate=${startDate}&endDate=${endDate}&status=${item}&service_id=${service_id}`;
				const rs = await request(url, 'GET', true);
				const { result, outstanding_amount, total_amount, ...meta } = rs;
				setBills(result);
				setMeta(meta);
				setOutstandingAmount(outstanding_amount);
				setTotalAmount(total_amount);
				setLoading(false);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (e) {
				notifyError(e.message || 'could not fetch bills');
				setLoading(false);
				setFiltering(false);
				dispatch(stopBlock());
			}
		},
		[dispatch, patient]
	);

	const fetchServices = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = 'service-categories';
			const rs = await request(url, 'GET', true);
			setServices(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching services');
		}
	}, [dispatch]);

	const fetchDepositBal = useCallback(async () => {
		try {
			const url = `patient/${patient.id}/deposit-balance`;
			const rs = await request(url, 'GET', true);
			const { balance } = rs;
			setDepositBalance(balance);
		} catch (e) {
			notifyError(e.message || 'could not fetch deposit');
		}
	}, [patient]);

	useEffect(() => {
		if (loading) {
			fetchBills(1);
			fetchDepositBal();
			fetchServices();
			setLoading(false);
		}
	}, [fetchBills, fetchDepositBal, fetchServices, loading]);

	const onNavigatePage = nextPage => {
		fetchBills(nextPage, startDate, endDate, status, service);
	};

	const doApplyCredit = () => {
		document.body.classList.add('modal-open');
		setShowApplyModal(true);
	};

	const doPrintBills = async () => {
		try {
			const service_id = service || '';
			dispatch(startBlock());
			const uri = `transactions/print?patient_id=${patient.id}&status=pending&start_date=${startDate}&end_date=${endDate}&service_id=${service_id}`;
			const rs = await request(uri, 'GET', true);
			dispatch(stopBlock());
			if (rs.success) {
				setTimeout(() => {
					window.open(rs.url, '_blank').focus();
				}, 200);
			} else {
				notifyError(rs.message || 'could not print transactions');
			}
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not print transactions');
		}
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowApplyModal(false);
	};

	const dateChange = e => {
		const rs = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setDate(e);
		setStartDate(rs[0]);
		setEndDate(rs[1]);
	};

	const doFilter = async () => {
		setFiltering(true);
		await fetchBills(1, startDate, endDate, status, service);
		setFiltered(true);
	};

	const doRefresh = async () => {
		await fetchBills(
			meta.currentPage || 1,
			startDate,
			endDate,
			status,
			service
		);
		await fetchDepositBal();

		const uri = `patient/${patient.id}/outstandings`;
		const res = await request(uri, 'GET', true);
		messageService.sendMessage({ type: 'balance', data: res });
	};

	return (
		<div className="row">
			<div className="m-0 w-100">
				{loading ? (
					<TableLoading />
				) : (
					<>
						<div className="row mx-0 justify-content-end">
							<div className="col-4">
								<div className="text-right">
									<label className="btn m-0 p-0">
										<Popover
											content={
												<SetCreditLimit
													onHide={() => setVisible(false)}
													patient={patient}
												/>
											}
											overlayClassName="set-credit-limit"
											trigger="click"
											visible={visible}
											onVisibleChange={() => setVisible(!visible)}
										>
											<Tooltip title="Set Credit Limit">
												<span className="btn btn-success mr-4">
													Add Credit Limit
												</span>
												<a className="text-bold link-primary mr-3">{`${formatCurrency(
													patient.credit_limit
												)}`}</a>{' '}
												Validity:
												<a className="text-bold link-primary">{`${formatDate(
													patient.credit_limit_expiry_date,
													'D-MMM-YYYY'
												)}`}</a>
											</Tooltip>
										</Popover>
									</label>
								</div>
							</div>
							<div className="col-md-auto align-self-center">
								<div className="text-right">
									<Popover
										content={
											<MakeDeposit
												onHide={() => setDepositVisible(false)}
												patient={patient}
												updateBalance={amount => {
													setDepositBalance(amount);
													fetchBills(1);
												}}
											/>
										}
										overlayClassName="set-credit-limit"
										trigger="click"
										visible={depositVisible}
										onVisibleChange={() => setDepositVisible(!depositVisible)}
									>
										<button className="btn btn-info btn-sm text-white mr-4">
											Make Deposit
										</button>
									</Popover>
									<span className="text-bold text-underline mr-4">
										{formatCurrency(depositBalance)}
									</span>
									<button
										className="btn btn-primary btn-sm mr-2"
										onClick={() => doApplyCredit()}
									>
										Apply Deposit
									</button>
									<Popover
										content={
											<TransferCredit
												onHide={() => setTransferVisible(false)}
												patient={patient}
												updateBalance={amount => {
													setDepositBalance(amount);
													fetchBills(1);
												}}
											/>
										}
										overlayClassName="set-credit-limit"
										trigger="click"
										visible={transferVisible}
										onVisibleChange={() => setTransferVisible(!transferVisible)}
									>
										<button className="btn btn-secondary mr-2">
											<i className="fa fa-send"></i>
											<span className="ml-2">Transfer Credit</span>
										</button>
									</Popover>
									<button
										className="btn btn-success"
										onClick={() => doPrintBills()}
									>
										<i className="fa fa-print"></i>
										<span className="ml-2">Print Bills</span>
									</button>
								</div>
							</div>
						</div>
						<div className="row mt-4 mx-0">
							<div className="form-group col-md-5 m-0">
								<label className="mr-2">Transaction Date</label>
								<RangePicker value={date} onChange={e => dateChange(e)} />
							</div>
							<div className="form-group col-md-2 m-0 d-flex align-items-center">
								<label className="mr-2 ">Status</label>
								<select
									style={{ height: '35px' }}
									className="form-control"
									name="status"
									onChange={e => setStatus(e.target.value)}
								>
									<option value="">Status</option>
									{paymentStatus.map((status, i) => {
										return (
											<option key={i} value={status.value}>
												{status.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-3 m-0 d-flex align-items-center">
								<label className="mr-2 ">Service</label>
								<select
									style={{ height: '35px' }}
									className="form-control"
									name="service"
									onChange={e => setService(e.target.value)}
								>
									<option value="">Service</option>
									<option value="credit">Credit Deposit</option>
									<option value="transfer">Credit Transfer</option>
									{services.map((item, i) => {
										return (
											<option key={i} value={item.id}>
												{startCase(item.name)}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-2 m-0">
								<div
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={() => doFilter()}
								>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
										)}
									</span>
								</div>
								{filtered && (
									<div
										className="btn btn-sm btn-secondary text-white ml-2"
										onClick={async () => {
											setDate([]);
											setStatus('');
											setStartDate('');
											setEndDate('');
											setService('');
											setFiltered(false);
											await fetchBills(1);
										}}
									>
										<i className="os-icon os-icon-close" />
									</div>
								)}
							</div>
						</div>
						<div className="dataTables_wrapper container-fluid dt-bootstrap4">
							<div className="row">
								<div className="col-sm-12">
									<table
										className="table table-striped table-lightfont dataTable"
										style={{ width: '100%' }}
									>
										<thead style={{ borderCollapse: 'collapse' }}>
											<tr>
												<th>Bill#</th>
												<th>Item</th>
												<th>Date</th>
												<th>Amount</th>
												<th>Payment Method</th>
												<th>Type</th>
												<th>Status</th>
												<th>Received By</th>
											</tr>
										</thead>
										<tbody>
											{bills.map((item, i) => {
												const reqItem = item.patientRequestItem;
												return (
													<tr className={i % 2 === 0 ? 'even' : 'odd'} key={i}>
														<td className="sorting_1" nowrap="nowrap">
															{item.id}
														</td>
														<td>
															<span className="text-capitalize">
																<strong>{parseSource(item.bill_source)}</strong>
																{(item?.bill_source === 'ward' ||
																	item?.bill_source === 'nicu-accommodation') &&
																	`: ${item.description}`}
																{(item?.bill_source === 'consultancy' ||
																	item?.bill_source === 'labs' ||
																	item?.bill_source === 'scans' ||
																	item?.bill_source === 'procedure' ||
																	item?.bill_source === 'nursing-service') &&
																item.service?.item?.name
																	? `: ${item.service?.item?.name}`
																	: ''}
																{item?.bill_source === 'drugs' && (
																	<>
																		{` : ${reqItem.fill_quantity} ${
																			reqItem.drug.unitOfMeasure
																		} of ${reqItem.drugGeneric.name} (${
																			reqItem.drug.name
																		}) at ${formatCurrency(
																			reqItem.drugBatch.unitPrice
																		)} each`}
																	</>
																)}
															</span>
														</td>
														<td nowrap="nowrap">
															{moment(item.createdAt).format(
																'DD-MMM-YYYY h:mm a'
															)}
														</td>
														<td nowrap="nowrap">
															{item.status !== 1 && formatCurrency(item.amount)}
															{item.status === 1 &&
																item.amount_paid <= 0 &&
																formatCurrency(item.amount)}
															{item.status === 1 && item.amount_paid > 0 && (
																<>
																	{Math.abs(item.amount) -
																		Math.abs(item.amount_paid) !==
																	0 ? (
																		<>
																			<>{formatCurrency(item.amount)}</>
																			<br />
																			<span className="badge badge-secondary">
																				<small>{`PAID: ${formatCurrency(
																					item.amount_paid
																				)}`}</small>
																			</span>
																		</>
																	) : (
																		formatCurrency(item.amount_paid)
																	)}
																</>
															)}
														</td>
														<td nowrap="nowrap">
															{item.payment_method || '--'}
														</td>
														<td>{item.transaction_type || '--'}</td>
														<td nowrap="nowrap">
															{item.status === 0 && (
																<span className="badge badge-secondary text-white">
																	pending
																</span>
															)}
															{item.status === -1 && (
																<span className="badge badge-info text-white">
																	pending
																</span>
															)}
															{item.status === 1 && (
																<span className="badge badge-success">
																	paid
																</span>
															)}
														</td>
														<td>{item.staff ? staffname(item.staff) : '--'}</td>
													</tr>
												);
											})}
											<tr className="even">
												<td colSpan="3">
													<strong>Total</strong>
												</td>
												<td>{formatCurrency(totalAmount)}</td>
												<td colSpan="3">
													<strong>Outstanding Amount:</strong>{' '}
													{formatCurrency(outstandingAmount)}
												</td>
											</tr>
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
										showTotal={total => `Total ${total} transactions`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			{showApplyModal && (
				<ModalApplyCredit
					patient={patient}
					depositBalance={depositBalance}
					refresh={() => doRefresh()}
					closeModal={() => closeModal()}
				/>
			)}
		</div>
	);
};

export default PatientBills;
