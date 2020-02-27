import React from 'react';
import { Link } from 'react-router-dom';

const FrontDeskMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>FRONTDESK</span>
			</li>
			<li>
				<Link to="/front-desk">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/staff-mgt/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Out-Patient</span>
				</Link>
			</li>

            <li className="sub-header">
				<span>GENERAL</span>
			</li>
			<li>
				<Link to="/staff-mgt/list">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Registered</span>
				</Link>
			</li>
			<li>
				<Link to="/staff-mgt/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers"/>
					</div>
					<span>Appointments</span>
				</Link>
			</li>
            <li className="has-sub-menu">
              <a href="layouts_menu_top_image.html">
                  <div className="icon-w">
                      <div className="os-icon os-icon-layers"></div>
                  </div><span>Tools</span></a>
              <div className="sub-menu-w">
                  <div className="sub-menu-header">Tools</div>
                  <div className="sub-menu-icon"><i className="os-icon os-icon-layers"></i></div>
                  <div className="sub-menu-i">
                      <ul className="sub-menu">
                          <li><a href="layouts_menu_side_mini.html">SMS</a></li>
                          <li><a href="layouts_menu_side_mini.html">Emails</a></li>
                      </ul>
                  </div>
              </div>
          </li>
		</>
	);
};

export default FrontDeskMenu;
