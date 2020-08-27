import React from 'react';
import { Link } from 'react-router-dom';
const NurseMenu = () => {
	return (
		<>
			<li>
				<Link to="/nurse">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Home</span>
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
				<Link to="/nicu">
					<div className="icon-w">
						<div className="os-icon os-icon-documents-03" />
					</div>
					<span>NICU</span>
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
			<li>
				<Link to="/labour-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-documents-15" />
					</div>
					<span>Labour Management</span>
				</Link>
			</li>
			<li>
				<Link to="/immunization">
					<div className="icon-w">
						<div className="os-icon os-icon-documents-17" />
					</div>
					<span>Immunizations</span>
				</Link>
			</li>
			<li>
				<Link to="/procedure">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Procedures</span>
				</Link>
			</li>
		</>
	);
};

export default NurseMenu;
