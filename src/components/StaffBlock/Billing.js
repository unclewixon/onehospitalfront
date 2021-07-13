/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
// import DatePicker from 'antd/lib/date-picker';

import { transactionsAPI, searchAPI } from '../../services/constants';
import moment from 'moment';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadStaffTransaction } from '../../actions/hr';

// const { RangePicker } = DatePicker;

// const status = [
// 	{ value: 0, label: 'Open' },
// 	{ value: 1, label: 'Closed' },
// 	{ value: 2, label: 'Approved' },
// ];

export class Billing extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		searching: '',
		searchStaffBilling: false,
		hmos: [],
		query: '',
		paymentType: '',
		staffBilling: [],
		hmoQuery: '',
		hmo_id: '',
	};
	patient = React.createRef();
	hmo = React.createRef();

	componentDidMount() {
		this.fetchCafeteriaTransaction();
	}

	fetchCafeteriaTransaction = async () => {
		const { startDate, endDate } = this.state;
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${transactionsAPI}/list?staff_id=${this.props.staff.details.id}&startDate=${startDate}&endDate=${endDate}&status=&transaction_type=cafeteria&payment_type&page=2&limit=2`,
				'GET',
				true
			);

			this.props.loadStaffTransaction(rs);
			console.log(rs);
			this.setState({
				loading: false,
				filtering: false,
				startDate: '',
				endDate: '',
			});
		} catch (error) {
			console.log(error);
			notifyError('Error fetching today cafeteria transactions request');
			this.setState({ loading: false, filtering: false, patient_id: '' });
		}
	};

	doFilter = e => {
		e.preventDefault();
		// this.setState({ filtering: true });
		this.setState({ ...this.state, filtering: true });
		console.log(this.state.staff_id);
		// if (this.state.query < 3) {
		// 	this.setState({ ...this.state, patient_id: '' });
		// 	console.log(this.state.patient_id);
		// }
		this.fetchCafeteriaTransaction();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	// staffSet = (staff, type) => {
	// 	console.log(staff);

	// 	if (type === 'staff') {
	// 		let name =
	// 			(pat.surname ? pat.surname : '') +
	// 			' ' +
	// 			(pat.other_names ? pat.other_names : '');
	// 		document.getElementById('patient').value = name;
	// 		// setstaffBilling([]);
	// 		this.setState({ ...this.state, patient_id: pat.id, staffBilling: [] });
	// 	} else {
	// 		document.getElementById('hmo').value = pat.name;
	// 		this.setState({ ...this.state, hmo_id: pat.id, hmos: [] });
	// 	}
	// };

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ ...this.state, searching: true });
				const rs = await request(
					`${searchAPI}?q=${this.state.query}`,
					'GET',
					true
				);

				this.setState({
					...this.state,
					staffBilling: rs,
					searching: false,
					query: '',
				});
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({ ...this.state, searching: false });
			}
		}
	};

	// searchStaffBilling = async () => {
	// 	if (this.state.hmoQuery.length > 2) {
	// 		try {
	// 			this.setState({ ...this.state, searchStaffBilling: true });
	// 			const rs = await request(
	// 				`hmos?name=${this.state.hmoQuery}`,
	// 				'GET',
	// 				true
	// 			);

	// 			this.setState({
	// 				...this.state,
	// 				hmos: rs,
	// 				searchStaffBilling: false,
	// 				hmoQuery: '',
	// 			});
	// 		} catch (e) {
	// 			notifyError('Error searching hmo ');
	// 			this.setState({ ...this.state, searchStaffBilling: false });
	// 		}
	// 	}
	// };
	handleInputChange = e => {
		const { name, value } = e.target;

		if (name === 'patient') {
			if (this.patient.current.value.length < 4) {
				this.setState({ staffBilling: [], patient_id: '' });
				return;
			}
			this.setState({ ...this.state, query: value });
			this.searchPatient();
		} else if (name === 'hmo') {
			if (this.hmo.current.value.length < 4) {
				this.setState({ hmo_id: '', hmos: [] });
				return;
			}
			this.setState({ ...this.state, hmoQuery: value });
			this.searchStaffBilling();
		} else {
			return;
		}
	};

	render() {
		const {
			// 	filtering,
			loading,
			// 	searching,
			// 	hmos,
			// 	staffBilling,
			// 	searchStaffBilling,
			// 	query,
		} = this.state;
		const { hmoTransactions } = this.props;
		const hmoReversed = hmoTransactions.reverse();
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="col-md-12 px-0">
							{/* <form className="row">
								<div className="form-group col-sm-2.5 pr-0">
									<label>Name</label>

									<input
										className="form-control"
										placeholder="Search for name"
										type="text"
										name="patient"
										defaultValue=""
										ref={this.patient}
										id="patient"
										onChange={this.handlePatientChange}
										autoComplete="off"
										required
										style={{ height: '32px' }}
									/>
									{searching && (
										<div className="searching text-center">
											<img alt="searching" src={searchingGIF} />
										</div>
									)}

									{staffBilling &&
										staffBilling.map(pat => {
											return (
												<div
													style={{ display: 'flex' }}
													key={pat.id}
													className="element-box">
													<a
														// onClick={() => this.staffSet(pat, 'patient')}
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
								</div>
								<div className="form-group col-md-3 pr-0">
									<label>From - To</label>
									<RangePicker
										onChange={e => this.dateChange(e)}
										defaultValue={[this.state.startDate, this.state.endDate]}
									/>
								</div>
								<div className="form-group col-md-1 pr-0 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={this.doFilter}>
										<i className="os-icon os-icon-ui-37" />
										<span>
											{filtering ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Filter'
											)}
										</span>
									</div>
								</div>
							</form> */}
						</div>
						<div className="element-box">
							<div className="table table-responsive">
								<table className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th className="text-center">Date</th>
											<th className="text-center">Name</th>
											<th className="text-center">Payment Method</th>
											<th className="text-center">Amount(&#x20A6;)</th>
											<th className="text-center">Status</th>

											<th>
												<div></div>
											</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td className="text-center" colSpan="6">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											hmoReversed &&
											hmoReversed.map((request, i) => {
												return (
													<tr data-index="0" key={i}>
														<td className="text-center">
															{moment(request.createdAt).format('DD-MM-YYYY')}
														</td>
														<td className="text-center">
															{request.name ? request.name : 'No name'}
														</td>
														<td className="text-center">
															{request.payment_type}
														</td>
														<td className="text-center">{request.amount}</td>
														<td className="text-center">{request.status}</td>
														<td className="text-right row-actions">
															<Tooltip title="Approve status">
																<a className="secondary">
																	<i className="os-icon os-icon-edit-32" />
																</a>
															</Tooltip>
															<Tooltip title="Delete Request">
																<a className="danger">
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})
										)}
										{!loading && hmoTransactions.length < 1 ? (
											<tr>
												<td className="text-center" colSpan="6">
													No transaction
												</td>
											</tr>
										) : null}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		staff: state.user.staff,
		hmoTransactions: state.hmo.hmo_transactions,
	};
};
export default connect(mapStateToProps, { loadStaffTransaction })(Billing);
