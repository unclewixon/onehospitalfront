import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const AntennatalMenuView = ({ location }) => {
	return (
		<div
			className="menu-w selected-menu-color-light menu-activated-on-hover menu-has-selected-link color-scheme-dark color-style-bright sub-menu-color-bright menu-position-side menu-side-left menu-layout-compact sub-menu-style-over"
			style={{ maxHeight: '430px', top: '220px' }}>
			<ul className="main-menu">
				<li>
					<Link to={`${location.pathname}#general`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>General</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#fathers-info`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Father's Info'</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#previous-pregnancy`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Previous Pregnancy</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#fgm-view`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>FGM View</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#family-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Family History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#sexual-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Sexual History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#social-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Social History</span>
					</Link>
				</li>

				<li>
					<Link to={`${location.pathname}#gynae-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Gynae History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#lab-observation`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Lab Observation</span>
					</Link>
				</li>

				<li>
					<Link to={`${location.pathname}#initial-assessment`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Initial Assessment</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#pyhsical-exam`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Physical Exam</span>
					</Link>
				</li>

				<li>
					<Link to={`${location.pathname}#routine-assessment`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Routine Assessment</span>
					</Link>
				</li>

				<li>
					<Link to={`${location.pathname}#gpm-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>GynaePapMear History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#obsteric-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Obsteric History</span>
					</Link>
				</li>
				<li>
					<Link to={`${location.pathname}#past-ocular-history`}>
						<div className="icon-w">
							<div className="os-icon os-icon-layout" />
						</div>
						<span>Past Ocular History</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(AntennatalMenuView);
