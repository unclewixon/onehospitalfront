/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { hmoAPI, transactionsAPI, socket } from '../../services/constants';
import { notifyError, notifyInfo } from '../../services/notify';
import { request } from '../../services/utilities';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';

export class Dashboard extends Component {
	state = {
		filtering: false,
		dataLoaded: false,
		loading: false,
		id: null,

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

			this.props.loadHmoTransaction(rs);
			console.log(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching today hmos transactions request');
			this.setState({ loading: false });
		}
	};

	render() {
		const { loading } = this.state;
		const { hmoTransactions } = this.props;
		return (
			<>
				<h6 className="element-header py-2 px-2">
					Today's Transactions ({moment().format('YYYY-MM-DD')})
				</h6>
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th className="text-center">Date</th>
								<th className="text-center">Hmo name</th>
								<th className="text-center">Patient name</th>
								<th className="text-center">Description</th>
								<th className="text-center">Amount(&#x20A6;)</th>
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
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		hmoTransactions: state.hmo.hmo_transactions,
	};
};
export default connect(mapStateToProps, { loadHmoTransaction })(Dashboard);
