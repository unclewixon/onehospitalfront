import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	renderSelect,
	renderTextInput,
	request,
} from '../../services/utilities';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { vouchersAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { loadTransactions } from '../../actions/transaction';

const validate = values => {
	const errors = {};
	if (!values.voucher_code && values.payment_method === 'Voucher') {
		errors.voucher_code = 'enter voucher';
	}
	return errors;
};

const required = value => (value ? undefined : 'select payment method');

class ModalApproveTransaction extends Component {
	state = {
		submitting: false,
		hidden: true,
		voucherAmount: 0,
		activeData: null,
		voucherId: null,
		vouchers: [],
		amount: null,
	};

	approveTransaction = async data => {
		try {
			const { voucherId } = this.state;
			const { transaction, transactions } = this.props;

			const id = transaction.id;

			const { voucher_code, ...others } = data;
			const datum = {
				...others,
				voucher_id: voucherId,
				patient_id: transaction.patient.id,
			};

			this.setState({ submitting: true });
			const url = `transactions/${id}/process`;
			const rs = await request(url, 'POST', true, datum);

			if (rs.success) {
				this.props.reset('approve_transaction');
				notifySuccess('Transaction Approved!');

				const newTransactions = transactions.filter(item => {
					return item.id !== rs.transaction.id;
				});

				if (rs.balancePayment) {
					this.props.loadTransactions([rs.balancePayment, ...newTransactions]);
				} else {
					this.props.loadTransactions(newTransactions);
				}
				this.setState({ submitting: false });
				this.props.closeModal();
			} else {
				this.setState({ submitting: false });
				throw new SubmissionError({
					_error: rs.message,
				});
			}
		} catch (e) {
			console.log(e);
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not approve transaction',
			});
		}
	};

	handleChange = event => {
		const newValue = event.target.value;
		this.setState({ hidden: true });
		if (newValue === 'Voucher') {
			this.setState({ hidden: false });
		}
	};

	handleChangeVoucher = async event => {
		try {
			const url = `vouchers/${event.target.value}`;
			const rs = await request(url, 'GET', true);
			if (rs.success) {
				this.setState({
					voucherId: rs.voucher.id,
					voucherAmount: rs.voucher.amount,
				});
				this.props.dispatch(
					this.props.change('voucher_amount', rs.voucher.amount)
				);
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			notifyError(e.message || 'could not find voucher');
		}
	};

	fetchVoucher = async data => {
		try {
			const url = `${vouchersAPI}/list?patient_id=${data.patient_id}`;
			const rs = await request(url, 'GET', true);
			this.setState({ vouchers: rs });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { error, handleSubmit, paymentMethods, closeModal } = this.props;
		const { submitting, hidden } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}
						>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Process Transaction</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.approveTransaction)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row">
										<div className="col-sm-6">
											<Field
												id="payment_method"
												name="payment_method"
												validate={[required]}
												component={renderSelect}
												onChange={this.handleChange}
												label="Payment Method"
												placeholder="Select Payment Method"
												data={paymentMethods.map(p => ({
													name: p.name,
													id: p.name,
												}))}
											/>
										</div>
										<div className="col-sm-6">
											<Field
												id="amount_paid"
												name="amount_paid"
												component={renderTextInput}
												type="text"
												label="Amount"
												placeholder="Enter Amount"
											/>
										</div>
									</div>
									<div className="row" hidden={hidden}>
										<div className="col-sm-6">
											<Field
												id="voucher_code"
												name="voucher_code"
												component={renderTextInput}
												onChange={this.handleChangeVoucher}
												label="Voucher"
												placeholder="Enter Voucher Code"
											/>
										</div>
										<div className="col-sm-6">
											<Field
												id="voucher_amount"
												value={this.state.voucherAmount}
												name="voucher_amount"
												component={renderTextInput}
												label="Voucher Amount"
												readOnly={true}
												type="text"
												placeholder="Enter Amount"
											/>
										</div>
									</div>
									<div className="form-buttons-w text-right">
										<button
											className="btn btn-secondary ml-3"
											type="button"
											onClick={closeModal}
										>
											Cancel
										</button>
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'save'
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ModalApproveTransaction = reduxForm({
	form: 'approve_transaction',
	validate,
})(ModalApproveTransaction);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			amount_paid: Math.abs(parseFloat(ownProps.transaction.amount)),
		},
		transactions: state.transaction.transactions,
		paymentMethods: state.utility.methods,
	};
};

export default connect(mapStateToProps, { loadTransactions })(
	ModalApproveTransaction
);
