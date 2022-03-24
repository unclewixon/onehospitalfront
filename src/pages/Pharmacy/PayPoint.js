import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender } from '../../services/utilities';
import { loadTransactions } from '../../actions/transaction';
import TransactionTable from '../../components/Tables/TransactionTable';
import TableLoading from '../../components/TableLoading';

class PayPoint extends Component {
	state = {
		loading: false,
		meta: null,
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async page => {
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const url = `transactions?page=${p}&limit=15&patient_id=&startDate=&endDate=&status=&hmo_id=&service_id=drugs`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.props.loadTransactions(result);
			this.setState({
				loading: false,
				filtering: false,
				meta,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
	};

	handlePrintClick = item => {
		console.log('print');
		console.log(item);
	};

	render() {
		const { loading, meta } = this.state;
		const { transactions } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-box m-0 p-3">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<div className="table-responsive">
								<TransactionTable
									transactions={transactions}
									showActionBtns={true}
									handlePrint={this.handlePrintClick}
									queue={false}
									showPrint={true}
								/>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} transactions`}
										itemRender={itemRender}
										onChange={current => this.onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</>
					)}
				</div>
			</div>
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
	startBlock,
	stopBlock,
})(PayPoint);
