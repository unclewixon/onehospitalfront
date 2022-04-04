import React, { useState, useCallback, useEffect } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';
import { useDispatch } from 'react-redux';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}
	if (!values.tariff) {
		errors.tariff = 'enter base price';
	}

	return errors;
};

const ModalCreateService = ({ closeModal, error, handleSubmit }) => {
	const [loaded, setLoaded] = useState(false);
	const [category, setCategory] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [categories, setCategories] = useState([]);

	const dispatch = useDispatch();

	const fetchCategories = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = 'service-categories';
			const rs = await request(url, 'GET', true);
			setCategories(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching categories');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchCategories();
			setLoaded(true);
		}
	}, [fetchCategories, loaded]);

	const save = async data => {
		try {
			if (!category) {
				notifyError('Please select a category');
				return;
			}

			setSubmitting(true);
			const info = { ...data, category_id: category.id };
			await request('services', 'POST', true, info);
			setSubmitting(false);
			notifySuccess('Service created!');
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not create service',
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
						<h4 className="onboarding-title">Create New Service</h4>

						<div className="form-block">
							<form onSubmit={handleSubmit(save)}>
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
								<div className="row">
									<div className="col-sm-12">
										<Field
											id="tariff"
											name="tariff"
											component={renderTextInput}
											label="Base Price"
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<label>Category</label>
										<Select
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											options={categories}
											name="category"
											value={category}
											onChange={e => setCategory(e)}
											placeholder="Select category"
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

export default reduxForm({ form: 'new-service', validate })(ModalCreateService);
