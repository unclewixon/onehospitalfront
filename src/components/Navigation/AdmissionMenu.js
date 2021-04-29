import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const AdmissionMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'clinical-tasks') ? 'active' : ''}>
					<Link to={`${location.pathname}#clinical-tasks`} className="pointer">
						Clinical Tasks
					</Link>
				</li>
				<li className={checkHash(hash, 'encounters') ? 'active' : ''}>
					<Link to={`${location.pathname}#encounters`} className="pointer">
						Encounters
					</Link>
				</li>
				<li className={checkHash(hash, 'nurse-observations') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#nurse-observations`}
						className="pointer">
						Nurse Observations
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
				{/* <li className={checkHash(hash, 'care-team') ? 'active' : ''}>
					<Link to={`${location.pathname}#care-team`} className="pointer">
						Care Team
					</Link>
				</li> */}
			</ul>
		</div>
	);
};

export default withRouter(AdmissionMenu);
