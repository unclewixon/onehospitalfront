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
				`${API_URI}${transactionsAPI}/list?patient_id=&startDate${today}=&endDate=${today}&status=`,
				'GET',
				true
			);

			const res = rs.sort((a, b) => a.q_createdAt.localeCompare(b.q_createdAt));
			this.props.loadTodayTransaction(res.reverse());
			this.setState({ loading: false });
			console.log(this.props.todayTransaction);
		} catch (error) {
			console.log(error);
		}
	};

	onDeleteTransaction = data => {
		this.props
			.deleteTransaction(data)
			.then(response => {
				notifySuccess('Transaction deleted');
			})
			.catch(error => {
				notifyError('Error deleting  transaction ');
			});
	};
	confirmDelete = data => {
		confirmAction(this.onDeleteTransaction, data);
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
									<th className="text-center">PATIENT NAME</th>
									<th className="text-center">DEPARTMENT</th>
									<th className="text-center">SERVICE</th>
									<th className="text-center">AMOUNT (&#x20A6;)</th>
									<th className="text-center">PAYMENT TYPE (&#x20A6;)</th>
									<th className="text-right">ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan="6" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								) : transactions.length > 0 ? (
									transactions.map(transaction => {
										return (
											<tr key={transaction.q_id}>
												<td className="">
													{`${transaction.surname} ${transaction.other_names}`}
												</td>
												<td className="">{transaction.deptname}</td>
												<td className="">
													{transaction.q_service_id
														? transaction.q_service_id
														: 'No service yet'}
												</td>
												<td className="">{transaction.q_amount}</td>
												<td className="">
													{transaction.q_paymentType
														? transaction.q_paymentType
														: 'Not specified'}
												</td>
												<td className="text-center row-actions">
													<Tooltip title="Approve Transactions">
														<a className="secondary">
															<i className="os-icon os-icon-folder-plus" />
														</a>
													</Tooltip>

													<Tooltip title="Delete Transactions">
														<a
															className="text-danger"
															onClick={() => this.confirmDelete(transaction)}>
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})
								) : (
									<tr colSpan="6" className="text-center">
										<td>No transaction for today yet</td>
									</tr>
								)}
							</tbody>
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
	deleteTransaction,
})(PayPointTable);
