/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import IncomeStatement from './IncomeStatement';

import TrialBalance from './TrialBalance';
import LedgerStatement from './LedgerStatement';
import BalanceSheet from './BalanceSheet';

const Reports = ({ match, location }) => {
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
					<li className={page === 'trial-balance' ? 'active' : ''}>
						<Link to="/account/reports/trial-balance">
							<i className="os-icon os-icon-hierarchy-structure-2" />
							<span>Trial Balance</span>
						</Link>
					</li>
					<li className={page === 'balance-sheet' ? 'active' : ''}>
						<Link to="/account/reports/balance-sheet">
							<i className="os-icon os-icon-folder-plus" />
							<span>Balance sheet</span>
						</Link>
					</li>
					<li className={page === 'income-statement' ? 'active' : ''}>
						<Link to="/account/reports/income-statement">
							<i className="os-icon os-icon-documents-03" />
							<span>
								Income <br />
								Statement
							</span>
						</Link>
					</li>
					<li className={page === 'ledger-statement' ? 'active' : ''}>
						<Link to="/account/reports/ledger-statement">
							<i className="os-icon os-icon-search" />
							<span>
								Ledger <br /> Statement
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
										path={`${match.url}/reports/trial-balance`}
										component={TrialBalance}
									/>
									<Route
										path={`${match.url}/reports/balance-sheet`}
										component={BalanceSheet}
									/>
									<Route
										path={`${match.url}/reports/income-statement`}
										component={IncomeStatement}
									/>
									<Route
										path={`${match.url}/reports/ledger-statement`}
										component={LedgerStatement}
									/>
									<Route component={TrialBalance} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Reports);
