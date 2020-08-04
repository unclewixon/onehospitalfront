import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	renderTextInputGroup,
	request,
} from '../../services/utilities';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
	API_URI,
	inventoryAPI,
	transactionPaymentType,
	transactionsAPI,
	vouchersAPI,
} from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { updateInventory } from '../../actions/inventory';
import moment from 'moment';
import { loadVoucher } from '../../actions/paypoint';

const validate = values => {
	const errors = {};
	if (!values.amount_paid) {
		errors.amount_paid = 'enter Amount';
	}
	return errors;
};

class ModalApproveTransaction extends Component {
	state = {
		submitting: false,
		hidden: true,
		amountClass: 'col-sm-6',
		voucherList: [],
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
		const { items, approve_hmo_transaction } = this.props;
		let id = items.q_id;
		if (approve_hmo_transaction) {
			data.payment_type = 'Hmo';
			id = items.id;
		}
		console.log(data);
		console.log(items);
		this.setState({ submitting: true });
		try {
			const rs = await request(
				`${transactionsAPI}/` + id + '/process',
				'PATCH',
				true,
				data
			);
			this.setState({ submitting: false });
			this.props.reset('approve_transaction');
			notifySuccess('Transaction Approved!');
			this.props.closeModals(true);
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
			const { items } = this.props;
			let data = { patient_id: items.q_patient_id };
			this.fetchVoucher(data);
			this.setState({ hidden: false });
		}
		console.log(newValue);
	};

	handleChangeVoucher = event => {
		let newValue = event.target.value;
		const { voucher } = this.props;
		let selected = voucher.find(c => c.q_id === newValue);
		this.props.dispatch(this.props.change('voucher_amount', selected.q_amount));
	};

	fetchVoucher = async data => {
		try {
			//this.setState({ loading: true });
			const rs = await request(
				`${vouchersAPI}/list` + '?patient_id=' + data.patient_id,
				'GET',
				true
			);
			this.props.loadVoucher(rs);
			//this.setState({ loading: false });
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
		const { error, handleSubmit, approve_hmo_transaction } = this.props;
		const { submitting, hidden, voucherList, amountClass } = this.state;
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
							<h4 className="onboarding-title">Process transaction</h4>
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
													label="Amount"
													type="text"
													placeholder="Enter Amount"
												/>
											</div>
										</div>
									</div>

									<div className="row" hidden={hidden}>
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="voucher_id"
													name="voucher_id"
													component={renderSelect}
													onChange={this.handleChangeVoucher}
													label="Voucher"
													placeholder="Select Voucher"
													data={voucherList}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="voucher_amount"
													name="voucher_amount"
													component={renderTextInput}
													label="Voucher Amount"
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
												placeholder="Enter Note"
											/>
										</div>
									</div>

									<div className="form-buttons-w text-right">
										<button className="btn btn-secondary ml-3" type="button">
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
			amount_paid: items.q_amount,
		},
		voucher: state.paypoint.voucher,
		approve_hmo_transaction: state.general.approve_hmo_transaction,
		items,
	};
};

export default connect(mapStateToProps, { closeModals, loadVoucher })(
	ModalApproveTransaction
);
