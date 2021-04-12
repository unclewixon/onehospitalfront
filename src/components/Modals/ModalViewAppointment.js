/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import patientProfilePic from '../../assets/images/placeholder.jpg';
import { formatPatientId } from '../../services/utilities';

const ModalViewAppointment = ({ appointment, closeModal }) => {
	return (
		<div
			className="modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							<div className="element-inner-header pl-md-3">
								Appointment Detail
							</div>
						</h5>
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="modal-body pb-0">
							<div className="d-flex">
								<div className="post-media">
									<div className="pt-avatar-w">
										<img
											alt=""
											style={{
												display: 'inlineBlock',
												verticalAlign: 'middle',
												width: '100px',
												height: '100px',
												borderRadius: '50%',
											}}
											src={
												appointment?.patient?.profile_pic
													? appointment?.patient?.profile_pic
													: patientProfilePic
											}
										/>
									</div>
								</div>
								<div className="post-content w-100">
									<div className="profile-tile pb-0">
										<div className="profile-tile-meta">
											<h6 className="post-title">
												{appointment?.patient?.surname}{' '}
												{appointment?.patient?.other_names}
											</h6>
											<div className="row p-sm-2  flex-nowrap">
												<ul className="col-md-6">
													<li>
														Patient ID:{' '}
														<strong>
															{formatPatientId(appointment?.patient?.id)}
														</strong>
													</li>
													<li>
														Appointment Date:{' '}
														<strong>{appointment?.appointment_date}</strong>
													</li>
													<li>
														Department:{' '}
														<strong>
															<a href="apps_support_index.html">
																{appointment?.department?.name}
															</a>
														</strong>
													</li>
												</ul>
												<ul className="col-md-6 ml-2">
													<li>
														Consulting Room:{' '}
														<strong>
															{appointment?.consultingRoom?.name || '-'}
														</strong>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="post-foot"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalViewAppointment;
