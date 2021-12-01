/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { notifyError } from '../../services/notify';
import { request, updateImmutable } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../TableLoading';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess } from '../../services/notify';
import { updateService } from '../../actions/settings';

const ModalViewRooms = ({ closeModal, service, error }) => {
	const [state, setState] = useState('add');
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState(null);
	const [name, setName] = useState('');
	const [floor, setFloor] = useState('');

	const dispatch = useDispatch();

	const fetchRooms = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `rooms?category_id=${service.id}`;
			const rs = await request(url, 'GET', true);
			setRooms(rs);
			setLoaded(true);
			dispatch(stopBlock());
		} catch (error) {
			notifyError(error.message || 'could not load rooms');
			dispatch(stopBlock());
		}
	}, [dispatch, service]);

	useEffect(() => {
		if (!loaded) {
			fetchRooms();
		}
	}, [fetchRooms, loaded]);

	const create = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);
			dispatch(startBlock());
			const url = state === 'add' ? 'rooms' : `rooms/${room.id}`;
			const method = state === 'add' ? 'POST' : 'PATCH';
			const info = { name, floor, room_category_id: service.id };
			const rs = await request(url, method, true, info);
			setName('');
			setFloor('');
			setRoom(null);
			setState('add');
			const allRooms =
				state === 'add' ? [...rooms, rs] : updateImmutable(rooms, rs);
			setRooms(allRooms);
			if (state === 'add') {
				dispatch(updateService({ ...service, numRooms: allRooms.length }));
			}
			setSubmitting(false);
			notifySuccess('Room saved!');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '640px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">List of Rooms</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div>{service.name}</div>
						</div>
						<div className="form-block">
							{error && (
								<div
									className="alert alert-danger"
									dangerouslySetInnerHTML={{
										__html: `<strong>Error!</strong> ${error}`,
									}}
								/>
							)}
							<form className="form-inline" onSubmit={create}>
								<div className="form-group mr-3">
									<label className="mr-2">Room: </label>
									<input
										className="form-control-sm"
										onChange={e => setName(e.target.value)}
										value={name}
										placeholder="Room"
									/>
								</div>
								<div className="form-group">
									<label className="mr-2">Floor: </label>
									<input
										className="form-control-sm"
										onChange={e => setFloor(e.target.value)}
										value={floor}
										placeholder="Floor"
									/>
								</div>
								<button className="btn btn-secondary btn-sm ml-4" type="submit">
									{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
								</button>
							</form>
						</div>
						<div className="table-responsive mt-3">
							{!loaded ? (
								<TableLoading />
							) : (
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Room</th>
											<th>Floor</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{rooms.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.name}</td>
													<td>{item.floor}</td>
													<td>{item.status}</td>
													<td className="row-actions">
														<Tooltip title="Edit Room">
															<a
																onClick={() => {
																	setName(item.name);
																	setFloor(item.floor);
																	setRoom(item);
																	setState('edit');
																}}>
																<i className="os-icon os-icon-edit-1" />
															</a>
														</Tooltip>
														{/* <Tooltip title="Delete Room">
															<a className="danger" onClick={() => {}}>
																<i className="os-icon os-icon-ui-15" />
															</a>
														</Tooltip> */}
													</td>
												</tr>
											);
										})}
										{rooms.length === 0 && (
											<tr>
												<td className="text-center" colSpan="4">
													No Rooms
												</td>
											</tr>
										)}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalViewRooms;
