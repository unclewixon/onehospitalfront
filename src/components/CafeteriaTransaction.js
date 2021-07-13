/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CafeteriaRecipt from './CafeteriaRecipt';
import { notifyError, notifySuccess } from '../services/notify';

const CafeteriaTransaction = ({
	clearAll,
	cart,
	clearCart,
	customer,
	selectedCustomer,
	saveSale,
	updateCafeteria,
}) => {
	const [toggle, setToggle] = useState(false);
	const [amountPaid, setAmountPaid] = useState(0);
	const [type, setType] = useState('');
	const [subTotal, setSubTotal] = useState(0);
	const [vat, setVat] = useState(0);
	const [total, setTotal] = useState(0);
	const [balance, setBalance] = useState(0);
	const [transaction, setTransaction] = useState(null);

	const paymentMethods = useSelector(state => state.utility.methods);

	useEffect(() => {
		if (!cart.length) {
			setSubTotal(0);
			setVat(0);
		} else {
			const cartTotal = cart.reduce(
				(total, order) => total + Number(order.amount),
				0
			);
			setSubTotal(cartTotal);

			const cartVat = parseFloat(((7.5 * cartTotal) / 100).toFixed(2));
			setVat(cartVat);

			setTotal(cartTotal + cartVat);
			setBalance(0);
		}
	}, [cart]);

	const onModalClick = transaction => {
		if (toggle) {
			console.log('----------clear all');
			clearAll();
		}
		setToggle(!toggle);
		setTransaction(transaction);
	};

	const handleAmountChange = e => {
		setAmountPaid(e.target.value);
		if (e.target.value !== '') {
			setBalance(total - parseFloat(e.target.value));
		} else {
			setBalance(0);
		}
	};

	const handleType = e => {
		setType(e.target.value);
	};

	const resetCounter = e => {
		e.preventDefault();
		console.log('resetCounter');
		clearCart();
		setAmountPaid(0);
		setTotal(0);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (cart.length > 0) {
			try {
				if (
					customer === '' ||
					(customer !== '' && customer !== 'walk-in' && selectedCustomer === '')
				) {
					notifyError('please select customer');
					return;
				}

				const checkEmpty = cart.find(c => c.qty === 0 || c.qty === '');
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
					subTotal,
					vat,
					total,
					amountPaid,
					balance,
				};

				const rs = await saveSale(summary);
				if (rs.success) {
					setAmountPaid(0);
					setTotal(0);
					updateCafeteria(rs.transaction);
					clearCart();
					onModalClick(rs.transaction);

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
		<div className="content-panel compact o-block py-0">
			<div className="element-box-tp">
				<table className="order">
					<tbody>
						<tr>
							<td className="sub-total">Subtotal:</td>
							<td className="sub-item">{subTotal}</td>
						</tr>
						<tr>
							<td className="sub-total">V.A.T</td>
							<td className="sub-item">{vat}</td>
						</tr>
						<tr>
							<td className="sub-total">Total:</td>
							<td className="sub-item">{total}</td>
						</tr>
						<tr>
							<td className="sub-total">
								Amt. Paid:
								<input
									className="form-control ml-2 p-0 amt-paid no-arrows"
									name="amount"
									type="number"
									min="0"
									value={amountPaid}
									onChange={handleAmountChange}
								/>
							</td>
							<td className="sub-item amount">{amountPaid}</td>
						</tr>
						<tr>
							<td className="sub-total">Balance</td>
							<td className="sub-item balance">{balance}</td>
						</tr>
					</tbody>
				</table>
				<form onSubmit={e => handleSubmit(e)}>
					<div className="row">
						<div className="col-md-12">
							<select className="form-control" onChange={handleType} required>
								<option value="">Payment method</option>
								{paymentMethods.map((type, i) => {
									return (
										<option value={type.name} key={i}>
											{type.name}
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
								disabled={type === ''}
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
			{toggle && transaction && (
				<CafeteriaRecipt
					toggle={toggle}
					onModalClick={onModalClick}
					transaction={transaction}
					type={type}
					customer={customer}
				/>
			)}
		</div>
	);
};

export default CafeteriaTransaction;
