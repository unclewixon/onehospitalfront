/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { socket } from '../../services/constants';
import { notifyError, notifyInfo } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

export class PendingTransactions extends Component {
	state = {
		filtering: false,
		dataLoaded: false,
		loading: false,
		id: null,
		meta: null,
		status: 0,
		patient_id: '',
		hmo_id: '',
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
			this.props.loadHmoTransaction(arr);
			this.setState({ loading: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			notifyError('Error fetching hmo transactions request');
			this.setState({ loading: false });
		}
	};

	updateTransaction = data => {
		this.props.loadHmoTransaction(data);
		const i = this.state.meta;
		const meta = { ...i, total: (i.total = 1) };
		this.setState({ loading: false, meta });
	};

	render() {
		const { loading, meta } = this.state;
		const { hmoTransactions } = this.props;
		return (
			<>
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
										hmoTransactions={hmoTransactions}
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

const mapStateToProps = state => {
	return {
		hmoTransactions: state.hmo.hmo_transactions,
	};
};
export default connect(mapStateToProps, {
	loadHmoTransaction,
	startBlock,
	stopBlock,
})(PendingTransactions);
