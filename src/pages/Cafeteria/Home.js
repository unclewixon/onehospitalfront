/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import Transactions from './Transactions';

const Home = () => {
	const [activePage, togglePage] = useState('dashboard');

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												aria-expanded="true"
												className={`nav-link ${
													activePage === 'dashboard' ? 'active' : ''
												}`}
												onClick={() => togglePage('dashboard')}>
												Dashboard
											</a>
										</li>
										<li className="nav-item">
											<a
												aria-expanded="false"
												className={`nav-link ${
													activePage === 'transactions' ? 'active' : ''
												}`}
												onClick={() => togglePage('transactions')}>
												Transactions
											</a>
										</li>
									</ul>
								</div>
							</div>
							{activePage === 'dashboard' && <Dashboard />}
							{activePage === 'transactions' && <Transactions />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
