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
					<span>Vitals Queue</span>
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
				<Link to="/nurse/in-patients/tasks">
					<div className="icon-w">
						<div className="icon-feather-folder-plus" />
					</div>
					<span>Clinical Tasks</span>
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
		</>
	);
};

export default NurseMenu;
