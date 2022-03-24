import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { notifyError, notifySuccess } from '../../../services/notify';
import { patientname, request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { searchAPI } from '../../../services/constants';

const TransferCredit = ({ patient, onHide, updateBalance }) => {
	const [amount, setAmount] = useState('');
	const [recipient, setRecipient] = useState(null);

	const dispatch = useDispatch();

	const save = async () => {
		try {
			if (!recipient) {
				notifyError('Select patient');
				return;
			}

			dispatch(startBlock());
			const data = {
				amount,
				patient_id: patient.id,
				recipient_id: recipient.id,
			};
			const url = 'transactions/transfer-credit';
			const rs = await request(url, 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				updateBalance(rs.balance);
				notifySuccess('Credit Transferred!');
				setRecipient(null);
				setAmount('');
				onHide();
			} else {
				notifyError(rs.message || 'Could not transfer credit');
			}
		} catch (error) {
			console.log(error);
			notifyError(error.message || 'Could not transfer credit');
			dispatch(stopBlock());
		}
	};

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}
		>
			<div className="modal-centered" role="document">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<div className="form-group col-sm-12">
								<label>Patient</label>
								<AsyncSelect
									isClearable
									getOptionValue={option => option.id}
									getOptionLabel={option => patientname(option, true)}
									defaultOptions
									name="patient"
									loadOptions={getPatients}
									onChange={e => {
										if (e) {
											setRecipient(e);
										} else {
											setRecipient(null);
										}
									}}
									placeholder="Search patients"
								/>
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

export default TransferCredit;
