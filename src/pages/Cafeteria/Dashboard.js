/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { searchAPI, cafeteriaAPI, paginate } from '../../services/constants';
import {
	request,
	formatCurrency,
	itemRender,
	updateImmutable,
	patientname,
} from '../../services/utilities';
import CafeteriaTransaction from '../../components/CafeteriaTransaction';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Dashboard = () => {
	const [customer, setCustomer] = useState('');
	const [special, setSpecial] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [cafeteriaItems, setCafeteriaItems] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState('');

	const [submitting, setSubmitting] = useState(false);
	const [cart, setCart] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [meta, setMeta] = useState({ ...paginate });

	const dispatch = useDispatch();

	const clearCart = () => {};

	const clearAll = () => {
		setCart([]);
		setSelectedCustomer('');
		setCustomer('');
	};

	const fetchInventories = useCallback(async page => {
		try {
			const p = page || 1;
			const url = `${cafeteriaAPI}/items?page=${p}&limit=20&approved=1`;
			const rs = await request(url, 'GET', true);
			const { result, ...info } = rs;
			setCafeteriaItems(result);
			setMeta(info);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const updateCafeteria = data => {
		for (let i = 0; i < data.transaction_details.length; i++) {
			const item = data.transaction_details[i];

			const cafeteriaItem = cafeteriaItems.find(c => c.id === item.id);
			if (cafeteriaItem) {
				const product = updateImmutable(cafeteriaItems, {
					id: item.id,
					quantity: cafeteriaItem.quantity - item.qty,
				});

				setCafeteriaItems(product);
			}
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchInventories();
			setLoaded(true);
		}
	}, [fetchInventories, loaded]);

	const changeCustomer = e => {
		setCustomer(e.target.value);
	};

	const addToCart = product => {
		const item = cart.find(el => el.id === product.id);
		if (!item) {
			setCart([...cart, { ...product, qty: 1, amount: product.price }]);
		} else {
			const qty = item.qty === '' ? 1 : item.qty + 1;
			updateCart(qty, item.id, product.price * qty);
		}
	};

	const patientSet = pat => {
		setSelectedCustomer(pat);
		let name;
		if (customer === 'patient') {
			name = patientname(pat);
		} else {
			name = `${pat?.first_name ? pat?.first_name : ''} ${
				pat?.last_name ? pat?.last_name : ''
			}`;
		}

		setSpecial(name);
	};

	const saveSale = async summary => {
		try {
			const data = {
				user_type: customer ? customer : 'walk-in',
				user_id: selectedCustomer ? selectedCustomer.id : '',
				sub_total: summary.subTotal,
				vat: summary.vat,
				total_amount: summary.total,
				amount_paid: summary.amountPaid,
				payment_method: summary.type,
				items: cart,
				change: summary.change,
			};

			dispatch(startBlock());
			setSubmitting(true);
			const rs = await request('cafeteria/sale', 'POST', true, data);
			setSubmitting(false);
			dispatch(stopBlock());
			return rs;
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			setSubmitting(false);
			throw e;
		}
	};

	const setHandleChange = event => {
		const text = event.target.value;
		setSearchTerm(text);

		const results = cafeteriaItems.filter(data =>
			data.item.toLowerCase().includes(text.toLowerCase())
		);

		setCafeteriaItems(results);
	};

	const onNavigatePage = pageNumber => {
		fetchInventories(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const getOptionValuesStaff = option => option.id;
	const getOptionLabelsStaff = option =>
		`${option.first_name} ${option.last_name}`;

	const getOptionsStaff = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const updateCart = (qty, id, amount) => {
		const product = updateImmutable(cart, { id, qty, amount });
		setCart(product);
	};

	return (
		<div className="element-box-tp">
			<div className="row">
				<div className="col-lg-7">
					<div className="padded-lg">
						<div className="projects-list">
							<div className="element-wrapper">
								<div className="inline-profile-tiles">
									<div className="row">
										<div className="input-group mb-3">
											<input
												type="text"
												onChange={setHandleChange}
												value={searchTerm}
												className="form-control"
												placeholder="search"
												aria-label="Recipient's username"
												aria-describedby="basic-addon2"
											/>
										</div>
									</div>
									<div className="row">
										{cafeteriaItems.map((item, i) => (
											<div
												key={i}
												onClick={() => addToCart(item)}
												className="col-4 col-sm-4">
												<div className="profile-tile profile-tile-inlined">
													<a className="profile-tile-box">
														<div>{item.name}</div>
														<div className="pt-avatar-w d-block">
															{formatCurrency(item.price)}
														</div>
														<div className="d-block">
															{`${item.quantity} items`}
														</div>
													</a>
												</div>
											</div>
										))}
									</div>
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} items`}
											itemRender={itemRender}
											onChange={onNavigatePage}
											showSizeChanger={false}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-5 b-l-lg">
					<div className="padded-lg">
						<div className="element-wrapper">
							<div className="content-panel compact py-0 mt-2 bg-white">
								<div className="element-wrapper">
									<h6 className="element-header">Payment Calculator</h6>
									<div className="element-box-tp">
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<select
														className="form-control"
														name="customer"
														onChange={changeCustomer}
														value={customer}>
														<option value="">Choose Customer ...</option>
														<option value="staff">Staff</option>
														<option value="patient">Patient</option>
														<option value="walk-in">Walk-in</option>
													</select>
												</div>
											</div>
										</div>

										<div>
											{['', 'walk-in'].includes(customer) ? null : (
												<form>
													<div className="row">
														<div className="col-sm-12">
															<div
																className="form-group"
																hidden={customer !== 'staff'}>
																<label>Staff</label>

																<AsyncSelect
																	isClearable
																	getOptionValue={getOptionValuesStaff}
																	getOptionLabel={getOptionLabelsStaff}
																	defaultOptions
																	name="staff"
																	value={selectedCustomer}
																	loadOptions={getOptionsStaff}
																	onChange={e => patientSet(e)}
																	placeholder="Search staff"
																/>
															</div>

															<div
																className="form-group"
																hidden={customer !== 'patient'}>
																<label>Patient</label>

																<AsyncSelect
																	isClearable
																	getOptionValue={getOptionValues}
																	getOptionLabel={getOptionLabels}
																	defaultOptions
																	name="patient"
																	value={selectedCustomer}
																	loadOptions={getOptions}
																	onChange={e => patientSet(e)}
																	placeholder="Search patients"
																/>
															</div>
														</div>
													</div>
												</form>
											)}
										</div>
									</div>
								</div>
								<div className="element-wrapper compact">
									<div className="element-box-tp">
										<table className="table table-compact smaller text-faded mb-0">
											<thead>
												<tr>
													<th>Item</th>
													<th>Qty</th>
													<th className="text-center">Price(&#x20A6;)</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{cart.map((item, i) => {
													return (
														<tr key={i}>
															<td className="text-center">
																<span>{item.name}</span>
															</td>
															<td className="text-center">
																<input
																	type="number"
																	className="form-control no-arrows"
																	value={item.qty}
																	min="1"
																	onChange={e => {
																		if (e.target.value !== '') {
																			const qty = parseInt(e.target.value);
																			updateCart(
																				parseInt(qty, 10),
																				item.id,
																				item.price * qty
																			);
																		} else {
																			updateCart('', item.id, 0);
																		}
																	}}
																	style={{ width: '80px', height: '25px' }}
																/>
															</td>
															<td className="text-center">{item.amount}</td>
															<td className="text-center">
																<a
																	style={{
																		fontWeight: 'bold',
																		fontSize: '18px',
																	}}
																	onClick={() => {
																		const newVal = cart.filter(
																			val => val.id !== item.id
																		);
																		setCart(newVal);
																	}}>
																	<i className="os-icon os-icon-x-circle"></i>
																</a>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<CafeteriaTransaction
								cart={cart}
								clearCart={clearCart}
								clearAll={clearAll}
								customer={customer}
								selectedCustomer={selectedCustomer}
								special={special}
								saveSale={saveSale}
								submitting={submitting}
								updateCafeteria={updateCafeteria}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
