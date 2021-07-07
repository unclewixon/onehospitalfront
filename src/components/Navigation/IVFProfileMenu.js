import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const IVFProfileMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'notes') ? 'active' : ''}>
					<Link to={`${location.pathname}#notes`} className="pointer">
						Notes
					</Link>
				</li>
				<li
					className={
						checkHash(hash, 'lab') || checkHash(hash, 'lab-request')
							? 'active'
							: ''
					}>
					<Link to={`${location.pathname}#lab`} className="pointer">
						Lab
					</Link>
				</li>
				<li className={checkHash(hash, 'regulation-chart') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#regulation-chart`}
						className="pointer">
						Down Regulation Chart
					</Link>
				</li>
				<li className={checkHash(hash, 'hcg') ? 'active' : ''}>
					<Link to={`${location.pathname}#hcg`} className="pointer">
						HCG Administration
					</Link>
				</li>
				<li className={checkHash(hash, 'embryology') ? 'active' : ''}>
					<Link to={`${location.pathname}#embryology`} className="pointer">
						Embryology
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(IVFProfileMenu);
