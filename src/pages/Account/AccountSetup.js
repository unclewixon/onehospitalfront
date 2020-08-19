/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import CoaCategory from '../../components/CoaCategory';
import CoaSubcategory from '../../components/CoaSubcategory';
import ManageAccount from '../../components/ManageAccount';

const AccountSetup = ({ match, location }) => {
	const [toggle, setToggle] = useState(false);
	const page = location.pathname.split('/').pop();
	console.log(match.url);
	return (
		<div className={`settings-menu ${toggle ? 'compact-menu' : ''}`}>
			<div className="ae-side-menu">
				<div className="aem-head">
					<a
						className="ae-side-menu-toggler"
						onClick={() => setToggle(!toggle)}>
						<i className="os-icon os-icon-hamburger-menu-2" />
					</a>
				</div>
				<ul className="ae-main-menu">
					<li className={page === 'coa' ? 'active' : ''}>
						<Link to="/account/setup/coa/category">
							<i className="os-icon os-icon-hierarchy-structure-2" />
							<span>COA</span>
						</Link>
					</li>
					<li className={page === 'manage-account' ? 'active' : ''}>
						<Link to="/account/setup/manage-account">
							<i className="os-icon os-icon-folder-plus" />
							<span>
								Manage <br /> Accounts
							</span>
						</Link>
					</li>
				</ul>
			</div>

			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<Switch>
									<Route
										path={`${match.url}/coa/category`}
										component={CoaCategory}
									/>
									<Route
										path={`${match.url}/coa/subcategory`}
										component={CoaSubcategory}
									/>
									<Route
										path={`${match.url}/manage-account`}
										component={ManageAccount}
									/>

									{/* <Route component={NoMatch} /> */}
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(AccountSetup);
