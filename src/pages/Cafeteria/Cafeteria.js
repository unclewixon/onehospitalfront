import React, { useState } from 'react';

import CafeteriaDashboard from './Dashboard';
import AllTransactions from './AllTransaction';

const Cafeteria = () => {
	const [activePage, togglePage] = useState('Dashboard');

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<button
							className="btn btn-primary btn-sm"
							onClick={() => togglePage('Dashboard')}>
							<i className="os-icon os-icon-ui-22"></i>
							<span>Dashboard</span>
						</button>
						<button
							className="btn btn-success btn-sm"
							onClick={() => togglePage('All Transaction')}>
							<i className="os-icon os-icon-grid-10"></i>
							<span>All Transaction</span>
						</button>
					</div>
					<h6 className="element-header">{activePage}</h6>
					{activePage === 'Dashboard' && <CafeteriaDashboard />}
					{activePage === 'All Transaction' && <AllTransactions />}
				</div>
			</div>
		</div>
	);
};

export default Cafeteria;
