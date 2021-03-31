import React from 'react';

const AccountUserProfile = ({ staff }) => {
	return (
		<>
			<div className="element-info mb-0">
				<div className="element-info-with-icon">
					<div className="element-info-text">
						<h5 className="element-inner-header">My Profile</h5>
					</div>
				</div>
			</div>
			<table className="table table-lightborder">
				<tbody>
					<tr className="small">
						<td className="font-weight-bold">Fullname</td>
						<td className="text-right">
							{staff?.details?.first_name +
								' ' +
								staff?.details?.last_name +
								' ' +
								staff?.details?.other_names}
						</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Gender</td>
						<td className="text-right">{staff?.details?.gender}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Date of Birth</td>
						<td className="text-right">{staff?.details?.date_of_birth}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Marital Status</td>
						<td className="text-right">{staff?.details?.marital_status}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">No. of Children</td>
						<td className="text-right">{staff?.details?.number_of_children}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Contact Address</td>
						<td className="text-right">{staff?.details?.address}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Local Government</td>
						<td className="text-right">{staff?.details?.lga}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">State of Origin</td>
						<td className="text-right"> {staff?.details?.state_of_origin}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Nationality</td>
						<td className="text-right"> {staff?.details?.nationality}</td>
					</tr>
				</tbody>
			</table>
			<legend>
				<span>Next of Kin Details</span>
			</legend>
			<table className="table table-lightborder">
				<tbody>
					<tr className="small">
						<td className="font-weight-bold">Fullname</td>
						<td className="text-right">{staff?.details?.next_of_kin}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Relationship</td>
						<td className="text-right">
							{staff?.details?.next_of_kin_relationship}
						</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Phone Number</td>
						<td className="text-right">
							{staff?.details?.next_of_kin_contact_no}
						</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Date of Birth</td>
						<td className="text-right"> {staff?.details?.next_of_kin_dob}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Contact Address</td>
						<td className="text-right">
							{staff?.details?.next_of_kin_address}
						</td>
					</tr>
				</tbody>
			</table>
			<legend>
				<span>Official Details</span>
			</legend>
			<table className="table table-lightborder">
				<tbody>
					<tr className="small">
						<td className="font-weight-bold">Job Title</td>
						<td className="text-right"> {staff?.details?.job_title}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Department</td>
						<td className="text-right"> {staff?.details?.department?.name}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Employment Date</td>
						<td className="text-right">
							{staff?.details?.employment_start_date}
						</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Employment Code</td>
						<td className="text-right">{staff?.details?.emp_code}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Contract Type</td>
						<td className="text-right">{staff?.details?.contract_type}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Monthly Salary</td>
						<td className="text-right">{staff?.details?.monthly_salary}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Annual Salary</td>
						<td className="text-right">{staff?.details?.annual_salary}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Account Number</td>
						<td className="text-right">{staff?.details?.account_number}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Bank</td>
						<td className="text-right">{staff?.details?.bank_name}</td>
					</tr>
					<tr className="small">
						<td className="font-weight-bold">Pension Manager</td>
						<td className="text-right">{staff?.details?.pension_mngr}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default AccountUserProfile;
