/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';

import TableLoading from '../TableLoading';
import {
	request,
	itemRender,
	staffname,
	formatCurrency,
	formatDate,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import ModalServiceDetails from '../Modals/ModalServiceDetails';
import waiting from '../../assets/images/waiting.gif';
import SetCreditLimit from './Modals/SetCreditLimit';
import MakeDeposit from './Modals/MakeDeposit';
import ModalApplyCredit from '../Modals/ModalApplyCredit';
import { messageService } from '../../services/message';

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
	const [showModal, setShowModal] = useState(false);
	const [transaction, setTransaction] = useState(null);
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

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchBills = useCallback(
		async (page, startDate = '', endDate = '', status = '', search = '') => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient/${patient.id}/transactions?page=${p}&limit=12&startDate=${startDate}&endDate=${endDate}&status=${status}&q=${search}`;
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
			setLoading(false);
		}
	}, [fetchBills, fetchDepositBal, loading]);

	const onNavigatePage = nextPage => {
		fetchBills(nextPage, startDate, endDate, status);
	};

	const viewDetails = transaction => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTransaction(transaction);
	};

	const doApplyCredit = () => {
		document.body.classList.add('modal-open');
		setShowApplyModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowApplyModal(false);
		setTransaction(null);
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
		await fetchBills(1, startDate, endDate, status);
		setFiltered(true);
	};

	const doRefresh = async () => {
		await fetchBills(meta.currentPage || 1, startDate, endDate, status);
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
						<div className="row justify-content-end">
							<div className="col-6">
								<div className="text-right">
									<label className="btn">
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
							<div className="col-md-auto">
								<div className="text-right">
									<Popover
										content={
											<MakeDeposit
												onHide={() => setDepositVisible(false)}
												patient={patient}
												updateBalance={amount => {
													setDepositBalance(amount);
												}}
											/>
										}
										overlayClassName="set-credit-limit"
										trigger="click"
										visible={depositVisible}
										onVisibleChange={() => setDepositVisible(!depositVisible)}
									>
										<Tooltip title="Make Deposit">
											<button className="btn btn-info btn-sm text-white mr-4">
												Make Deposit
											</button>
										</Tooltip>
									</Popover>
									<span className="text-bold text-underline mr-4">
										{formatCurrency(depositBalance)}
									</span>
									<button
										className="btn btn-primary btn-sm"
										onClick={() => doApplyCredit()}
									>
										Apply Deposit
									</button>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-md-6 m-0">
								<label className="mr-2">Transaction Date</label>
								<RangePicker value={date} onChange={e => dateChange(e)} />
							</div>
							<div className="form-group col-md-3 m-0 d-flex align-items-center">
								<label className="mr-2 ">Status</label>
								<select
									style={{ height: '35px' }}
									id="status"
									className="form-control"
									name="status"
									onChange={e => setStatus(e.target.value)}
								>
									<option value="">Choose status</option>
									{paymentStatus.map((status, i) => {
										return (
											<option key={i} value={status.value}>
												{status.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-3 m-0">
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
												<th>Status</th>
												<th>Received By</th>
											</tr>
										</thead>
										<tbody>
											{bills.map((item, i) => {
												return (
													<tr className={i % 2 === 0 ? 'even' : 'odd'} key={i}>
														<td className="sorting_1">{item.id}</td>
														<td>
															<span className="text-capitalize">
																{item.bill_source === 'ward'
																	? 'Room'
																	: item.bill_source}
															</span>
															{item.bill_source !== 'registration' &&
																item.bill_source !== 'credit' && (
																	<a
																		className="item-title text-primary text-underline ml-2"
																		onClick={() => viewDetails(item)}
																	>
																		<i className="os-icon os-icon-alert-circle" />
																	</a>
																)}
														</td>
														<td>
															{moment(item.createdAt).format(
																'DD-MMM-YYYY h:mm a'
															)}
														</td>
														<td>{formatCurrency(item.amount || 0)}</td>
														<td>{item.payment_method || '--'}</td>
														<td>
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
			{showModal && (
				<ModalServiceDetails
					transaction={transaction}
					closeModal={() => closeModal()}
				/>
			)}
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
