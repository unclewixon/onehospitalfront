/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URI, socket, transactionsAPI } from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request, formatNumber, confirmAction } from '../../services/utilities';

import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';

import { loadTransaction, deleteTransaction } from '../../actions/transaction';
import { applyVoucher, approveTransaction } from '../../actions/general';
import TransactionTable from '../../components/Tables/TransactionTable';

const { RangePicker } = DatePicker;
const departments = [
	{ id: 'ejejekek', name: 'angel' },
	{ id: 'sislkas', name: 'kafta' },
];

const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];
class ReviewTransaction extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patients: [],
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchTransaction();
		this.getPatients();
	}

	fetchTransaction = async () => {
		const { patient_id, startDate, endDate, status } = this.state;
		console.log(patient_id, startDate, endDate, status);
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}${transactionsAPI}/list?patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&transaction_type=billing`,
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
	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchTransaction();
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
			startDate: date[0],
			endDate: date[1],
		});
	};

	onDeleteTransaction = data => {
		this.props
			.deleteTransaction(data)
			.then(response => {
				notifySuccess('Transaction deleted');
			})
			.catch(error => {
				notifyError('Error deleting  transaction ');
			});
	};
	confirmDelete = data => {
		confirmAction(this.onDeleteTransaction, data);
	};
	doApproveTransaction = item => {
		this.props.approveTransaction(item);
	};
	doApplyVoucher = item => {
		this.props.applyVoucher(item);
	};

	render() {
		const { filtering, loading, patients } = this.state;

		console.log(patients);
		const transactions = this.props.reviewTransaction;
		return (
			<>
				<div className="row">
					<div className="col-md-12">
						<h6 className="element-header">Filter by:</h6>

						<form className="row">
							<div className="form-group col-md-3">
								<label className="" htmlFor="patient_id">
									ID
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
											<th className="">DEPARTMENT</th>
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
	};
};

export default connect(mapStateToProps, {
	applyVoucher,
	approveTransaction,
	loadTransaction,
	deleteTransaction,
})(ReviewTransaction);
