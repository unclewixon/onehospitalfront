/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { hmoAPI, transactionsAPI, socket } from '../../services/constants';
import { notifyError, notifyInfo } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';

export class PendingTransactions extends Component {
	state = {
		filtering: false,
		dataLoaded: false,
		loading: false,
		id: null,
		meta: null,
		status: '',
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

	fetchHmoTransaction = async () => {
		const { status } = this.state;

		let startDate = moment()
			.subtract(1, 'd')
			.format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');

		try {
			this.setState({ loading: true });
			const rs = await request(
				`${hmoAPI}/${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=&status=${status}&page=1&limit=10`,
				'GET',
				true
			);

			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadHmoTransaction(arr);
			this.setState({ loading: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			notifyError('Error fetching today hmos transactions request');
			this.setState({ loading: false });
		}
	};

	render() {
		const { loading, meta } = this.state;
		const { hmoTransactions } = this.props;
		return (
			<>
				<h6 className="element-header">
					Today's Transactions ({moment().format('YYYY-MM-DD')})
				</h6>
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
								<tr>
									<th className="text-center">Date</th>
									<th className="text-center">Hmo name</th>
									<th className="text-center">Patient name</th>
									<th className="text-center">Description</th>
									<th className="text-center">Amount(&#x20A6;)</th>
									<th className="text-center">Hmo Transaction Code</th>
									<th className="text-center">Status</th>
									<th>
										<div className="th-inner "></div>
										<div className="fht-cell"></div>
									</th>
								</tr>
							</thead>
							<HmoTable loading={loading} hmoTransactions={hmoTransactions} />
						</table>
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
