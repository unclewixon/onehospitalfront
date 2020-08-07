/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { API_URI, socket, transactionsAPI } from '../services/constants';
import { request, formatNumber, confirmAction } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import searchingGIF from '../assets/images/searching.gif';
import moment from 'moment';
import { connect } from 'react-redux';
import {
	loadTodayTransaction,
	deleteTransaction,
} from '../actions/transaction';
import Tooltip from 'antd/lib/tooltip';
import {
	applyVoucher,
	approveTransaction,
	createVoucher,
} from '../actions/general';
import TransactionTable from './Tables/TransactionTable';

export class PayPointTable extends Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async () => {
		try {
			this.setState({ loading: true });
			let today = moment().format('YYYY-MM-DD');
			console.log(today);
			const rs = await request(
				`${transactionsAPI}/list?patient_id=&startDate=${today}&endDate=${today}&transaction_type=billing&status=`,
				'GET',
				true
			);
			console.log(rs);
			//const res = rs.sort((a, b) => a.q_createdAt.localeCompare(b.q_createdAt));

			this.props.loadTodayTransaction(rs.reverse());
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { loading } = this.state;
		const transactions = this.props.todayTransaction;
		return (
			<div className="col-sm-12">
				<div className="element-box">
					<h6 className="element-header">
						Today's Transactions ({moment().format('YYYY-MM-DD')})
					</h6>

					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
								<tr>
									<th className="">PATIENT NAME</th>
									<th className="">DEPARTMENT</th>
									<th className="">SERVICE</th>
									<th className="">AMOUNT (&#x20A6;)</th>
									<th className="">PAYMENT TYPE (&#x20A6;)</th>
									<th className="">ACTIONS</th>
								</tr>
							</thead>
							<TransactionTable
								transactions={transactions}
								loading={loading}
								today={true}
							/>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		todayTransaction: state.transaction.todayTransaction,
	};
};

export default connect(mapStateToProps, {
	loadTodayTransaction,
	applyVoucher,
	approveTransaction,
	deleteTransaction,
})(PayPointTable);
