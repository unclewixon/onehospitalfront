import React, { useState } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch } from 'react-redux';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { updateService } from '../../actions/settings';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}

	return errors;
};

const ModalEditRoom = ({ closeModal, service, error, handleSubmit, hmo }) => {
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const update = async data => {
		try {
			setSubmitting(true);
			dispatch(startBlock());
			const info = { ...data, hmo_id: hmo.id };
			const url = `rooms/categories/${service.id}`;
			const rs = await request(url, 'PATCH', true, info);
			dispatch(updateService(rs));
			setSubmitting(false);
			notifySuccess('Room category saved!');
			dispatch(stopBlock());
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not save room category',
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
						<h4 className="onboarding-title">Edit Room Category</h4>

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
											id="name"
											name="name"
											component={renderTextInput}
											label="Name"
											type="text"
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
			...ownProps.service,
		},
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-room', validate })(ModalEditRoom)
);
