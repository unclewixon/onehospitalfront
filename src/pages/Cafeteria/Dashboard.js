/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import size from 'lodash.size';
import isEmpty from 'lodash.isempty';

import { staffAPI, searchAPI } from '../../services/constants';
import { request, formatCurrency } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import searchingGIF from '../../assets/images/searching.gif';

const allItems = [
	{
		id: 1,
		item: 'Rice',
		quantity: 1,
		price: 110,
	},
	{
		id: 2,
		item: 'Chicken',
		quantity: 1,
		price: 80,
	},
	{
		id: 3,
		item: 'Water (25cl)',
		quantity: 1,
		price: 120,
	},
	{
		id: 4,
		item: 'Beans',
		quantity: 1,
		price: 260,
	},
	{
		id: 5,
		item: 'Egusi Soup',
		quantity: 1,
		price: 160,
	},
	{
		id: 6,
		item: 'Bitter Leaf',
		quantity: 1,
		price: 90,
	},
];

const CafeteriaDashboard = () => {
	const [patients, setPatients] = useState([]);
	const [customer, setCustomer] = useState('');
	// const [activePage, togglePage] = useState('Dashboard');
	const [special, setSpecial] = useState('');
	const [loaded, setLoaded] = useState(false);
	// const [dataLoaded, setDataLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [cafeteriaItems, setCafeteriaItems] = useState([]);
	const [staffs, setStaffs] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState({});
	const [order, setOrder] = useState([]);
	const [item, setItem] = useState({
		quantity: 1,
		item: {},
	});

	const [query, setQuery] = useState('');
	const [searching, setSearching] = useState(false);
	const [itemSearching, setItemSearching] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [cart, setCart] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (!loaded) {
			setCafeteriaItems(allItems);
			setSearchResults(allItems);
			setLoaded(true);
		}
	}, [loaded]);

	const changeCustomer = e => {
		setCustomer(e.target.value);
	};

	const handleCustomerChange = e => {
		setQuery(e.target.value);
		if (e.target.name === 'item') {
			searchItem();
			return;
		}
		// searchCustomer();
	};

	// const handleChange = e => {
	// 	let { name, value } = e.target;
	// 	if (name === 'item') {
	// 	}

	// 	setItem({ ...item, [name]: value });
	// };

	const itemSet = product => {
		// value = items.find(el => el.q_id === product);
		setItem({ ...item, item: product });
		setItems([]);

		document.getElementById('product').value = product.q_name;
	};

	const searchCustomer = async e => {
		e.preventDefault();
		if (size(query) > 2) {
			if (customer === 'patient') {
				try {
					setSearching(true);
					const rs = await request(`${searchAPI}?q=${query}`, 'GET', true);
					setPatients(rs);
					setSearching(false);
				} catch (e) {
					notifyError('Error Occurred');
					setSearching(false);
				}
			} else if (customer === 'staff') {
				try {
					setSearching(true);
					const rs = await request(`${staffAPI}/find?q=${query}`, 'GET', true);
					setStaffs(rs);
					setSearching(false);
				} catch (e) {
					notifyError('Error Occurred');
					setSearching(false);
				}
			}
		} else {
			setPatients([]);
			setStaffs([]);
			setSelectedCustomer({});
		}
	};

	const searchItem = async () => {
		if (size(query) >= 2) {
			try {
				setItemSearching(true);
				const rs = await request(`cafeteria/items/?q=${query}`, 'GET', true);
				setItems(rs);
				setItemSearching(false);
			} catch (e) {
				notifyError('Error Occurred');
				setItemSearching(false);
			}
		}
	};
	const addItem = e => {
		e.preventDefault();
		console.log(item);

		if (!isEmpty(item.item) && item.quantity > 0) {
			if (isEmpty(order.find(el => el.item.q_id === item.item.q_id))) {
				setOrder([...order, item]);
			}
		}

		setItem({
			quantity: 1,
			item: {},
		});
		document.getElementById('item').reset();
	};

	const deleteItem = id => {
		let newOrder = order.filter(el => el.item.q_id !== id);

		setOrder(newOrder);
	};

	const patientSet = pat => {
		setSelectedCustomer(pat);
		setPatients([]);
		setStaffs([]);
		let name;
		if (customer === 'patient') {
			name = `${pat.surname ? pat.surname : ''} ${
				pat.other_names ? pat.other_names : ''
			}`;
		} else {
			name = `${pat.first_name ? pat.first_name : ''} ${
				pat.last_name ? pat.last_name : ''
			}`;
		}
		document.getElementById('cust').value = name;
		setSpecial(name);
	};

	const saveSale = async summary => {
		let data = {
			user_type: customer ? customer : 'walk-in',
			user_id: selectedCustomer ? selectedCustomer.id : '',
			amount: summary.subTotal,
			amount_paid: summary.amount,
			balance: +summary.subTotal - +summary.amount,
			payment_type: summary.type,
			items: order.map(el => {
				return {
					item_id: el.item.q_id,
					amount: +el.quantity * (el.item.q_price - el.item.q_discount_price),
				};
			}),
		};

		console.log(data);

		try {
			setSubmitting(true);
			await request(`cafeteria/sales`, 'POST', true, data);
			notifySuccess('Transaction successful');
			setSubmitting(false);
		} catch (e) {
			console.log(e);

			notifyError('Transaction not successful');
			setSubmitting(false);
		}

		setPatients([]);
		setStaffs([]);
		setSelectedCustomer({});
		setOrder([]);
		setQuery('');
	};
	const setHandleChange = event => {
		const text = event.target.value;
		setSearchTerm(text);

		const results = cafeteriaItems.filter(data =>
			data.item.toLowerCase().includes(text.toLowerCase())
		);

		setSearchResults(results);
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
											<div className="input-group-append">
												<span className="input-group-text" id="basic-addon2">
													filter
												</span>
											</div>
										</div>
									</div>
									<div className="row">
										{searchResults.map((item, i) => (
											<div
												key={i}
												onClick={() => setCart([...cart, item])}
												className="col-4 col-sm-4">
												<div className="profile-tile profile-tile-inlined">
													<a className="profile-tile-box">
														<div>{item.item}</div>
														<div className="pt-avatar-w">
															{formatCurrency(item.price)}
														</div>
													</a>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-5 b-l-lg">
					<div className="padded-lg">
						<div className="element-wrapper">
							<div
								className="content-panel compact"
								style={{ backgroundColor: '#fff' }}>
								<div className="content-panel-close">
									<i className="os-icon os-icon-close"></i>
								</div>
								<div className="element-wrapper">
									<div className="element-actions actions-only"></div>

									<h6 className="element-header">Quick Conversion</h6>
									<div className="element-box-tp">
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<select
														className="form-control"
														name="customer"
														onChange={changeCustomer}
														required>
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
												<form onSubmit={searchCustomer}>
													<div className="row">
														<div className="col-sm-12">
															{searching && (
																<div className="searching text-center">
																	<img alt="searching" src={searchingGIF} />
																</div>
															)}
															<input
																className="form-control"
																style={{ marginBottom: '20px' }}
																id="cust"
																onChange={handleCustomerChange}
																autoComplete="off"
																placeholder={
																	customer === 'staff'
																		? ' Search Staff ...'
																		: 'Search Patient ...'
																}
																required
															/>
															{patients.map((pat, i) => {
																return (
																	<div
																		style={{ display: 'flex' }}
																		key={i}
																		className="element-box">
																		<a
																			onClick={() => patientSet(pat)}
																			className="ssg-item cursor">
																			<div
																				className="item-name"
																				dangerouslySetInnerHTML={{
																					__html: `${pat.surname} ${pat.other_names}`,
																				}}
																			/>
																		</a>
																	</div>
																);
															})}

															{staffs.map((pat, i) => {
																return (
																	<div
																		style={{ display: 'flex' }}
																		key={i}
																		className="element-box">
																		<a
																			onClick={() => patientSet(pat)}
																			className="ssg-item cursor">
																			<div
																				className="item-name"
																				dangerouslySetInnerHTML={{
																					__html: `${pat.first_name} ${pat.last_name}`,
																				}}
																			/>
																		</a>
																	</div>
																);
															})}
														</div>
													</div>
												</form>
											)}
											<form onSubmit={addItem} id="item">
												<div className="row">
													<div className="col-sm-12">
														{itemSearching && (
															<div className="searching text-center">
																<img alt="searching" src={searchingGIF} />
															</div>
														)}

														{items.map((item, i) => {
															return (
																<div
																	style={{ display: 'flex' }}
																	key={i}
																	className="element-box">
																	<a
																		onClick={() => itemSet(item)}
																		className="ssg-item cursor">
																		<div
																			className="item-name"
																			dangerouslySetInnerHTML={{
																				__html: `${item.q_name}`,
																			}}
																		/>
																	</a>
																</div>
															);
														})}
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="element-wrapper compact">
									<div className="element-actions actions-only"></div>

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
																<span>{item.item}</span>
															</td>
															<td className="text-center">{item.quantity}</td>
															<td className="text-center">{item.price}</td>
															<td className="text-center">
																<button
																	className="btn btn-primary btn-sm mx-3"
																	onClick={() => {
																		const newVal = cart.filter(
																			val => val.id !== item.id
																		);
																		setCart(newVal);
																	}}>
																	<i className="os-icon os-icon-x-circle"></i>
																</button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="element-wrapper compact"></div>
							</div>
							<CafeteriaTransactionTable
								cart={cart}
								customer={customer}
								special={special}
								orders={order}
								deleteItem={deleteItem}
								saveSale={saveSale}
								submitting={submitting}
							/>

							<CafeteriaCustomerDetail
								customer={selectedCustomer}
								orderBy={customer}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CafeteriaDashboard;
