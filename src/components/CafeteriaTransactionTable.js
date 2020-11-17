/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import CafeteriaRecipt from './CafeteriaRecipt';
import { paymentType } from '../services/constants';
// import waiting from '../assets/images/waiting.gif';
// import { CartesianAxis } from 'recharts';

const CafeteriaTransactionTable = props => {
	const [toggle, setToggle] = useState(false);
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	// const [subTotal, setSubTotal] = useState(0);
	const [amountPaid, setAmountPaid] = useState(0);
	// const [balance, setBalance] = useState(0);
	const [type, setType] = useState('');

	const onModalClick = () => {
		setToggle(!toggle);
	};
	const calSubTotal = () => {
		if (!props.cart.length) {
			return 0;
		} else {
			return props.cart.reduce(
				(total, order) => total + Number(order.sales_price),
				0
			);
		}
	};
	console.log(calSubTotal());
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
			console.log(props.cart);
			setOrders(props.orders);
			setLoaded(true);
		}
	}, [loaded, props.cart, props.orders]);

	return (
		<div className="content-panel compact" style={{ backgroundColor: '#fff' }}>
			<div className="element-box-tp">
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
								{calSubTotal()}
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
				{toggle ? (
					<CafeteriaRecipt
						toggle={toggle}
						onModalClick={onModalClick}
						cart={props.cart}
						type={type}
						customer={props.customer}
						special={props.special}
						calSubTotal={calSubTotal}
						amountPaid={amountPaid}
						calBalance={calBalance}
					/>
				) : null}
				<form onSubmit={handleSubmit} className="form-row">
					<div className="col-md-8">
						<select className="form-control" onChange={handleType} required>
							<option value="">Payment type...</option>
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

					<div className="col-md-2">
						<button className="btn btn-primary" onClick={onModalClick}>
							<span> save</span>
						</button>
					</div>
					{/* <div className="col-md-2">
						<button className="btn btn-primary btn-sm mx-3" type="submit">
							<i className="os-icon os-icon-ui-22"></i>
						</button>
					</div> */}
				</form>
			</div>
		</div>
	);
};

export default CafeteriaTransactionTable;
