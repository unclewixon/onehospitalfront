import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import SelectRoomModal from '../../components/Modals/SelectRoomModal';
import { request } from '../../services/utilities';

const Dashboard = lazy(() => import('./Dashboard'));
const Appointments = lazy(() => import('./Appointments'));

const Doctor = ({ match }) => {
	const [showModal, setShowModal] = useState(false);
	const [activeRoom, setActiveRoom] = useState(null);
	const [selected, setSelected] = useState(false);
	const [rooms, setRooms] = useState([]);

	const profile = useSelector(state => state.user.profile);

	const fetchConsultations = useCallback(async () => {
		try {
			const url = 'consulting-rooms';
			const rs = await request(url, 'GET', true);
			setRooms(rs);
		} catch (e) {
			console.log(e);
		}
	}, []);

	const initModal = useCallback(async () => {
		const staff = profile.details;
		if (!staff.room) {
			setShowModal(true);
		} else {
			setActiveRoom(staff.room);
			setSelected(true);
		}
	}, [profile]);

	useEffect(() => {
		fetchConsultations();
		initModal();
	}, [initModal, fetchConsultations]);

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
							{activeRoom && selected && (
								<h6>
									Active Room:{' '}
									<span className="text-success">{activeRoom.name}</span>
								</h6>
							)}
							<button
								className="btn btn-sm btn-primary"
								onClick={() => setShowModal(true)}>
								Select Consulting Room
							</button>
						</div>
					</div>
				</div>
				<div className="row mt-4">
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
			{showModal && <SelectRoomModal rooms={rooms} closeModal={closeModal} />}
		</div>
	);
};

export default Doctor;
