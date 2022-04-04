import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const ProcedureProfileMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'notes') ? 'active' : ''}>
					<Link to={`${location.pathname}#notes`} className="pointer">
						Notes
					</Link>
				</li>
				<li className={checkHash(hash, 'attachments') ? 'active' : ''}>
					<Link to={`${location.pathname}#attachments`} className="pointer">
						Attachments
					</Link>
				</li>
				<li className={checkHash(hash, 'consumables') ? 'active' : ''}>
					<Link to={`${location.pathname}#consumables`} className="pointer">
						Consumables
					</Link>
				</li>
				<li className={checkHash(hash, 'medical-report') ? 'active' : ''}>
					<Link to={`${location.pathname}#medical-report`} className="pointer">
						Medical Report
					</Link>
				</li>
				<li className={checkHash(hash, 'regimen') ? 'active' : ''}>
					<Link to={`${location.pathname}#regimen`} className="pointer">
						Medications Used
					</Link>
				</li>
				<li className={checkHash(hash, 'vitals') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#vitals#Blood Pressure`}
						className="pointer"
					>
						Vitals
					</Link>
				</li>
				<li className={checkHash(hash, 'nursing-service') ? 'active' : ''}>
					<Link to={`${location.pathname}#nursing-service`} className="pointer">
						Nursing Service
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(ProcedureProfileMenu);
