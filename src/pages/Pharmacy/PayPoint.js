import React, { Component } from 'react';
import { connect } from 'react-redux';

import { transactionsAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import {
	loadTodayTransaction,
	deleteTransaction,
} from '../../actions/transaction';
import { applyVoucher, approveTransaction } from '../../actions/general';
import TransactionTable from '../../components/Tables/TransactionTable';

class PayPoint extends Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async () => {
		try {
			this.setState({ loading: true });
			const url = `${transactionsAPI}/list?patient_id=&startDate=&endDate=&transaction_type=pharmacy&status=`;
			const rs = await request(url, 'GET', true);
			console.log(rs);

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
				<div className="element-box m-0 p-3">
					<div className="table-responsive">
						<TransactionTable
							transactions={transactions}
							loading={loading}
							queue={true}
							showActionBtns={true}
						/>
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
})(PayPoint);
