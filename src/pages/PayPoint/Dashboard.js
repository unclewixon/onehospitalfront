/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { request } from '../../services/utilities';
import { loadTransactions } from '../../actions/transaction';
import TransactionTable from '../../components/Tables/TransactionTable';
import TableLoading from '../../components/TableLoading';

class Dashboard extends Component {
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
			const today = moment().format('YYYY-MM-DD');
			const url = `transactions?patient_id=&startDate=${today}&endDate=${today}&bill_source=&status=`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.props.loadTransactions(result);
			this.setState({ loading: false, meta });
		} catch (error) {
			console.log(error);
		}
	};

	handlePrintClick = () => {
		console.log('print');
	};

	render() {
		const { loading } = this.state;
		const { transactions } = this.props;
		return (
			<>
				<h6 className="element-header">
					Today's Transactions ({moment().format('DD-MMM-YYYY')})
				</h6>
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<TransactionTable
								transactions={transactions}
								showActionBtns={true}
								handlePrint={this.handlePrintClick}
								queue={false}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transaction.transactions,
	};
};

export default connect(mapStateToProps, {
	loadTransactions,
})(Dashboard);
