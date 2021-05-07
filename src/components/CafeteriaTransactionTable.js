/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import CafeteriaRecipt from './CafeteriaRecipt';
import { paymentType } from '../services/constants';
import { notifyError, notifySuccess } from '../services/notify';

const CafeteriaTransactionTable = props => {
	const [toggle, setToggle] = useState(false);
	const [amountPaid, setAmountPaid] = useState(0);
	const [type, setType] = useState('');

	const onModalClick = () => {
		if (toggle) {
			console.log('----------clear all');
			props.clearAll();
		}
		setToggle(!toggle);
	};

	const calSubTotal = () => {
		if (!props.cart.length) {
			return 0;
		} else {
			return props.cart.reduce(
				(total, order) => total + Number(order.price),
				0
			);
		}
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

	const resetCounter = e => {
		e.preventDefault();
		console.log('resetCounter');
		props.clearCart();
		setAmountPaid(0);
		setType('');
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (props.cart.length > 0) {
			try {
				if (
					props.customer === '' ||
					(props.customer !== '' &&
						props.customer !== 'walk-in' &&
						props.selectedCustomer === '')
				) {
					notifyError('please select customer');
					return;
				}

				const checkEmpty = props.cart.find(c => c.qty === 0 || c.qty === '');
				if (checkEmpty) {
					notifyError('quantity is empty');
					return;
				}

				if (amountPaid === 0) {
					notifyError('input amount paid by customer');
					return;
				}

				const summary = {
					type,
					amount: amountPaid,
					subTotal: calSubTotal(),
				};
				const rs = await props.saveSale(summary);
				if (rs.success) {
					setAmountPaid(0);
					onModalClick();
					props.updateCafeteria(rs.transaction);
					props.clearCart();

					notifySuccess('Transaction successful');
				} else {
					notifyError(rs.message || 'Transaction failed');
				}
			} catch (e) {
				notifyError('payment failed, please try again');
			}
		} else {
			notifyError('please select an item');
		}
	};

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
				<form onSubmit={e => handleSubmit(e)}>
					<div className="row">
						<div className="col-md-12">
							<select className="form-control" onChange={handleType} required>
								<option value="">Payment type...</option>
								{paymentType.map((type, i) => {
									return (
										<option value={type.value} key={i}>
											{type.label}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-md-12 text-right">
							<input
								className="btn btn-primary"
								disabled={type === '' ? true : false}
								value="Process"
								type="submit"
							/>
							<button
								className="btn btn-warning ml-1"
								onClick={e => resetCounter(e)}>
								<span> Reset</span>
							</button>
						</div>
					</div>
				</form>
			</div>
			{toggle && (
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
			)}
		</div>
	);
};

export default CafeteriaTransactionTable;
