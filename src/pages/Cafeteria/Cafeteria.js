/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	API_URI,
	socket,
	staffAPI,
	searchAPI,
	patientAPI,
} from '../../services/constants';
import { request } from '../../services/utilities';

import { notifySuccess, notifyError } from '../../services/notify';
import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import { loadStaff } from '../../actions/hr';
import { loadPatients } from '../../actions/patient';
import { getAllCafeteriaItem } from '../../actions/inventory';
import _ from 'lodash';
import size from 'lodash.size';

import searchingGIF from '../../assets/images/searching.gif';

const Cafeteria = props => {
	const [patients, setPatients] = useState([]);
	const [customer, setCustomer] = useState('');
	const [special, setSpecial] = useState([]);
	const [loaded, setLoaded] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
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

	const changeCustomer = e => {
		setCustomer(e.target.value);
		switch (e.target.value) {
			case 'patient':
				setSpecial(patients);
				return;
			case 'staff':
				setSpecial(staffs);
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

	const handleChange = e => {
		let { name, value } = e.target;
		if (name === 'item') {
		}

		setItem({ ...item, [name]: value });
	};

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
					const rs = await request(
						`${API_URI}${searchAPI}?q=${query}`,
						'GET',
						true
					);

					setPatients(rs);
					setSearching(false);
				} catch (e) {
					notifyError('Error Occurred');
					setSearching(false);
				}
			} else if (customer === 'staff') {
				try {
					setSearching(true);
					const rs = await request(
						`${API_URI}${staffAPI}/find?q=${query}`,
						'GET',
						true
					);
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
				const rs = await request(
					`${API_URI}/cafeteria/items/?q=${query}`,
					'GET',
					true
				);
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

		if (!_.isEmpty(item.item) && item.quantity > 0) {
			if (_.isEmpty(order.find(el => el.item.q_id === item.item.q_id))) {
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
			const rs = await request(
				`${API_URI}/cafeteria/sales`,
				'POST',
				true,
				data
			);
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

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<a className="btn btn-primary btn-sm" href="#">
							<i className="os-icon os-icon-ui-22"></i>
							<span>Add Account</span>
						</a>
						<a className="btn btn-success btn-sm" href="#">
							<i className="os-icon os-icon-grid-10"></i>
							<span>Make Payment</span>
						</a>
					</div>
					<h6 className="element-header">Cafeteria</h6>
					<div className="element-box-tp">
						<div className="row">
							<div className="col-lg-7">
								<div className="padded-lg">
									<div className="projects-list">
										<div className="element-wrapper">
											<div className="row">
												<div className="col-sm-4 col-xxxl-3">
													<a className="element-box el-tablo" href="#">
														<div className="label">Products Sold</div>
														<div className="value">57</div>
													</a>
												</div>
												<div className="col-sm-4 col-xxxl-3">
													<a className="element-box el-tablo">
														<div className="label">Gross Profit(&#x20A6;)</div>
														<div className="value">457</div>
													</a>
												</div>
												<div className="col-sm-4 col-xxxl-3">
													<a className="element-box el-tablo">
														<div className="label">New Customers</div>
														<div className="value">125</div>
													</a>
												</div>
												<div className="d-none d-xxxl-block col-xxxl-3">
													<a className="element-box el-tablo">
														<div className="label">
															Refunds Processed (&#x20A6;)
														</div>
														<div className="value">294</div>
													</a>
												</div>
											</div>
											<div className="element-box">
												<form>
													<h5 className="element-box-header">New Sale</h5>
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
												</form>
											</div>
											<div className="element-box">
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
																					{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
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
																					{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
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
														<h6 className="element-header"></h6>
													</form>
												)}
												<form onSubmit={addItem} id="item">
													<div className="row">
														<div className="col-sm-6">
															{/* <select
																className="form-control rounded"
																name="item"
																onChange={handleChange}
																required>
																<option value="">Choose item ...</option>
																{items &&
																	items.map(item => {
																		return (
																			<option value={item.id} key={item.id}>
																				{item.name}
																			</option>
																		);
																	})}
															</select> */}

															<input
																className="form-control"
																onChange={handleCustomerChange}
																name="item"
																id="product"
																placeholder="Search Cafeteria Item"
																type="text"
																autoComplete="off"
															/>
														</div>
														<div className="col-sm-5">
															<input
																className="form-control h-100 form-control-sm rounded bright"
																placeholder="Quantity"
																name="quantity"
																type="number"
																min="1"
																defaultValue={1}
																required
																onChange={handleChange}
															/>
														</div>

														<button
															className="btn btn-primary btn-sm"
															type="submit">
															<i className="os-icon os-icon-ui-22"></i>
														</button>
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
																				{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
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
								</div>
							</div>
							<div className="col-lg-5 b-l-lg">
								<div className="padded-lg">
									<div className="element-wrapper">
										{/* <div className="element-actions">
											<form className="form-inline justify-content-sm-end">
												<select className="form-control form-control-sm rounded">
													<option value="Pending">Today</option>
													<option value="Active">Last Week</option>
													<option value="Cancelled">Last 30 Days</option>
												</select>
											</form>
										</div> */}

										<CafeteriaCustomerDetail
											customer={selectedCustomer}
											orderBy={customer}
										/>
										<CafeteriaTransactionTable
											orders={order}
											deleteItem={deleteItem}
											saveSale={saveSale}
											submitting={submitting}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		staffs: state.hr.staffs,
		patients: state.patient.patients,
		cafeteriaItems: state.inventory.cafeteriaItems,
	};
};
export default connect(mapStateToProps, {
	loadStaff,
	loadPatients,
	getAllCafeteriaItem,
})(Cafeteria);
