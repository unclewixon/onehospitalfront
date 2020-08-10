import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useSWR from 'swr';
import TransactionTable from '../../components/Tables/TransactionTable';
import { socket } from '../../services/constants';
import { request } from '../../services/utilities';

const PaypointQueue = ({ staff }) => {
	const [transactions, setTransactions] = useState([]);

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

	return (
		<div className="table-responsive">
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
