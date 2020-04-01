/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { API_URI, socket, staffAPI } from '../../services/constants';
import { request, formatNumber } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import { loadStaff } from '../../actions/hr';
import { loadPatients } from '../../actions/patient';
import { getAllCafeteriaItem } from '../../actions/inventory';
import _ from 'lodash';
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
	const [deleting, setDeleting] = useState(false);

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

	const filterCustomer = (arr, id) => {
		setSelectedCustomer(arr.find(el => el.id === id));
	};

	const specialChange = e => {
		const { value } = e.target;
		if (value !== '') {
			customer === 'patient'
				? filterCustomer(patients, value)
				: filterCustomer(staffs, value);
		}
	};

	const handleChange = e => {
		let { name, value } = e.target;
		if (name === 'item') {
			value = items.find(el => el.id === value);
			console.log(value);
		}

		setItem({ ...item, [name]: value });
	};
	const addItem = e => {
		e.preventDefault();

		console.log('i got here', item);
		if (!_.isEmpty(item.item) && item.quantity > 0) {
			if (_.isEmpty(order.find(el => el.item.id === item.item.id))) {
				setOrder([...order, item]);
			}
		}
	};

	// const deleteItem = id => {
	// 	let newOrder = order.filter(el => el.item.id !== id);
	// 	console.log(newOrder);
	// 	setOrder(prevOrder => newOrder);
	// 	console.log(order);
	// };
	async function getPatients() {
		try {
			const rs = await request(`${API_URI}/patient/list`, 'GET', true);

			props.loadPatients(rs);
			// const res = rs.map(patient => ({
			// 	value: patient.id,
			// 	label: patient.surname + ', ' + patient.other_names,
			// }));
			// setPatients(res);
			setPatients(rs);
		} catch (e) {
			console.log(e);
		}
	}

	const fetchStaffs = async () => {
		try {
			const rs = await request(`${API_URI}${staffAPI}`, 'GET', true);
			props.loadStaff(rs);
			setStaffs(rs);
			console.log(rs);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchCafeteriaItem = async () => {
		try {
			const rs = await request(`${API_URI}/cafeteria/items/`, 'GET', true);

			setItems(rs);
			console.log(rs);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {}, [order]);
	//get all patients
	useEffect(() => {
		getPatients();
	}, []);
	//get all staffs
	useEffect(() => {
		fetchStaffs();
	}, []);

	useEffect(() => {
		// if (!loaded) {
		// 	props
		// 		.getAllCafeteriaItem()
		// 		.then(response => {
		// 			setDataLoaded(true);
		// 		})
		// 		.catch(e => {
		// 			setDataLoaded(true);
		// 			notifyError(e.message || 'could not fetch cafeteria items');
		// 		});
		// }
		// setLoaded(true);
		// setItems(props.cafeteriaItems);
		// console.log(props.cafeteriaItems);
		fetchCafeteriaItem();
	}, [loaded]);
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
														<div className="trending trending-up-basic">
															<span>12%</span>
															<i className="os-icon os-icon-arrow-up2"></i>
														</div>
													</a>
												</div>
												<div className="col-sm-4 col-xxxl-3">
													<a className="element-box el-tablo" href="#">
														<div className="label">Gross Profit</div>
														<div className="value">$457</div>
													</a>
												</div>
												<div className="col-sm-4 col-xxxl-3">
													<a className="element-box el-tablo" href="#">
														<div className="label">New Customers</div>
														<div className="value">125</div>
														<div className="trending trending-down-basic">
															<span>9%</span>
															<i className="os-icon os-icon-arrow-down"></i>
														</div>
													</a>
												</div>
												<div className="d-none d-xxxl-block col-xxxl-3">
													<a className="element-box el-tablo" href="#">
														<div className="label">Refunds Processed</div>
														<div className="value">$294</div>
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
													<form>
														<div className="row">
															<div className="col-sm-12">
																<select
																	className="form-control rounded"
																	onChange={specialChange}>
																	<option>
																		Select{' '}
																		{customer === 'staff' ? 'Staff' : 'Patient'}
																	</option>
																	{special.map(spe => {
																		return (
																			<option key={spe.id} value={spe.id}>
																				{spe.surname
																					? spe.surname
																					: spe.last_name}
																				,
																				{spe.other_names
																					? spe.other_names
																					: spe.first_name}
																			</option>
																		);
																	})}
																</select>
															</div>
														</div>
														<h6 className="element-header"></h6>
													</form>
												)}
												<form onSubmit={addItem}>
													<div className="row">
														<div className="col-sm-6">
															<select
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
															</select>
														</div>
														<div className="col-sm-5">
															<input
																className="form-control h-100 form-control-sm rounded bright"
																placeholder="Quantity"
																name="quantity"
																type="number"
																min="1"
																required
																onChange={handleChange}
															/>
														</div>

														<button
															className="btn btn-primary btn-sm"
															type="submit">
															<i className="os-icon os-icon-ui-22"></i>
														</button>
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
										<div className="element-actions">
											<form className="form-inline justify-content-sm-end">
												<select className="form-control form-control-sm rounded">
													<option value="Pending">Today</option>
													<option value="Active">Last Week</option>
													<option value="Cancelled">Last 30 Days</option>
												</select>
											</form>
										</div>
										<h6 className="element-header">Sales Calculator</h6>
										<CafeteriaCustomerDetail customer={selectedCustomer} />
										<CafeteriaTransactionTable orders={order} />
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
