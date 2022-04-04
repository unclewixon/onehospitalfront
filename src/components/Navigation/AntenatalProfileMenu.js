import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const AntenatalProfileMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'notes') ? 'active' : ''}>
					<Link to={`${location.pathname}#notes`} className="pointer">
						Notes
					</Link>
				</li>
				<li className={checkHash(hash, 'assessments') ? 'active' : ''}>
					<Link to={`${location.pathname}#assessments`} className="pointer">
						Assessments
					</Link>
				</li>
				<li className={checkHash(hash, 'gynae-history') ? 'active' : ''}>
					<Link to={`${location.pathname}#gynae-history`} className="pointer">
						Gynae History
					</Link>
				</li>
				<li className={checkHash(hash, 'obst-history') ? 'active' : ''}>
					<Link to={`${location.pathname}#obst-history`} className="pointer">
						Obst. History
					</Link>
				</li>
				<li className={checkHash(hash, 'vitals') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#vitals#Blood Pressure`}
						className="pointer"
					>
						Vital Signs
					</Link>
				</li>
				<li className={checkHash(hash, 'lab') ? 'active' : ''}>
					<Link to={`${location.pathname}#lab`} className="pointer">
						Lab
					</Link>
				</li>
				<li className={checkHash(hash, 'radiology') ? 'active' : ''}>
					<Link to={`${location.pathname}#radiology`} className="pointer">
						Scans
					</Link>
				</li>
				<li className={checkHash(hash, 'regimen') ? 'active' : ''}>
					<Link to={`${location.pathname}#regimen`} className="pointer">
						Medications
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(AntenatalProfileMenu);
