/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import background from '../assets/images/b3.jpeg';
import profilepix from '../assets/images/a6.jpeg';
import editIcon from '../assets/medical/edit.png';
import admitIcon from '../assets/medical/admit.png';
import immunizeIcon from '../assets/medical/immunize.png';
import documentIcon from '../assets/medical/document.png';
import { getAge, request } from '../services/utilities';
import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import { updatePatient } from '../actions/patient';

const ProfileBlock = ({ location, history, patient, noEdits }) => {
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const enrollImmunization = async () => {
		const result = window.confirm('Enroll into immunization?');
		if (result) {
			try {
				setSubmitting(true);
				const data = { patient_id: patient.id };
				const url = `${patientAPI}/immunization/enroll`;
				const rs = await request(url, 'POST', true, data);
				if (rs.success) {
					setSubmitting(false);
					notifySuccess(
						`you have enrolled ${patient.other_names} into immunization`
					);
					dispatch(updatePatient({ ...patient, immunization: rs.records }));
					history.push(`${location.pathname}#immunization-chart`);
				} else {
					setSubmitting(false);
					notifyError(rs.message);
				}
			} catch (error) {
				setSubmitting(false);
				notifyError(error.message || 'Could not add leave request');
			}
		}
	};

	const enrollAdmission = () => {
		history.push(`${location.pathname}#start-admission`);
	};

	return (
		<div
			className="card-header bg-dark bg-img p-0 no-border"
			style={{
				backgroundImage: `url(${background})`,
				backgroundPosition: '50% -114.052px',
			}}>
			<div className="bg-dark-overlay r-2x no-r-b">
				<div className="d-md-flex">
					<div className="p-4 flex" style={{ flex: '1 1 auto' }}>
						<div className="d-flex">
							<Link to={`${location.pathname}#dashboard`}>
								<span className="avatar w-64">
									<img src={profilepix} alt="" /> <i className="on"></i>
								</span>
							</Link>
							<div className="mx-3" style={{ width: '100%' }}>
								<h5 className="mt-2">{`${patient?.surname} ${patient?.other_names}`}</h5>
								<div className="row">
									<div className="col-md-6">
										<div className="text-fade text-sm">
											<span className="m-r">
												<strong>Sex:</strong> {patient?.gender}
											</span>
										</div>
										<div className="text-fade text-sm">
											<span className="m-r">
												<strong>Date of Birth: </strong>
												{`${moment(new Date(patient?.date_of_birth)).format(
													'D-MMM-YYYY'
												)} (${getAge(new Date(patient?.date_of_birth))})`}
											</span>
										</div>
									</div>
									<div className="col-md-6">
										<div className="text-fade text-sm">
											<span className="m-r">
												<strong>Insurance Status:</strong>{' '}
												{patient?.hmo?.name || '-'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4">
						<div className="row">
							<div className="col-md-12 align-items-center d-flex">
								{!noEdits && (
									<div className="m-2 div-icon">
										<Tooltip title="Edit Profile">
											<Link
												className="btn-icon"
												to={`${location.pathname}#edit-profile`}>
												<img src={editIcon} alt="" />
											</Link>
										</Tooltip>
									</div>
								)}
								{!noEdits && (
									<div className="m-2 div-icon">
										<Tooltip title="Upload Document">
											<Link
												className="btn-icon"
												to={`${location.pathname}#upload-document`}>
												<img src={documentIcon} alt="" />
											</Link>
										</Tooltip>
									</div>
								)}
								{!noEdits &&
									patient &&
									(!patient.immunization ||
										patient.immunization.length === 0) && (
										<div className="m-2 div-icon">
											<Tooltip title="Enroll Immunization">
												<a
													className="btn-icon"
													onClick={() => enrollImmunization()}
													disabled={submitting}>
													<img src={immunizeIcon} alt="" />
												</a>
											</Tooltip>
										</div>
									)}
								{!noEdits && patient && !patient.isAdmitted && (
									<div className="m-2 div-icon">
										<Tooltip title="Admit Patient">
											<a
												className="btn-icon"
												onClick={() => enrollAdmission()}
												disabled={submitting}>
												<img src={admitIcon} alt="" />
											</a>
										</Tooltip>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ProfileBlock);
