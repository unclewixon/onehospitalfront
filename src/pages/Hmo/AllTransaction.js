/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	API_URI,
	hmoAPI,
	transactionsAPI,
	searchAPI,
} from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request } from '../../services/utilities';
import ClinicalLabItem from '../../components/ClinicalLabItem';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';
import _ from 'lodash';
import { loadHmoTransaction } from '../../actions/hmo';
const { RangePicker } = DatePicker;

const status = [
	{ value: 0, label: 'Open' },
	{ value: 1, label: 'Closed' },
	{ value: 2, label: 'Approved' },
];

export class AllTransaction extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		searching: '',
		hmos: [],
		query: '',
		patient_id: '',
		patients: [],
	};

	componentDidMount() {
		this.fetchHmoTransaction();
	}

	fetchHmoTransaction = async () => {
		const { status, startDate, endDate, patient_id } = this.state;

		try {
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}${hmoAPI}${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=${patient_id}&status=${status}&page=1&limit=10`,
				'GET',
				true
			);

			this.props.loadHmoTransaction(rs);
			console.log(rs);
			this.setState({
				loading: false,
				filtering: false,
				startDate: '',
				endDate: '',
				patient_id: '',
			});
		} catch (error) {
			console.log(error);
			notifyError('Error fetching today hmos transactions request');
			this.setState({ loading: false, filtering: false, patient_id: '' });
		}
	};

	doFilter = e => {
		e.preventDefault();
		// this.setState({ filtering: true });
		this.setState({ ...this.state, filtering: true });
		this.fetchHmoTransaction();
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

	patientSet = pat => {
		console.log(pat);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		// setPatients([]);
		this.setState({ ...this.state, patient_id: pat.id, patients: [] });
	};

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ ...this.state, searching: true });
				const rs = await request(
					`${API_URI}${searchAPI}?q=${this.state.query}`,
					'GET',
					true
				);

				this.setState({
					...this.state,
					patients: rs,
					searching: false,
					query: '',
				});
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({ ...this.state, searching: true });
			}
		}
	};
	handlePatientChange = e => {
		this.setState({ ...this.state, query: e.target.value });
		this.searchPatient();
	};
	render() {
		const { filtering, loading, searching, hmos, patients } = this.state;
		const { hmoTransactions } = this.props;
		const hmoReversed = hmoTransactions.reverse();
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Open Request</h6>

						<div className="col-md-12 px-0">
							<form className="row">
								<div className="form-group col-sm-3">
									<label>Hmo</label>

									<input
										className="form-control"
										placeholder="Search for hmo name"
										type="text"
										name="patient"
										defaultValue=""
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

									{patients &&
										patients.map(pat => {
											return (
												<div
													style={{ display: 'flex' }}
													key={pat.id}
													className="element-box">
													<a
														onClick={() => this.patientSet(pat)}
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
								</div>
								<div className="form-group col-md-4">
									<label>From - To</label>
									<RangePicker
										onChange={e => this.dateChange(e)}
										defaultValue={[this.state.startDate, this.state.endDate]}
									/>
								</div>
								<div className="form-group col-md-3">
									<label className="mr-2 " htmlFor="id">
										Status
									</label>
									<select
										style={{ height: '32px' }}
										id="status"
										className="form-control"
										name="status"
										onChange={e => this.change(e)}>
										<option value="">Choose status</option>
										{status.map((status, i) => {
											return (
												<option key={i} value={status.value}>
													{status.label}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group col-md-2 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white"
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
							</form>
						</div>
						<div className="element-box">
							<div className="table table-responsive">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th className="text-center">Date</th>
											<th className="text-center">Hmo name</th>
											<th className="text-center">Transaction Type</th>
											<th className="text-center">Amount(&#x20A6;)</th>
											<th className="text-center">Status</th>
											<th>
												<div className="th-inner "></div>
												<div className="fht-cell"></div>
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
															{request.patient_name}
														</td>
														<td className="text-center">
															{request.transaction_type}
														</td>

														<td className="text-center">{request.amount}</td>
														<td className="text-center">
															{request.hmo_approval_status === 0 ? (
																<>
																	<span className="status-pill smaller yellow"></span>
																	<span>Pending</span>
																</>
															) : (
																<>
																	<span className="status-pill smaller green"></span>
																	<span>Approved</span>
																</>
															)}
														</td>
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
		hmoTransactions: state.hmo.hmo_transactions,
	};
};
export default connect(mapStateToProps, { loadHmoTransaction })(AllTransaction);
