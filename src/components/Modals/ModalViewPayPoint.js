/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { request } from '../../services/utilities';
import { API_URI, transactionsAPI } from '../../services/constants';

class ModalViewPayPoint extends Component {
	state = {
		loading: false,
		transactions: [],
	};

	componentDidMount() {
		const { view_paypoint } = this.props;
		this.fetchTransactionList();
		document.body.classList.add('modal-open');
	}

	fetchTransactionList = async () => {
		try {
			const { type } = this.props;
			this.setState({ loading: true });
			let today = moment().format('YYYY-MM-DD');
			const rs = await request(
				`transactionsAPI}/dashboard-list?transactionType=` +
					type +
					`&startDate=${today}&endDate=${today}`,
				'GET',
				true
			);
			this.setState({ loading: false });
			this.setState({ transactions: rs });
			console.log(this.props.todayTransaction);
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { loading, transactions } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h6 className="element-header my-5">Pay Point detail</h6>
							<div className="table table-responsive">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th data-field="id">
												<div className="th-inner sortable both">Patient ID</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="owner">
												<div className="th-inner sortable both">Amount</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both">
													Amount Paid
												</div>
												<div className="fht-cell"></div>
											</th>
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
													<tr key={transaction.transaction_id}>
														<td className="">
															{`${transaction.surname} ${transaction.other_names}`}
														</td>
														<td className="flex">
															{transaction.transaction_amount}
														</td>
														<td className="flex">
															{transaction.transaction_amount_paid}
														</td>
													</tr>
												);
											})
										) : (
											<tr colSpan="6" className="text-center">
												<td>No transaction</td>
											</tr>
										)}
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
		type: state.general.view_paypoint,
	};
};
export default connect(mapStateToProps, { closeModals })(ModalViewPayPoint);
