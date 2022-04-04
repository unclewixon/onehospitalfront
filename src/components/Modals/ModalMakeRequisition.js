import React, { useState } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.quantity) {
		errors.quantity = 'enter quantity';
	}

	return errors;
};

const ModalMakeRequisition = ({
	closeModal,
	handleSubmit,
	error,
	addRequisition,
}) => {
	const [category, setCategory] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [item, setItem] = useState(null);

	const dispatch = useDispatch();

	const getOptions = async q => {
		if (!category) {
			return [];
		}

		if (!q || q.length < 1) {
			return [];
		}

		const type = category.id === 'cafeteria' ? 'cafeteria' : 'stores';
		const url = `inventory/${type}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const staff = useSelector(state => state.user.profile.details);

	const makeRequisition = async data => {
		try {
			if (!category) {
				notifyError('please select category');
				return;
			}

			if (!item) {
				notifyError('please select item');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				category: category.id,
				item_id: item.id,
				staff_id: staff.id,
			};
			const url = `inventory/requisitions`;
			const rs = await request(url, 'POST', true, info);
			if (rs.success) {
				addRequisition(rs.item);
				setSubmitting(false);
				dispatch(stopBlock());
				notifySuccess('Requisition request sent!');
				closeModal();
			} else {
				dispatch(stopBlock());
				setSubmitting(false);
				throw new SubmissionError({
					_error: rs.message,
				});
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not make requisition',
			});
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '320px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Make Requisition</h4>
						<div className="form-block">
							<form onSubmit={handleSubmit(makeRequisition)}>
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
											<label>Category</label>
											<Select
												placeholder="Select category"
												defaultValue
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => {
													setCategory(e);
												}}
												value={category}
												isSearchable={true}
												options={[
													{ id: 'store', name: 'Store' },
													{ id: 'cafeteria', name: 'Cafeteria' },
												]}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group relative">
											<label>Item</label>
											{item && (
												<div className="posit-top">
													<div className="row">
														<div className="col-sm-12">
															<span
																className={`badge badge-${
																	item.quantity > 0 ? 'info' : 'danger'
																} text-white`}
															>{`Stock Level: ${
																item.quantity > 0 ? 'in stock' : 'out of stock'
															}`}</span>
														</div>
													</div>
												</div>
											)}
											<AsyncSelect
												isClearable
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												defaultOptions
												loadOptions={getOptions}
												value={item}
												onChange={e => {
													if (e) {
														setItem(e);
													} else {
														setItem(null);
													}
												}}
												placeholder="select an item"
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
								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
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

export default reduxForm({ form: 'make-requisition', validate })(
	ModalMakeRequisition
);
