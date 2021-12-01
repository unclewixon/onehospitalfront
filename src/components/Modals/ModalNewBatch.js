import React, { useState } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import AsyncCreatableSelect from 'react-select/async-creatable/dist/react-select.esm';
import DatePicker from 'react-datepicker';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.quantity) {
		errors.quantity = 'enter quantity';
	}
	if (!values.unitPrice) {
		errors.unitPrice = 'enter unit price';
	}

	return errors;
};

const ModalNewBatch = ({ closeModal, error, handleSubmit, drug, addBatch }) => {
	const [submitting, setSubmitting] = useState(false);
	const [vendor, setVendor] = useState(null);
	const [expirationDate, setExpirationDate] = useState('');

	const dispatch = useDispatch();

	const fetchVendors = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `inventory/vendors?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const create = async data => {
		try {
			if (!expirationDate || (expirationDate && expirationDate === '')) {
				notifyError('Please select expiration date');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				expirationDate: moment(new Date(expirationDate)).format('YYYY-MM-DD'),
				drug_id: drug.id,
				vendor_id: vendor?.id || '',
				vendor,
			};
			const url = 'inventory/batches';
			const rs = await request(url, 'POST', true, info);
			addBatch(rs.batch);
			setSubmitting(false);
			dispatch(stopBlock());
			notifySuccess('Batch saved!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not save batch',
			});
		}
	};

	const month = moment().format('MM');
	const year = moment().format('YYYY');

	const random1 = Math.floor(Math.random() * 9);
	const random2 = Math.floor(Math.random() * 9);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '320px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Create Batch</h4>

						<div className="form-block">
							<form onSubmit={handleSubmit(create)}>
								{error && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${error}`,
										}}
									/>
								)}
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Name</label>
											<input
												type="text"
												className="form-control"
												placeholder="Name of Batch"
												value={`BA/${month}/${year}/${random1}${random2}`}
												disabled
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Expiration Date</label>
											<DatePicker
												selected={expirationDate}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												dateFormat="dd-MMM-yyyy"
												className="single-daterange form-control"
												placeholderText="Expiration date"
												minDate={new Date()}
												onChange={e => setExpirationDate(e)}
												disabledKeyboardNavigation
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<Field
											id="quantity"
											name="quantity"
											component={renderTextInput}
											label="Quantity"
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<Field
											id="unitPrice"
											name="unitPrice"
											component={renderTextInput}
											label="Unit Price"
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<label>Vendor</label>
										<AsyncCreatableSelect
											cacheOptions
											defaultOptions
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name || option.label}
											createOptionPosition="first"
											loadOptions={fetchVendors}
											formatCreateLabel={inputValue => {
												return `Create ${inputValue}`;
											}}
											value={vendor}
											placeholder="Select Vendor"
											onChange={e => {
												setVendor(e);
											}}
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default reduxForm({ form: 'new-batch', validate })(ModalNewBatch);
