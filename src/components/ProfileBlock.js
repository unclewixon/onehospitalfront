/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import background from '../assets/images/b3.jpeg';
import profilepix from '../assets/images/a6.jpeg';

import { getAge, request } from '../services/utilities';
import { patientAPI } from '../services/constants';
import { notifySuccess, notifyError } from './../services/notify';
import waiting from '../assets/images/waiting.gif';

const ProfileBlock = ({ location, history, patient, noEdits, profile }) => {
	const [submitting, setSubmitting] = useState(false);
	// const [dropdown, setDropdown] = useState(false);
	// const history = useHistory();

	// const toggleDropdown = () => {
	// 	setDropdown(!dropdown);
	// };

	// const goToStartAdmission = () => {
	// 	history.push(`${location.pathname}#start-admission`);
	// };
	// const confirmStartAdmission = () => {
	// 	confirmAction(goToStartAdmission, '', 'You want to start admission');
	// };

	console.log(patient);

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
												{patient?.insurranceStatus}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4">
						<div className="row">
							<div className="col-md-6 align-items-center d-flex">
								{!noEdits && (
									<div className="m-2">
										<Link
											className="btn btn-primary btn-sm"
											to={`${location.pathname}#edit-profile`}>
											<i className="os-icon os-icon-edit"></i>
											<span className=" ml-2">Edit Profile</span>
										</Link>
									</div>
								)}
								{!noEdits && (
									<div className="m-2">
										<Link
											className="btn btn-success btn-sm"
											to={`${location.pathname}#upload-document`}>
											<i className="os-icon os-icon-documents-03"></i>
											<span className="ml-2">Upload Document</span>
										</Link>
									</div>
								)}
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 align-items-center d-flex">
								{!noEdits && (
									<div className="m-2">
										<a
											className="btn btn-primary btn-sm text-white"
											onClick={() => enrollImmunization()}
											disabled={submitting}>
											<i className="os-icon os-icon-plus-circle" />
											<span className="ml-2">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Enroll Immunization'
												)}
											</span>
										</a>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* {profile && (
						<div className="align-items-center d-flex p-4">
							<div className="toolbar">
								<a
									className="text-muted bg-dark-overlay btn-rounded btn btn-sm btn-icon"
									onClick={() => toggleDropdown()}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-more-vertical text-fade">
										<circle
											cx="12"
											cy="12"
											r="2"
											style={{ color: '#fff' }}></circle>
										<circle
											cx="12"
											cy="5"
											r="2"
											style={{ color: '#fff' }}></circle>
										<circle
											cx="12"
											cy="19"
											r="2"
											style={{ color: '#fff' }}></circle>
									</svg>
								</a>
								
								<div
									className="dropdown-menu dropdown-menu-right bg-black"
									role="menu"
									style={{
										position: 'absolute',
										transform: 'translate3d(750px, 69px, 0px)',
										top: '0px',
										left: '0px',
										willChange: 'transform',
										display: dropdown ? 'block' : 'none',
									}}
									onClick={() => toggleDropdown()}>
									
									 <a
										className="dropdown-item"
										onClick={() => confirmStartAdmission()}>
										<i className="os-icon os-icon-plus-circle"></i>
										<span className="ml-2">Start Admission</span>
									</a>
									<Link
										className="dropdown-item"
										to={`${location.pathname}#enroll-antenatal`}
										onClick={() => toggleDropdown()}>
										<i className="os-icon os-icon-plus-circle"></i>
										<span className="ml-2">Enroll Antenatal</span>
									</Link>
									<Link
										className="dropdown-item "
										to={`${location.pathname}#enroll-immunization`}
										onClick={() => toggleDropdown()}>
										<i className="os-icon os-icon-plus-circle"></i>
										<span className="ml-2">Enroll Immunization</span>
									</Link>
									<Link
										className="dropdown-item"
										to={`${location.pathname}#enroll-ivf`}
										onClick={() => toggleDropdown()}>
										<i className="os-icon os-icon-plus-circle"></i>
										<span className="ml-2">Enroll IVF</span>
									</Link> 
									
								</div>
							</div>
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default withRouter(ProfileBlock);
