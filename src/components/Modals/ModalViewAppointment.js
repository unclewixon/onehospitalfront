import React from 'react';

import {
	formatPatientId,
	parseAvatar,
	patientname,
	formatDate,
} from '../../services/utilities';

const ModalViewAppointment = ({ appointment, closeModal }) => {
	return (
		<div
			className="modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '440px' }}
			>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Appointment Detail</h5>
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body pt-0 pb-0">
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
										src={parseAvatar(appointment?.patient?.profile_pic)}
									/>
								</div>
							</div>
							<div className="post-content w-100">
								<div className="profile-tile pb-0">
									<div className="profile-tile-meta">
										<h6 className="post-title">
											{patientname(appointment.patient)}
										</h6>
										<div className="row p-sm-2 flex-nowrap">
											<ul className="col-md-12">
												<li>
													Patient ID:{' '}
													<strong>
														{formatPatientId(appointment?.patient)}
													</strong>
												</li>
												<li>
													Patient Phone:{' '}
													<strong>
														{appointment?.patient?.phone_number || '--'}
													</strong>
												</li>
												<li>
													Appointment Date:{' '}
													<strong>
														{formatDate(
															appointment?.appointment_date,
															'DD-MMM-YYYY'
														)}
													</strong>
												</li>
												<li>
													Department:{' '}
													<strong>
														{appointment?.department?.name || '--'}
													</strong>
												</li>
												<li>
													Consulting Room:{' '}
													<strong>
														{appointment?.consultingRoom?.name || '--'}
													</strong>
												</li>
											</ul>
										</div>
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

export default ModalViewAppointment;
