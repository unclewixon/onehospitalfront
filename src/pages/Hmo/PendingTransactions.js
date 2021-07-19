/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import { Link } from 'react-router-dom';

import { socket } from '../../services/constants';
import { notifyError, notifyInfo } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import HmoTable from '../../components/HMO/HmoTable';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

class PendingTransactions extends Component {
	state = {
		filtering: false,
		dataLoaded: false,
		loading: false,
		id: null,
		meta: null,
		status: 0,
		patient_id: '',
		hmo_id: '',
		transactions: [],
	};

	componentDidMount() {
		this.fetchHmoTransaction();
		socket.on('new-hmo-appointment', res => {
			if (res.success && res.appointment) {
				notifyInfo(`New HMO appointment with ${res.appointment.patient}`);
			}
		});
		socket.on('new-hmo-appointment', res => {
			if (res.success && res.appointment) {
				notifyInfo(`New HMO appointment with ${res.appointment.patient}`);
			}
		});
	}

	fetchHmoTransaction = async page => {
		const { patient_id, status, hmo_id } = this.state;

		const startDate = moment()
			.subtract(1, 'd')
			.format('YYYY-MM-DD');
		const endDate = moment().format('YYYY-MM-DD');

		try {
			this.setState({ loading: true });
			const p = page || 1;
			const url = `hmos/transactions?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo_id}`;
			const rs = await request(url, 'GET', true);

			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({ loading: false, meta, transactions: arr });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			notifyError('Error fetching hmo transactions request');
			this.setState({ loading: false });
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchHmoTransaction(nextPage);
	};

	updateTransaction = data => {
		const i = this.state.meta;
		const meta = { ...i, total: (i.total = 1) };
		this.setState({ loading: false, meta, transactions: data });
	};

	render() {
		const { transactions, loading, meta } = this.state;
		const { match } = this.props;
		return (
			<>
				<div className="element-actions">
					<Link
						to={`${match.path}/transactions/pending`}
						className="btn btn-primary btn-sm btn-outline-primary">
						Pending Transactions
					</Link>
					<Link
						to={`${match.path}/transactions/all`}
						className="btn btn-primary btn-sm ml-2">
						All transactions
					</Link>
				</div>
				<h6 className="element-header">Transactions</h6>
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Date</th>
											<th>Hmo name</th>
											<th>Patient name</th>
											<th>Description</th>
											<th>Amount(&#x20A6;)</th>
											<th>Hmo Transaction Code</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<HmoTable
										hmoTransactions={transactions}
										updateTransaction={this.updateTransaction}
									/>
								</table>
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
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default connect(null, {
	startBlock,
	stopBlock,
})(PendingTransactions);
