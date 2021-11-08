/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import kebabCase from 'lodash.kebabcase';

const EncounterMenu = ({ encounters, open, active, noClick }) => {
	return (
		<div className="menu-w selected-menu-color-light menu-activated-on-hover menu-has-selected-link color-scheme-dark color-style-dark sub-menu-color-bright menu-position-top menu-side-left menu-layout-compact top-menu">
			<ul className="main-menu">
				{encounters.map((item, i) => {
					return (
						<li className={active === kebabCase(item) ? 'active' : ''} key={i}>
							<a onClick={noClick ? null : open(i)}>
								<div className="step">{`Step ${i + 1}`}</div>
								<span>{item}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default EncounterMenu;
