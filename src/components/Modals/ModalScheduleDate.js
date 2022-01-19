import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import waiting from '../../assets/images/waiting.gif';
import { request, updateImmutable } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';

const ModalScheduleDate = ({
	procedures,
	procedure,
	closeModal,
	updateProcedure,
}) => {
	const [error, setError] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [resources, setResources] = useState([]);

	const dispatch = useDispatch();

	const handeSubmit = async e => {
		try {
			e.preventDefault();

			if (resources.length === 0) {
				setError('select resources');
				return;
			}

			if (startDate === '' || endDate === '') {
				setError('select date');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());
			const url = `requests/${procedure.id}/schedule`;
			const data = {
				resources: JSON.stringify(resources.map(r => r.value)),
				start_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
				end_date: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
			};
			const rs = await request(url, 'PUT', true, data);
			const procedure_request = procedures.find(l => l.id === procedure.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...procedure_request, item };
			const newItems = updateImmutable(procedures, newItem);
			updateProcedure(newItems);
			dispatch(stopBlock());
			notifySuccess('procedure scheduled!');
			setSubmitting(false);
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			setError('Error setting procedure schedule');
			dispatch(stopBlock());
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
						<h4 className="onboarding-title">Schedule Date</h4>
						<div className="form-block">
							<form onSubmit={handeSubmit}>
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
										<label>Resources</label>
										<Select
											isMulti
											name="resources"
											placeholder="Select Resources"
											value={resources}
											options={[
												{
													label: 'Anesthetic Machine',
													value: 'Anesthetic Machine',
												},
												{ label: 'SPO2 Monitor', value: 'SPO2 Monitor' },
												{
													label: 'Hysteroscopic Monitor',
													value: 'Hysteroscopic Monitor',
												},
												{
													label: 'Hysteroscopic Machine',
													value: 'Hysteroscopic Machine',
												},
												{
													label: 'Hysteroscopic DVD Recorder',
													value: 'Hysteroscopic DVD Recorder',
												},
												{
													label: 'Diathermy Machine',
													value: 'Diathermy Machine',
												},
												{ label: 'Suction Machine', value: 'Suction Machine' },
											]}
											onChange={e => setResources(e)}
											required
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="expiry">From</label>
											<DatePicker
												className="single-daterange form-control"
												showTimeSelect
												dateFormat="dd-MM-yyyy h:mm aa"
												selected={startDate}
												minDate={new Date()}
												onChange={e => setStartDate(e)}
												disabledKeyboardNavigation
												placeholderText="Procedure Start Date"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="expiry">To</label>
											<DatePicker
												className="single-daterange form-control"
												showTimeSelect
												dateFormat="dd-MM-yyyy h:mm aa"
												selected={endDate}
												onChange={e => setEndDate(e)}
												disabledKeyboardNavigation
												placeholderText="Procedure End Date"
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'save'
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

export default ModalScheduleDate;
