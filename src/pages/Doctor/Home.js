import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import SSRStorage from '../../services/storage';
import SelectRoomModal from '../../components/Modals/SelectRoomModal';

const Dashboard = lazy(() => import('./Dashboard'));
const Appointments = lazy(() => import('./Appointments'));

const storage = new SSRStorage();

const Doctor = ({ match }) => {
	const [showModal, setShowModal] = useState(false);
	const [activeRoom, setActiveRoom] = useState(null);
	const [selected, setSelected] = useState(false);

	const initModal = useCallback(async () => {
		const room = await storage.getItem('ACTIVE:ROOM');
		if (!room) {
			setShowModal(true);
		} else {
			setActiveRoom(room);
			setSelected(true);
		}
	}, []);

	useEffect(() => {
		initModal();
	}, [initModal]);

	const closeModal = room => {
		setShowModal(false);
		if (room) {
			setActiveRoom(room);
			setSelected(true);
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="text-right">
							{activeRoom && selected ? (
								<h6>
									Active Room:{' '}
									<span className="text-success">{activeRoom.name}</span>
								</h6>
							) : (
								<button
									className="btn btn-sm btn-primary"
									onClick={() => setShowModal(true)}>
									Select Consulting Room
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						<Suspense fallback={<Splash />}>
							<Switch>
								<Route exact path={`${match.url}`} component={Dashboard} />
								<Route
									exact
									path={`${match.url}/appointment-history`}
									component={Appointments}
								/>
								<Route component={NoMatch} />
							</Switch>
						</Suspense>
					</div>
				</div>
			</div>
			{showModal && <SelectRoomModal closeModal={closeModal} />}
		</div>
	);
};

export default Doctor;
