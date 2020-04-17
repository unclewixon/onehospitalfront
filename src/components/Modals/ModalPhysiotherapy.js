import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const ModalPhysiotherapy = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
  
  const calculateAmount = arr => {
		let sum = 0;
		arr.forEach(val => {
			let amt = val.amount;
			if (amt === undefined) {
				amt = 0;
			}
			try {
				sum += parseInt(amt);
			} catch (e) {
				sum += 0;
			}
		});
		return sum;
  };
  
	return (
		<Modal
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}
		>

			<Modal.Header closeButton>
			</Modal.Header>
			<Modal.Body>

				<div className="onboarding-content with-gradient text-center">
					<div className="modal-body">
						<div className="row">
							<div className="col-sm-4">
								<div className="user-profile compact">
									<div
										className="up-head-w"
										style={{
											backgroundImage: require('../../assets/images/profile_bg1.jpg'),
										}}>
										<div className="up-main-info">
											<h2 className="up-header">
												{activeRequest.patient_name ? activeRequest.patient_name : ''}
											</h2>
										</div>
									</div>

									<div className="up-contents">
										<div className="m-b">
											<div className="row m-b">
												<div className="col-sm-12 b-b">
													<div className="el-tablo centered padded-v">
														<div className="value">
															{moment(activeRequest.createdAt).format('DD/MM/YYYY')}
														</div>
														<div className="label">Request Date</div>
													</div>
												</div>
											</div>

											<div className="padded">
												<div className="os-progress-bar primary">
													<div className="col-sm-12 b-b">
														<div className="el-tablo centered padded-v">
															<div className="label">Session Count</div>
															<div className="value">
																{
                                  activeRequest &&
                                  activeRequest.requestBody &&
                                  activeRequest.requestBody.length ?
                                  activeRequest.requestBody.map(body => body.sessionCount) :
                                  ""
                                }
															</div>
														</div>
													</div>
												</div>

												
												
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-8">
								<div className="element-wrapper">
									<form id="formValidate" novalidate="true"></form>
									<div className="element-info">
										<div className="element-info-with-icon">
											<div className="element-info-icon">
												<div className="os-icon os-icon-pen"></div>
											</div>
											<div className="element-info-text">
												<h5 className="element-inner-header">
													Physiotherapy Appointment
														</h5>
												{/*appointment_date*/}
												{/*department.name*/}
												{/*consultingRoom.name*/}
												{/*specialization.name*/}
												{/*department.staff.first_name*/}
											</div>
										</div>
									</div>

									<div className="">
										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													<label>Specialization</label>
													<span className="form-control">
                            {activeRequest.requestBody && 
                            activeRequest.requestBody.length ? 
                            activeRequest.requestBody.map((spec, i) => (
                            <div key={i}>
                              {spec.specialization}
                            </div>
                            )) : []
                            }	
													</span>
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													<label>Created By</label>
													<span className="form-control">
														{activeRequest.created_by}
													</span>
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-sm">
												<div className="form-group">
													
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalPhysiotherapy;