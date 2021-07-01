import React from 'react';
import { Link } from 'react-router-dom';

const DoctorMenu = () => {
	return (
		<>
			<li>
				<Link to="/doctor">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/doctor/appointment-history">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Appointment History</span>
				</Link>
			</li>
			<li>
				<Link to="/nurse/in-patients/care">
					<div className="icon-w">
						<div className="icon-feather-folder-plus" />
					</div>
					<span>In-Patient (Care)</span>
				</Link>
			</li>
			<li>
				<Link to="/ivf">
					<div className="icon-w">
						<div className="os-icon os-icon-documents-07" />
					</div>
					<span>IVF</span>
				</Link>
			</li>
			<li>
				<Link to="/antenatal">
					<div className="icon-w">
						<div className="os-icon os-icon-documents-13" />
					</div>
					<span>Antenatal</span>
				</Link>
			</li>
		</>
	);
};

export default DoctorMenu;
