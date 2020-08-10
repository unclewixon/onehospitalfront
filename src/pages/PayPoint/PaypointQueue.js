import React, { useCallback, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useSWR from 'swr';
import TransactionTable from '../../components/Tables/TransactionTable';
import { socket } from '../../services/constants';
import { request } from '../../services/utilities';
import { Popover, Overlay } from 'react-bootstrap';

const PaypointQueue = ({ staff }) => {
	const [transactions, setTransactions] = useState([]);
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const init = useCallback(() => {
		request('transactions/list/pending', 'GET', true)
			.then(res => {
				setTransactions(res);
			})
			.catch(err => {});
	}, [setTransactions]);

	useEffect(() => {
		// fetch transactions
		init();
		// listen for new transactions
		socket.on('new-queue', data => {
			if (data.payment) {
				console.log('new queue', data);
				const transaction = data.payment;
				setTransactions(transactions => [...transactions, transaction]);
			}
		});
	}, [init, setTransactions]);

	const doApproveTransaction = item => {
		this.props.approveTransaction(item);
	};

	const doApplyVoucher = item => {
		this.props.applyVoucher(item);
	};

	const handlePrintClick = event => {
		console.log(event);
		setShow(!show);
		setTarget(event.target);
	};

	return (
		<div className="table-responsive">
			<Overlay
				show={show}
				target={target}
				placement="left"
				container={ref.current}>
				<Popover id="print" style={{ width: '10rem' }}>
					<Popover.Title>Print</Popover.Title>
					<div action>
						<button
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
						<th className="">DEPARTMENT</th>
						<th className="">SERVICE</th>
						<th className="">AMOUNT (&#x20A6;)</th>
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
