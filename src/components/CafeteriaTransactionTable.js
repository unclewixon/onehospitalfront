/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';

// import waiting from '../assets/images/waiting.gif';
// import { CartesianAxis } from 'recharts';

const paymentType = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Transfer', label: 'Transfer' },
];

const CafeteriaTransactionTable = props => {
	// const [toggle, setToggle] = useState(false);
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	// const [subTotal, setSubTotal] = useState(0);
	const [amountPaid, setAmountPaid] = useState(0);
	// const [balance, setBalance] = useState(0);
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
		if (type && !isEmpty(orders)) {
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
		if (!loaded) {
			setOrders(props.orders);
			setLoaded(true);
		}
	}, [loaded, props.orders]);

	return (
		<div className="content-panel compact" style={{ backgroundColor: '#fff' }}>
			<div className="project-box">
				<div className="project-info">
					<div className="element-box-tp">
						<table className="table table-lightborder">
							<tbody>
								{orders &&
									orders.map((order, i) => {
										return (
											<tr key={i}>
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
						<form onSubmit={handleSubmit} className="form-row">
							<div className="col-md-8">
								<select className="form-control" onChange={handleType} required>
									<option value="">Choose Payment type ...</option>
									{paymentType &&
										paymentType.map((type, i) => {
											return (
												<option value={type.value} key={i}>
													{type.label}
												</option>
											);
										})}
								</select>
							</div>

							{/* <div className="col-md-2">
								<button
									className={
										props.submitting
											? 'btn btn-primary  disabled'
											: 'btn btn-primary '
									}
									onClick={e => handleSubmit(e)}>
									{props.submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> save</span>
									)}
								</button>
							</div> */}
							<div className="col-md-2">
								<div>
									<button
										onClick={() => {}}
										type="button"
										className="btn btn-primary">
										Save
									</button>

									<div
										className="modal fade"
										id="exampleModalCenter"
										tabIndex={-1}
										role="dialog"
										aria-labelledby="exampleModalCenterTitle"
										aria-hidden="true">
										<div
											className="modal-dialog modal-dialog-centered"
											role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5
														className="modal-title"
														id="exampleModalLongTitle">
														Orders
													</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close">
														<span aria-hidden="true">×</span>
													</button>
												</div>
												<div className="modal-body"></div>
												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-secondary"
														data-dismiss="modal">
														Close
													</button>
													<button type="button" className="btn btn-primary">
														Save changes
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-2">
								<button className="btn btn-primary btn-sm mx-3" type="submit">
									<i className="os-icon os-icon-ui-22"></i>
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
