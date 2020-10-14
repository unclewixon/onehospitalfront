/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { staffAPI, searchAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import size from 'lodash.size';
import searchingGIF from '../../assets/images/searching.gif';
import isEmpty from 'lodash.isempty';
import { useEffect } from 'react';

const CafeteriaDashboard = () => {
	const [patients, setPatients] = useState([]);
	const [customer, setCustomer] = useState('');
	// const [activePage, togglePage] = useState('Dashboard');
	// const [special, setSpecial] = useState([]);
	// const [loaded, setLoaded] = useState(null);
	// const [dataLoaded, setDataLoaded] = useState(false);
	const [items, setItems] = useState([]);
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

	const teams = [
		{
			id: 1,
			title: 'Winter body',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 110,
			// img: Item1,
		},
		{
			id: 2,
			title: 'Adidas',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 80,
			// img: Item2,
		},
		{
			id: 3,
			title: 'Vans',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 120,
			// img: Item3,
		},
		{
			id: 4,
			title: 'White',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 260,
			// img: Item4,
		},
		{
			id: 5,
			title: 'Cropped-sho',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 160,
			// img: Item5,
		},
		{
			id: 6,
			title: 'Blues',
			desc:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
			price: 90,
			// img: Item6,
		},
	];

	useEffect(() => {
		const results = teams.filter(team =>
			team.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		console.log(results);
		setSearchResults(results);
	}, [searchTerm, teams]);

	const changeCustomer = e => {
		setCustomer(e.target.value);
		switch (e.target.value) {
			case 'patient':
				// setSpecial(patients);
				return;
			case 'staff':
				// setSpecial(staffs);
				return;
			default:
				setSelectedCustomer({});
				return;
		}
	};

	const handleCustomerChange = e => {
		setQuery(e.target.value);
		if (e.target.name === 'item') {
			searchItem();
			return;
		}
		searchCustomer();
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

	const searchCustomer = async () => {
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

	const deleteItem = async id => {
		let newOrder = order.filter(el => el.item.q_id !== id);

		await setOrder(newOrder);
	};

	const patientSet = pat => {
		setSelectedCustomer(pat);
		setPatients([]);
		setStaffs([]);
		let name;
		if (customer === 'patient') {
			name =
				(pat.surname ? pat.surname : '') +
				' ' +
				(pat.other_names ? pat.other_names : '');
		} else {
			name =
				(pat.first_name ? pat.first_name : '') +
				' ' +
				(pat.last_name ? pat.last_name : '');
		}

		document.getElementById('cust').value = name;
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
		setSearchTerm(event.target.value);
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
										{searchResults.map((team, index) => (
											<div
												key={index}
												onClick={() => setCart([...cart, team])}
												className="col-3 col-sm-3">
												<div className="profile-tile profile-tile-inlined">
													<a className="profile-tile-box">
														{team.desc}
														<div className="pt-avatar-w">{team.price}</div>
														<div className="pt-user-name">{team.title}</div>
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
										<form action="#">
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<select
															className="form-control"
															name="customer"
															onChange={changeCustomer}>
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
																/>

																{patients &&
																	patients.map(pat => {
																		return (
																			<div
																				style={{ display: 'flex' }}
																				key={pat.id}
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

																{staffs &&
																	staffs.map(pat => {
																		return (
																			<div
																				style={{ display: 'flex' }}
																				key={pat.id}
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

															{items &&
																items.map(item => {
																	return (
																		<div
																			style={{ display: 'flex' }}
																			key={item.q_id}
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
										</form>
									</div>
								</div>
								<div className="element-wrapper compact">
									<div className="element-actions actions-only"></div>

									<div className="element-box-tp">
										<table className="table table-compact smaller text-faded mb-0">
											<thead>
												<tr>
													<th>Item</th>
													<th>Quantity</th>
													<th className="text-center">Price(&#x20A6;)</th>
													<th>action</th>
												</tr>
											</thead>
											<tbody>
												{cart && cart.length
													? cart.map(item => {
															return (
																<tr>
																	<td>
																		<span></span>
																		<i className="os-icon os-icon-repeat icon-separator" />
																		<span>USD</span>
																	</td>
																	<td className="text-center">{item.title}</td>
																	<td className="text-right text-bright">
																		{item.price}
																	</td>
																	<td className="text-right text-danger">
																		<button
																			onClick={() => {
																				const newVal = cart.filter(
																					val => val.id !== item.id
																				);
																				setCart(newVal);
																			}}>
																			Clear
																		</button>
																	</td>
																</tr>
															);
													  })
													: null}
											</tbody>
										</table>
									</div>
								</div>
								<div className="element-wrapper compact"></div>
							</div>
							<CafeteriaTransactionTable
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
