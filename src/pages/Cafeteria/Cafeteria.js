import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Showcase from './Showcase';
import FoodItems from './FoodItems';

const Cafeteria = ({ location }) => {
	const [activePage, setActivePage] = useState('');

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}
	}, [activePage, page]);

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									activePage === 'cafeteria' ? 'active' : ''
								}`}
								to="/cafeteria"
							>
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link
								aria-expanded="false"
								className={`nav-link ${
									activePage === 'transactions' ? 'active' : ''
								}`}
								to="/cafeteria/transactions"
							>
								Transactions
							</Link>
						</li>
						<li className="nav-item">
							<Link
								aria-expanded="false"
								className={`nav-link ${
									activePage === 'showcase' ? 'active' : ''
								}`}
								to="/cafeteria/showcase"
							>
								Showcase
							</Link>
						</li>
						<li className="nav-item">
							<Link
								aria-expanded="false"
								className={`nav-link ${
									activePage === 'food-items' ? 'active' : ''
								}`}
								to="/cafeteria/food-items"
							>
								Food Items
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{activePage === 'cafeteria' && <Dashboard />}
			{activePage === 'transactions' && <Transactions />}
			{activePage === 'showcase' && <Showcase />}
			{activePage === 'food-items' && <FoodItems />}
		</div>
	);
};

export default Cafeteria;
