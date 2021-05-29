import React from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';

import HmoList from './HmoList';
import Tarrifs from './Tarrifs';
import Transactions from './Transactions';
import NoMatch from '../NoMatch';

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							{page !== 'tariffs' && page !== 'hmo' && (
								<div className="element-actions">
									<Link
										to={`${match.path}/transactions`}
										className={`mx-2 btn btn-primary btn-sm  ${
											page === 'transactions' ? '' : 'btn-outline-primary'
										}`}>
										Pending Transactions
									</Link>
									<Link
										to={`${match.path}/transactions/all`}
										className={`mr-2 btn btn-primary btn-sm  ${
											page === 'all' ? '' : 'btn-outline-primary'
										}`}>
										All transactions
									</Link>
								</div>
							)}
							<Switch>
								<Switch>
									<Route exact path={`${match.url}`} component={HmoList} />
									<Route
										path={`${match.url}/transactions`}
										component={Transactions}
									/>
									<Route path={`${match.url}/tariffs`} component={Tarrifs} />
									<Route component={NoMatch} />
								</Switch>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Home);
