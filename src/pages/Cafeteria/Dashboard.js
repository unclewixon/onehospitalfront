/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import size from 'lodash.size';
import isEmpty from 'lodash.isempty';
import Pagination from 'antd/lib/pagination';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import {
	staffAPI,
	searchAPI,
	inventoryAPI,
	paginate,
} from '../../services/constants';
import { request, formatCurrency, itemRender } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import searchingGIF from '../../assets/images/searching.gif';

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
	// const [searchResults, setSearchResults] = useState([]);
	const [paging, setPaging] = useState({
		meta: paginate,
	});
	const categories = useSelector(state => state.inventory.categories);

	const clearCart = () => {
		setCart([]);
	};

	const fetchInventories = async page => {
		console.log('const fetchInventories = async page => {');
		console.log(categories);
		try {
			let roleQy = '';
			const category = categories.find(d => d.name === 'Cafeteria');
			roleQy = category ? `&q=${category.id}` : '';
			const p = page || 1;
			const url = `${inventoryAPI}?page=${p}&limit=20${roleQy}`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			const { result, ...meta } = rs;
			setCafeteriaItems(result);
			setPaging({ meta });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchInventories();
			// setCafeteriaItems(allItems);
			// setSearchResults(cafeteriaItems);
			setLoaded(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded, cafeteriaItems]);

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
			name = `${pat?.surname ? pat?.surname : ''} ${
				pat?.other_names ? pat?.other_names : ''
			}`;
		} else {
			name = `${pat?.first_name ? pat?.first_name : ''} ${
				pat?.last_name ? pat?.last_name : ''
			}`;
		}
		//document.getElementById('cust').value = name;
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

		//console.log(data);

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

		setCafeteriaItems(results);
	};

	const onNavigatePage = pageNumber => {
		fetchInventories(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
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
		if (!q || q.length < 3) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
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
											{/* <div className="input-group-append">
												<span className="input-group-text" id="basic-addon2">
													filter
												</span>
											</div> */}
										</div>
									</div>
									<div className="row">
										{cafeteriaItems.map((item, i) => (
											<div
												key={i}
												onClick={() => setCart([...cart, item])}
												className="col-4 col-sm-4">
												<div className="profile-tile profile-tile-inlined">
													<a className="profile-tile-box">
														<div>
															{item.quantity} {item.name}
														</div>
														<div className="pt-avatar-w">
															{formatCurrency(item.sales_price)}
														</div>
													</a>
												</div>
											</div>
										))}
									</div>
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(paging.meta.currentPage, 10)}
											pageSize={parseInt(paging.meta.itemsPerPage, 10)}
											total={parseInt(paging.meta.totalPages, 10)}
											showTotal={total => `Total ${total} stocks`}
											itemRender={itemRender}
											onChange={onNavigatePage}
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
							<div
								className="content-panel compact"
								style={{ backgroundColor: '#fff' }}>
								<div className="content-panel-close">
									<i className="os-icon os-icon-close"></i>
								</div>
								<div className="element-wrapper">
									<div className="element-actions actions-only"></div>

									<h6 className="element-header">Payment Calculator</h6>
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
																	loadOptions={getOptions}
																	onChange={e => patientSet(e)}
																	placeholder="Search patients"
																/>
															</div>
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
																<span>{item.name}</span>
															</td>
															<td className="text-center">{item.quantity}</td>
															<td className="text-center">
																{item.sales_price}
															</td>
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
								<div className="element-wrapper compact"></div>
							</div>
							<CafeteriaTransactionTable
								cart={cart}
								clearCart={clearCart}
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
