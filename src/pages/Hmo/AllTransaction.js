/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { hmoAPI, transactionsAPI, searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';

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

const getOptionValuesHMO = option => option.id;
const getOptionLabelsHMO = option => `${option.other_names} ${option.surname}`;
const getOptionsHMO = async q => {
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
				`${hmoAPI}/${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=${patient_id}&status=${status}&page=1&limit=10&hmo_id=${hmo_id}`,
				'GET',
				true
			);

			this.props.loadHmoTransaction(rs);
			// console.log(rs);
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
		const { filtering, loading } = this.state;
		const { hmoTransactions } = this.props;
		// const hmoReversed = hmoTransactions.reverse();

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
							<label>Hmo</label>

							<AsyncSelect
								isClearable
								getOptionValue={getOptionValuesHMO}
								getOptionLabel={getOptionLabelsHMO}
								defaultOptions
								name="hmo"
								ref={this.hmo}
								loadOptions={getOptionsHMO}
								onChange={e => {
									this.patientSet(e, 'hmo');
								}}
								placeholder="Search for hmo name"
							/>
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
