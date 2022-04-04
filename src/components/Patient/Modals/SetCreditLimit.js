import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { notifyError, notifySuccess } from '../../../services/notify';
import { request } from '../../../services/utilities';
import { setPatientRecord } from '../../../actions/user';
import { startBlock, stopBlock } from '../../../actions/redux-block';

const SetCreditLimit = ({ patient, onHide }) => {
	const [amount, setAmount] = useState('');
	const [expiryDate, setExpiryDate] = useState('');

	const dispatch = useDispatch();

	const save = async () => {
		try {
			dispatch(startBlock());
			const data = {
				amount,
				expiry_date: moment(expiryDate).format('YYYY-MM-DD'),
			};
			const url = `patient/${patient.id}/credit-limit`;
			const rs = await request(url, 'POST', true, data);
			dispatch(
				setPatientRecord({
					id: rs.patient.id,
					credit_limit: rs.patient.credit_limit,
					credit_limit_expiry_date: rs.patient.credit_limit_expiry_date,
					outstanding: rs.patient.credit_limit > 0 ? 0 : patient.outstanding,
				})
			);
			notifySuccess('Credit limit saved');
			onHide();
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError(error.message || 'Could not set credit limit');
			dispatch(stopBlock());
		}
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
								<label>Amount</label>
								<input
									name="amount"
									onChange={e => setAmount(e.target.value)}
									className="form-control"
									placeholder="Amount"
									type="number"
								/>
							</div>
							<div className="form-group col-sm-12">
								<label>Expiry Date</label>
								<div className="custom-date-input">
									<DatePicker
										selected={expiryDate}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy"
										className="single-daterange form-control"
										placeholderText="Select date"
										minDate={new Date()}
										onChange={e => setExpiryDate(e)}
										disabledKeyboardNavigation
									/>
								</div>
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

export default SetCreditLimit;
