import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

export default function PatientActions({ location }) {
	return (
		<>
			<Link
				to={`${location.pathname}#start-admission`}
				className="btn btn-primary btn-sm mr-2">
				<i className="os-icon os-icon-ui-22"></i>
				<span>Admit</span>
			</Link>
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
			<Tooltip title="Enroll Immunization">
				<a className="btn btn-primary btn-sm mr-2" href="#">
					<i className="os-icon os-icon-ui-22"></i>
					<span>Enroll Immunization</span>
				</a>
			</Tooltip>
			<Tooltip title="Discharge">
				<a className="btn btn-primary btn-sm mr-2" href="#">
					<i className="os-icon os-icon-ui-22"></i>
					<span>Discharge</span>
				</a>
			</Tooltip>
			{/* discharge, enrole antinantal, ivf ,immuncation, admit */}
		</>
	);
}
