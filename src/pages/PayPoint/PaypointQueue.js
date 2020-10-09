import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TransactionTable from '../../components/Tables/TransactionTable';
import { socket } from '../../services/constants';
import { request } from '../../services/utilities';
import { Popover, Overlay } from 'react-bootstrap';
import Reciept from './../../components/Invoice/Reciept';
import Invoice from './../../components/Invoice/Invoice';
import {
	getAllPendingTransactions,
	showInvoiceToPrint,
	showReceiptToPrint,
} from './../../actions/paypoint';
import PrintReceiptPortal from './PrintReceiptPortal';

const PaypointQueue = ({ staff }) => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const [listenning, setListenning] = useState(false);

	const ref = useRef(null);

	const dispatch = useDispatch();

	const transactions = useSelector(
		({ paypoint }) => paypoint.pendingTransactions
	);
	const activeData = useSelector(({ paypoint }) => paypoint.transactionData);
	const showInvoice = useSelector(({ paypoint }) => paypoint.showInvoice);
	const showReceipt = useSelector(({ paypoint }) => paypoint.showReceipt);

	useEffect(() => {
		if (!listenning) {
			const init = async () => {
				return request('transactions/list/pending', 'GET', true)
					.then(res => {
						dispatch(getAllPendingTransactions(res));
					})
					.catch(err => {});
			};

			// fetch transactions
			init();

			// listen for new transactions
			setListenning(true);

			socket.on('paypoint-queue', data => {
				if (data.payment) {
					const transaction = data.payment;
					dispatch(getAllPendingTransactions(transaction));
				}
			});
		}
	}, [dispatch, listenning]);

	const doApproveTransaction = item => {
		this.props.approveTransaction(item);
	};

	const doApplyVoucher = item => {
		this.props.applyVoucher(item);
	};

	const handlePrintClick = (event, data) => {
		setShow(!show);
		setTarget(event.target);
	};

	const onPrintReceipt = () => {
		dispatch(showReceiptToPrint(!showReceipt));
	};

	const onPrintInvoice = () => {
		dispatch(showInvoiceToPrint(!showInvoice));
	};

	return (
		<div className="table-responsive">
			{activeData && showReceipt && (
				<PrintReceiptPortal>
					<Reciept data={activeData} />
				</PrintReceiptPortal>
			)}
			{activeData && showInvoice && (
				<PrintReceiptPortal>
					<Invoice data={activeData} />
				</PrintReceiptPortal>
			)}
			<Overlay
				show={show}
				target={target}
				placement="left"
				container={ref.current}>
				<Popover id="print" style={{ width: '10rem' }}>
					<Popover.Title>Print</Popover.Title>
					<div action>
						<button
							onClick={onPrintInvoice}
							style={{
								border: 'none',
								background: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingTop: '0.5rem',
								paddingBottom: '0.5rem',
							}}>
							INVOICE
						</button>
					</div>
					<div action>
						<button
							onClick={onPrintReceipt}
							style={{
								border: 'none',
								background: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingTop: '0.5rem',
								paddingBottom: '0.5rem',
							}}>
							RECEIPT
						</button>
					</div>
				</Popover>
			</Overlay>
			<table className="table table-striped">
				<thead>
					<tr>
						<th hidden={true}>DATE</th>
						<th className="">PATIENT NAME</th>
						<th className="">SERVICE</th>
						<th className="">AMOUNT PAID (&#x20A6;)</th>
						<th className="">BALANCE</th>
						<th className="">PAYMENT TYPE</th>
						<th className="text-center">ACTIONS</th>
					</tr>
				</thead>
				{transactions && (
					<TransactionTable
						transactions={transactions}
						loading={false}
						today={true}
						showActionBtns={true}
						approveTransaction={doApproveTransaction}
						doApplyVoucher={doApplyVoucher}
						handlePrint={handlePrintClick}
					/>
				)}
			</table>
		</div>
	);
};

const mapStatetoProps = state => {
	return {
		staff: state.user.profile,
	};
};

export default withRouter(connect(mapStatetoProps)(PaypointQueue));
