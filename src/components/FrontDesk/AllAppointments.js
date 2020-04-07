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
import searchingGIF from '../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';

const { RangePicker } = DatePicker;
const paymentStatus = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];
export class AllAppointments extends Component {
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
	}

	fetchTransaction = async () => {
		const { startDate, endDate } = this.state;
		console.log(startDate, endDate);
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}/front-desk/appointments?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			this.props.loadTransaction(
				rs.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
			);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
		}
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
		const { filtering, loading } = this.state;
		const transactions = this.props.reviewTransaction;
		return (
			<>
				<div className="row">
					<div className="col-md-12">
						<h6 className="element-header">Filter by:</h6>

						<form className="row">
							<div className="form-group col-md-3">
								<label>From - To</label>
								<RangePicker onChange={e => this.dateChange(e)} />
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
											<th className="text-center">DATE</th>
											<th className="text-center">Queue Number</th>
											<th className="text-center">Patient Name</th>
											<th className="text-center">Department</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td colSpan="6" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : transactions.length > 0 ? (
											transactions.map(transaction => {
												return (
													<tr key={transaction.q_id}>
														<td className="text-center">
															{moment(transaction.q_createdAt).format(
																'YYYY/MM/DD'
															)}
														</td>
														<td className="text-center">
															{transaction.q_queueNumber}
														</td>
														<td className="text-center">
															{transaction.q_patientName}
														</td>
														<td className="text-center">
															{transaction.q_department_id}
														</td>
													</tr>
												);
											})
										) : (
											<tr colSpan="6" className="text-center">
												<td>No appointment</td>
											</tr>
										)}
									</tbody>
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
})(AllAppointments);
