import React, { useState } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch } from 'react-redux';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.quantity) {
		errors.quantity = 'enter quantity';
	}

	return errors;
};

const ModalUpdateBatchQty = ({
	closeModal,
	error,
	handleSubmit,
	item,
	updateItem,
	category,
}) => {
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const update = async data => {
		try {
			dispatch(startBlock());
			setSubmitting(true);
			const info = { ...data };
			const url = `inventory/${category}/${item.id}/quantity`;
			const rs = await request(url, 'PUT', true, info);
			if (rs.success) {
				updateItem(rs.item);
				setSubmitting(false);
				dispatch(stopBlock());
				notifySuccess(`Quantity updated!`);
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
				_error: 'could not update quantity',
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
						<h4 className="onboarding-title">Update Quantity</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div className="text-center">{`Available quantity: ${item.quantity}`}</div>
						</div>
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

const mapStateToProps = () => {
	return {
		initialValues: {
			quantity: 0,
		},
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-qty', validate })(ModalUpdateBatchQty)
);
