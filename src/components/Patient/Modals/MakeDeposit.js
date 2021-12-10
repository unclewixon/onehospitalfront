import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notifyError, notifySuccess } from '../../../services/notify';
import { request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';

const MakeDeposit = ({ patient, onHide, updateBalance }) => {
	const [amount, setAmount] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');

	const dispatch = useDispatch();
	const paymentMethods = useSelector(state => state.utility.methods);

	const save = async () => {
		try {
			if (paymentMethod === '') {
				notifyError('Select payment method');
				return;
			}

			dispatch(startBlock());
			const data = {
				amount,
				patient_id: patient.id,
				payment_method: paymentMethod,
			};
			const url = `transactions/credit-account`;
			const rs = await request(url, 'POST', true, data);
			updateBalance(rs.balance);
			notifySuccess('Account Credited!');
			onHide();
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError(error.message || 'Could not credit account');
			dispatch(stopBlock());
		}
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<div className="form-group col-sm-12">
								<label>Payment Method</label>
								<select
									name="payment_method"
									className="form-control"
									onChange={e => setPaymentMethod(e.target.value)}>
									<option value="">Select method</option>
									{paymentMethods.map((p, i) => {
										return (
											<option key={i} value={p.name}>
												{p.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group col-sm-12">
								<label>Amount</label>
								<input
									name="amount"
									onChange={e => setAmount(e.target.value)}
									className="form-control"
									placeholder="Amount"
									type="number"
								/>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" onClick={() => save()}>
										save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MakeDeposit;
