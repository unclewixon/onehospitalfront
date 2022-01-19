import React, { useState, useEffect } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { request } from '../../../services/utilities';
import waiting from '../../../assets/images/waiting.gif';
import { notifySuccess } from '../../../services/notify';
import { staffname } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { startBlock, stopBlock } from '../../../actions/redux-block';

const AddEditTeam = ({
	closeModal,
	handleSubmit,
	error,
	updateMembers,
	item_id,
	type,
}) => {
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [staffs, setStaffs] = useState([]);
	const [primaryStaff, setPrimaryStaff] = useState(null);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	useEffect(() => {
		if (!loaded) {
			setLoaded(true);
		}
	}, [loaded]);

	const update = async data => {
		try {
			if (staffs.length === 0) {
				notifyError('Please select care giver(s)');
				return;
			}

			if (!primaryStaff) {
				notifyError('Please select primary care giver');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				item_id,
				type,
				staffs,
				primary_care_id: primaryStaff.id,
				patient_id: patient.id,
			};
			const rs = await request('care-teams', 'POST', true, info);
			if (rs.success) {
				updateMembers(rs.members);
				setSubmitting(false);
				dispatch(stopBlock());
				notifySuccess('Members saved!');
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
				_error: 'could not save team members',
			});
		}
	};

	const fetchStaffs = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
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
						<h4 className="onboarding-title">Patient Care Team</h4>
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
										<div className="form-group">
											<label>Select Care Giver</label>
											<AsyncSelect
												isMulti
												getOptionValue={option => option.id}
												getOptionLabel={option => staffname(option)}
												defaultOptions
												loadOptions={fetchStaffs}
												value={staffs}
												onChange={e => {
													setStaffs(e);
												}}
												placeholder="Select Care Giver"
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Select Primary Care Giver</label>
											<AsyncSelect
												getOptionValue={option => option.id}
												getOptionLabel={option => staffname(option)}
												defaultOptions
												loadOptions={fetchStaffs}
												value={primaryStaff}
												onChange={e => {
													setPrimaryStaff(e);
												}}
												placeholder="Select Primary Care Giver"
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

export default reduxForm({ form: 'team-member' })(AddEditTeam);
