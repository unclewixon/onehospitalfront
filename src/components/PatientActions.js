import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';

export default function PatientActions({ location, enrollImmunization }) {
	const patient = useSelector(state => state.user.patient);

	useEffect(() => {
		console.log(patient, 'patient');
	}, [patient]);
	const { isAdmitted, immunization } = patient;
	return (
		<>
			<Tooltip title={isAdmitted ? 'Discharge' : 'Admit'}>
				{!isAdmitted ? (
					<Link
						to={`${location.pathname}#start-admission`}
						className="btn btn-primary btn-sm mr-2">
						<i className="os-icon os-icon-ui-22"></i>
						<span>Admit</span>
					</Link>
				) : (
					<Link className="btn btn-primary btn-sm mr-2" to="#">
						<i className="os-icon os-icon-ui-22"></i>
						<span>Discharge</span>
					</Link>
				)}
			</Tooltip>
			<Tooltip title="Enroll Antenatal">
				<Link
					to={`${location.pathname}#enroll-antenatal`}
					className="btn btn-primary btn-sm mr-2">
					<div href="#">
						<i className="os-icon os-icon-ui-22"></i>
						<span>Enroll Antenatal</span>
					</div>
				</Link>
			</Tooltip>
			<Tooltip title="Enroll IVF">
				<Link
					to={`${location.pathname}#enroll-ivf`}
					className="btn btn-primary btn-sm mr-2">
					<i className="os-icon os-icon-ui-22"></i>
					<span>Enroll IVF</span>
				</Link>
			</Tooltip>
			{(immunization === undefined || immunization.length <= 0) && (
				<Tooltip title="Enroll Immunization">
					<button
						className="btn btn-primary btn-sm mr-2"
						onClick={enrollImmunization}>
						<i className="os-icon os-icon-ui-22"></i>
						<span>Enroll Immunization</span>
					</button>
				</Tooltip>
			)}

			{/* discharge, enrole antinantal, ivf ,immuncation, admit */}
		</>
	);
}
