import React, { useState, useCallback, useEffect } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	return errors;
};

const RequestService = ({ closeModal, refresh, error, handleSubmit }) => {
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);
	const [option, setOption] = useState(null);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchServices = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `services/category/nursing-service?hmo_id=${patient.hmo.id}`;
			const rs = await request(url, 'GET', true);
			setServices(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching services');
			dispatch(stopBlock());
		}
	}, [dispatch, patient]);

	useEffect(() => {
		if (!loaded) {
			fetchServices();
			setLoaded(true);
		}
	}, [fetchServices, loaded]);

	const save = async () => {
		try {
			if (!option) {
				notifyError('Please select a service');
				return;
			}

			setSubmitting(true);
			const info = {
				requestType: 'nursing-service',
				patient_id: patient.id,
				tests: [{ ...option }],
				request_note: '',
				urgent: false,
				diagnosis: [],
				bill: -1,
			};
			const rs = await request('requests/nursing-service', 'POST', true, info);
			setSubmitting(false);
			if (rs.success) {
				refresh();
				notifySuccess('service request completed!');
				closeModal();
			} else {
				notifyError('could not request service!');
			}
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
						<h4 className="onboarding-title">Request New Service</h4>

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
										<label>Nursing Service</label>
										<Select
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											options={services}
											name="service"
											value={option}
											onChange={e => setOption(e)}
											placeholder="Select service"
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

export default reduxForm({ form: 'request-service', validate })(RequestService);
