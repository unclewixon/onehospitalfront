/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transactionsAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request, confirmAction, itemRender } from '../../services/utilities';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { loadTransaction, deleteTransaction } from '../../actions/transaction';
import { applyVoucher, approveTransaction } from '../../actions/general';
import TransactionTable from '../../components/Tables/TransactionTable';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';

const { RangePicker } = DatePicker;
const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
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

class TransactionHistory extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
		meta: null,
	};

	componentDidMount() {
		console.log('componentDidMount()');
		this.fetchTransaction();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.patient_id !== this.state.patient_id) {
			this.fetchTransaction();
		}
	}

	fetchTransaction = async page => {
		const { patient_id, startDate, endDate, status } = this.state;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const url = `${transactionsAPI}/list?page=${p}&limit=24&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&transaction_type=&status=${status}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTransaction(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch transactions');
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
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

	handlePrintClick = () => {};

	render() {
		const { filtering, loading, meta } = this.state;
		const { transactions } = this.props;
		return (
			<div className="row">
				<div className="col-md-12 p-4">
					<form className="row">
						<div className="form-group col-md-3">
							<label htmlFor="patient_id">Patient</label>

							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient_id"
								id="patient_id"
								loadOptions={getOptions}
								onChange={e => {
									this.setState({ patient_id: e?.id });
								}}
								placeholder="Search patients"
							/>
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
								style={{ height: '35px' }}
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
					<div className="table-responsive">
						<TransactionTable
							transactions={transactions}
							loading={loading}
							showPrint={true}
							queue={false}
							showActionBtns={true}
							approveTransaction={this.doApproveTransaction}
							doApplyVoucher={this.doApplyVoucher}
							handlePrint={this.handlePrintClick}
						/>
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
		transactions: state.transaction.reviewTransaction,
	};
};

export default connect(mapStateToProps, {
	applyVoucher,
	approveTransaction,
	loadTransaction,
	deleteTransaction,
	startBlock,
	stopBlock,
})(TransactionHistory);
