import React, { useState, useEffect } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Select from 'react-select';
import capitalize from 'lodash.capitalize';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { allUnitOfMeasures } from '../../services/constants';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}
	if (!values.unitOfMeasure) {
		errors.unitOfMeasure = 'enter unit of measure';
	}

	return errors;
};

const ModalEditItem = ({
	closeModal,
	handleSubmit,
	error,
	category,
	updateItem,
	item,
}) => {
	const [submitting, setSubmitting] = useState(false);
	const [unitOfMeasures, setUnitOfMeasures] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [unitOfMeasure, setUnitOfMeasure] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loaded) {
			setUnitOfMeasures(allUnitOfMeasures);
			if (item.unitOfMeasure && item.unitOfMeasure !== '') {
				const uom = capitalize(item.unitOfMeasure);
				setUnitOfMeasure({ id: uom, name: uom });
			}
			setLoaded(true);
		}
	}, [item, loaded]);

	const update = async data => {
		try {
			dispatch(startBlock());
			setSubmitting(true);
			const info = { ...data, unitOfMeasure: unitOfMeasure?.name || '' };
			const url = `inventory/${category}/${item.id}`;
			const rs = await request(url, 'PUT', true, info);
			if (rs.success) {
				updateItem(rs.item);
				setSubmitting(false);
				dispatch(stopBlock());
				notifySuccess('Item saved!');
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
				_error: 'could not save item',
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
						<h4 className="onboarding-title">Edit Item</h4>
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
										<div className="form-group">
											<label>Unit of Measure</label>
											<Select
												isClearable
												placeholder="Select unit of measure"
												defaultValue
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => {
													setUnitOfMeasure(e);
												}}
												value={unitOfMeasure}
												isSearchable={true}
												options={unitOfMeasures.map(u => ({ id: u, name: u }))}
											/>
										</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.item },
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-item', validate })(ModalEditItem)
);
