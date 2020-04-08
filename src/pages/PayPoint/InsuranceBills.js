import React, { Component } from 'react';
import waiting from '../../assets/images/waiting.gif';
import TransactionTable from '../../components/Tables/TransactionTable';
import { request } from '../../services/utilities';
import { API_URI, transactionsAPI } from '../../services/constants';
import moment from 'moment';
import { connect } from 'react-redux';
import { applyVoucher, approveTransaction } from '../../actions/general';
import { deleteTransaction, loadTransaction } from '../../actions/transaction';
import DatePicker from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;
const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];
export class InsuranceBills extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patients: [],
		hmos: [],
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchTransaction();
		this.getPatients();
		this.getHmos();
	}

	fetchTransaction = async () => {
		const { patient_id, startDate, endDate, status } = this.state;
		console.log(patient_id, startDate, endDate, status);
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}/hmos/transactions?patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}`,
				'GET',
				true
			);
			this.props.loadTransaction(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
		}
	};

	getPatients = async () => {
		const rs = await request(`${API_URI}/patient/list`, 'GET', true);
		const res = rs.map(patient => ({
			value: patient.id,
			label: patient.surname + ', ' + patient.other_names,
		}));

		this.setState({ patients: res });
	};

	getHmos = async () => {
		const rs = await request(`${API_URI}/hmos`, 'GET', true);
		const res = rs.map(hmo => ({
			value: hmo.id,
			label: hmo.name,
		}));
		this.setState({ hmos: res });
	};
	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchTransaction();
	};

	change = e => {
		//console.log(e.target.value)
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};
	render() {
		const { filtering, loading, patients, hmos } = this.state;
		const transactions = this.props.reviewTransaction;
		return (
			<>
				<div className="row">
					<div className="col-md-12">
						<h6 className="element-header">Filter by:</h6>

						<form className="row">
							<div className="form-group col-md-3">
								<label className="" htmlFor="patient_id">
									Patient
								</label>
								<select
									style={{ height: '32px' }}
									id="patient_id"
									className="form-control"
									name="patient_id"
									onChange={e => this.change(e)}>
									<option value="">Choose patient</option>
									{patients.map((pat, i) => {
										return (
											<option key={i} value={pat.value}>
												{pat.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-3">
								<label className="" htmlFor="patient_id">
									Hmo
								</label>
								<select
									style={{ height: '32px' }}
									id="hmo_id"
									className="form-control"
									name="hmo_id"
									onChange={e => this.change(e)}>
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
							<div className="form-group col-md-3">
								<label>From - To</label>
								<RangePicker onChange={e => this.dateChange(e)} />
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
									{paymentStatus.map((status, i) => {
										return (
											<option key={i} value={status.value}>
												{status.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-md-3 mt-4">
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

					<div className="col-sm-12">
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>DATE</th>
											<th className="">PATIENT NAME</th>
											<th className="">HMO</th>
											<th className="">SERVICE</th>
											<th className="">AMOUNT (&#x20A6;)</th>
											<th className="">PAYMENT TYPE</th>
											<th className="">ACTIONS</th>
										</tr>
									</thead>
									<TransactionTable
										transactions={transactions}
										loading={loading}
										today={false}
									/>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		reviewTransaction: state.transaction.reviewTransaction,
		//	hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	applyVoucher,
	approveTransaction,
	loadTransaction,
	deleteTransaction,
})(InsuranceBills);
