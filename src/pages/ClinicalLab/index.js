/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, lazy, Suspense } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import NoMatch from '../NoMatch';
import Queue from '../../components/Queue';
import Splash from '../../components/Splash';
const NewLab = lazy(() => import('./NewLab'));

const ClinicalLab = lazy(() => import('./ClinicalLab'));

class Clinical extends Component {
	state = {};

	handleEdit = () => {
		alert('I am toSee Details this guy');
	};
	render() {
		const { match, location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}/`} component={ClinicalLab} />
								<Route
									exact
									path={`${match.url}/lab-request`}
									component={NewLab}
								/>

								<Route component={NoMatch} />
							</Switch>
						</Suspense>
					</div>
				</div>
				<div className="content-panel compact">
					<Queue />
				</div>
			</div>
		);
	}
}

export default withRouter(Clinical);
