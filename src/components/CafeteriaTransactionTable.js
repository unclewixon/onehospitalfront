import React, { useState, useEffect } from 'react';
import waiting from '../assets/images/waiting.gif';
import _ from 'lodash';
const paymentType = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Transfer', label: 'Transfer' },
];
const CafeteriaTransactionTable = props => {
	const [orders, setOrders] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [amountPaid, setAmountPaid] = useState(0);
	const [balance, setBalance] = useState(0);
	const [type, setType] = useState('');

	const calSubTotal = () => {
		return orders.reduce((total, order) => {
			return (
				total +
				(order.item.q_price - order.item.q_discount_price) * +order.quantity
			);
		}, 0);
	};

	const calBalance = () => {
		return calSubTotal() - amountPaid;
	};

	const handleAmountChange = e => {
		setAmountPaid(e.target.value);
	};

	const handleType = e => {
		setType(e.target.value);
	};
	const handleSubmit = async e => {
		e.preventDefault();
		if (type && !_.isEmpty(orders)) {
			let summary = {
				type,
				amount: amountPaid,
				subTotal: calSubTotal(),
			};
			await props.saveSale(summary);
			setAmountPaid(0);
		}
	};

	useEffect(() => {
		setOrders(props.orders);
	}, [props.orders]);
	return (
		<div className="element-box">
			<div className="project-box">
				<div className="project-info">
					<h6 className="element-header">Sales Calculator</h6>
					<div className="element-box-tp">
						<table className="table table-lightborder">
							<thead>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th className="text-center">Price(&#x20A6;)</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								{orders &&
									orders.map(order => {
										return (
											<tr key={order.item.q_id}>
												<td className="nowrap">{order.item.q_name}</td>

												<td className="text-center">{order.quantity}</td>
												<td className="text-right">
													{(order.item.q_price - order.item.q_discount_price) *
														+order.quantity}
												</td>
												<td className="text-right">
													<a className="pi-settings os-dropdown-trigger text-danger">
														<i
															className="os-icon os-icon-ui-15"
															onClick={() =>
																props.deleteItem(order.item.q_id)
															}></i>
													</a>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<table
							style={{
								marginLeft: 'auto',
								marginTop: ' 15px',
								borderTop: '3px solid #eee',
								paddingtop: '20px',
								marginBottom: '20px',
							}}>
							<tbody>
								<tr>
									<td
										style={{
											color: '#B8B8B8',
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Subtotal:
									</td>
									<td
										style={{
											color: '#111',
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{orders ? calSubTotal() : 0}
									</td>
								</tr>
								<tr>
									<td
										style={{
											color: '#B8B8B8',
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Amt. Paid:
										<input
											className="form-control ml-2 p-0"
											name="amount"
											type="number"
											style={{
												textAlign: 'right',
												MozAppearance: 'textfield',
												WebkitAappearance: 'none',
												width: '100px',
												display: 'inline-block',
											}}
											min="0"
											value={amountPaid}
											onChange={handleAmountChange}
										/>{' '}
									</td>
									<td
										style={{
											color: '#047bf8',
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{amountPaid}
									</td>
								</tr>

								<tr>
									<td
										style={{
											color: '#B8B8B8',
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Balance
									</td>
									<td
										style={{
											color: ' #45BB4C',
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{calBalance()}
									</td>
								</tr>
							</tbody>
						</table>
						<form onSubmit={handleSubmit}>
							<select className="form-control" onChange={handleType} required>
								<option value="">Choose Payment type ...</option>
								{paymentType &&
									paymentType.map(type => {
										return (
											<option value={type.value} key={type.value}>
												{type.label}
											</option>
										);
									})}
							</select>
							<div className="form-buttons-w text-right compact">
								<button
									className={
										props.submitting
											? 'btn btn-primary my-2 py-2 disabled'
											: 'btn btn-primary my-2 py-2'
									}>
									{props.submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> save</span>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CafeteriaTransactionTable;
