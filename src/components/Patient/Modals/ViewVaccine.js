/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';

import { vaccineNotDue, vaccineMissed } from '../../../services/utilities';
import { request } from '../../../services/utilities';
import { notifySuccess, notifyError } from '../../../services/notify';
import waiting from '../../../assets/images/waiting.gif';

const ViewVaccine = ({ data }) => {
	const [submitting, setSubmitting] = useState(false);

	const createAppointment = async id => {
		try {
			setSubmitting(true);
			const patient = data.patient;
			const values = {
				opdType: 'immunization',
				immunization_id: id,
				patient_id: patient.id,
			};
			const rs = await request(`patient/opd`, 'POST', true, values);
			setSubmitting(false);
			if (rs.success) {
				notifySuccess('Vaccination appointment created!');
			} else {
				notifyError(
					rs.message || 'Could not save out patient appointment record'
				);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError('Could not save out patient appointment record');
		}
	};

	return (
		<div className="onboarding-modal fade animated show" role="dialog">
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<div className="onboarding-content with-gradient">
						<div className="element-wrapper p-0">
							<div className="element-box-tp">
								<div className="profile-tile m-0 p-0 b-0">
									<div className="profile-tile-meta p-0">
										<ul>
											{vaccineNotDue(data) && (
												<li>
													<div className="alert alert-secondary text-white">
														Not Due
													</div>
												</li>
											)}
											{data.date_administered && (
												<li>
													<div className="alert alert-sucsess text-white">
														Vaccine Administered
													</div>
												</li>
											)}
											{vaccineMissed(data) && (
												<li>
													<div className="alert alert-danger text-white">
														Vaccine Missed
													</div>
												</li>
											)}
											<li>
												<strong>{`${data.name_of_vaccine.toUpperCase()} (${
													data.description
												})`}</strong>
											</li>
											<li>
												Date Due:
												<strong>
													{moment(data.date_due, 'YYYY-MM-DD').format(
														'DD-MMM-YYYY'
													)}
												</strong>
											</li>
											<li>
												Administered By:
												<strong>{data.administeredBy || '-'}</strong>
											</li>
											<li>
												Administered On:
												<strong>{data.date_administered || '-'}</strong>
											</li>
										</ul>
										{!vaccineNotDue(data) && (
											<div className="pt-btn">
												<a
													className="btn btn-success btn-sm text-white"
													onClick={() => createAppointment(data.id)}
													disabled={submitting}>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														'Create Appointment'
													)}
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewVaccine;
