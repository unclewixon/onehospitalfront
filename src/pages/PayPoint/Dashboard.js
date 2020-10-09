import React, { Component } from 'react';
import moment from 'moment';

import { request } from '../../services/utilities';
import { transactionsAPI } from '../../services/constants';
import PayPointTable from '../../components/PayPointTable';
import PayPointItem from '../../components/PayPointItem';

class PayPointPage extends Component {
	state = {
		payPoints: [],
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = async () => {
		try {
			let today = moment().format('YYYY-MM-DD');
			console.log(today);
			const rs = await request(`${transactionsAPI}/dashboard`, 'GET', true);
			this.setState({
				payPoints: [
					{
						type: 'Daily Total',
						id: 'daily-total',
						total: rs.dailyTotal.amount ? rs.dailyTotal.amount : 0,
					},
					{
						type: 'Total Unpaid',
						id: 'total-unpaid',
						total: rs.unpaidTotal.amount ? rs.unpaidTotal.amount : 0,
					},

					{
						type: 'Total Cash',
						id: 'total-cash',
						total: rs.totalCash.amount ? rs.totalCash.amount : 0,
					},
					{
						type: 'Total POS',
						id: 'total-pos',
						total: rs.totalPOS.amount ? rs.totalPOS.amount : 0,
					},
					{
						type: 'Total Cheque',
						id: 'total-cheque',
						total: rs.totalCheque.amount ? rs.totalCheque.amount : 0,
					},
					{
						type: 'Total Outstanding',
						id: 'total-outstanding',
						total: rs.totalOutstanding.amount ? rs.totalOutstanding.amount : 0,
					},
				],
			});
			console.log(rs);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { payPoints } = this.state;
		return (
			<>
				<div className="col-sm-12 col-xxl-12">
					<div className="element-content">
						<div className="row">
							{payPoints.map((payPoint, i) => {
								return <PayPointItem payPoint={payPoint} key={i} />;
							})}
						</div>
					</div>
				</div>
				<PayPointTable />
			</>
		);
	}
}

export default PayPointPage;
