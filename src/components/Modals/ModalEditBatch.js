import React, { useState, useEffect } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
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
	if (
		!values.unitPrice ||
		(values.unitPrice && parseFloat(values.unitPrice) === 0)
	) {
		errors.unitPrice = 'enter unit price';
	}

	return errors;
};

const ModalEditBatch = ({
	closeModal,
	error,
	handleSubmit,
	batch,
	updateBatch,
}) => {
	const [loaded, setLoaded] = useState(false);
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

	useEffect(() => {
		if (!loaded) {
			if (batch.expirationDate && batch.expirationDate !== '') {
				if (moment(batch.expirationDate).isValid()) {
					setExpirationDate(new Date(moment(batch.expirationDate)));
				}
			}
			setVendor(batch.vendor);
			setLoaded(true);
		}
	}, [batch, loaded]);

	const update = async data => {
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
				vendor_id: vendor?.id || '',
				vendor,
			};
			const url = `inventory/batches/${batch.id}`;
			const rs = await request(url, 'PUT', true, info);
			updateBatch(rs.batch);
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
						<h4 className="onboarding-title">Edit Batch</h4>

						<div className="form-block">
							<form onSubmit={handleSubmit(update)}>
								{error && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${error}`,
										}}
									/>
								)}
								{batch.name && batch.name !== '' && (
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Name</label>
												<input
													type="text"
													className="form-control"
													placeholder="Name of Batch"
													value={batch.name}
													disabled
												/>
											</div>
										</div>
									</div>
								)}
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

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			...ownProps.batch,
		},
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-batch', validate })(ModalEditBatch)
);
