/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { hmoAPI, transactionsAPI, searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, itemRender } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';

const { RangePicker } = DatePicker;

const status = [
	{ value: 0, label: 'Open' },
	{ value: 1, label: 'Closed' },
	{ value: 2, label: 'Approved' },
];

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

export class AllTransaction extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		patient_id: '',
		hmo_id: 1,
		hmos: [],
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
			const rs = await request(`${hmoAPI}`, 'GET', true);
			const hmos = rs.map(hmo => {
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
		const { patient_id, startDate, endDate, status, hmo_id } = this.state;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`hmos/transactions?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo_id}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadHmoTransaction(arr);
			this.setState({ loading: false, filtering: false, meta });
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
		console.log(pat);

		if (type === 'patient') {
			let name =
				(pat?.surname ? pat?.surname : '') +
				' ' +
				(pat?.other_names ? pat?.other_names : '');
			// setPatients([]);
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

	render() {
		const { filtering, loading, hmos, meta } = this.state;
		const { hmoTransactions } = this.props;

		return (
			<div className="element-wrapper">
				<h6 className="element-header pt-3 pl-1">Open Request</h6>
				<form className="px-2">
					<div className="row">
						<div className="form-group col-sm-6 pr-0">
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
						<div className="form-group col-sm-6 pr-0">
							<label>
								HMO<span className="compulsory-field">*</span>
							</label>

							<select
								style={{ height: '35px' }}
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
					</div>
					<div className="row">
						<div className="form-group col-md-5 pr-0">
							<label>From - To</label>
							<RangePicker
								onChange={e => this.dateChange(e)}
								defaultValue={[this.state.startDate, this.state.endDate]}
							/>
						</div>
						<div className="form-group col-md-5 pr-0">
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
					</div>
				</form>

				<div className="element-box px-0">
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
									<th className="text-center">Amount(&#x20A6;)</th>
									<th className="text-center">Status</th>
									<th>
										<div className="th-inner "></div>
										<div className="fht-cell"></div>
									</th>
								</tr>
							</thead>
							<HmoTable loading={loading} hmoTransactions={hmoTransactions} />
						</table>
					</div>
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
export default connect(mapStateToProps, {
	loadHmoTransaction,
	startBlock,
	stopBlock,
})(AllTransaction);
