import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const AdmissionMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'ward-round') ? 'active' : ''}>
					<Link to={`${location.pathname}#ward-round`} className="pointer">
						Notes
					</Link>
				</li>
				<li className={checkHash(hash, 'encounters') ? 'active' : ''}>
					<Link to={`${location.pathname}#encounters`} className="pointer">
						Visits
					</Link>
				</li>
				<li className={checkHash(hash, 'clinical-tasks') ? 'active' : ''}>
					<Link to={`${location.pathname}#clinical-tasks`} className="pointer">
						Tasks
					</Link>
				</li>
				<li className={checkHash(hash, 'nurse-observations') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#nurse-observations`}
						className="pointer">
						Observations
					</Link>
				</li>
				<li className={checkHash(hash, 'lab') ? 'active' : ''}>
					<Link to={`${location.pathname}#lab`} className="pointer">
						Lab
					</Link>
				</li>
				<li className={checkHash(hash, 'regimen') ? 'active' : ''}>
					<Link to={`${location.pathname}#regimen`} className="pointer">
						Regimen
					</Link>
				</li>
				<li className={checkHash(hash, 'fluid-chart') ? 'active' : ''}>
					<Link to={`${location.pathname}#fluid-chart`} className="pointer">
						Fluid Chart
					</Link>
				</li>
				<li className={checkHash(hash, 'vitals') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#vitals#Blood Pressure`}
						className="pointer">
						Vitals
					</Link>
				</li>
				<li className={checkHash(hash, 'care-team') ? 'active' : ''}>
					<Link to={`${location.pathname}#care-team`} className="pointer">
						Care Team
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(AdmissionMenu);
