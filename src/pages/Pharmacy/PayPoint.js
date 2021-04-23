import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender } from '../../services/utilities';
import {
	loadTodayTransaction,
	deleteTransaction,
} from '../../actions/transaction';
import TransactionTable from '../../components/Tables/TransactionTable';

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
			const rs = await request(
				`transactions/list?page=${p}&limit=15&patient_id=&startDate=&endDate=&status=&hmo_id=`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTodayTransaction(arr);
			this.setState({ loading: false, filtering: false, meta });
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

	render() {
		const { loading, meta } = this.state;
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
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} transactions`}
								itemRender={itemRender}
								onChange={current => this.onNavigatePage(current)}
							/>
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
	deleteTransaction,
	startBlock,
	stopBlock,
})(PayPoint);
