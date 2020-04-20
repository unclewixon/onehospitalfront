/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PayPointItem from './PayPointItem';
import moment from 'moment';
import { request } from '../services/utilities';
import { API_URI, transactionsAPI } from '../services/constants';

class PayPoint extends Component {
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
			const rs = await request(
				`${API_URI}${transactionsAPI}/dashboard`,
				'GET',
				true
			);
			this.setState({
				payPoints: [
					{
						type: 'Daily Total',
						id: 'daily-total',
						total: rs.dailyTotal.amount ? rs.dailyTotal.amount : 0,
					},
					{
						type: 'total-unpaid',
						id: 'unpaidTotal',
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
			<div className="col-sm-12 col-xxl-12">
				<div className="element-content">
					<div className="row">
						{payPoints.map((payPoint, i) => {
							return <PayPointItem payPoint={payPoint} key={i} />;
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default PayPoint;
