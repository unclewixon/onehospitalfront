import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { transactionPaymentType, vouchersAPI } from '../../services/constants';
import { updateImmutable } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import {
	loadVoucher,
	getAllPendingTransactions,
	getTransactionData,
	showInvoiceToPrint,
	showReceiptToPrint,
} from '../../actions/paypoint';
import { loadTransaction } from '../../actions/transaction';

const validate = values => {
	const errors = {};
	if (!values.amount_paid) {
		errors.amount_paid = 'enter amount';
	}
	if (!values.voucher_code && values.payment_type === 'Voucher') {
		errors.voucher_code = 'enter voucher';
	}
	return errors;
};

const required = value => (value ? undefined : 'Required');

class ModalApproveTransaction extends Component {
	state = {
		submitting: false,
		hidden: true,
		amountClass: 'col-sm-6',
		voucherList: [],
		voucherAmount: 0,
		activeData: null,
		voucherId: null,
		isPart: false,
	};

	componentDidMount() {
		const { approve_hmo_transaction } = this.props;
		if (approve_hmo_transaction) {
			this.setState({ amountClass: 'col-sm-12' });
		}
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	approveTransaction = async data => {
		try {
			const { voucherId, isPart } = this.state;
			const {
				items,
				approve_hmo_transaction,
				pendingTransactions,
			} = this.props;

			let id = items.id;
			let newTransactions;
			if (approve_hmo_transaction) {
				data.payment_type = 'Hmo';
				id = items.id;
			}

			const { voucher_code, ...others } = data;
			const datum = {
				...others,
				voucher_id: voucherId,
				patient_id: items.patient.id,
				is_part_payment: isPart ? 1 : 0,
			};
			console.log('console.log(datum);');

			console.log(datum);
			this.setState({ submitting: true });
			const url = `transactions/${id}/process`;
			const rs = await request(url, 'POST', true, datum);

			if (rs.success) {
				this.props.reset('approve_transaction');
				notifySuccess('Transaction Approved!');
				newTransactions = pendingTransactions.filter(trans => {
					return trans.id !== rs.transaction.id;
				});
				const updatedArr = updateImmutable(
					this.props.transactions,
					rs.transaction
				);
				this.props.loadTransaction(updatedArr);
				this.props.getAllPendingTransactions(newTransactions);
				this.setState({ submitting: false });
				this.props.getTransactionData(rs.transaction);
				this.props.closeModals(true);
			} else {
				this.setState({ submitting: false });
				throw new SubmissionError({
					_error: rs.message,
				});
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not approve transaction',
			});
		}
	};

	handleChange = event => {
		let newValue = event.target.value;
		this.setState({ hidden: true });
		if (newValue === 'Voucher') {
			this.setState({ hidden: false });
		}
		console.log(newValue);
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
			this.props.loadVoucher(rs);
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.voucher !== this.props.voucher) {
			if (!this.state.hidden) {
				let voucherList = [];
				const { voucher } = this.props;
				voucher.forEach((item, index) => {
					voucherList = [
						...voucherList,
						{ id: item.q_id, name: item.q_voucher_no },
					];
				});
				this.setState({ voucherList });
			}
		}
	}

	render() {
		const {
			error,
			handleSubmit,
			approve_hmo_transaction,
			approveTransaction,
		} = this.props;
		const { submitting, hidden, amountClass, isPart } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
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
										<div className="col-sm-6" hidden={approve_hmo_transaction}>
											<div className="form-group">
												<Field
													id="payment_type"
													name="payment_type"
													validate={[required]}
													component={renderSelect}
													onChange={this.handleChange}
													label="Payment Type"
													placeholder="Select Payment Type"
													data={transactionPaymentType}
												/>
											</div>
										</div>
										<div className={amountClass}>
											<div className="form-group">
												<Field
													id="amount_paid"
													name="amount_paid"
													component={renderTextInput}
													// defaultValue={`NGN ${approveTransaction.amount}`}
													type="text"
													label="Amount"
													readOnly={!isPart}
													placeholder="Enter Amount"
													className="form-control"
												/>
											</div>
										</div>
									</div>

									<div className="row" hidden={hidden}>
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="voucher_code"
													name="voucher_code"
													component={renderTextInput}
													onChange={this.handleChangeVoucher}
													label="Voucher"
													placeholder="Enter Voucher Code"
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
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
									</div>

									<div className="row">
										<div className="col-sm-12">
											<Field
												id="note"
												name="note"
												component={renderTextArea}
												label="Note"
												type="text"
												defaultValue={approveTransaction.amount}
												placeholder="Enter Note"
											/>
										</div>
									</div>

									<div className="row">
										<div className="form-check col-sm-12">
											<label className="form-check-label">
												<input
													className="form-check-input mt-0"
													name="is_part_payment"
													type="checkbox"
													checked={isPart}
													onChange={e =>
														this.setState({ isPart: e.target.checked })
													}
												/>
												Part Payment
											</label>
										</div>
									</div>

									<div className="form-buttons-w text-right">
										<button
											className="btn btn-secondary ml-3"
											type="button"
											onClick={() => this.props.closeModals(false)}>
											Cancel
										</button>
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
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
	const items = state.general.approve_transaction;
	return {
		initialValues: {
			// amount_paid: items.q_amount,
			amount_paid: state.general.approve_transaction.amount,
		},
		voucher: state.paypoint.voucher,
		approve_hmo_transaction: state.general.approve_hmo_transaction,
		items,
		pendingTransactions: state.paypoint.pendingTransactions,
		transactions: state.transaction.reviewTransaction,
		showReceipt: state.paypoint.showReceipt,
		showInvoice: state.paypoint.showInvoice,
		activeData: state.paypoint.transactionData,
	};
};

export default connect(mapStateToProps, {
	closeModals,
	loadVoucher,
	getAllPendingTransactions,
	getTransactionData,
	showReceiptToPrint,
	showInvoiceToPrint,
	loadTransaction,
})(ModalApproveTransaction);
