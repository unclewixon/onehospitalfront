import React, { useState, useCallback, useEffect } from 'react';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import { updateService } from '../../actions/settings';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}

	return errors;
};

const ModalEditService = ({
	closeModal,
	service,
	error,
	handleSubmit,
	hmo,
	editTariff,
	updateTariff,
	change,
}) => {
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
			const privateUrl = `services/private/${service.code}`;
			const privateRs = await request(privateUrl, 'GET', true);
			dispatch(change('amount', privateRs.tariff));
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching categories');
			dispatch(stopBlock());
		}
	}, [change, dispatch, service]);

	useEffect(() => {
		if (!loaded) {
			fetchCategories();
			setCategory(service.category);
			setLoaded(true);
		}
	}, [fetchCategories, loaded, service]);

	const update = async data => {
		try {
			if (!category) {
				notifyError('Please select a category');
				return;
			}

			const amount = parseFloat(data.tariff);

			if (editTariff && amount <= 0) {
				notifyError('Please enter tariff');
				return;
			}

			setSubmitting(true);
			const info = {
				...data,
				category_id: category.id,
				hmo_id: hmo.id,
				update_tariff: updateTariff ? 1 : 0,
			};
			const rs = await request(`services/${service.id}`, 'PATCH', true, info);
			if (updateTariff) {
				updateTariff(rs);
			} else {
				dispatch(updateService(rs));
			}
			setSubmitting(false);
			notifySuccess('Service saved!');
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not save service',
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
						<h4 className="onboarding-title">{`${hmo.name || ''} HMO`}</h4>

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
								{editTariff && hmo.name !== 'Private' && (
									<div className="row mt-3">
										<div className="col-sm-12">
											<Field
												id="amount"
												name="amount"
												component={renderTextInput}
												label="Base Tarrif"
												type="number"
												readOnly={true}
											/>
										</div>
									</div>
								)}
								{editTariff && (
									<div
										className={`row ${hmo.name === 'Private' ? 'mt-3' : ''}`}
									>
										<div className="col-sm-12">
											<Field
												id="tariff"
												name="tariff"
												component={renderTextInput}
												label="Tariff"
												type="number"
											/>
										</div>
									</div>
								)}
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

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			name: ownProps.service.name,
			tariff: ownProps.service?.service?.tariff || 0,
		},
	};
};

export default connect(mapStateToProps, { change })(
	reduxForm({ form: 'edit-service', validate })(ModalEditService)
);
