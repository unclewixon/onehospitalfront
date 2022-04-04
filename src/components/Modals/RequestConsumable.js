import React, { useState, useCallback, useEffect } from 'react';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { request, renderTextInput } from '../../services/utilities';
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

const RequestConsumable = ({
	closeModal,
	refresh,
	error,
	handleSubmit,
	module,
	itemId,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [items, setItems] = useState([]);
	const [option, setOption] = useState(null);
	const [requestNote, setRequestNote] = useState('');

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchConsumables = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/stores?limit=100', 'GET', true);
			setItems(rs.result);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching consumables');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchConsumables();
			setLoaded(true);
		}
	}, [fetchConsumables, loaded]);

	const save = async data => {
		try {
			if (!option) {
				notifyError('Please select an item from inventory');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				consumable_id: option.id,
				patient_id: patient.id,
				module,
				item_id: itemId,
				request_note: requestNote,
			};
			const rs = await request('patient/consumables', 'POST', true, info);
			setSubmitting(false);
			dispatch(stopBlock());
			if (rs.success) {
				refresh();
				notifySuccess('service request completed!');
				closeModal();
			} else {
				notifyError('could not request service!');
			}
		} catch (error) {
			dispatch(stopBlock());
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
						<h4 className="onboarding-title">Request Consumable</h4>

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
										<label>Item</label>
										<Select
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											options={items}
											name="item"
											value={option}
											onChange={e => setOption(e)}
											placeholder="Select item"
										/>
									</div>
								</div>
								<div className="row mt-2">
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
									<div className="form-group col-sm-12">
										<label>Request Note</label>
										<textarea
											className="form-control"
											name="request_note"
											rows="3"
											placeholder="Enter request note"
											onChange={e => setRequestNote(e.target.value)}
											value={requestNote}
										></textarea>
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

export default reduxForm({ form: 'request-service', validate })(
	RequestConsumable
);
