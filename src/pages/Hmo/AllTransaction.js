/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Pagination from 'antd/lib/pagination';
import { Link } from 'react-router-dom';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, itemRender } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import HmoTable from '../../components/HMO/HmoTable';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

const { RangePicker } = DatePicker;
const status = [
	{ value: 0, label: 'Open' },
	{ value: 1, label: 'Closed' },
	{ value: 2, label: 'Approved' },
];

const getOptionValues = option => option.id;
const getOptionLabels = option => `${option.other_names} ${option.surname}`;

const getOptions = async q => {
	if (!q || q.length < 1) {
		return [];
	}
	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

class AllTransaction extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		patient_id: '',
		hmo_id: '',
		hmos: [],
		transactions: [],
		meta: null,
	};

	patient = React.createRef();
	hmo = React.createRef();

	componentDidMount() {
		this.fetchHmos();
		this.fetchHmoTransaction();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.patient_id !== this.state.patient_id) {
			this.fetchHmoTransaction();
		}
	}

	fetchHmos = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request('hmos?limit=100', 'GET', true);
			const hmos = rs.result.map(hmo => {
				return {
					value: hmo.id,
					label: hmo.name,
				};
			});
			this.setState({ hmos });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching Hmos');
		}
	};

	fetchHmoTransaction = async page => {
		try {
			const { patient_id, startDate, endDate, status, hmo_id } = this.state;
			const p = page || 1;
			this.setState({ loading: true });
			const url = `hmos/transactions?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo_id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({
				loading: false,
				filtering: false,
				meta,
				transactions: arr,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch hmo transactions');
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchHmoTransaction(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		// this.setState({ filtering: true });
		this.setState({ ...this.state, filtering: true });
		console.log(this.state.patient_id);
		console.log(this.state.hmo_id);
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
		if (type === 'patient') {
			this.setState({ ...this.state, patient_id: pat?.id });
		} else {
			this.setState({ ...this.state, hmo_id: pat?.id });
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

	updateTransaction = data => {
		const i = this.state.meta;
		const meta = { ...i, total: (i.total = 1) };
		this.setState({ loading: false, meta, transactions: data });
	};

	render() {
		const { transactions, filtering, loading, hmos, meta } = this.state;
		const { match } = this.props;

		return (
			<>
				<div className="element-actions">
					<Link
						to={`${match.path}/transactions/pending`}
						className="btn btn-primary btn-sm">
						Pending Transactions
					</Link>
					<Link
						to={`${match.path}/transactions/all`}
						className="btn btn-primary btn-sm btn-outline-primary ml-2">
						All transactions
					</Link>
				</div>
				<h6 className="element-header">Transactions</h6>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-sm-3 pr-0">
							<label>Patient</label>
							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient"
								ref={this.patient}
								loadOptions={getOptions}
								onChange={e => {
									this.patientSet(e, 'patient');
								}}
								placeholder="Search for patient"
							/>
						</div>
						<div className="form-group col-sm-2 pr-0">
							<label>HMO</label>
							<select
								style={{ height: '32px' }}
								id="hmo_id"
								className="form-control"
								name="hmo_id"
								onChange={evt => this.change(evt)}>
								<option value="">Choose Hmo</option>
								{hmos.map((pat, i) => {
									return (
										<option key={i} value={pat.value}>
											{pat.label}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-3 pr-0">
							<label>Transaction Date</label>
							<RangePicker
								onChange={e => this.dateChange(e)}
								defaultValue={[this.state.startDate, this.state.endDate]}
							/>
						</div>
						<div className="form-group col-md-2 pr-0">
							<label>Status</label>
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
				<div className="element-box p-3 m-0">
					<div className="table table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Date</th>
											<th>Hmo name</th>
											<th>Patient name</th>
											<th>Description</th>
											<th>Amount(&#x20A6;)</th>
											<th>Hmo Transaction Code</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<HmoTable
										hmoTransactions={transactions}
										updateTransaction={this.updateTransaction}
									/>
								</table>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} transactions`}
											itemRender={itemRender}
											onChange={current => this.onNavigatePage(current)}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default connect(null, {
	startBlock,
	stopBlock,
})(AllTransaction);
