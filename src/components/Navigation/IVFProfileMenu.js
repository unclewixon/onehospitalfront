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
			</ul>
		</div>
	);
};

export default withRouter(IVFProfileMenu);
