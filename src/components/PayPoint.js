/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PayPointItem from './PayPointItem';
class PayPoint extends Component {
	state = {
		payPoints: [
			{
				type: 'Total Balance',
				total: '350',
				percent: 12,
			},
			{
				type: 'Credit Available',
				total: '17,800',
				percent: 0,
			},

			{
				type: 'Total Balance',
				total: '350',
				percent: 12,
			},
			{
				type: 'Credit Available',
				total: '17,800',
				percent: 0,
			},
			{
				type: 'Total Balance',
				total: '350',
				percent: 12,
			},
			{
				type: 'Credit Available',
				total: '17,800',
				percent: 0,
			},
		],
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
