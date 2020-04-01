import React, { useState, useEffect } from 'react';

const CafeteriaTransactionTable = props => {
	const [orders, setOrders] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [amountPaid, setAmountPaid] = useState(0);
	const [balance, setBalance] = useState(0);

	const calSubTotal = () => {
		return orders.reduce((total, order) => {
			return (
				total + (order.item.price - order.item.discount_price) * +order.quantity
			);
		}, 0);
	};

	useEffect(() => {
		setOrders(props.orders);
	}, [props]);
	return (
		<div className="element-box">
			<div className="project-box">
				<div className="project-info">
					<div className="element-box-tp">
						<table className="table table-lightborder">
							<thead>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th className="text-center">Price(&#x20A6;)</th>
									{/* <th>action</th> */}
								</tr>
							</thead>
							<tbody>
								{orders &&
									orders.map(order => {
										return (
											<tr key={order.item.id}>
												<td className="nowrap">{order.item.name}</td>

												<td className="text-center">{order.quantity}</td>
												<td className="text-right">
													{(order.item.price - order.item.discount_price) *
														+order.quantity}
												</td>
												{/* <td>
													<a className="pi-settings os-dropdown-trigger text-danger">
														<i
															className="os-icon os-icon-ui-15"
															onClick={() =>
																props.deleteItem(order.item.id)
															}></i>
													</a>
												</td> */}
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
										{calSubTotal() - amountPaid}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CafeteriaTransactionTable;
