/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Tooltip from 'antd/lib/tooltip';

import {
	API_URI,
	hmoAPI,
	transactionsAPI,
	searchAPI,
} from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import ClinicalLabItem from '../../components/ClinicalLabItem';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';

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
		searchHmo: false,
		hmos: [],
		query: '',
		patient_id: '',
		patients: [],
		hmoQuery: '',
		hmo_id: '',
	};
	patient = React.createRef();
	hmo = React.createRef();

	componentDidMount() {
		this.fetchHmoTransaction();
	}

	fetchHmoTransaction = async () => {
		const { status, startDate, endDate, patient_id, hmo_id } = this.state;

		try {
			this.setState({ loading: true });
			const rs = await request(
				`${hmoAPI}${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=${patient_id}&status=${status}&page=1&limit=10&hmo_id=${hmo_id}`,
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
		console.log(this.state.patient_id);
		// if (this.state.query < 3) {
		// 	this.setState({ ...this.state, patient_id: '' });
		// 	console.log(this.state.patient_id);
		// }
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

	patientSet = (pat, type) => {
		console.log(pat);

		if (type === 'patient') {
			let name =
				(pat.surname ? pat.surname : '') +
				' ' +
				(pat.other_names ? pat.other_names : '');
			document.getElementById('patient').value = name;
			// setPatients([]);
			this.setState({ ...this.state, patient_id: pat.id, patients: [] });
		} else {
			document.getElementById('hmo').value = pat.name;
			this.setState({ ...this.state, hmo_id: pat.id, hmos: [] });
		}
	};

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
					patients: rs,
					searching: false,
					query: '',
				});
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({ ...this.state, searching: false });
			}
		}
	};

	searchHmo = async () => {
		if (this.state.hmoQuery.length > 2) {
			try {
				this.setState({ ...this.state, searchHmo: true });
				const rs = await request(
					`hmos?name=${this.state.hmoQuery}`,
					'GET',
					true
				);

				this.setState({
					...this.state,
					hmos: rs,
					searchHmo: false,
					hmoQuery: '',
				});
			} catch (e) {
				notifyError('Error searching hmo ');
				this.setState({ ...this.state, searchHmo: false });
			}
		}
	};
	handlePatientChange = e => {
		const { name, value } = e.target;

		if (name === 'patient') {
			if (this.patient.current.value.length < 4) {
				this.setState({ patients: [], patient_id: '' });
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
			this.searchHmo();
		} else {
			return;
		}
	};

	render() {
		const {
			filtering,
			loading,
			searching,
			hmos,
			patients,
			searchHmo,
			query,
		} = this.state;
		const { hmoTransactions } = this.props;
		const hmoReversed = hmoTransactions.reverse();
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Open Request</h6>

						<div className="col-md-12 px-0">
							<form className="row">
								<div className="form-group col-sm-2.5 pr-0">
									<label>Patient</label>

									<input
										className="form-control"
										placeholder="Search for patient name"
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

									{patients &&
										patients.map(pat => {
											return (
												<div
													style={{ display: 'flex' }}
													key={pat.id}
													className="element-box">
													<a
														onClick={() => this.patientSet(pat, 'patient')}
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
								<div className="form-group col-sm-3 pr-0">
									<label>Hmo</label>

									<input
										className="form-control"
										placeholder="Search for hmo name"
										type="text"
										name="hmo"
										defaultValue=""
										id="hmo"
										onChange={this.handlePatientChange}
										ref={this.hmo}
										autoComplete="off"
										required
										style={{ height: '32px' }}
									/>
									{searchHmo && (
										<div className="searching text-center">
											<img alt="searching" src={searchingGIF} />
										</div>
									)}

									{hmos &&
										hmos.map(pat => {
											return (
												<div
													style={{ display: 'flex' }}
													key={pat.id}
													className="element-box">
													<a
														onClick={() => this.patientSet(pat, 'hmo')}
														className="ssg-item cursor">
														<div
															className="item-name"
															dangerouslySetInnerHTML={{
																__html: `${pat.name}`,
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
								<div className="form-group col-md-2 pr-0">
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
								<div className="form-group col-md-1 pr-0 mt-4">
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
											<th className="text-center">Patient name</th>
											<th className="text-center">Description</th>
											<th className="text-center">Transaction Type</th>
											<th className="text-center">Amount(&#x20A6;)</th>
											<th className="text-center">Status</th>
											<th>
												<div className="th-inner "></div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<HmoTable
										loading={loading}
										hmoTransactions={hmoTransactions}
									/>
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
