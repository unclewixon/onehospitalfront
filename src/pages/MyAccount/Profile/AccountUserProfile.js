import React from 'react';

const AccountUserProfile = ({ staff }) => {
	return (
		<div className="col-sm-7">
			<div className="element-wrapper">
				<div className="element-box">
					<div className="element-info">
						<div className="element-info-with-icon">
							<div className="element-info-icon">
								<div className="os-icon os-icon-user-male-circle2"></div>
							</div>
							<div className="element-info-text">
								<h5 className="element-inner-header">My Profile</h5>
								<div className="element-inner-desc">
									{/* Validation of the form is made possible using powerful
										validator plugin for bootstrap.{' '}
										<a
											href="http://1000hz.github.io/bootstrap-validator/"
											target="_blank">
											Learn more about Bootstrap Validator
										</a> */}
								</div>
							</div>
						</div>
					</div>
					<div className="padded">
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Fullname</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.first_name +
											' ' +
											staff?.details?.last_name +
											' ' +
											staff?.details?.other_names}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Gender</span>
									{/* <span className="positive">+10</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.gender}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Date of Birth</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.date_of_birth}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Marital Status</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.marital_status}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>No. of Children</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.number_of_children}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Religion</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.religion}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Contact Address</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.address}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Local Government</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.lga}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>State of Origin</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.state_of_origin}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Nationality</span>
									{/* <span className="positive">+5</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.nationality}</span>
								</div>
							</div>
						</div>
					</div>
					<legend>
						<span>Next of Kin Details</span>
					</legend>
					<div className="padded">
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Fullname</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.next_of_kin}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Relationship</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.next_of_kin_relationship}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Phone Number</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.next_of_kin_contact_no}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Date of Birth</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.next_of_kin_dob}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Contact Address</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.next_of_kin_address}
									</span>
								</div>
							</div>
						</div>
					</div>
					<legend>
						<span>Official Details</span>
					</legend>
					<div className="padded">
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Job Title</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.job_title}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Department</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.department?.name}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Employment Date</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">
										{staff?.details?.employment_start_date}
									</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Employment Code</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.emp_code}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Contract Type</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.contract_type}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Monthly Salary</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.monthly_salary}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Annual Salary</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.annual_salary}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Account Number</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.account_number}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Bank</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.bank_name}</span>
								</div>
							</div>
						</div>
						<div className="os-progress-bar primary">
							<div className="bar-labels">
								<div className="bar-label-left">
									<span>Pension Manager</span>
									{/* <span className="negative">-12</span> */}
								</div>
								<div className="bar-label-right">
									<span className="info">{staff?.details?.pension_mngr}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountUserProfile;
