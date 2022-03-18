import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hasViewAppointmentPermission } from "../../permission-utils/appointment";

const FrontDeskMenu = () => {
	const staff = useSelector(state => state.user.profile);

	return (
		<>
			{hasViewAppointmentPermission(staff.permissions) && (
				<li>
					<Link to="/front-desk/appointments/queue">
						<div className="icon-w">
							<div className="os-icon os-icon-calendar-time" />
						</div>
						<span>Appointments</span>
					</Link>
				</li>
			)}
			<li>
				<Link to="/front-desk/patients">
					<div className="icon-w">
						<div className="os-icon os-icon-cv-2" />
					</div>
					<span>Patients</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/admitted">
					<div className="icon-w">
						<div className="icon-feather-folder-plus" />
					</div>
					<span>Admitted Patients</span>
				</Link>
			</li>
			<li>
				<Link to="/front-desk/insurance-transactions">
					<div className="icon-w">
						<div className="os-icon os-icon-ui-55" />
					</div>
					<span>Insurance Transactions</span>
				</Link>
			</li>
		</>
	);
};

export default FrontDeskMenu;
