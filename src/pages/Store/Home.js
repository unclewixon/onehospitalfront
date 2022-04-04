/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, lazy, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import ModalNewItem from '../../components/Modals/ModalNewItem';
import { messageService } from '../../services/message';

const Inventory = lazy(() => import('./Inventory'));
const Requisitions = lazy(() => import('./Requisitions'));

const Home = ({ match, location }) => {
	const [addModal, setAddModal] = useState(false);

	const page = location.pathname.split('/').pop();

	let pageTitle = 'Inventory';
	if (page === 'requisitions') {
		pageTitle = 'Requisitions';
	}

	const addItem = () => {
		document.body.classList.add('modal-open');
		setAddModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setAddModal(false);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							{page !== 'requisitions' && (
								<div className="element-actions">
									<a
										className="btn btn-primary btn-sm text-white"
										onClick={() => addItem()}
									>
										<i className="os-icon os-icon-ui-22" />
										<span>Add Item</span>
									</a>
								</div>
							)}
							<h6 className="element-header">{pageTitle}</h6>
							<div className="row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}`}
												component={Inventory}
											/>
											<Route
												path={`${match.url}/requisitions`}
												component={Requisitions}
											/>
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{addModal && (
				<ModalNewItem
					category="stores"
					closeModal={() => closeModal()}
					addItem={data => messageService.sendMessage(data)}
				/>
			)}
		</div>
	);
};

export default Home;
