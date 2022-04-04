import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { vitalsAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { readingDone } from '../../actions/patient';
import warning from '../../assets/images/warning.png';

const GiveMedication = ({ closeModal, taskItem }) => {
	const [quantity, setQuantity] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const saveMedication = async () => {
		try {
			if (quantity === '') {
				notifyError('enter quantity to administer');
				return;
			}

			setSubmitting(true);
			const data = {
				readingType: 'regimen',
				reading: { regimen: quantity },
				patient_id: taskItem.patient_id,
				task_id: taskItem.id,
			};
			const rs = await request(vitalsAPI, 'POST', true, data);
			if (rs.success) {
				notifySuccess('medication fulfilled');
				setSubmitting(false);
				dispatch(readingDone(taskItem.id));
				closeModal();
			} else {
				setSubmitting(false);
				notifyError(rs.message);
			}
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			const message = e.message || 'could not take reading for medication';
			notifyError(message);
		}
	};

	const lastReading = taskItem.vitals.length > 0 ? taskItem.vitals[0] : null;

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '480px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Medication Clinical Task</h4>
						<div className="onboarding-text alert-custom text-secondary">
							{taskItem.title}
						</div>
						<div className="element-box">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Quantity"
											value={quantity}
											onChange={e => setQuantity(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-sm-12 onboarding-text alert-custom border-bottom-0 m-0 text-left text-custom">
									{`Last time administered: ${
										lastReading
											? moment(lastReading.createdAt).fromNow()
											: 'N/A'
									}`}
								</div>
								<div className="col-sm-12 onboarding-text alert-custom m-0 text-left text-custom">
									{`Next due administration time: ${
										taskItem.nextTime &&
										taskItem.nextTime !== '' &&
										taskItem.taskCount > taskItem.tasksCompleted
											? moment(taskItem.nextTime).fromNow()
											: 'N/A'
									}`}
									{taskItem.nextTime &&
										taskItem.nextTime !== '' &&
										taskItem.taskCount > taskItem.tasksCompleted &&
										moment().isAfter(taskItem.nextTime) && (
											<div className="warning-task ml-2">
												<img src={warning} alt="" />
											</div>
										)}
								</div>
								<div className="col-md-12 mt-4">
									<button
										onClick={() => saveMedication()}
										className="btn btn-primary"
										disabled={submitting}
									>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span>Save</span>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GiveMedication;
