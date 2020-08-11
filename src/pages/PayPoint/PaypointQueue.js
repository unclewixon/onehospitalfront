import React, { useCallback, useEffect, useState, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useSWR from 'swr';
import TransactionTable from '../../components/Tables/TransactionTable';
import { socket } from '../../services/constants';
import { request } from '../../services/utilities';
import { Popover, Overlay } from 'react-bootstrap';
import Reciept from './../../components/Invoice/Reciept';
import Invoice from './../../components/Invoice/Invoice';
import { getAllPendingTransactions } from './../../actions/paypoint';
import PrintPortal from './PrintPortal';

const PaypointQueue = ({ staff }) => {
	// const [transactions, setTransactions] = useState([]);
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const [activeData, setActiveData] = useState(null);
	const [showReciept, setShowReciept] = useState(false);
	const [showInvoice, setShowInvoice] = useState(false);
	const ref = useRef(null);
	const dispatch = useDispatch();
	const transactions = useSelector(
		({ paypoint }) => paypoint.pendingTransactions
	);

	console.log(transactions);

	const init = useCallback(() => {
		request('transactions/list/pending', 'GET', true)
			.then(res => {
				dispatch(getAllPendingTransactions(res));
			})
			.catch(err => {});
	}, [dispatch]);

	useEffect(() => {
		// fetch transactions
		init();
		// listen for new transactions
		socket.on('new-queue', data => {
			if (data.payment) {
				console.log('new queue', data);
				const transaction = data.payment;
				dispatch(getAllPendingTransactions(transaction));
			}
		});
	}, [init, dispatch]);

	const doApproveTransaction = item => {
		this.props.approveTransaction(item);
	};

	const doApplyVoucher = item => {
		this.props.applyVoucher(item);
	};

	const handlePrintClick = (event, data) => {
		setShow(!show);
		setTarget(event.target);
		setActiveData(data);
	};

	const onPrintReceipt = () => {
		setShowReciept(!showReciept);
	};

	const onPrintInvoice = () => {
		setShowInvoice(!showInvoice);
	};
	return (
		<div className="table-responsive">
			{activeData && (showReciept || showInvoice) && (
				<PrintPortal>
					<Reciept />
				</PrintPortal>
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
						<th className="">ACTIONS</th>
					</tr>
				</thead>
				{transactions && (
					<TransactionTable
						transactions={transactions}
						loading={false}
						today={true}
						approveTransaction={doApproveTransaction}
						doApplyVoucher={doApplyVoucher}
						handlePrint={handlePrintClick}
						show={true}
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
