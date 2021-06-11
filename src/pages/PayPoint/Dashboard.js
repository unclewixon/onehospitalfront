/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { transactionsAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { loadTodayTransaction } from '../../actions/transaction';
import TransactionTable from '../../components/Tables/TransactionTable';
import TableLoading from '../../components/TableLoading';

export class Dashboard extends Component {
	state = {
		loading: false,
		meta: null,
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async () => {
		try {
			this.setState({ loading: true });
			let today = moment().format('YYYY-MM-DD');
			console.log(today);
			const url = `${transactionsAPI}/list?patient_id=&startDate=${today}&endDate=${today}&transaction_type=&status=`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.props.loadTodayTransaction(result.reverse());
			this.setState({ loading: false, meta });
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
						Today's Transactions ({moment().format('DD-MMM-YYYY')})
					</h6>
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<TransactionTable transactions={transactions} queue={true} />
						</div>
					)}
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
})(Dashboard);
